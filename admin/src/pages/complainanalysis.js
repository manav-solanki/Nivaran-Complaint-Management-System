import React from "react";
import {
  PieChart,
  Pie,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

function Complainanalysis() {
  return (
    <div className="content-wrapper" style={{ padding: "20px" }}>
      
      <h3 style={{ textAlign: "center", marginBottom: "30px" }}>
        Complaints Analysis
      </h3>

      {/* TOP CARDS */}
      <div className="row mb-4">

        <div className="col-md-3">
          <div style={{ background: "linear-gradient(135deg, #4facfe, #00f2fe)", color: "#fff", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <h6>Total</h6>
          </div>
        </div>

        <div className="col-md-3">
          <div style={{ background: "linear-gradient(135deg, #f6d365, #fda085)", color: "#fff", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <h6>Pending</h6>
          </div>
        </div>

        <div className="col-md-3">
          <div style={{ background: "linear-gradient(135deg, #43e97b, #38f9d7)", color: "#fff", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <h6>Resolved</h6>
          </div>
        </div>

        <div className="col-md-3">
          <div style={{ background: "linear-gradient(135deg, #fa709a, #fee140)", color: "#fff", borderRadius: "12px", padding: "20px", textAlign: "center" }}>
            <h6>High Priority</h6>
          </div>
        </div>

      </div>

      <div className="row">
        {/* DONUT */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Status Distribution</h5>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie innerRadius={60} outerRadius={100} />
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>

          </div>
        </div>

        {/* BAR */}
        <div className="col-md-6">
          <div className="card p-3">
            <h5>Category Wise Complaints</h5>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart>
                <XAxis />
                <YAxis />
                <Tooltip />
                <Bar />
              </BarChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>

      {/* ROW 2 */}
      <div className="row mt-4">
        <div className="col-md-12">
          <div className="card p-3">
            <h5>Complaints Trend</h5>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart>
                <XAxis />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" />
              </LineChart>
            </ResponsiveContainer>

          </div>
        </div>
      </div>

    </div>
  );
}

export default Complainanalysis;