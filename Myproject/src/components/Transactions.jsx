import React, { useState } from "react";
import Modal from "./Modal";
import { fmt } from "../data";

function Transactions({ transactions = [], setTransactions, role }) {

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);

  // FILTER LOGIC FIXED
  const filtered = transactions.filter((t) => {
    const matchSearch =
      (t.desc || "").toLowerCase().includes(search.toLowerCase()) ||
      (t.cat || "").toLowerCase().includes(search.toLowerCase());

    const matchType =
      filterType === "all" || t.type === filterType;

    return matchSearch && matchType;
  });

  function handleDelete(id) {
    setTransactions(transactions.filter((t) => t.id !== id));
  }

  function handleEdit(item) {
    setEditItem(item);
    setShowModal(true);
  }

  function handleAdd() {
    setEditItem(null);
    setShowModal(true);
  }

  function handleSave(formData) {
    if (editItem) {
      const updated = transactions.map((t) =>
        t.id === editItem.id ? { ...t, ...formData } : t
      );
      setTransactions(updated);
    } else {
      const newTransaction = { id: Date.now(), ...formData };
      setTransactions([...transactions, newTransaction]);
    }
    setShowModal(false);
  }

  function exportCSV() {
    let text = "Date,Description,Category,Type,Amount\n";
    transactions.forEach((t) => {
      text += `${t.date},${t.desc},${t.cat},${t.type},${t.amt}\n`;
    });
    const link = document.createElement("a");
    link.href = "data:text/csv," + encodeURIComponent(text);
    link.download = "transactions.csv";
    link.click();
  }

  return (
    <div>

      {/*  FILTER UI */}
      <div className="filter-row">
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <button onClick={exportCSV}>⬇ Export CSV</button>

        {role === "admin" && (
          <button className="dark-btn" onClick={handleAdd}>
            + Add New
          </button>
        )}
      </div>

      {/* HEADER */}
      <div className="topbar">
        <h3>📋 Transactions</h3>
        <span>{new Date().toDateString()}</span>
      </div>

      {/* TABLE */}
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              <th>Category</th>
              <th>Type</th>
              <th>Amount</th>
              {role === "admin" && <th>Actions</th>}
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center", padding: "20px" }}>
                  No transactions found
                </td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.desc}</td>
                  <td>{t.cat}</td>
                  <td>
                    <span className={t.type === "income" ? "income-tag" : "expense-tag"}>
                      {t.type}
                    </span>
                  </td>
                  <td className={t.type === "income" ? "plus" : "minus"}>
                    {t.type === "income" ? "+" : "-"}{fmt(t.amt)}
                  </td>

                  {role === "admin" && (
                    <td>
                      <button onClick={() => handleEdit(t)}>Edit</button>
                      <button onClick={() => handleDelete(t.id)}>Delete</button>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {showModal && (
        <Modal
          editItem={editItem}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}

    </div>
  );
}

export default Transactions;