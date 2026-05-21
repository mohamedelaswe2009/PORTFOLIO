// Sample Doctors Data
const doctorsData = [
    {
        id: 1,
        name: 'د. محمود علي',
        specialty: 'أمراض القلب',
        rating: 4.8,
        experience: 15,
        price: 50,
        image: 'https://via.placeholder.com/280x250?text=محمود+علي'
    },
    {
        id: 2,
        name: 'د. فاطمة أحمد',
        specialty: 'الجلدية',
        rating: 4.6,
        experience: 12,
        price: 40,
        image: 'https://via.placeholder.com/280x250?text=فاطمة+أحمد'
    },
    {
        id: 3,
        name: 'د. علي محمد',
        specialty: 'الطب العام',
        rating: 4.9,
        experience: 20,
        price: 45,
        image: 'https://via.placeholder.com/280x250?text=علي+محمد'
    },
    {
        id: 4,
        name: 'د. سارة حسين',
        specialty: 'طب الأطفال',
        rating: 4.7,
        experience: 10,
        price: 35,
        image: 'https://via.placeholder.com/280x250?text=سارة+حسين'
    },
    {
        id: 5,
        name: 'د. أحمد إبراهيم',
        specialty: 'العظام',
        rating: 4.5,
        experience: 18,
        price: 55,
        image: 'https://via.placeholder.com/280x250?text=أحمد+إبراهيم'
    },
    {
        id: 6,
        name: 'د. نور الدين',
        specialty: 'أمراض القلب',
        rating: 4.8,
        experience: 16,
        price: 50,
        image: 'https://via.placeholder.com/280x250?text=نور+الدين'
    },
    {
        id: 7,
        name: 'د. ليلى محمود',
        specialty: 'الجلدية',
        rating: 4.6,
        experience: 14,
        price: 40,
        image: 'https://via.placeholder.com/280x250?text=ليلى+محمود'
    },
    {
        id: 8,
        name: 'د. خالد السيد',
        specialty: 'الطب العام',
        rating: 4.4,
        experience: 11,
        price: 35,
        image: 'https://via.placeholder.com/280x250?text=خالد+السيد'
    }
];

// Initialize
let filteredDoctors = [...doctorsData];

// Render Doctor Cards
function renderDoctors(doctors) {
    const grid = document.getElementById('doctors-grid');
    grid.innerHTML = '';

    if (doctors.length === 0) {
        grid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #9ca3af; padding: 2rem;">لا توجد دكاترة بهذه المعايير</p>';
        return;
    }

    doctors.forEach(doctor => {
        const rating = generateStars(doctor.rating);
        const card = document.createElement('div');
        card.className = 'doctor-card';
        card.innerHTML = `
            <div class="doctor-card-image">
                <img src="${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-card-content">
                <h3 class="doctor-name">${doctor.name}</h3>
                <p class="doctor-specialty">${doctor.specialty}</p>
                <div class="rating">
                    ${rating}
                    <span>(${doctor.rating})</span>
                </div>
                <div class="doctor-info">
                    <span><i class="fas fa-briefcase"></i> خبرة: ${doctor.experience} سنة</span>
                    <span><i class="fas fa-map-marker-alt"></i> متاح للحجز</span>
                </div>
                <div class="price">${doctor.price} ج.م</div>
                <div class="doctor-actions">
                    <button class="btn-book" onclick="bookAppointment(${doctor.id})">
                        <i class="fas fa-calendar"></i> احجز
                    </button>
                    <button class="btn-view" onclick="viewProfile(${doctor.id})">
                        <i class="fas fa-eye"></i> عرض الملف
                    </button>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Generate Star Rating
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalf = rating % 1 !== 0;
    let stars = '';

    for (let i = 0; i < fullStars; i++) {
        stars += '<i class="fas fa-star"></i>';
    }

    if (hasHalf) {
        stars += '<i class="fas fa-star-half-alt"></i>';
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
        stars += '<i class="fas fa-star" style="opacity: 0.3;"></i>';
    }

    return stars;
}

// Apply Filters
function applyFilters() {
    const search = document.getElementById('search-input').value.toLowerCase();
    const specialties = Array.from(document.querySelectorAll('.checkbox-list input:checked')).map(el => el.value);
    const rating = parseFloat(document.querySelector('input[name="rating"]:checked').value) || 0;
    const experience = parseInt(document.getElementById('experience-range').value);
    const maxPrice = parseInt(document.getElementById('price-range').value);

    filteredDoctors = doctorsData.filter(doctor => {
        const matchSearch = doctor.name.includes(search) || doctor.specialty.includes(search);
        const matchSpecialty = specialties.length === 0 || specialties.some(s => doctor.specialty.includes(s));
        const matchRating = doctor.rating >= rating;
        const matchExperience = doctor.experience <= experience;
        const matchPrice = doctor.price <= maxPrice;

        return matchSearch && matchSpecialty && matchRating && matchExperience && matchPrice;
    });

    renderDoctors(filteredDoctors);
    console.log('تم تطبيق الفلاتر، عدد النتائج:', filteredDoctors.length);
}

// Clear Filters
function clearFilters() {
    document.getElementById('search-input').value = '';
    document.querySelectorAll('.checkbox-list input').forEach(el => el.checked = false);
    document.querySelector('input[name="rating"]:checked').checked = false;
    document.querySelector('input[name="rating"][value="0"]').checked = true;
    document.getElementById('experience-range').value = 50;
    document.getElementById('experience-value').textContent = 'جميع المستويات';
    document.getElementById('price-range').value = 200;
    document.getElementById('price-value').textContent = '0 - 200 ج.م';

    filteredDoctors = [...doctorsData];
    renderDoctors(filteredDoctors);
    console.log('تم مسح الفلاتر');
}

// Book Appointment
function bookAppointment(doctorId) {
    const doctor = doctorsData.find(d => d.id === doctorId);
    alert(`✅ جاري نقلك لصفحة الحجز\n\nالدكتور: ${doctor.name}`);
    window.location.href = 'booking.html';
}

// View Profile
function viewProfile(doctorId) {
    const doctor = doctorsData.find(d => d.id === doctorId);
    alert(`📋 ملف الدكتور: ${doctor.name}\n\nالتخصص: ${doctor.specialty}\nالخبرة: ${doctor.experience} سنة\nالتقييم: ${doctor.rating}/5`);
}

// Search Input Live Filter
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
    applyFilters();
});

// Range Sliders Update
const experienceRange = document.getElementById('experience-range');
experienceRange.addEventListener('input', () => {
    const value = experienceRange.value;
    document.getElementById('experience-value').textContent = value == 50 ? 'جميع المستويات' : `حتى ${value} سنة`;
});

const priceRange = document.getElementById('price-range');
priceRange.addEventListener('input', () => {
    const value = priceRange.value;
    document.getElementById('price-value').textContent = value == 200 ? '0 - 200 ج.م' : `0 - ${value} ج.م`;
});

// Rating Filter
const ratingInputs = document.querySelectorAll('input[name="rating"]');
ratingInputs.forEach(input => {
    input.addEventListener('change', () => {
        applyFilters();
    });
});

// Specialty Checkboxes
const specialtyInputs = document.querySelectorAll('.checkbox-list input');
specialtyInputs.forEach(input => {
    input.addEventListener('change', () => {
        applyFilters();
    });
});

// Get specialty from URL
function getSpecialtyFromURL() {
    const params = new URLSearchParams(window.location.search);
    return params.get('specialty');
}

// Apply URL specialty filter on load
window.addEventListener('load', () => {
    const specialty = getSpecialtyFromURL();
    if (specialty) {
        const checkbox = Array.from(document.querySelectorAll('.checkbox-list input')).find(
            el => el.value === specialty
        );
        if (checkbox) {
            checkbox.checked = true;
            applyFilters();
        }
    } else {
        renderDoctors(filteredDoctors);
    }
});

console.log('✅ Doctors Script Loaded');
