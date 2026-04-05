const defaultData = [
  { id: 1,  date: "2026-01-05", desc: "Salary",        cat: "Salary",    type: "income",  amt: 4800 },
  { id: 2,  date: "2026-01-10", desc: "Rent",           cat: "Bills",     type: "expense", amt: 1200 },
  { id: 3,  date: "2026-01-15", desc: "Groceries",      cat: "Food",      type: "expense", amt: 180  },
  { id: 4,  date: "2026-02-05", desc: "Salary",         cat: "Salary",    type: "income",  amt: 4800 },
  { id: 5,  date: "2026-02-14", desc: "Netflix",        cat: "Other",     type: "expense", amt: 15   },
  { id: 6,  date: "2026-02-20", desc: "Freelance Work", cat: "Freelance", type: "income",  amt: 950  },
  { id: 7,  date: "2026-03-05", desc: "Salary",         cat: "Salary",    type: "income",  amt: 4800 },
  { id: 8,  date: "2026-03-12", desc: "Shopping",       cat: "Shopping",  type: "expense", amt: 340  },
  { id: 9,  date: "2026-03-18", desc: "Doctor Visit",   cat: "Health",    type: "expense", amt: 60   },
  { id: 10, date: "2026-04-01", desc: "Salary",         cat: "Salary",    type: "income",  amt: 4800 },
  { id: 11, date: "2026-04-02", desc: "Coffee",         cat: "Food",      type: "expense", amt: 28   },
  { id: 12, date: "2026-04-03", desc: "Phone Bill",     cat: "Bills",     type: "expense", amt: 55   },
];

// Colors for the donut chart (one per category)
const catColors = {
  Food:      "#f97316",
  Transport: "#3b82f6",
  Shopping:  "#a855f7",
  Health:    "#f05252",
  Bills:     "#4e9eff",
  Salary:    "#36b37e",
  Freelance: "#06b6d4",
  Other:     "#8a94a6",
};

// Short month names for bar chart
const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

function fmt(n) {
  return "₹" + Number(n).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
  });
}

export { defaultData, catColors, monthNames, fmt };