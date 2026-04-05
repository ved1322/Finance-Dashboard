import React, { useState } from "react";
import Sidebar      from "./components/Sidebar";
import Dashboard    from "./components/Dashboard";
import Transactions from "./components/Transactions";
import Insights     from "./components/Insights";
import { defaultData } from "./data";

function App() {

  // All transactions — shared with every page
  const [transactions, setTransactions] = useState(defaultData);

  // Which page is open
  const [page, setPage] = useState("dashboard");

  // Role: "admin" can edit, "viewer" can only view
  const [role, setRole] = useState("admin");

  return (
    <div className="app">

      {/* Sidebar on the left */}
      <Sidebar page={page} setPage={setPage} role={role} setRole={setRole} />

      {/* Main content on the right */}
      <div className="main">
        {page === "dashboard"    && <Dashboard    transactions={transactions} />}
        {page === "transactions" && <Transactions transactions={transactions} setTransactions={setTransactions} role={role} />}
        {page === "insights"     && <Insights     transactions={transactions} />}
      </div>

    </div>
  );
}

export default App;