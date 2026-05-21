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
    const confirmed = confirm('Do you want to logout?');
    if (confirmed) {
        alert('✅ You have been logged out successfully!');
        window.location.href = 'index.html';
    }
}

// Notification Bell
const notificationBtn = document.querySelector('.notification-btn');
if (notificationBtn) {
    notificationBtn.addEventListener('click', () => {
        alert('You have 2 new notifications:\n\n1. Appointment tomorrow with Dr. Mahmoud Ali\n2. New message from Dr. Fatima Ahmed');
    });
}

// Appointment Actions
const rescheduleButtons = document.querySelectorAll('.appointment-actions .btn-secondary');
const cancelButtons = document.querySelectorAll('.appointment-actions .btn-danger');

rescheduleButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        if (e.target.textContent.includes('Reschedule')) {
            alert('🔄 Rescheduling appointment...');
        }
    });
});

cancelButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        const confirmed = confirm('Do you want to cancel this appointment?');
        if (confirmed) {
            alert('❌ Appointment canceled successfully');
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
        console.log('Filter applied:', filter);
        // Here you would filter the appointments
    });
});

// Doctor Contact Buttons
const doctorContactButtons = document.querySelectorAll('.doctor-card .btn-primary');
doctorContactButtons.forEach((btn, index) => {
    btn.addEventListener('click', () => {
        const doctorName = btn.parentElement.querySelector('h3').textContent;
        alert(`📞 Connecting to ${doctorName}...\n\nYou will be redirected to the chat page.`);
    });
});

// Record Download/View Buttons
const recordButtons = document.querySelectorAll('.record-item .btn-secondary');
recordButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const recordTitle = btn.parentElement.querySelector('h3').textContent;
        if (btn.textContent.includes('Download')) {
            alert(`⬇️ Downloading: ${recordTitle}`);
        } else {
            alert(`📄 Viewing: ${recordTitle}`);
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
                <span class="time">Now</span>
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
        alert('✅ Settings saved successfully!');
    });
}

// Appointment Card Details
const appointmentCards = document.querySelectorAll('.appointment-card:not(.featured)');
appointmentCards.forEach(card => {
    card.addEventListener('click', () => {
        const doctorName = card.querySelector('h3').textContent;
        alert(`📋 Appointment details:\n\n${doctorName}\n\nFor more details, contact the doctor.`);
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
            alert('📋 Appointment details:\n\nDoctor: Dr. Mahmoud Ali\nSpecialty: Cardiology\nDate: May 25, 2026\nTime: 03:00 PM\nLocation: Patient home');
        });
    }

    if (rescheduleBtn) {
        rescheduleBtn.addEventListener('click', () => {
            alert('🔄 Opening reschedule form...');
        });
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            const confirmed = confirm('Do you want to cancel this appointment?');
            if (confirmed) {
                alert('❌ Appointment canceled successfully');
            }
        });
    }
}

// Quick Actions
const quickActionButtons = document.querySelectorAll('.quick-actions .action-btn');
quickActionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const action = btn.textContent.trim();
        console.log('Button clicked:', action);
        
        if (action.includes('Book')) {
            window.location.href = 'booking.html';
        } else if (action.includes('Consult')) {
            alert('📹 Opening video call window...');
        } else if (action.includes('Medicine')) {
            alert('💊 Opening medicine order page...');
        } else if (action.includes('Tests')) {
            alert('📤 Opening test upload form...');
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
