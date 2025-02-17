function showLogin() {
    document.getElementById('start-menu').classList.add('hidden');
    document.getElementById('login-menu').classList.remove('hidden');
}

function showSignup() {
    document.getElementById('start-menu').classList.add('hidden');
    document.getElementById('signup-menu').classList.remove('hidden');
}

function showStart() {
    document.querySelectorAll('.menu').forEach(menu => menu.classList.add('hidden'));
    document.getElementById('start-menu').classList.remove('hidden');
}

function showHome(username, money) {
    document.querySelectorAll('.menu').forEach(menu => menu.classList.add('hidden'));
    document.getElementById('home-menu').classList.remove('hidden');
    document.getElementById('username').innerText = username;
    document.getElementById('money').innerText = money;
}

function startGame() {
    document.querySelectorAll('.menu').forEach(menu => menu.classList.add('hidden'));
    document.getElementById('game-menu').classList.remove('hidden');
    fetchQuestion();
}

function login() {
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.user) showHome(data.user.username, data.user.money);
        else alert('Login failed');
    });
}

function signup() {
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    
    fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
    })
    .then(res => res.json())
    .then(data => {
        if (data.message) alert('Signup successful');
        else alert('Signup failed');
    });
}

function fetchQuestion() {
    fetch('http://localhost:3000/question')
    .then(res => res.json())
    .then(data => {
        document.getElementById('question-text').innerText = data.question;
        const optionsContainer = document.getElementById('options');
        optionsContainer.innerHTML = '';
        data.options.forEach(opt => {
            const button = document.createElement('button');
            button.innerText = opt;
            button.onclick = () => updateMoney(data.correct === opt ? 100 : -50);
            optionsContainer.appendChild(button);
        });
    });
}

function updateMoney(amount) {
    fetch('http://localhost:3000/update-money', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: 1, amount })
    })
    .then(res => res.json())
    .then(data => {
        document.getElementById('money').innerText = data.money;
    });
}

function logout() {
    showStart();
}
