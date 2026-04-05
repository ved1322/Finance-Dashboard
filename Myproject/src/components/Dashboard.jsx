import React from "react";
import { fmt, catColors, monthNames } from "../data";

function Dashboard({ transactions }) {

  // Add up income and expenses
  let totalIncome  = 0;
  let totalExpense = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income")  totalIncome  += transactions[i].amt;
    if (transactions[i].type === "expense") totalExpense += transactions[i].amt;
  }
  const balance = totalIncome - totalExpense;

  return (
    <div>
      <div className="topbar">
        <h3>🏠 Dashboard</h3>
        <span>{new Date().toDateString()}</span>
      </div>

      {/* Summary Cards */}
      <div className="card-row">
        <div className="card blue-card">
          <p>Total Balance</p>
          <h2>{fmt(balance)}</h2>
          <small>All time • {transactions.length} transactions</small>
        </div>
        <div className="card green-card">
          <p>Total Income</p>
          <h2>{fmt(totalIncome)}</h2>
          <small>All time</small>
        </div>
        <div className="card red-card">
          <p>Total Expenses</p>
          <h2>{fmt(totalExpense)}</h2>
          <small>All time</small>
        </div>
      </div>

      {/* Bar Chart */}
      <BarChart transactions={transactions} />

      {/* Donut Chart */}
      <DonutChart transactions={transactions} />
    </div>
  );
}

// Bar chart — income vs expense for last 6 months
function BarChart({ transactions }) {
  const now  = new Date();
  const bars = [];

  for (let i = 5; i >= 0; i--) {
    const d      = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const keyStr = d.getFullYear() + "-" + String(d.getMonth() + 1).padStart(2, "0");

    let inc = 0;
    let exp = 0;
    for (let j = 0; j < transactions.length; j++) {
      const t = transactions[j];
      if (t.date.startsWith(keyStr)) {
        if (t.type === "income")  inc += t.amt;
        if (t.type === "expense") exp += t.amt;
      }
    }
    bars.push({ label: monthNames[d.getMonth()], inc, exp });
  }

  const maxVal = 6000; 

  return (
    <div className="chart-box">
      <h4>Monthly Income vs Expenses</h4>
      <div className="bar-area">
        {bars.map((b) => (
          <div className="month-group" key={b.label}>
            <div className="two-bars">
              <div className="bar inc-bar" style={{ height: Math.round((b.inc / maxVal) * 120) }} title={"Income: " + fmt(b.inc)} />
              <div className="bar exp-bar" style={{ height: Math.round((b.exp / maxVal) * 120) }} title={"Expense: " + fmt(b.exp)} />
            </div>
            <div className="bar-label">{b.label}</div>
          </div>
        ))}
      </div>
      <div className="legend">
        <span><span className="green-dot" /> Income</span>
        <span><span className="red-dot"   /> Expense</span>
      </div>
    </div>
  );
}

// Donut chart — spending by category using SVG
function DonutChart({ transactions }) {

  // Group expenses by category
  const catTotals = {};
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    if (t.type === "expense") {
      if (!catTotals[t.cat]) catTotals[t.cat] = 0;
      catTotals[t.cat] += t.amt;
    }
  }

  const total = Object.values(catTotals).reduce((sum, v) => sum + v, 0);
  if (total === 0) return <p style={{ color: "#8a94a6" }}>No expense data yet.</p>;

  const sorted = Object.entries(catTotals).sort((a, b) => b[1] - a[1]);

  // Draw donut using SVG stroke-dasharray trick
  const cx = 80, cy = 80, r = 55;
  const circumference = 2 * Math.PI * r;
  let offset = 0;

  const circles = sorted.map(([cat, val]) => {
    const color  = catColors[cat] || "#8a94a6";
    const dash   = (val / total) * circumference;
    const gap    = circumference - dash;
    const circle = (
      <circle key={cat} cx={cx} cy={cy} r={r}
        fill="none" stroke={color} strokeWidth="18"
        strokeDasharray={`${dash.toFixed(1)} ${gap.toFixed(1)}`}
        strokeDashoffset={-offset.toFixed(1)}
        transform={`rotate(-90 ${cx} ${cy})`}
      />
    );
    offset += dash;
    return circle;
  });

  return (
    <div className="chart-box">
      <h4>Spending by Category</h4>
      <div className="donut-area">
        <svg width="160" height="160" viewBox="0 0 160 160">
          <circle cx={cx} cy={cy} r={r} fill="none" stroke="#22283a" strokeWidth="18" />
          {circles}
        </svg>
        <div>
          {sorted.map(([cat, val]) => (
            <div className="donut-legend-item" key={cat}>
              <span className="color-dot" style={{ background: catColors[cat] || "#8a94a6" }} />
              {cat}
              <span className="donut-pct">{((val / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;