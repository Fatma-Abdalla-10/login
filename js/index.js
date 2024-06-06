var signupName = document.getElementById('signupName');
var signupEmail = document.getElementById('signupEmail');
var signupPassword = document.getElementById('signupPassword');
var signinEmail = document.getElementById('signinEmail');
var signinPassword = document.getElementById('signinPassword');

var baseURL = window.location.origin;

var username = localStorage.getItem('sessionUsername');
if (username) {
    document.getElementById('username').innerHTML = "Welcome " + username;
}

var signUpArray = localStorage.getItem('users') ? JSON.parse(localStorage.getItem('users')) : [];

function isEmpty(value) {
    return value.trim() === "";
}

function isEmailExist(email) {
    return signUpArray.some(function(user) {
        return user.email.toLowerCase() === email.toLowerCase();
    });
}

function signUp() {
    if (isEmpty(signupName.value) || isEmpty(signupEmail.value) || isEmpty(signupPassword.value)) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }
    if (isEmailExist(signupEmail.value)) {
        document.getElementById('exist').innerHTML = '<span class="text-danger m-3">Email already exists</span>';
        return;
    }
    var newUser = {
        name: signupName.value,
        email: signupEmail.value,
        password: signupPassword.value
    };
    signUpArray.push(newUser);
    localStorage.setItem('users', JSON.stringify(signUpArray));
    document.getElementById('exist').innerHTML = '<span class="text-success m-3">You Are Signed Up</span>';
}

function isLoginEmpty() {
    return isEmpty(signinEmail.value) || isEmpty(signinPassword.value);
}

function login() {
    if (isLoginEmpty()) {
        document.getElementById('incorrect').innerHTML = '<span class="text-danger m-3">All inputs are required</span>';
        return;
    }
    var email = signinEmail.value.toLowerCase();
    var password = signinPassword.value.toLowerCase();
    var user = signUpArray.find(function(user) {
        return user.email.toLowerCase() === email && user.password.toLowerCase() === password;
    });
    if (user) {
        localStorage.setItem('sessionUsername', user.name);
        window.location.href = baseURL + '/home.html';
    } else {
        document.getElementById('incorrect').innerHTML = '<span class="p-2 text-danger">Incorrect email or password</span>';
    }
}

function logout() {
    localStorage.removeItem('sessionUsername');
}
