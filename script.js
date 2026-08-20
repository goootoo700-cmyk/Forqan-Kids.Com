// ============================================
// script.js - دار الفرقان لتعليم القرآن الكريم
// جميع التفاعلات الديناميكية للموقع
// ============================================

// ============ رقم الواتساب للدار ============
// تأكد من صحة الرقم بدون + وبدون مسافات
const WHATSAPP_NUMBER = '201061255635';

// ============ رابط الفيسبوك ============
const FACEBOOK_URL = 'https://www.facebook.com/share/1CwZ34cRCH/';

// ============ دالة فتح الواتساب (موحدة) ============
function openWhatsApp(message) {
    // تنظيف الرقم من أي رموز
    const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    
    // استخدام الرابط الرسمي للواتساب
    const whatsappUrl = `https://wa.me/${cleanNumber}?text=${encodeURIComponent(message)}`;
    
    // فتح في نافذة جديدة
    window.open(whatsappUrl, '_blank');
}

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
        // بيانات احتياطية
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
            },
            {
                code: "STU1002",
                name: "فاطمة علي",
                level: "KG1",
                edu: "جيد جداً",
                quran: "سورة الفاتحة والإخلاص والفلق",
                read: "تتعلم الحروف الهجائية",
                math: "جيد",
                mental: "مبتدئ",
                mathEn: "A",
                computer: "ممتاز",
                trips: "شاركت في رحلة المكتبة",
                skills: "اجتماعية، تحب القصص",
                attendance: "حضور 25/30",
                notes: "متحمسة جداً للأنشطة الجماعية",
                eval: "جيد جداً"
            },
            {
                code: "STU1003",
                name: "يوسف خالد",
                level: "تمهيدي 1",
                edu: "مقبول",
                quran: "يحفظ قصار السور",
                read: "يتعرف على الحروف",
                math: "يحتاج متابعة",
                mental: "متوسط",
                mathEn: "C+",
                computer: "جيد",
                trips: "لم يشارك بعد",
                skills: "ألعاب حركية، بناء",
                attendance: "حضور 20/30",
                notes: "يحتاج تشجيع إضافي",
                eval: "جيد"
            }
        ];
    }
}

// تحميل البيانات عند بدء التشغيل
loadStudentsData();

// ============ شريط تقدم القراءة ============
window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / scrollHeight) * 100;
    const progressBar = document.getElementById('readingProgress');
    if (progressBar) {
        progressBar.style.width = progress + '%';
    }
});

// ============ تفعيل القائمة الموبايل ============
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');

if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
        navLinks.classList.toggle('open');
    });

    // إغلاق القائمة عند الضغط على أي رابط
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
            link.classList.add('active');
        });
    });
}

// ============ الوضع الداكن ============
const darkToggle = document.getElementById('darkToggle');

if (darkToggle) {
    const darkIcon = darkToggle.querySelector('i');
    
    // التحقق من التفضيل المحفوظ
    if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        if (darkIcon) {
            darkIcon.classList.remove('fa-moon');
            darkIcon.classList.add('fa-sun');
        }
    }
    
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            if (darkIcon) {
                darkIcon.classList.remove('fa-moon');
                darkIcon.classList.add('fa-sun');
            }
        } else {
            localStorage.setItem('darkMode', 'disabled');
            if (darkIcon) {
                darkIcon.classList.remove('fa-sun');
                darkIcon.classList.add('fa-moon');
            }
        }
    });
}

// ============ زر العودة للأعلى ============
const scrollTopBtn = document.getElementById('scrollTopBtn');

if (scrollTopBtn) {
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
}

// ============ حركات الظهور عند التمرير ============
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
const lightboxImg = lightbox ? lightbox.querySelector('img') : null;

if (lightbox && lightboxImg) {
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
}

// ============ نظام متابعة مستوى الطالب ============
const trackBtn = document.getElementById('trackBtn');
const studentCodeInput = document.getElementById('studentCode');
const errorMsg = document.getElementById('errorMsg');
const studentResult = document.getElementById('studentResult');
const whatsappParentBtn = document.getElementById('whatsappParentBtn');

let currentStudent = null;

function displayStudent(student) {
    currentStudent = student;
    
    const fields = {
        'sName': student.name,
        'sLevel': student.level,
        'sEdu': student.edu,
        'sQuran': student.quran,
        'sRead': student.read,
        'sMath': student.math,
        'sMental': student.mental,
        'sMathEn': student.mathEn,
        'sComputer': student.computer || 'غير محدد',
        'sTrips': student.trips || 'غير محدد',
        'sSkills': student.skills,
        'sAttendance': student.attendance,
        'sNotes': student.notes,
        'sEval': student.eval
    };
    
    for (const [id, value] of Object.entries(fields)) {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = value;
        }
    }
    
    studentResult.classList.add('visible');
    errorMsg.textContent = '';
    
    studentResult.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

if (trackBtn) {
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
}

if (whatsappParentBtn) {
    whatsappParentBtn.addEventListener('click', () => {
        if (currentStudent) {
            const message = `السلام عليكم، أنا ولي أمر الطالب/ة ${currentStudent.name} (${currentStudent.code})، أود الاستفسار عن مستواه التعليمي في دار الفرقان.`;
            openWhatsApp(message);
        }
    });
}

// ============ نموذج التواصل عبر واتساب ============
const contactForm = document.getElementById('contactForm');

if (contactForm) {
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
        
        openWhatsApp(whatsappMessage);
        
        contactForm.reset();
        showToast('تم فتح واتساب لإرسال رسالتك', 'success');
    });
}

// ============ نموذج الشكاوى والمقترحات ============
const complaintsForm = document.getElementById('complaintsForm');

if (complaintsForm) {
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
        
        openWhatsApp(whatsappMessage);
        
        complaintsForm.reset();
        showToast('تم فتح واتساب لإرسال رسالتك', 'success');
    });
}

// ============ نموذج تسجيل الطالب ============
const registrationForm = document.getElementById('registrationForm');

if (registrationForm) {
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
        
        openWhatsApp(whatsappMessage);
        
        registrationForm.reset();
        showToast('تم إرسال طلب التسجيل بنجاح', 'success');
    });
}

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

if (sections.length > 0 && navLinksAll.length > 0) {
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
}

// ============ إصلاح جميع روابط الواتساب في الصفحة ============
document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const href = link.getAttribute('href');
        if (href) {
            window.open(href, '_blank');
        }
    });
});

console.log('✅ تم تحميل موقع دار الفرقان بنجاح');
console.log('📱 رقم الواتساب:', WHATSAPP_NUMBER);
console.log('📘 الفيسبوك:', FACEBOOK_URL);
console.log('👨‍💻 تصميم وتطوير: Abdul Rahman Adel Al-Muqaddam');