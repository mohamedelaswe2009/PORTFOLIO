// Global Variables
let bookingData = {
    service: null,
    doctor: null,
    date: null,
    time: null,
    notes: null,
    payment: 'online'
};

// Service Selection
const serviceCards = document.querySelectorAll('.service-card');
serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        serviceCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        bookingData.service = card.getAttribute('data-service');
        console.log('Selected service:', bookingData.service);
    });
});

// Doctor Selection
const doctorOptions = document.querySelectorAll('.doctor-option');
doctorOptions.forEach(option => {
    option.addEventListener('click', () => {
        doctorOptions.forEach(opt => opt.classList.remove('selected'));
        option.classList.add('selected');
        bookingData.doctor = option.getAttribute('data-doctor');
        console.log('Selected doctor:', bookingData.doctor);
    });
});

// Date Selection
const dateButtons = document.querySelectorAll('.date-btn');
dateButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        dateButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        bookingData.date = btn.getAttribute('data-date');
        document.getElementById('appointment-date').value = bookingData.date;
        console.log('Selected date:', bookingData.date);
    });
});

const appointmentDateInput = document.getElementById('appointment-date');
if (appointmentDateInput) {
    appointmentDateInput.addEventListener('change', () => {
        bookingData.date = appointmentDateInput.value;
    });
}

// Time Selection
const timeButtons = document.querySelectorAll('.time-btn');
timeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        timeButtons.forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        bookingData.time = btn.getAttribute('data-time');
        console.log('Selected time:', bookingData.time);
    });
});

// Notes Input
const appointmentNotes = document.getElementById('appointment-notes');
if (appointmentNotes) {
    appointmentNotes.addEventListener('input', () => {
        bookingData.notes = appointmentNotes.value;
    });
}

// Payment Method
const paymentOptions = document.querySelectorAll('input[name="payment"]');
paymentOptions.forEach(option => {
    option.addEventListener('change', () => {
        bookingData.payment = option.value;
        console.log('Selected payment:', bookingData.payment);
    });
});

// Step Navigation
function nextStep(currentStep) {
    // Validation
    if (currentStep === 1 && !bookingData.service) {
        alert('❌ يرجى اختيار نوع الخدمة');
        return;
    }
    if (currentStep === 2 && !bookingData.doctor) {
        alert('❌ يرجى اختيار دكتور');
        return;
    }
    if (currentStep === 3 && (!bookingData.date || !bookingData.time)) {
        alert('❌ يرجى اختيار التاريخ والوقت');
        return;
    }

    // Update steps
    updateSteps(currentStep + 1);
    showStep(currentStep + 1);
}

function prevStep(currentStep) {
    updateSteps(currentStep - 1);
    showStep(currentStep - 1);
}

function showStep(stepNumber) {
    const sections = document.querySelectorAll('.step-section');
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(`step-${stepNumber}`).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateSteps(activeStep) {
    const steps = document.querySelectorAll('.step-item');
    steps.forEach((step, index) => {
        if (index + 1 <= activeStep) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Update Confirmation Summary
function updateConfirmationSummary() {
    const services = {
        'home': 'زيارة منزلية - 50 ج.م',
        'clinic': 'عيادة الدكتور - 30 ج.م',
        'online': 'استشارة أونلاين - 20 ج.م',
        'phone': 'استشارة هاتفية - 15 ج.م'
    };

    const doctors = {
        '1': 'د. محمود علي - أخصائي القلب',
        '2': 'د. فاطمة أحمد - أخصائية الجلدية',
        '3': 'د. علي محمد - طبيب عام'
    };

    // Format time
    const timeFormatted = bookingData.time ? 
        new Date('2000-01-01 ' + bookingData.time).toLocaleString('ar-EG', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        }) : '-';

    // Format date
    const dateFormatted = bookingData.date ? 
        new Date(bookingData.date + 'T00:00:00').toLocaleDateString('ar-EG', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }) : '-';

    document.getElementById('summary-service').textContent = services[bookingData.service] || '-';
    document.getElementById('summary-doctor').textContent = doctors[bookingData.doctor] || '-';
    document.getElementById('summary-datetime').textContent = `${dateFormatted} - ${timeFormatted}`;
    
    // Calculate price
    const servicePrices = {
        'home': 50,
        'clinic': 30,
        'online': 20,
        'phone': 15
    };
    const price = servicePrices[bookingData.service] || 0;
    document.getElementById('summary-price').textContent = `${price} ج.م`;
}

// Hook into step 4 to update summary
const originalNextStep = nextStep;
window.nextStep = function(currentStep) {
    if (currentStep === 3) {
        updateConfirmationSummary();
    }
    originalNextStep(currentStep);
};

// Confirm Booking
function confirmBooking() {
    const agreeTerms = document.getElementById('agree-terms');
    
    if (!agreeTerms.checked) {
        alert('❌ يرجى الموافقة على شروط الخدمة');
        return;
    }

    console.log('Final Booking Data:', bookingData);
    alert(`✅ تم تأكيد الحجز بنجاح!\n\nتفاصيل الموعد:\n- الدكتور: د. محمود علي\n- التاريخ: 25 مايو\n- الوقت: ${bookingData.time}\n- السعر: 50 ج.م\n\nسيتم إرسال تأكيد عبر البريد الإلكتروني`);
    
    // Redirect to dashboard
    setTimeout(() => {
        window.location.href = 'dashboard.html';
    }, 2000);
}

// Specialty Filter
const specialtyFilter = document.getElementById('specialty');
if (specialtyFilter) {
    specialtyFilter.addEventListener('change', () => {
        console.log('Filter by specialty:', specialtyFilter.value);
        // Here you would filter doctors
    });
}

// Price Range Filter
const priceRange = document.getElementById('price-range');
if (priceRange) {
    priceRange.addEventListener('input', () => {
        console.log('Max price:', priceRange.value);
        // Here you would filter doctors by price
    });
}

console.log('✅ Booking Script Loaded');
