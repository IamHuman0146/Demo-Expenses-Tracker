let totalExpenses = 0;
let savings = 0;
let financialGoal = 0;

document.getElementById('add-expense').addEventListener('click', function() {
    const expenseType = document.getElementById('expense-type').value;
    const amount = parseFloat(document.getElementById('amount').value);

    if (isNaN(amount) || amount <= 0) {
        alert("Please enter a valid amount.");
        return;
    }

    // Tambahkan log untuk memastikan klik berfungsi
    console.log(`Adding expense: ${expenseType}, Amount: $${amount}`);

    totalExpenses += amount;
    document.getElementById('total-expenses').textContent = `Total Expenses: $${totalExpenses.toFixed(2)}`;

    // Simulasikan perhitungan tabungan menggunakan dummy AI response
    savings = parseFloat((totalExpenses * 0.1).toFixed(2)); // Mengasumsikan tabungan 10%
    document.getElementById('savings').textContent = `Total Savings: $${savings}`;
    
    // Cek apakah goal tercapai
    if (financialGoal > 0 && savings >= financialGoal) {
        document.getElementById('achievement-status').textContent = "Congratulations! You've reached your financial goal!";
    } else {
        document.getElementById('achievement-status').textContent = ""; // Kosongkan jika belum tercapai
    }
});

document.getElementById('set-goal').addEventListener('click', function() {
    const goalAmount = parseFloat(document.getElementById('goal-amount').value);

    if (isNaN(goalAmount) || goalAmount <= 0) {
        alert("Please enter a valid goal amount.");
        return;
    }

    financialGoal = goalAmount;
    document.getElementById('goal-status').textContent = `Goal set: Save $${financialGoal.toFixed(2)}`;

    // Cek apakah goal sudah tercapai saat ini
    if (savings >= financialGoal) {
        document.getElementById('achievement-status').textContent = "Congratulations! You've reached your financial goal!";
    } else {
        document.getElementById('achievement-status').textContent = ""; // Kosongkan jika belum tercapai
    }
});
