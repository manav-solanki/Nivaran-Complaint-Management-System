import React, { useEffect, useState } from "react";
import axios from "axios";

function Manageuser() {
  const [users, setUsers] = useState([]);

  // FETCH USERS
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/users")
      .then((res) => {
        console.log(res.data);

        if (res.data.status === "success") {
          setUsers(res.data.data);
        } else {
          setUsers([]);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  // UPDATE STATUS
  const updateStatus = (user_id, status) => {
    axios
      .put(`http://localhost:1337/api/update-status/${user_id}`, { status })
      .then(() => {
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.user_id === Number(user_id) ? { ...user, status } : user,
          ),
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="content-wrapper manage-user">
     <h2 style={{ textAlign: "center", marginTop: "-10px",fontWeight:"400" }}>
          <b>Manage User</b>
        </h2>
       <div className="table-wrapper">
      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr style={{ textAlign: "center" }}>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Status</th>
              <th>Control</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.user_id} style={{ textAlign: "center" }}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>

                <td>
                  <span
                    className={`badge ${
                      user.status === 1 ? "badge-success" : "badge-danger"
                    }`}
                    style={{
                      padding: "7px 12px",
                      fontSize: "13px",
                      borderRadius: "12px",
                    }}
                  >
                    {user.status === 1 ? "Active" : "Blocked"}
                  </span>
                </td>

                <td>
                  <button
                    className="btn btn-success"
                    disabled={user.status === 1}
                    onClick={() => updateStatus(user.user_id, 1)}
                  >
                    Active
                  </button>

                  <button
                    className="btn btn-danger"
                    style={{ marginLeft: "8px" }}
                    disabled={user.status === 0}
                    onClick={() => updateStatus(user.user_id, 0)}
                  >
                    Block
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
}

export default Manageuser;
