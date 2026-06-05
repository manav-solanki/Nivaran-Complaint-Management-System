import React, { useEffect, useState } from "react";
import Axios from "axios";
import "react-calendar/dist/Calendar.css";

import {
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  AreaChart,
  Area,
} from "recharts";

function Dashboard() {
  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    resolved: 0,
    progress: 0,
    users: 0,
  });

  const [recent, setRecent] = useState([]);
  // const [date, setDate] = useState(new Date());

  useEffect(() => {
    Axios.get("http://localhost:1337/api/dashboardhead").then((res) => {
      if (res.data.status === "success") {
        setCounts(res.data.counts);
        setRecent(res.data.recent);
      }
    });
  }, []);

  // PIE CHART DATA
  const pieData = [
    { name: "Pending", value: counts.pending },
    { name: "Progress", value: counts.progress },
    { name: "Resolved", value: counts.resolved },
  ];

  // COMPLAINT TREND DATA
  const groupedData = {};

  recent.forEach((item) => {
    if (!item.created) return;

    const dateObj = new Date(item.created);

    const formattedDate = dateObj.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
    });

    if (!groupedData[formattedDate]) {
      groupedData[formattedDate] = 0;
    }

    groupedData[formattedDate] += 1;
  });

  const lineData = Object.keys(groupedData).map((date) => ({
    date,
    complaints: groupedData[date],
  }));

  const COLORS = ["#ff9800", "#2196f3", "#28a745"];

  return (
    <div className="main-content content-wrapper">
      <div className="row mb-4">
        <div className="col-md-3">
          <div className="dashboard-card gradient-1">
            <i className="fa fa-file-text"></i>
            <h2>{counts.total}</h2>
            <p>Total Complaints</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card gradient-2">
            <i className="fa fa-hourglass-half"></i>
            <h2>{counts.pending}</h2>
            <p>Pending</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card gradient-3">
            <i className="fa fa-check-circle"></i>
            <h2>{counts.resolved}</h2>
            <p>Resolved</p>
          </div>
        </div>

        <div className="col-md-3">
          <div className="dashboard-card gradient-4">
            <i className="fa fa-spinner"></i>
            <h2>{counts.progress}</h2>
            <p>In Progress</p>
          </div>
        </div>
      </div>

      {/* CHARTS */}
      <div className="row mb-4 mt-5">
        <div className="col-md-6 d-flex">
          <div className="card p-3 w-100">
            <h5 className="text-center">Status Overview</h5>

            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={95}
                  paddingAngle={3}
                  cornerRadius={6}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>

                <Tooltip />
                <Legend verticalAlign="bottom" />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TREND CHART */}
        <div className="col-md-6 d-flex">
          <div className="card p-3 w-100">
            <h5 className="text-center">Complaints Trend</h5>

            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={lineData}
                margin={{
                  top: 20,
                  right: 20,
                  left: 0,
                  bottom: 20,
                }}
              >
                <defs>
                  <linearGradient
                    id="colorComplaints"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#4b49ac" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#4b49ac" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                  angle={-20}
                  textAnchor="end"
                />

                <YAxis allowDecimals={false} />

                <Tooltip />

                <Area
                  type="monotone"
                  dataKey="complaints"
                  stroke="#4b49ac"
                  strokeWidth={3}
                  fill="url(#colorComplaints)"
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* TABLE */}
      <div className="dashboard-table">
        <h3 className="heading">Recent Complaints</h3>

        <table className="table">
          <thead>
            <tr className="text-center">
              <th>Title</th>
              <th>Description</th>
              <th>Address</th>
              <th>Category</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {recent
              .filter((item) => {
                if (!item.created) return false;

                const complaintDate = new Date(item.created);

                const today = new Date();
                const yesterday = new Date();

                yesterday.setDate(today.getDate() - 1);

                today.setHours(0, 0, 0, 0);
                yesterday.setHours(0, 0, 0, 0);
                complaintDate.setHours(0, 0, 0, 0);

                return (
                  complaintDate.getTime() === today.getTime() ||
                  complaintDate.getTime() === yesterday.getTime()
                );
              })

              .sort((a, b) => new Date(b.created) - new Date(a.created))

              .slice(0, 3)

              .map((item, index) => {
                const dateObj = new Date(item.created);

                const formattedDate = `${String(dateObj.getDate()).padStart(
                  2,
                  "0",
                )}-${String(dateObj.getMonth() + 1).padStart(
                  2,
                  "0",
                )}-${dateObj.getFullYear()}`;

                return (
                  <tr key={index} className="text-center">
                    <td>{item.title}</td>

                    <td>{item.description}</td>

                    <td>{item.address}</td>

                    <td>{item.category}</td>

                    <td>
                      {item.status === 0
                        ? "Pending"
                        : item.status === 1
                          ? "In Progress"
                          : "Resolved"}
                    </td>

                    <td>{formattedDate}</td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>

      {/* BOTTOM SECTION */}
      {/* <div className="bottom-section">
       
        <div className="insight-card">
          <h3>📊 Performance Insight</h3>

          <p>
            <span>📈</span> Resolution Rate: <b>78%</b>
          </p>

          <p>
            <span>⏱</span> Avg Response Time: <b>2 days</b>
          </p>

          <p>
            <span>⚡</span> Fastest Category: <b>Electricity</b>
          </p>

          <p>
            <span>🔥</span> Most Active Area: <b>Urban Zone</b>
          </p>

          <p>
            <span>⭐</span> User Satisfaction: <b>4.5 / 5</b>
          </p>
        </div>

        <div className="dashboard-calendar">
          <h3 className="heading1">Calendar</h3>

          <div className="calendar-box">
            <Calendar onChange={setDate} value={date} />
          </div>
        </div>
      </div> */}
    </div>
  );
}

export default Dashboard;
