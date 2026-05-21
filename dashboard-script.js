// Tab Navigation
const navItems = document.querySelectorAll('.nav-item');
const tabContents = document.querySelectorAll('.tab-content');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Remove active class from all items
        navItems.forEach(nav => nav.classList.remove('active'));
        tabContents.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to clicked item
        item.classList.add('active');
        const tabId = item.getAttribute('data-tab') + '-tab';
        document.getElementById(tabId).classList.add('active');
        
        // Close sidebar on mobile
        closeSidebarMobile();
    });
});

// Toggle Sidebar
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function toggleSidebarMobile() {
    const sidebar = document.querySelector('.sidebar');
    sidebar.classList.toggle('active');
}

function closeSidebarMobile() {
    if (window.innerWidth <= 768) {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.remove('active');
    }
}

// Logout Function
function logout() {
    const confirmed = confirm('هل تريد تسجيل الخروج؟');
    if (confirmed) {
        alert('✅ تم تسجيل الخروج بنجاح!');
        window.location.href = 'index.html';
    }
}

// Notification Bell
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('لديك 2 إشعارات جديدة:\n\n1. موعد غداً مع د. محمود علي\n2. رسالة جديدة من د. فاطمة أحمد');
    });
}

// Appointment Actions
const rescheduleButtons = document.querySelectorAll('.appointment-actions .btn-secondary');
const cancelButtons = document.querySelectorAll('.appointment-actions .btn-danger');

rescheduleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.textContent.includes('إعادة')) {
            alert('🔄 جاري إعادة جدولة الموعد...');
        }
    });
});

cancelButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const confirmed = confirm('هل تريد إلغاء هذا الموعد؟');
        if (confirmed) {
            alert('❌ تم إلغاء الموعد بنجاح');
        }
    });
});

// Filter Buttons
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.textContent.trim();
        console.log('تم تطبيق الفلتر:', filter);
        // Here you would filter the appointments
    });
});

// Doctor Contact Buttons
const doctorContactButtons = document.querySelectorAll('.doctor-card .btn-primary');
doctorContactButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const doctorName = btn.parentElement.querySelector('h3').textContent;
        alert(`📞 جاري الاتصال بـ ${doctorName}...\n\nسيتم تحويلك إلى صفحة المحادثة`);
    });
});

// Record Download/View Buttons
const recordButtons = document.querySelectorAll('.record-item .btn-secondary');
recordButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const recordTitle = btn.parentElement.querySelector('h3').textContent;
        if (btn.textContent.includes('تحميل')) {
            alert(`⬇️ جاري تحميل: ${recordTitle}`);
        } else {
            alert(`📄 جاري عرض: ${recordTitle}`);
        }
    });
});

// Message Input
const messageInput = document.querySelector('.message-input input');
const messageSendBtn = document.querySelector('.message-input button');

if (messageSendBtn) {
    messageSendBtn.addEventListener('click', () => {
        if (messageInput.value.trim()) {
            const chatContainer = document.querySelector('.chat-container');
            const newMessage = document.createElement('div');
            newMessage.className = 'chat-message from-patient';
            newMessage.innerHTML = `
                <p>${messageInput.value}</p>
                <span class="time">الآن</span>
            `;
            chatContainer.appendChild(newMessage);
            chatContainer.scrollTop = chatContainer.scrollHeight;
            messageInput.value = '';
        }
    });

    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            messageSendBtn.click();
        }
    });
}

// Settings Form
const settingsForm = document.querySelector('.settings-container .btn-primary');
if (settingsForm) {
    settingsForm.addEventListener('click', () => {
        alert('✅ تم حفظ التغييرات بنجاح!');
    });
}

// Appointment Card Details
const appointmentCards = document.querySelectorAll('.appointment-card:not(.featured)');
appointmentCards.forEach(card => {
    card.addEventListener('click', () => {
        const doctorName = card.querySelector('h3').textContent;
        alert(`📋 تفاصيل الموعد:\n\n${doctorName}\n\nللمزيد من التفاصيل، اتصل بالدكتور`);
    });
});

// Make Featured Appointment Interactive
const featuredAppointment = document.querySelector('.appointment-card.featured');
if (featuredAppointment) {
    const detailsBtn = featuredAppointment.querySelectorAll('button')[0];
    const rescheduleBtn = featuredAppointment.querySelectorAll('button')[1];
    const cancelBtn = featuredAppointment.querySelectorAll('button')[2];

    if (detailsBtn) {
        detailsBtn.addEventListener('click', () => {
            alert('📋 تفاصيل الموعد:\n\nالدكتور: د. محمود علي\nالتخصص: أمراض القلب\nالتاريخ: 25 مايو 2026\nالوقت: 03:00 PM\nالموقع: منزل المريض');
        });
    }

    if (rescheduleBtn) {
        rescheduleBtn.addEventListener('click', () => {
            alert('🔄 جاري فتح نموذج إعادة الجدولة...');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            const confirmed = confirm('هل تريد إلغاء هذا الموعد؟');
            if (confirmed) {
                alert('❌ تم إلغاء الموعد بنجاح');
            }
        });
    }
}

// Quick Actions
const quickActionButtons = document.querySelectorAll('.quick-actions .action-btn');
quickActionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        console.log('تم الضغط على:', action);
        
        if (action.includes('حجز')) {
            window.location.href = 'booking.html';
        } else if (action.includes('استشارة')) {
            alert('📹 جاري فتح نافذة الفيديو...');
        } else if (action.includes('أدوية')) {
            alert('💊 جاري فتح صفحة طلب الأدوية...');
        } else if (action.includes('فحوصات')) {
            alert('📤 جاري فتح نموذج تحميل الفحوصات...');
        }
    });
});

// Scroll Animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeIn 0.3s ease forwards';
        }
    });
}, observerOptions);

document.querySelectorAll('.stat-card, .appointment-card, .doctor-card').forEach(el => {
    observer.observe(el);
});

// Window Resize Handler
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        document.querySelector('.sidebar').classList.remove('active');
    }
});

console.log('✅ Dashboard Script Loaded');
