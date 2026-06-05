const mysql = require("mysql");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const multer = require("multer");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nivaran89@gmail.com",
    pass: "jmue skey iqlu iogr",
  },
  tls: {
    rejectUnauthorized: false,
  },
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "project",
});

//connection to database
con.connect((err) => {
  if (err) {
    console.error("Database Connection Failed:", err);
  } else {
    console.log("Connected To MySQL Database");
  }
});

// ================= REGISTER API =================
app.post("/api/registerprocess", upload.single("image"), (req, res) => {
  const { name, email, phone, password } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!name || !email || !phone || !password) {
    return res.status(400).send({ message: "Doesn't Match:" });
  }

  const checkquery = "SELECT * FROM user WHERE email=?";
  con.query(checkquery, [email], (err, results) => {
    if (err) {
      return res.status(500).send({ message: "Error to check email" });
    }

    if (results.length > 0) {
      return res.status(400).send({ message: "Email already exist" });
    }

    const saltRounds = 10;

    // ✅ HASH PASSWORD
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        return res.status(500).send({ message: "Error hashing password" });
      }

      const query =
        "INSERT INTO user(name,email,phone,password,image) VALUES(?,?,?,?,?)";

      // ✅ store HASH instead of plain password
      con.query(query, [name, email, phone, hash, image], (err, result) => {
        if (err) {
          return res.status(500).send({ message: "Error to Insert Data" });
        }

        const id = result.insertId;

        const profileQuery =
          "INSERT INTO profile(user_id,name,email,phone,image) VALUES(?,?,?,?,?)";

        con.query(profileQuery, [id, name, email, phone, image], (err2) => {
          if (err2) {
            console.log("PROFILE ERROR:", err2);
            return res.status(500).send({ message: "Error to insert profile" });
          }

          return res.status(200).send({
            message: "User Registered Successfully",
          });
        });
      });
    });
  });
});

// ================= LOGIN API =================
app.post("/api/loginprocess", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      status: "error",
      message: "Username and Password Required",
    });
  }

  const checkquery = "SELECT * FROM user WHERE email=?";

  con.query(checkquery, [email], async (err, results) => {
    if (err) {
      return res.status(500).json({
        status: "error",
        message: "Database Error",
      });
    }

    // ❌ Email not found
    if (results.length === 0) {
      return res.status(404).json({
        status: "error",
        message: "No account found. Please sign up first.",
      });
    }

    const user = results[0];

    // ❌ Password mismatch
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "error",
        message: "Invalid Email or Password",
      });
    }

    // ❌ Not approved
    if (user.status != 1) {
      return res.status(403).json({
        status: "error",
        message: "Your Account has not been approved",
      });
    }

    // ✅ Success
    return res.status(200).json({
      status: "success",
      message: "Login successful",
      data: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        image: user.image,
      },
    });
  });
});

// ================= ADD COMPLAINT API =================
app.post("/api/addcomplaintprocess", upload.single("image"), (req, res) => {
  const { user_id, title, description, address, category } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!user_id || !title || !description || !address || !category || !image) {
    return res.status(400).send({
      status: "error",
      message: "All Fields Are Required",
    });
  }

  const query = `
      INSERT INTO addcomplaint (user_id, title, description, address, category, image)
      VALUES (?, ?, ?, ?, ?, ?)
    `;

  con.query(
    query,
    [user_id, title, description, address, category, image],
    (err, result) => {
      if (err) {
        console.log(err);
        return res.status(500).send({
          status: "error",
          message: "Database Error",
        });
      }

      res.send({
        status: "success",
        message: "Complaint Added Successfully",
      });
    },
  );
});

// ================= TRACK COMPLAINTS API =================
app.get("/api/view-complaints/:userId", (req, res) => {
  const user_id = req.params.userId;

  if (!user_id) {
    return res.status(400).send({ message: "User ID is required" });
  }

  const query = `
    SELECT complaint_id, title, description, category, address, status, priority, image, created, allocated_department, allocated_staff
    FROM addcomplaint
    WHERE user_id = ?
  `;

  con.query(query, [user_id], (err, results) => {
    if (err) {
      console.log("DB ERROR:", err);
      return res.status(500).send({ message: "Error fetching complaints" });
    }

    if (results.length === 0) {
      return res.status(200).send({
        message: "No complaints found",
        data: [],
      });
    }

    return res.status(200).send({
      message: "Complaints fetched successfully",
      data: results,
    });
  });
});

// ================= UPDATE PROFILE API =================
app.post("/api/profile", upload.single("image"), (req, res) => {
  const { id, name, email, phone } = req.body;
  const image = req.file ? req.file.filename : null;

  if (!id || !name || !email || !phone) {
    return res.status(400).send({
      status: "error",
      message: "All fields are required",
    });
  }

  let query = "";
  let values = [];

  if (image) {
    query = `
      UPDATE profile 
      SET name = ?, email = ?, phone = ?, image = ?
      WHERE user_id = ?
    `;
    values = [name, email, phone, image, id];
  } else {
    query = `
      UPDATE profile 
      SET name = ?, email = ?, phone = ?
      WHERE id = ?
    `;
    values = [name, email, phone, id];
  }

  con.query(query, values, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send({
        status: "error",
        message: "Database Error",
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).send({
        status: "error",
        message: "User not found",
      });
    }

    if (image) {
      const userQuery = `
      UPDATE user 
      SET name = ?, email = ?, phone = ?, image = ?
      WHERE user_id = ?
    `;
      con.query(userQuery, [name, email, phone, image, id]);
    } else {
      const userQuery = `
      UPDATE user 
      SET name = ?, email = ?, phone = ?
      WHERE user_id = ?
    `;
      con.query(userQuery, [name, email, phone, id]);
    }

    return res.status(200).send({
      status: "success",
      message: "Profile updated successfully",
    });
  });
});

// ================= GET COMPLAINT API =================
app.get("/api/getcomplaint", (req, res) => {
  const query =
    "select a.*,b.user_id,name from addcomplaint as a,user as b where a.user_id = b.user_id";
  con.query(query, (err, result) => {
    res.send(result);
  });
});

// ============ ADMIN LOGIN API ============
app.post("/api/adminlogin", (req, res) => {
  const { admin_email, admin_pass } = req.body;

  if (!admin_email || !admin_pass) {
    return res.send({
      status: "error",
      message: "All fields required",
    });
  }

  const query =
    "SELECT * FROM admin_login WHERE admin_email=? AND admin_pass=?";

  con.query(query, [admin_email, admin_pass], (err, result) => {
    if (err) {
      return res.send({
        status: "error",
        message: "Database error",
      });
    }

    if (result.length > 0) {
      res.send({
        status: "success",
        message: "Login successful",
        data: result[0],
      });
    } else {
      res.send({
        status: "error",
        message: "Email or Password does not match",
      });
    }
  });
});

// ============ CONTACT API ============
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.json({
      status: "error",
      msg: "All fields are required",
    });
  }

  // ✅ Check if email exists
  const checkSql = "SELECT * FROM user WHERE email = ?";

  con.query(checkSql, [email], (err, result) => {
    if (err) {
      return res.json({
        status: "error",
        msg: "Database error",
      });
    }

    // ❌ Email not registered
    if (result.length === 0) {
      return res.json({
        status: "error",
        msg: "Enter valid email",
      });
    }

    // ✅ Insert message
    const insertSql =
      "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";

    con.query(insertSql, [name, email, message], (err2) => {
      if (err2) {
        return res.json({
          status: "error",
          msg: "Database error",
        });
      }

      return res.json({
        status: "success",
        msg: "Message sent successfully",
      });
    });
  });
});

// ================= GET USER API =================
app.get("/api/users", (req, res) => {
  const sql = "SELECT user_id, name, email, phone, status FROM `user`";

  con.query(sql, (err, result) => {
    if (err) {
      console.log("SQL ERROR:", err);
      return res.json({ status: "error", error: err.message });
    }
    return res.json({ status: "success", data: result });
  });
});

// ================= UPDATE USER STATUS API =================
app.put("/api/update-status/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { status } = req.body;

  console.log("ID:", id);
  console.log("STATUS:", status);

  const sql = "UPDATE `user` SET status=? WHERE user_id=?";

  con.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log("FULL ERROR:", err);
      return res.status(500).json({ status: "error", error: err.message });
    }
    console.log("Affected Rows:", result.affectedRows);
    return res.json({ status: "success" });
  });
});

// ================= DISPLAY USER COMPLAINT STATUS API =================
app.put("/api/update-complaint-status/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const status = parseInt(req.body.status);

  if (isNaN(id)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid complaint ID",
    });
  }

  if (isNaN(status) || ![0, 1, 2].includes(status)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid status value",
    });
  }

  const checkSql = "SELECT status FROM addcomplaint WHERE complaint_id=?";

  con.query(checkSql, [id], (err, result) => {
    if (err) {
      console.log("CHECK ERROR:", err);
      return res.status(500).json({ status: "error" });
    }

    if (result.length === 0) {
      return res.json({
        status: "error",
        message: "Complaint not found",
      });
    }

    if (result[0].status === status) {
      return res.json({
        status: "success",
        message: "No change needed",
      });
    }

    const updateSql = "UPDATE addcomplaint SET status=? WHERE complaint_id=?";

    con.query(updateSql, [status, id], (err, result) => {
      if (err) {
        console.log("UPDATE ERROR:", err);
        return res.status(500).json({
          status: "error",
          error: err.message,
        });
      }

      return res.json({
        status: "success",
        message: "Status updated successfully",
      });
    });
  });
});

// ================= USER DASHBOARD COUNT API =================
app.get("/api/dashboard-counts", (req, res) => {
  const query = `
    SELECT 
      (SELECT COUNT(*) FROM addcomplaint) AS total,
      (SELECT COUNT(*) FROM addcomplaint WHERE status = 0) AS pending,
      (SELECT COUNT(*) FROM addcomplaint WHERE status = 1) AS inProgress,
      (SELECT COUNT(*) FROM addcomplaint WHERE status = 2) AS resolved,
      (SELECT COUNT(*) FROM \`user\`) AS users
  `;

  con.query(query, (err, result) => {
    if (err) return res.status(500).send(err);

    res.send(result[0]);
  });
});

// ================= ADMIN DASHBOARD COUNT API =================
app.get("/api/dashboardhead", (req, res) => {
  const countsQuery = `
    SELECT 
      COUNT(*) AS total,
      SUM(status = 0) AS pending,
      SUM(status = 1) AS progress,
      SUM(status = 2) AS resolved
    FROM addcomplaint
  `;

  const usersQuery = `
    SELECT COUNT(*) AS users 
    FROM user
  `;

  const recentQuery = `
    SELECT 
      complaint_id,
      title,
      description,
      address,
      category,
      status,
      created
    FROM addcomplaint
    ORDER BY created ASC
  `;

  con.query(countsQuery, (err, countsResult) => {
    if (err) {
      return res.json({
        status: "error",
        error: err,
      });
    }

    con.query(usersQuery, (err2, usersResult) => {
      if (err2) {
        return res.json({
          status: "error",
          error: err2,
        });
      }

      con.query(recentQuery, (err3, recentResult) => {
        if (err3) {
          return res.json({
            status: "error",
            error: err3,
          });
        }

        res.json({
          status: "success",

          counts: {
            total: countsResult[0].total || 0,
            pending: countsResult[0].pending || 0,
            progress: countsResult[0].progress || 0,
            resolved: countsResult[0].resolved || 0,
            users: usersResult[0].users || 0,
          },

          recent: recentResult,
        });
      });
    });
  });
});

// ================= SET PRIORITY API =================
app.put("/api/update-complaint-priority/:id", (req, res) => {
  const id = Number(req.params.id);
  const priority = Number(req.body.priority);

  if (!id) {
    return res.status(400).json({
      status: "error",
      message: "Invalid complaint ID",
    });
  }

  if (![0, 1, 2].includes(priority)) {
    return res.status(400).json({
      status: "error",
      message: "Invalid priority value",
    });
  }

  const checkSql = "SELECT priority FROM addcomplaint WHERE complaint_id=?";

  con.query(checkSql, [id], (err, result) => {
    if (err) {
      console.log("CHECK ERROR:", err);
      return res.status(500).json({ status: "error" });
    }

    if (result.length === 0) {
      return res.json({
        status: "error",
        message: "Complaint not found",
      });
    }

    if (Number(result[0].priority) === priority) {
      return res.json({
        status: "success",
        message: "No change needed",
      });
    }

    const updateSql = "UPDATE addcomplaint SET priority=? WHERE complaint_id=?";

    con.query(updateSql, [priority, id], (err) => {
      if (err) {
        console.log("UPDATE ERROR:", err);
        return res.status(500).json({
          status: "error",
          error: err.message,
        });
      }

      return res.json({
        status: "success",
        message: "Priority updated successfully",
      });
    });
  });
});

// ================= GET CONTACT (NOTIFICATIONS) API =================
app.get("/api/notifications", (req, res) => {
  const sql = "SELECT * FROM contact ORDER BY id DESC";

  con.query(sql, (err, result) => {
    if (err) {
      return res.json({
        status: "error",
        message: "Database error",
      });
    }

    return res.json({
      status: "success",
      data: result,
    });
  });
});

// ================= DELETE COMMENT API =================
app.delete("/api/contactprocess/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM contact WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log("❌ MYSQL ERROR FULL:", err);
      return res.status(500).json({
        error: err.message,
        code: err.code,
      });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "No record found" });
    }

    res.json({ message: "Deleted successfully" });
  });
});

// ================= USER NOTIFICATION API =================
app.get("/api/usernotifications/:email", (req, res) => {
  const email = req.params.email;

  const sql = `
    SELECT *
    FROM contact
    WHERE email = ?
    ORDER BY id DESC
  `;

  con.query(sql, [email], (err, result) => {
    if (err) {
      return res.send({
        status: "error",
        message: err,
      });
    }

    res.send({
      status: "success",
      data: result,
    });
  });
});

// ================= ADMIN REPLY API =================
app.post("/api/reply", (req, res) => {
  const { id, admin_reply } = req.body;

  const sql = `
    UPDATE contact
    SET admin_reply = ?, is_read = 0
    WHERE id = ?
  `;

  con.query(sql, [admin_reply, id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).send({
        status: "error",
        message: err,
      });
    }

    res.send({
      status: "success",
      message: "Reply sent successfully",
    });
  });
});

// ================= READ NOTIFICATION API =================
app.put("/api/read-notification/:email", (req, res) => {
  const email = req.params.email;

  const sql = `
    UPDATE contact
    SET is_read = 1
    WHERE email = ?
  `;

  con.query(sql, [email], (err, result) => {
    if (err) {
      return res.status(500).send({
        status: "error",
        message: err,
      });
    }

    res.send({
      status: "success",
    });
  });
});

// ================= MANAGE DEPARTMENT API =================
app.get("/api/managedepartment", (req, res) => {
  const sql = "SELECT * FROM managedepartment";

  con.query(sql, (err, result) => {
    if (err) {
      console.log("DATABASE ERROR:", err);

      return res.status(500).json({
        status: "error",
        message: err.message,
      });
    }

    res.json({
      status: "success",
      data: result,
    });
  });
});

// ================= ADD DEPARTMENT API =================
app.post("/api/adddepartment", (req, res) => {
  const { department_name, department_head, total_staff, status } = req.body;

  if (
    !department_name ||
    !department_head ||
    !total_staff ||
    status === undefined
  ) {
    return res.send({
      status: "error",
      message: "Please fill all required fields",
    });
  }

  const sql =
    "INSERT INTO managedepartment (department_name, department_head, total_staff, status) VALUES(?,?,?,?)";

  con.query(
    sql,
    [department_name, department_head, total_staff, status],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.send({
          status: "error",
          message: "Database error",
        });
      }

      res.send({
        status: "success",
        message: "Department added successfully",
      });
    },
  );
});

// ================= DELETE DEPARTMENT API =================
app.delete("/api/delete-department/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM managedepartment WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log("Delete Error:", err);

      return res.status(500).json({
        success: false,
        message: "Department not deleted",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Department deleted successfully",
    });
  });
});

// ================= SINGLE DEPARTMENT API =================
app.get("/api/single-department/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM managedepartment WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log(err);

      return res.send({
        status: "error",
        message: "Database error",
      });
    }

    res.send({
      status: "success",
      data: result[0],
    });
  });
});

// ================= UPDATE DEPARTMENT API =================
app.put("/api/update-department/:id", (req, res) => {
  const id = req.params.id;

  const { department_name, department_head, total_staff, status } = req.body;

  const sql = `
    UPDATE managedepartment
    SET
      department_name = ?,
      department_head = ?,
      total_staff = ?,
      status = ?
    WHERE id = ?
  `;

  con.query(
    sql,
    [department_name, department_head, total_staff, status, id],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.send({
          status: "error",
          message: "Update failed",
        });
      }

      res.send({
        status: "success",
        message: "Department updated successfully",
      });
    },
  );
});

// ================= ALLOCATE DEPARTMENT API =================
app.put("/api/allocate-department/:id", (req, res) => {
  const id = req.params.id;

  const { allocated_department } = req.body;

  const sql =
    "UPDATE addcomplaint SET allocated_department = ? WHERE complaint_id = ?";

  con.query(sql, [allocated_department, id], (err, result) => {
    if (err) {
      return res.json({
        status: "error",
      });
    }

    return res.json({
      status: "success",
    });
  });
});

// ================= ALLOCATE STAFF API =================
app.put("/api/allocate-staff/:id", (req, res) => {
  const id = req.params.id;

  const { allocated_staff } = req.body;

  const sql =
    "UPDATE addcomplaint SET allocated_staff = ? WHERE complaint_id = ?";

  con.query(sql, [allocated_staff, id], (err, result) => {
    if (err) {
      return res.json({
        status: "error",
      });
    }

    return res.json({
      status: "success",
    });
  });
});

// ================= MANAGE STAFF API =================
app.get("/api/managestaff", (req, res) => {
  const sql = "SELECT * FROM managestaff";

  con.query(sql, (err, result) => {
    if (err) {
      console.log(err);

      return res.send({
        status: "error",
        message: "Database error",
      });
    }

    res.send({
      status: "success",
      data: result,
    });
  });
});

// ================= ADD STAFF API =================
app.post("/api/addstaff", (req, res) => {
  const {
    staff_name,
    staff_email,
    staff_phone,
    staff_dept,
    staff_desig,
    status,
  } = req.body;

  if (
    !staff_name ||
    !staff_email ||
    !staff_phone ||
    !staff_dept ||
    !staff_desig ||
    status === undefined
  ) {
    return res.send({
      status: "error",
      message: "Please fill all required fields",
    });
  }

  const sql =
    "INSERT INTO managestaff (staff_name, staff_email, staff_phone, staff_dept, staff_desig, status) VALUES (?,?,?,?,?,?)";

  con.query(
    sql,
    [staff_name, staff_email, staff_phone, staff_dept, staff_desig, status],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.send({
          status: "error",
          message: "Database error",
        });
      }

      res.send({
        status: "success",
        message: "Staff added successfully",
      });
    },
  );
});

// ================= DELETE STAFF API =================
app.delete("/api/delete-staff/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM managestaff WHERE id = ?";
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ status: "error", message: err });

    return res.json({ status: "success" });
  });
});

// ================= SINGLE STAFF API =================
app.get("/api/single-staff/:id", (req, res) => {
  const id = req.params.id;

  const sql = "SELECT * FROM managestaff WHERE id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      return res.json({
        status: "error",
        message: err,
      });
    }

    if (result.length === 0) {
      return res.json({
        status: "error",
        message: "Staff not found",
      });
    }

    return res.json({
      status: "success",
      data: result[0],
    });
  });
});

// ================= UPDATE STAFF API =================
app.put("/api/update-staff/:id", (req, res) => {
  const id = req.params.id;

  const {
    staff_name,
    staff_email,
    staff_phone,
    staff_dept,
    staff_desig,
    status,
  } = req.body;

  const sql =
    "UPDATE managestaff SET staff_name = ?, staff_email = ?, staff_phone = ?, staff_dept = ?, staff_desig = ?, status = ? WHERE id = ?";

  con.query(
    sql,
    [staff_name, staff_email, staff_phone, staff_dept, staff_desig, status, id],
    (err, result) => {
      if (err) {
        return res.json({
          status: "error",
          message: err,
        });
      }

      if (result.affectedRows === 0) {
        return res.json({
          status: "error",
          message: "No staff found with this ID",
        });
      }

      return res.json({
        status: "success",
        message: "Staff updated successfully",
      });
    },
  );
});

// ================= ALLOCATE STAFF API =================
app.put("/api/allocate-staff/:id", (req, res) => {
  const id = req.params.id;

  const { allocated_staff } = req.body;

  const sql =
    "UPDATE addcomplaint SET allocated_staff = ? WHERE complaint_id = ?";

  con.query(sql, [allocated_staff, id], (err, result) => {
    if (err) {
      return res.json({
        status: "error",
      });
    }

    return res.json({
      status: "success",
    });
  });
});

// ================= UPDATE COMPLAINT API =================
app.put(
  "/api/update-complaint/:complaint_id",
  upload.single("image"),
  (req, res) => {
    const complaint_id = req.params.complaint_id;

    const { title, description, category, address } = req.body;

    // new uploaded image
    const newImage = req.file ? req.file.filename : null;

    // first get old image
    const checkSql = "SELECT image FROM addcomplaint WHERE complaint_id = ?";

    con.query(checkSql, [complaint_id], (err, result) => {
      if (err) {
        console.log(err);

        return res.send({
          status: "error",
          message: "Database error",
        });
      }

      if (result.length === 0) {
        return res.send({
          status: "error",
          message: "Complaint not found",
        });
      }

      // keep old image if new image not uploaded
      const image = newImage || result[0].image;

      const updateSql = `
        UPDATE addcomplaint
        SET
          title = ?,
          description = ?,
          category = ?,
          address = ?,
          image = ?
        WHERE complaint_id = ?
      `;

      con.query(
        updateSql,
        [title, description, category, address, image, complaint_id],
        (err2, result2) => {
          if (err2) {
            console.log(err2);

            return res.send({
              status: "error",
              message: "Complaint update failed",
            });
          }

          res.send({
            status: "success",
            message: "Complaint updated successfully",
          });
        },
      );
    });
  },
);

// ================= UPDATE COMPLAINT API =================
app.put("/api/update-complaint/:complaint_id", (req, res) => {
  const complaint_id = req.params.complaint_id;

  const { title, description, category, address, image } = req.body;

  const sql = `
    UPDATE addcomplaint
    SET
      title = ?,
      description = ?,
      category = ?,
      address = ?,
      image = ?
    WHERE complaint_id = ?
  `;

  con.query(
    sql,
    [title, description, category, address, image, complaint_id],
    (err, result) => {
      if (err) {
        console.log(err);

        return res.send({
          status: "error",
          message: "Complaint update failed",
        });
      }

      res.send({
        status: "success",
        message: "Complaint updated successfully",
      });
    },
  );
});

// ================= DELETE COMPLAINT API =================
app.delete("/api/delete-complaint/:id", (req, res) => {
  const id = req.params.id;

  const sql = "DELETE FROM addcomplaint WHERE complaint_id = ?";

  con.query(sql, [id], (err, result) => {
    if (err) {
      console.log("DELETE ERROR:", err);

      return res.status(500).send({
        status: "error",
        message: "Delete failed",
      });
    }

    res.send({
      status: "success",
      message: "Complaint deleted successfully",
    });
  });
});

// ================= CHECK EMAIL API =================
app.post("/api/checkemail", (req, res) => {
  const { email } = req.body;

  con.query("SELECT * FROM user WHERE email=?", [email], (err, result) => {
    if (err) {
      return res.send({
        status: "error",
      });
    }

    if (result.length > 0) {
      res.send({
        status: "success",
      });
    } else {
      res.send({
        status: "error",
      });
    }
  });
});

// ================= RESET PASSWORD API =================
app.post("/api/resetpassword", async (req, res) => {
  const { email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    con.query(
      "UPDATE user SET password=? WHERE email=?",
      [hashedPassword, email],
      (err) => {
        if (err) {
          return res.send({
            status: "error",
          });
        }

        res.send({
          status: "success",
        });
      },
    );
  } catch (error) {
    res.send({
      status: "error",
    });
  }
});

// ================= SEND OTP API =================
app.post("/api/sendotp", (req, res) => {
  const { email } = req.body;

  const sql = "SELECT * FROM user WHERE email=?";

  con.query(sql, [email], (err, result) => {
    if (err) {
      return res.send({ status: "error" });
    }

    if (result.length === 0) {
      return res.send({
        status: "error",
        message: "Email not found",
      });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    // Insert new OTP or update existing OTP
    const saveOtpSql = `
      INSERT INTO otp_verification(email, otp)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE otp = VALUES(otp)
    `;

    con.query(saveOtpSql, [email, otp], (saveErr) => {
      if (saveErr) {
        return res.send({
          status: "error",
          message: "Failed to save OTP",
        });
      }

      sendOtpMail();
    });

    function sendOtpMail() {
      // Send success response immediately
      res.send({
        status: "success",
        message: "OTP sent successfully",
      });

      // Send email in background
      transporter.sendMail(
        {
          from: "nivaran89@gmail.com",
          to: email,
          subject: "Password Reset OTP",
          html: `<h2>Your OTP is: ${otp}</h2>`,
        },
        (mailErr, info) => {
          if (mailErr) {
            console.log("MAIL ERROR:", mailErr);
            return;
          }

          console.log("MAIL SENT:", info.response);
        },
      );
    }
  });
});

// ================= VERIFY OTP API =================
app.post("/api/verifyotp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.send({
      status: "error",
      message: "Email and OTP are required",
    });
  }

  const sql = "SELECT * FROM otp_verification WHERE email = ? AND otp = ?";

  con.query(sql, [email, otp], (err, result) => {
    if (err) {
      console.log("VERIFY OTP ERROR:", err);

      return res.send({
        status: "error",
        message: "Database error",
      });
    }

    if (result.length === 0) {
      return res.send({
        status: "error",
        message: "Invalid OTP",
      });
    }

    return res.send({
      status: "success",
      message: "OTP verified successfully",
    });
  });
});

// ================= SERVER =================
const PORT = 1337;
app.listen(PORT, () => {
  console.log(`Server running on Port ${PORT}`);
});
