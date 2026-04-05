import React from "react";
import { fmt, monthNames } from "../data";

function Insights({ transactions }) {

  // Calculate totals
  let totalIncome  = 0;
  let totalExpense = 0;
  for (let i = 0; i < transactions.length; i++) {
    if (transactions[i].type === "income")  totalIncome  += transactions[i].amt;
    if (transactions[i].type === "expense") totalExpense += transactions[i].amt;
  }
  const netSavings  = totalIncome - totalExpense;
  const savingsRate = totalIncome > 0 ? ((netSavings / totalIncome) * 100).toFixed(1) : 0;

  // This month vs last month
  const now     = new Date();
  const thisKey = now.getFullYear() + "-" + String(now.getMonth() + 1).padStart(2, "0");
  const lastKey = now.getFullYear() + "-" + String(now.getMonth()).padStart(2, "0");

  let thisExp = 0;
  let lastExp = 0;
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    if (t.type === "expense") {
      if (t.date.startsWith(thisKey)) thisExp += t.amt;
      if (t.date.startsWith(lastKey)) lastExp += t.amt;
    }
  }

  const changePercent = lastExp > 0 ? (((thisExp - lastExp) / lastExp) * 100).toFixed(1) : null;

  // Find top spending category
  const catTotals = {};
  for (let i = 0; i < transactions.length; i++) {
    const t = transactions[i];
    if (t.type === "expense") {
      if (!catTotals[t.cat]) catTotals[t.cat] = 0;
      catTotals[t.cat] += t.amt;
    }
  }
  let topCat = "";
  let topAmt = 0;
  for (const cat in catTotals) {
    if (catTotals[cat] > topAmt) { topAmt = catTotals[cat]; topCat = cat; }
  }

  // Savings rate color
  const rateColor = savingsRate >= 20 ? "#36b37e" : savingsRate >= 10 ? "#f0883e" : "#f05252";
  const rateMsg   = savingsRate >= 20 ? "Great savings!" : savingsRate >= 10 ? "Keep going!" : "Try to save more";

  return (
    <div>
      <div className="topbar">
        <h3>💡 Insights</h3>
        <span>{now.toDateString()}</span>
      </div>

      <div className="insight-grid">

        {/* Card 1: Summary */}
        <div className="insight-card">
          <h4>📊 Overall Summary</h4>
          <div className="info-row"><span>Total Income</span>   <span style={{ color: "#36b37e" }}>{fmt(totalIncome)}</span></div>
          <div className="info-row"><span>Total Expenses</span> <span style={{ color: "#f05252" }}>{fmt(totalExpense)}</span></div>
          <div className="info-row"><span>Net Savings</span>    <span>{fmt(netSavings)}</span></div>
          <div className="info-row"><span>Transactions</span>   <span>{transactions.length}</span></div>
        </div>

        {/* Card 2: Month comparison */}
        <div className="insight-card">
          <h4>📅 Monthly Comparison</h4>
          <div className="info-row">
            <span>{monthNames[now.getMonth()]} Expenses</span>
            <span style={{ color: "#f05252" }}>{fmt(thisExp)}</span>
          </div>
          <div className="info-row">
            <span>{monthNames[now.getMonth() === 0 ? 11 : now.getMonth() - 1]} Expenses</span>
            <span style={{ color: "#f05252" }}>{fmt(lastExp)}</span>
          </div>
          <div className="info-row">
            <span>Change</span>
            <span style={{ color: changePercent > 0 ? "#f05252" : "#36b37e" }}>
              {changePercent !== null ? changePercent + "%" : "N/A"}
            </span>
          </div>
        </div>

        {/* Card 3: Observations */}
        <div className="insight-card">
          <h4>💡 Observations</h4>
          {topCat && (
            <div className="obs-block">
              <span>🏷️</span>
              <span>Top spend: <strong>{topCat}</strong> ({fmt(topAmt)})</span>
            </div>
          )}
          <div className="obs-block">
            <span>{thisExp > lastExp ? "⚠️" : "✅"}</span>
            <span>{thisExp > lastExp ? "Spending went up this month" : "Spending is down this month"}</span>
          </div>
          <div className="obs-block">
            <span>₹</span>
            <span>You saved <strong>{fmt(netSavings)}</strong> overall</span>
          </div>
        </div>

        {/* Card 4: Savings rate */}
        <div className="insight-card">
          <h4>📈 Savings Rate</h4>
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <div style={{ fontSize: "2.4rem", fontWeight: "bold", color: rateColor }}>{savingsRate}%</div>
            <p style={{ color: "#8a94a6", fontSize: "12px", marginTop: "5px" }}>{rateMsg}</p>
          </div>
          <div className="progress-bg">
            <div className="progress-fill" style={{ width: Math.min(savingsRate, 100) + "%", background: rateColor }} />
          </div>
        </div>

      </div>
    </div>
  );
}

export default Insights;