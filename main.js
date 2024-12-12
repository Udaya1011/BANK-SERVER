document.addEventListener('DOMContentLoaded', () => {
    const accountForm = document.getElementById('accountForm');
    const transactionForm = document.getElementById('transactionForm');

    const getUserData = () => JSON.parse(localStorage.getItem('user')) || null;

    const setUserData = (user) => localStorage.setItem('user', JSON.stringify(user));

    if (accountForm) {
        accountForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('name').value;
            const password = document.getElementById('password').value;

            if (name && password) {
                const user = { name, password, balance: 0, transactions: [] };
                setUserData(user);
                alert('Account created successfully!');
                window.location.href = 'transaction.html';
            } else {
                alert('Please enter both a name and a password.');
            }
        });
    }

    if (transactionForm) {
        transactionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const user = getUserData();
            const enteredName = document.getElementById('userName').value;
            const enteredPassword = document.getElementById('userPassword').value;
            const amount = parseFloat(document.getElementById('amount').value);
            const type = document.getElementById('type').value;

            if (user && enteredName === user.name && enteredPassword === user.password) {
                if (amount > 0) {
                    if (type === 'deposit') {
                        user.balance += amount;
                    } else if (type === 'withdraw' && user.balance >= amount) {
                        user.balance -= amount;
                    } else if (type === 'withdraw') {
                        alert('Insufficient funds!');
                        return;
                    }

                    user.transactions.push({
                        name: user.name,
                        type: type.charAt(0).toUpperCase() + type.slice(1),
                        amount,
                        balance: user.balance,
                    });

                    setUserData(user);
                    alert('Transaction successful!');
                } else {
                    alert('Enter a valid transaction amount.');
                }
            } else {
                alert('Invalid username or password!');
            }
        });
    }
    if (window.location.pathname.includes('details.html')) {
        const transactionDetails = document.getElementById('transactionDetails');
        const user = getUserData();

        if (user && user.transactions.length > 0) {
            user.transactions.forEach((transaction, index) => {
                const li = document.createElement('li');
                li.textContent = `${index + 1}. Name: ${transaction.name}, Type: ${transaction.type}, Amount: ₹${transaction.amount}, Balance: ₹${transaction.balance}`;
                transactionDetails.appendChild(li);
            });
        } else {
            transactionDetails.innerHTML = '<li>No transactions found.</li>';
        }
    }
});
