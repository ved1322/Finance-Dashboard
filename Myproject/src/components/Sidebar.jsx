import React from "react";

// Sidebar component — shows logo, nav buttons, role switcher
function Sidebar({ page, setPage, role, setRole }) {

  // Today's date shown in top bar
  const today = new Date().toDateString();

  return (
    <>
      {/* LEFT SIDEBAR */}
      <div className="sidebar">

        <div className="sidebar-logo">₹ MyFinance</div>

        {/* Nav buttons — clicking sets the current page */}
        <button
          className={`nav-btn ${page === "dashboard" ? "active" : ""}`}
          onClick={() => setPage("dashboard")}
        >
          🏠 Dashboard
        </button>

        <button
          className={`nav-btn ${page === "transactions" ? "active" : ""}`}
          onClick={() => setPage("transactions")}
        >
          📋 Transactions
        </button>

        <button
          className={`nav-btn ${page === "insights" ? "active" : ""}`}
          onClick={() => setPage("insights")}
        >
          💡 Insights
        </button>

        {/* Role Switcher */}
        <div className="role-box">
          <p>Logged in as:</p>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="admin">Admin</option>
            <option value="viewer">Viewer</option>
          </select>
        </div>

      </div>

      
      
    </>
  );
}

export default Sidebar;