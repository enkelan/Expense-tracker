import React, { useEffect, useState } from 'react';

const LatestExpenses = () => {
  const [expenses, setExpenses] = useState([]);

  useEffect(() => {
    // Fetch the latest expenses from your API or database
    const fetchExpenses = async () => {
      const response = await fetch('/api/expenses'); // Adjust the API endpoint as needed
      const data = await response.json();
      setExpenses(data);
    };

    fetchExpenses();
  }, []);

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Latest Expenses</h1>
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id} className="mb-2">
            <div className="flex justify-between items-center p-3 border rounded-md shadow-sm">
              <span>{expense.name}</span>
              <span>${expense.amount}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestExpenses;
