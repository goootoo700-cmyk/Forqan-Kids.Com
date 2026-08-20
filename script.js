// ============================================
// script.js - دار الفرقان لتعليم القرآن الكريم
// جميع التفاعلات الديناميكية للموقع
// ============================================

// ============ رقم الواتساب للدار ============
const WHATSAPP_NUMBER = '201061255635';

// ============ رابط الفيسبوك ============
const FACEBOOK_URL = 'https://www.facebook.com/share/1CwZ34cRCH/';

// ============ تحميل بيانات الطلاب من ملف JSON ============
let studentsData = [];

async function loadStudentsData() {
    try {
        const response = await fetch('students-data.json');
        if (!response.ok) {
            throw new Error('فشل تحميل البيانات');
        }
        const data = await response.json();
        studentsData = data.students;
        console.log('✅ تم تحميل بيانات الطلاب بنجاح');
    } catch (error) {
        console.error('❌ خطأ في تحميل بيانات الطلاب:', error);
        // بيانات احتياطية في حالة فشل التحميل
        studentsData = [
            {
                code: "STU1001",
                name: "أحمد محمود",
                level: "تمهيدي 2",
                edu: "ممتاز",
                quran: "جزء عم - نصف الجزء",
                read: "يجيد القراءة بطلاقة",
                math: "جيد جداً",
                mental: "متقدم",
                mathEn: "B+",
                computer: "جيد جداً",
                trips: "شارك في رحلة الحديقة العلمية",
                skills: "رسم، تركيز عالي، قيادة",
                attendance: "حضور 28/30",
                notes: "متميز ويحتاج تشجيع على المشاركة اللفظية",
                eval: "ممتاز"
            }
        ];
    }
}
async function shareSite() {
    const siteUrl = window.location.href;
    const siteTitle = 'دار الفرقان لتعليم القرآن الكريم';
    
    if (navigator.share) {
        try {
            await navigator.share({
                title: siteTitle,
                url: siteUrl
            });
        } catch (err) {
            console.log('تم إلغاء المشاركة');
        }
    } else {
        // نسخ الرابط
        navigator.clipboard.writeText(siteUrl);
        showToast('تم نسخ رابط الموقع', 'success');
    }
}

loadStudentsData();

// ============ شريط تقدم القراءة ============
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    document.getElementById('readingProgress').style.width = progress + '%';
});

// ============ تفعيل القائمة الموبايل ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        link.classList.add('active');
    });
});

// ============ الوضع الداكن ============
const darkToggle = document.getElementById('darkToggle');
const darkIcon = darkToggle.querySelector('i');

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    darkIcon.classList.remove('fa-moon');
    darkIcon.classList.add('fa-sun');
}

darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('darkMode', 'enabled');
        darkIcon.classList.remove('fa-moon');
        darkIcon.classList.add('fa-sun');
    } else {
        localStorage.setItem('darkMode', 'disabled');
        darkIcon.classList.remove('fa-sun');
        darkIcon.classList.add('fa-moon');
    }
});

// ============ زر العودة للأعلى ============
const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ============ حركات الظهور عند التمرير ============
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

document.querySelectorAll('.section, .about-card, .program-card, .activity-card, .seminar-card, .health-card, .course-card, .branch-card, .fees-card').forEach(el => {
    if (!el.classList.contains('reveal')) {
        el.classList.add('reveal');
        revealObserver.observe(el);
    }
});

// ============ معرض الصور (Lightbox) ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    });
});

lightbox.addEventListener('click', () => {
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        lightbox.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// ============ نظام متابعة مستوى الطالب ============
const trackBtn = document.getElementById('trackBtn');
const studentCodeInput = document.getElementById('studentCode');
const errorMsg = document.getElementById('errorMsg');
const studentResult = document.getElementById('studentResult');
const whatsappParentBtn = document.getElementById('whatsappParentBtn');

let currentStudent = null;

function displayStudent(student) {
    currentStudent = student;
    
    document.getElementById('sName').textContent = student.name;
    document.getElementById('sLevel').textContent = student.level;
    document.getElementById('sEdu').textContent = student.edu;
    document.getElementById('sQuran').textContent = student.quran;
    document.getElementById('sRead').textContent = student.read;
    document.getElementById('sMath').textContent = student.math;
    document.getElementById('sMental').textContent = student.mental;
    document.getElementById('sMathEn').textContent = student.mathEn;
    document.getElementById('sComputer').textContent = student.computer || 'غير محدد';
    document.getElementById('sTrips').textContent = student.trips || 'غير محدد';
    document.getElementById('sSkills').textContent = student.skills;
    document.getElementById('sAttendance').textContent = student.attendance;
    document.getElementById('sNotes').textContent = student.notes;
    document.getElementById('sEval').textContent = student.eval;
    
    studentResult.classList.add('visible');
    errorMsg.textContent = '';
    
    studentResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

trackBtn.addEventListener('click', () => {
    const code = studentCodeInput.value.trim().toUpperCase();
    
    if (!code) {
        errorMsg.textContent = '⚠️ من فضلك أدخل كود الطالب';
        studentResult.classList.remove('visible');
        return;
    }
    
    const foundStudent = studentsData.find(s => s.code === code);
    
    if (foundStudent) {
        displayStudent(foundStudent);
    } else {
        studentResult.classList.remove('visible');
        errorMsg.textContent = '❌ الكود غير صحيح، تأكد من الإدخال وحاول مرة أخرى';
    }
});

studentCodeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        trackBtn.click();
    }
});

whatsappParentBtn.addEventListener('click', () => {
    if (currentStudent) {
        const message = `السلام عليكم، أنا ولي أمر الطالب/ة ${currentStudent.name} (${currentStudent.code})، أود الاستفسار عن مستواه التعليمي في دار الفرقان.`;
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
});

// ============ نموذج التواصل عبر واتساب ============
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const message = document.getElementById('message').value.trim();
    
    if (!name || !phone || !message) {
        alert('من فضلك أكمل جميع الحقول المطلوبة');
        return;
    }
    
    const whatsappMessage = `السلام عليكم، أنا ${name}\nرقم هاتفي: ${phone}\n\n${message}`;
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    contactForm.reset();
    
    showToast('تم فتح واتساب لإرسال رسالتك', 'success');
});

// ============ نموذج الشكاوى والمقترحات ============
const complaintsForm = document.getElementById('complaintsForm');

complaintsForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const complaintName = document.getElementById('complaintName').value.trim();
    const complaintPhone = document.getElementById('complaintPhone').value.trim();
    const complaintType = document.getElementById('complaintType').value;
    const complaintMessage = document.getElementById('complaintMessage').value.trim();
    
    if (!complaintName || !complaintPhone || !complaintType || !complaintMessage) {
        alert('من فضلك أكمل جميع الحقول المطلوبة');
        return;
    }
    
    const whatsappMessage = `📋 ${complaintType} - دار الفرقان 📋\n\n👤 الاسم: ${complaintName}\n📞 الهاتف: ${complaintPhone}\n📝 نوع الرسالة: ${complaintType}\n\n💬 الرسالة:\n${complaintMessage}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    complaintsForm.reset();
    
    showToast('تم فتح واتساب لإرسال رسالتك', 'success');
});

// ============ نموذج تسجيل الطالب ============
const registrationForm = document.getElementById('registrationForm');

registrationForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const childName = document.getElementById('childName').value.trim();
    const childAge = document.getElementById('childAge').value;
    const parentName = document.getElementById('parentName').value.trim();
    const parentPhone = document.getElementById('parentPhone').value.trim();
    const branch = document.getElementById('branch').value;
    const program = document.getElementById('program').value;
    const notes = document.getElementById('notes').value.trim();
    
    if (!childName || !childAge || !parentName || !parentPhone || !branch || !program) {
        alert('من فضلك أكمل جميع الحقول المطلوبة');
        return;
    }
    
    const branchNames = {
        branch1: 'الفرع الأول - حي عز الدين',
        branch2: 'الفرع الثاني - المنير الجديدة'
    };
    
    const programNames = {
        quran: 'تحفيظ قرآن كريم',
        full: 'برنامج تعليمي كامل',
        noor: 'منهج نور البيان',
        computer: 'حاسب آلي',
        trips: 'رحلات ترفيهية'
    };
    
    const whatsappMessage = `🌟 طلب تسجيل جديد - دار الفرقان 🌟\n\n👶 اسم الطفل: ${childName}\n🎂 العمر: ${childAge} سنوات\n👨‍👩‍👦 ولي الأمر: ${parentName}\n📞 الهاتف: ${parentPhone}\n📍 الفرع: ${branchNames[branch]}\n📚 البرنامج: ${programNames[program]}\n📝 ملاحظات: ${notes || 'لا يوجد'}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(whatsappMessage)}`;
    
    window.open(whatsappUrl, '_blank');
    registrationForm.reset();
    
    showToast('تم إرسال طلب التسجيل بنجاح', 'success');
});

// ============ نظام الإشعارات (Toast) ============
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ============ تحديث الرابط النشط في القائمة عند التمرير ============
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

console.log('✅ تم تحميل موقع دار الفرقان بنجاح');
console.log('📱 رقم الواتساب:', WHATSAPP_NUMBER);
console.log('📘 الفيسبوك:', FACEBOOK_URL);
console.log('👨‍💻 تصميم وتطوير: Abdul Rahman Adel Al-Muqaddam');