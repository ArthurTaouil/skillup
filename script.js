/* ===========================
   NAVEGAÇÃO - MOBILE MENU
   =========================== */

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

/* ===========================
   LOGIN (centralizado)
   =========================== */

const loginAuthForm = document.getElementById('loginAuthForm');
if (loginAuthForm) {
    loginAuthForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const emailEl = document.getElementById('email');
        const senhaEl = document.getElementById('senha');

        const emailVal = emailEl ? emailEl.value.trim() : '';
        const senhaVal = senhaEl ? senhaEl.value : '';

        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(u => u.email === emailVal && u.senha === senhaVal);

        if (!user) {
            alert('Credenciais inválidas!');
            return;
        }

        // set logged user and skillUpUser for dashboard
        localStorage.setItem('loggedUser', user.email);
        const skillUpUser = {
            username: user.name,
            email: user.email,
            password: user.senha,
            phone: user.phone || '',
            role: user.role || '',
            workplace: user.workplace || '',
            registeredAt: user.registeredAt || ''
        };
        localStorage.setItem('skillUpUser', JSON.stringify(skillUpUser));

        window.location.href = 'dashboard.html';
    });
}

// Close menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

/* ===========================
   LOGO - SCROLL TO TOP
   =========================== */

const logo = document.querySelector('.logo');
if (logo) {
    logo.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ===========================
   CONSOLE MESSAGE
   =========================== */

console.log('%c✨ SkillUp - Site Carregado', 'color: #7C3AED; font-size: 16px; font-weight: bold;');
console.log('%cDesenvolvido com HTML, CSS e JavaScript separados', 'color: #B3E51C; font-size: 12px;');

/* ===========================
   CONTACT FORM SUBMISSION
   =========================== */

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        alert('Obrigado por entrar em contato conosco!\nSua mensagem foi recebida com sucesso e nossa equipe irá analisá-la o mais breve possível.');
        
        // Redirect to index.html
        window.location.href = 'index.html';
    });
}

/* ===========================
   REGISTRATION (CADASTRE-SE) FORM
   =========================== */

const registerForm = document.getElementById('loginForm');
const roleSelect = document.getElementById('role');
const roleOtherGroup = document.getElementById('role-other-group');
const roleOtherInput = document.getElementById('role-other');

if (roleSelect) {
    roleSelect.addEventListener('change', () => {
        if (roleSelect.value === 'Outros') {
            roleOtherGroup.style.display = 'block';
            if (roleOtherInput) roleOtherInput.required = true;
        } else {
            roleOtherGroup.style.display = 'none';
            if (roleOtherInput) {
                roleOtherInput.required = false;
                roleOtherInput.value = '';
            }
        }
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Basic validation
        const username = document.getElementById('username');
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const phone = document.getElementById('phone');
        const role = document.getElementById('role');
        const workplace = document.getElementById('workplace');

        // Email regex (simple)
        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Phone digits check (allow numbers, spaces, parentheses, hyphen)
        const phoneDigits = (phone && phone.value) ? phone.value.replace(/\D/g, '') : '';

        if (!username.value.trim()) {
            alert('Por favor preencha o Nome do usuário.');
            username.focus();
            return;
        }

        if (!email.value.trim() || !emailRe.test(email.value.trim())) {
            alert('Por favor informe um E-mail válido.');
            email.focus();
            return;
        }

        if (!password.value) {
            alert('Por favor informe a Senha.');
            password.focus();
            return;
        }

        if (password.value.length < 8) {
            alert('A Senha deve ter no mínimo 8 caracteres.');
            password.focus();
            return;
        }

        if (!phoneDigits || phoneDigits.length < 10) {
            alert('Por favor informe um Telefone válido (somente números, mínimo 10 dígitos).');
            phone.focus();
            return;
        }

        if (!role.value) {
            alert('Por favor selecione um Cargo.');
            role.focus();
            return;
        }

        if (role.value === 'Outros' && roleOtherInput && !roleOtherInput.value.trim()) {
            alert('Por favor descreva o cargo em "Outros".');
            roleOtherInput.focus();
            return;
        }

        if (!workplace.value.trim()) {
            alert('Por favor informe o Local de trabalho.');
            workplace.focus();
            return;
        }

        // If passed all checks - save to localStorage and redirect to dashboard
        let users = JSON.parse(localStorage.getItem('users')) || [];
        // verifica se já existe email igual
        if (users.some(u => u.email === email.value.trim())) {
            alert('Email já cadastrado!');
            return;
        }

        // adiciona usuário novo
        const newUser = {
            name: username.value.trim(),
            email: email.value.trim(),
            senha: password.value,
            phone: phone.value.trim(),
            role: role.value === 'Outros' ? roleOtherInput.value.trim() : role.value,
            workplace: workplace.value.trim(),
            registeredAt: new Date().toLocaleString('pt-BR')
        };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));

        // salva o usuário logado
        localStorage.setItem('loggedUser', newUser.email);

        // compatibilidade dashboard
        localStorage.setItem('skillUpUser', JSON.stringify({
            username: newUser.name,
            email: newUser.email,
            password: newUser.senha,
            phone: newUser.phone,
            role: newUser.role,
            workplace: newUser.workplace,
            registeredAt: newUser.registeredAt
        }));

        alert('Cadastro realizado com sucesso!\nObrigado por se cadastrar — você será redirecionado ao seu dashboard.');
        window.location.href = 'dashboard.html';
    });
}

/* ===========================
   CONNECT BUTTON - ROUTE TO DASHBOARD OR LOGIN
   =========================== */

const connectBtn = document.getElementById('connectBtn');
if (connectBtn) {
    connectBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        const userData = localStorage.getItem('skillUpUser');
        
        if (userData) {
            // User is logged in, redirect to dashboard
            window.location.href = 'dashboard.html';
        } else {
            // User not logged in, redirect to login auth page
            window.location.href = 'login-auth.html';
        }
    });
}
