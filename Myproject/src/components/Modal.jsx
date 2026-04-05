import React, { useState, useEffect } from "react";

// Modal component — popup form for adding or editing a transaction
function Modal({ editItem, onSave, onClose }) {

  // Form fields stored in state
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [desc, setDesc] = useState("");
  const [amt,  setAmt]  = useState("");
  const [cat,  setCat]  = useState("Food");
  const [type, setType] = useState("expense");

  // useEffect runs when the modal first opens
  // If we are editing, fill in the form with existing values
  useEffect(() => {
    if (editItem) {
      setDate(editItem.date);
      setDesc(editItem.desc);
      setAmt(editItem.amt);
      setCat(editItem.cat);
      setType(editItem.type);
    }
  }, [editItem]);

  // When Save button is clicked
  function handleSave() {
    // Basic check: all fields must have a value
    if (!date || !desc || !amt) {
      alert("Please fill in all fields.");
      return;
    }
    // Send data back to parent component (Transactions.jsx)
    onSave({ date, desc, amt: parseFloat(amt), cat, type });
  }

  return (
    <div className="modal-bg">
      <div className="modal-box">

        <h4>{editItem ? "Edit Transaction" : "Add Transaction"}</h4>

        <label>Date</label>
        <input className="field" type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label>Description</label>
        <input className="field" type="text" value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="e.g. Salary, Rent" />

        <label>Amount</label>
        <input className="field" type="number" value={amt} onChange={(e) => setAmt(e.target.value)} placeholder="e.g. 500" />

        <label>Category</label>
        <select className="field" value={cat} onChange={(e) => setCat(e.target.value)}>
          <option>Food</option>
          <option>Transport</option>
          <option>Shopping</option>
          <option>Health</option>
          <option>Bills</option>
          <option>Salary</option>
          <option>Freelance</option>
          <option>Other</option>
        </select>

        <label>Type</label>
        <select className="field" value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <div className="modal-footer">
          <button onClick={onClose}>Cancel</button>
          <button className="dark-btn" onClick={handleSave}>Save</button>
        </div>

      </div>
    </div>
  );
}

export default Modal;