import React, { useEffect, useState } from "react";
import Axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from "sweetalert2";

function ComplaintReport() {
  const [list, setList] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:1337/api/getcomplaint")
      .then((res) => {
        const formatted = res.data.map((item) => ({
          ...item,
          status: Number(item.status),
          priority: Number(item.priority),
        }));

        setList(formatted);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const getStatus = (status) => {
    return status === 0 ? "Pending" : status === 1 ? "In Progress" : "Resolved";
  };

  const getPriority = (priority) => {
    return priority === 0 ? "Low" : priority === 1 ? "Medium" : "High";
  };

  // View Report
  const viewReport = (item) => {
    Swal.fire({
      title: "Complaint Details",
      width: "800px",
      html: `
        <div style="text-align:left">
          <p><b>Complaint ID:</b> ${item.complaint_id}</p>
          <p><b>Name:</b> ${item.name}</p>
          <p><b>Title:</b> ${item.title}</p>
          <p><b>Description:</b> ${item.description}</p>
          <p><b>Address:</b> ${item.address}</p>
          <p><b>Category:</b> ${item.category}</p>
          <p><b>Status:</b> ${getStatus(item.status)}</p>
          <p><b>Priority:</b> ${getPriority(item.priority)}</p>
          <p><b>Department:</b> ${
            item.allocated_department || "Not Assigned"
          }</p>
          <p><b>Staff:</b> ${item.allocated_staff || "Not Assigned"}</p>
        </div>
      `,
    });
  };

  // Download Single Complaint PDF
  const downloadSinglePDF = (item) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Complaint Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Complaint ID: ${item.complaint_id}`, 20, 40);
    doc.text(`Name: ${item.name}`, 20, 50);
    doc.text(`Title: ${item.title}`, 20, 60);
    doc.text(`Category: ${item.category}`, 20, 70);
    doc.text(`Status: ${getStatus(item.status)}`, 20, 80);
    doc.text(`Priority: ${getPriority(item.priority)}`, 20, 90);

    doc.text(
      `Department: ${item.allocated_department || "Not Assigned"}`,
      20,
      100,
    );

    doc.text(`Staff: ${item.allocated_staff || "Not Assigned"}`, 20, 110);

    const addressLines = doc.splitTextToSize(`Address: ${item.address}`, 170);

    doc.text(addressLines, 20, 120);

    doc.save(`Complaint_${item.complaint_id}.pdf`);
  };

  // Download Complete Report
  const downloadFullReport = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Complaint Management Report", 14, 20);

    autoTable(doc, {
      startY: 30,
      head: [
        [
          "ID",
          "Name",
          "Title",
          "Category",
          "Status",
          "Priority",
          "Department",
          "Staff",
        ],
      ],
      body: list.map((item) => [
        item.complaint_id,
        item.name,
        item.title,
        item.category,
        getStatus(item.status),
        getPriority(item.priority),
        item.allocated_department || "-",
        item.allocated_staff || "-",
      ]),
    });

    doc.save("Complaint_Report.pdf");
  };

  return (
    <div
      className="complaint-wrapper"
      style={{
        padding: "30px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "500",
        }}
      >
        <b>Complaint Report</b>
      </h2>

      <div className="report-header">
        <h5>Total Complaints : {list.length}</h5>

        <button
          className="btn"
          onClick={downloadFullReport}
          style={{
            backgroundColor: "#4338ca",
            color: "#ffffff",
            border: "none",
          }}
        >
          Download Complete Report
        </button>
      </div>

      <div className="table-responsive">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Department</th>
              <th>Staff</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item) => (
              <tr key={item.complaint_id}>
                <td>{item.complaint_id}</td>
                <td>{item.name}</td>
                <td>{item.title}</td>
                <td>{item.category}</td>

                <td>{getStatus(item.status)}</td>

                <td>{getPriority(item.priority)}</td>

                <td>{item.allocated_department || "Not Assigned"}</td>

                <td>{item.allocated_staff || "Not Assigned"}</td>

                <td>
                  {new Date(item.created).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </td>

                <td>
                  <div className="action-buttons">
                    <button
                      className="btn btn-info btn-sm"
                      onClick={() => viewReport(item)}
                    >
                      View
                    </button>

                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => downloadSinglePDF(item)}
                    >
                      PDF
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintReport;
