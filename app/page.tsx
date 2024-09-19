'use client';

import { useState } from 'react';

export default function FinancialAssistant() {
  const [income, setIncome] = useState<number>(0); // State untuk income
  const [isIncomeSet, setIsIncomeSet] = useState(false); // Apakah income sudah di-set
  const [expenseType, setExpenseType] = useState<'food' | 'transportation' | 'shopping'>('food'); // Tipe kategori harus sesuai dengan properti di expenses
  const [amount, setAmount] = useState<string>(""); // Mulai dengan input kosong (string kosong)
  const [totalExpenses, setTotalExpenses] = useState(0); // Total pengeluaran
  const [expenses, setExpenses] = useState({ food: 0, transportation: 0, shopping: 0 }); // Pengeluaran per kategori
  const [savings, setSavings] = useState(0); // Tabungan 10% dari total pengeluaran
  const [financialGoal, setFinancialGoal] = useState<number>(0); // Tujuan finansial
  const [achievementStatus, setAchievementStatus] = useState(''); // Status pencapaian
  const [achieved, setAchieved] = useState(false); // Apakah tujuan finansial tercapai
  const [goalInput, setGoalInput] = useState<string>(""); // State for the goal input

  // Fungsi untuk menginput income di awal
  const inputIncome = () => {
    if (Number(income) <= 0 || isNaN(Number(income))) {
      alert('Please enter a valid income.');
      return;
    }
    setIsIncomeSet(true);
  };

  // Fungsi untuk menambah pengeluaran
  const addExpense = () => {
    // Validasi untuk mencegah nilai kosong, nol, atau negatif
    const parsedAmount = parseFloat(amount);
    if (amount === '' || isNaN(parsedAmount) || parsedAmount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    const newTotalExpenses = totalExpenses + parsedAmount;
    setTotalExpenses(newTotalExpenses);

    // Update pengeluaran sesuai dengan kategori yang valid
    const updatedExpenses = { ...expenses, [expenseType]: expenses[expenseType] + parsedAmount };
    setExpenses(updatedExpenses);

    // Perhitungan tabungan sebagai 10% dari total pengeluaran
    const newSavings = parseFloat((newTotalExpenses * 0.1).toFixed(2));
    setSavings(newSavings);

    // Cek apakah sudah mencapai tujuan finansial
    if (financialGoal > 0 && newSavings >= financialGoal) {
      setAchievementStatus("Congratulations! You've reached your financial goal!");
      setAchieved(true);
    } else {
      setAchievementStatus('');
      setAchieved(false);
    }

    // Kosongkan input amount setelah pengeluaran ditambahkan
    setAmount("");
  };

  // Fungsi untuk menetapkan tujuan finansial
  const setGoal = () => {
    const goalAmount = parseFloat(goalInput);
    if (isNaN(goalAmount) || goalAmount <= 0) {
      alert("Please enter a valid goal amount.");
      return;
    }
    setFinancialGoal(goalAmount);
    if (savings >= goalAmount) {
      setAchievementStatus("Congratulations! You've reached your financial goal!");
      setAchieved(true);
    } else {
      setAchievementStatus('');
      setAchieved(false);
    }
    setGoalInput(""); // Kosongkan input goal setelah goal ditetapkan
  };

  return (
    <div className="container">
      <aside className="sidebar">
        <div className="profile">
          <div className="profile-img">
            {/* Tempat untuk user foto yang akan di-upload */}
          </div>
          <div className="profile-info">
            <p>User Name</p>
          </div>
        </div>
        <nav className="menu">
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">Expenses</a></li>
            <li><a href="#">AI Chatbox for Tips</a></li>
          </ul>
        </nav>
      </aside>

      <div className="content">
        <div className="content-header">
          <h1>Financial Assistant</h1>
          {!isIncomeSet ? (
            <div className="income-form">
              <label>Enter Monthly Income ($)</label>
              <input
                type="number"
                value={income}
                onChange={(e) => setIncome(parseFloat(e.target.value))}
                placeholder="Enter your monthly income"
              />
              <button onClick={inputIncome} className="btn-submit">Set Income</button>
            </div>
          ) : (
            <>
              <div className="expenses-form">
                <h2>Add Expense</h2>
                <label>Expense Type</label>
                <select value={expenseType} onChange={(e) => setExpenseType(e.target.value as 'food' | 'transportation' | 'shopping')}>
                  <option value="food">Food & Beverage</option>
                  <option value="transportation">Transportation</option>
                  <option value="shopping">Shopping</option>
                </select>
                <label>Amount</label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  min="0"
                />
                <button onClick={addExpense} className="btn-submit">Add Expense</button>
              </div>

              <div className="expenses-list">
                <h2>Expenses Overview</h2>
                <div className="expense-item">
                  <div className="expense-icon">
                    {/* Tempat untuk icon Food */}
                  </div>
                  <p>Food & Beverage</p>
                  <p>${expenses.food.toFixed(2)}</p>
                  <div className="progress-bar">
                    <div className="progress" style={{ width: `${(expenses.food / totalExpenses) * 100}%` }}></div>
                  </div>
                </div>
                <div className="expense-item">
                  <div className="expense-icon">
                    {/* Tempat untuk icon Transportation */}
                  </div>
                  <p>Transportation</p>
                  <p>${expenses.transportation.toFixed(2)}</p>
                  <div className="progress-bar red">
                    <div className="progress" style={{ width: `${(expenses.transportation / totalExpenses) * 100}%` }}></div>
                  </div>
                </div>
                <div className="expense-item">
                  <div className="expense-icon">
                    {/* Tempat untuk icon Shopping */}
                  </div>
                  <p>Shopping</p>
                  <p>${expenses.shopping.toFixed(2)}</p>
                  <div className="progress-bar orange">
                    <div className="progress" style={{ width: `${(expenses.shopping / totalExpenses) * 100}%` }}></div>
                  </div>
                </div>
              </div>

              {/* Section untuk menetapkan tujuan finansial */}
              <div className="goal-section">
                <h2>Set Financial Goal</h2>
                <label>Goal Amount ($)</label>
                <input
                  type="number"
                  value={goalInput}
                  onChange={(e) => setGoalInput(e.target.value)}
                  placeholder="Enter goal amount"
                  min="0"
                />
                <button onClick={setGoal} className="btn-submit">Set Goal</button>
                <p>Current Goal: ${financialGoal.toFixed(2)}</p>
              </div>

              {/* Achievements Section */}
              <div className="achievement-section">
                <h2>Achievements</h2>
                <p>
                  {achieved ? achievementStatus : "No achievements yet."}
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
