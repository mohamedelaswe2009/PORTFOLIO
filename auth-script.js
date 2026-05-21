// Toggle Password Visibility for Login
function togglePassword() {
    const passwordField = document.getElementById('password');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordField.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Toggle Password Visibility for Signup
function toggleSignupPassword() {
    const passwordField = document.getElementById('signupPassword');
    const toggleBtn = document.querySelector('.toggle-password');
    
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
        toggleBtn.innerHTML = '<i class="fas fa-eye-slash"></i>';
    } else {
        passwordField.type = 'password';
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i>';
    }
}

// Validate Email
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Validate Password
function validatePassword(password) {
    return password.length >= 8;
}

// Login Form Handler
const loginForm = document.getElementById('loginForm');
if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        
        // Validation
        if (!validateEmail(email)) {
            alert('❌ البريد الإلكتروني غير صحيح');
            return;
        }
        
        if (!password) {
            alert('❌ يرجى إدخال كلمة المرور');
            return;
        }
        
        // Simulated login
        console.log('تسجيل الدخول:', {
            email: email,
            password: '••••••••'
        });
        
        // Show success message
        alert('✅ تم تسجيل الدخول بنجاح!');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

// Signup Form Handler
const signupForm = document.getElementById('signupForm');
if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('signupEmail').value;
        const phone = document.getElementById('phone').value;
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const role = document.querySelector('input[name="role"]:checked').value;
        
        // Validation
        if (!firstName || !lastName) {
            alert('❌ يرجى إدخال الاسم الأول والأخير');
            return;
        }
        
        if (!validateEmail(email)) {
            alert('❌ البريد الإلكتروني غير صحيح');
            return;
        }
        
        if (!phone) {
            alert('❌ يرجى إدخال رقم الهاتف');
            return;
        }
        
        if (!validatePassword(password)) {
            alert('❌ كلمة المرور يجب أن تكون 8 أحرف على الأقل');
            return;
        }
        
        if (password !== confirmPassword) {
            alert('❌ كلمات المرور غير متطابقة');
            return;
        }
        
        // Simulated signup
        console.log('تسجيل جديد:', {
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            role: role,
            password: '••••••••'
        });
        
        // Show success message
        alert('✅ تم إنشاء الحساب بنجاح!');
        
        // Redirect to dashboard
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1500);
    });
}

// Social Login Handlers
const googleBtn = document.querySelector('.social-btn.google');
const facebookBtn = document.querySelector('.social-btn.facebook');

if (googleBtn) {
    googleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🔐 جاري التوصل بـ Google...');
        // In real app, this would trigger OAuth flow
    });
}

if (facebookBtn) {
    facebookBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🔐 جاري التوصل بـ Facebook...');
        // In real app, this would trigger OAuth flow
    });
}

// Forgot Password Handler
const forgotPasswordLink = document.querySelector('.forgot-password');
if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', (e) => {
        e.preventDefault();
        const email = prompt('📧 أدخل بريدك الإلكتروني:');
        if (email && validateEmail(email)) {
            alert('✅ تم إرسال رابط إعادة تعيين كلمة المرور إلى بريدك');
        } else if (email) {
            alert('❌ البريد الإلكتروني غير صحيح');
        }
    });
}

// Real-time password validation
const signupPasswordField = document.getElementById('signupPassword');
if (signupPasswordField) {
    signupPasswordField.addEventListener('input', () => {
        const password = signupPasswordField.value;
        const hint = signupPasswordField.parentElement.parentElement.querySelector('.password-hint');
        
        if (password.length < 8) {
            hint.style.color = '#ef4444';
            hint.textContent = `⚠️ كلمة المرور ضعيفة (${password.length}/8)`;
        } else if (password.length < 12) {
            hint.style.color = '#f59e0b';
            hint.textContent = '⚠️ كلمة المرور متوسطة';
        } else {
            hint.style.color = '#10b981';
            hint.textContent = '✅ كلمة المرور قوية';
        }
    });
}

// Email validation on blur
const emailFields = document.querySelectorAll('input[type="email"]');
emailFields.forEach(field => {
    field.addEventListener('blur', () => {
        if (field.value && !validateEmail(field.value)) {
            field.style.borderColor = '#ef4444';
        } else if (field.value) {
            field.style.borderColor = '#10b981';
        }
    });
});

console.log('✅ Auth Script Loaded');
