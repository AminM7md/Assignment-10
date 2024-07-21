var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var username = localStorage.getItem('sessionUsername');
if (username && document.getElementById('username')) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

var signUpArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

function isEmpty(inputs) {
    return inputs.every(input => input.value.trim() !== "");
}

function isEmailExist(email) {
    return signUpArray.some(user => user.email.toLowerCase() === email.toLowerCase());
}

function signUp() {
    if (!isEmpty([signupName, signupEmail, signupPassword])) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    if (!validateEmail(signupEmail.value)) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Invalid email format</span>';
        return;
    }

    if (isEmailExist(signupEmail.value)) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
    } else {
        signUpArray.push({
            name: signupName.value,
            email: signupEmail.value,
            password: signupPassword.value
        });
        localStorage.setItem('users', JSON.stringify(signUpArray));
        document.getElementById('exist').innerHTML = '<span class="text-success m-3">Success</span>';
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }
}

function login() {
    if (!isEmpty([signinEmail, signinPassword])) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }

    var user = signUpArray.find(user => user.email.toLowerCase() === signinEmail.value.toLowerCase() && user.password === signinPassword.value);

    if (user) {
        localStorage.setItem('sessionUsername', user.name);
        window.location.href = 'home.html';
    } else {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

function logout() {
    localStorage.removeItem('sessionUsername');
    window.location.href = 'index.html';
}

function validateEmail(email) {
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Restrict access to home page if not logged in
if (window.location.pathname.endsWith('home.html') && !localStorage.getItem('sessionUsername')) {
    window.location.href = 'index.html';
}
