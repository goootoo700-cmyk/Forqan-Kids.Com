// ============================================
// script.js - دار الفرقان | App Layout
// ============================================

const WHATSAPP_NUMBER = '201061255635';

// ============ openWhatsApp ============
function openWhatsApp(message) {
    const clean = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${clean}?text=${encodeURIComponent(message)}`, '_blank');
}

// ============ Page Titles ============
const PAGE_TITLES = {
    home: 'الرئيسية',
    announcement: 'الإعلانات',
    about: 'من نحن',
    video: 'الفيديو التعريفي',
    programs: 'البرامج',
    activities: 'الأنشطة',
    courses: 'الدورات',
    fees: 'المصروفات',
    branches: 'الفروع',
    gallery: 'المعرض',
    complaints: 'الشكاوى',
    registration: 'التسجيل',
    contact: 'تواصل معنا'
};

// ============ Navigation ============
const sidebar = document.getElementById('sidebar');
const overlay = document.getElementById('overlay');
const menuBtn = document.getElementById('menuBtn');
const sidebarClose = document.getElementById('sidebarClose');
const navLinksAll = document.querySelectorAll('.sidebar-nav a');
const topbarTitle = document.getElementById('topbarTitle');

function navigateTo(pageId) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    // Show target
    const target = document.getElementById('page-' + pageId);
    if (target) target.classList.add('active');

    // Update sidebar active state
    navLinksAll.forEach(a => {
        a.classList.toggle('active', a.dataset.page === pageId);
    });

    // Update topbar title
    if (topbarTitle) topbarTitle.textContent = PAGE_TITLES[pageId] || 'دار الفرقان';

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close sidebar on mobile
    closeSidebar();

    // Update URL hash
    history.replaceState(null, '', '#' + pageId);
}

// Sidebar links
navLinksAll.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo(link.dataset.page);
    });
});

// Buttons with data-page
document.querySelectorAll('[data-page]').forEach(el => {
    if (el.tagName === 'A' && el.classList.contains('sidebar-nav') === false && !el.classList.contains('action-btn')) return;
    if (el.classList.contains('action-btn') || el.classList.contains('home-card') || el.classList.contains('btn')) {
        el.addEventListener('click', (e) => {
            if (el.tagName !== 'A' || !el.href || el.href === '#') {
                e.preventDefault();
                navigateTo(el.dataset.page);
            }
        });
    }
});

// Action register button
document.querySelectorAll('.action-register').forEach(btn => {
    btn.addEventListener('click', () => navigateTo('registration'));
});

// ============ Sidebar Toggle (mobile) ============
function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

if (menuBtn) menuBtn.addEventListener('click', openSidebar);
if (sidebarClose) sidebarClose.addEventListener('click', closeSidebar);
if (overlay) overlay.addEventListener('click', closeSidebar);

// ============ Initial Page ============
const initialHash = window.location.hash.replace('#', '');
const validPages = Object.keys(PAGE_TITLES);
if (initialHash && validPages.includes(initialHash)) {
    navigateTo(initialHash);
} else {
    navigateTo('home');
}

// ============ Dark Mode ============
const darkToggle = document.getElementById('darkToggle');
const darkIcon = darkToggle ? darkToggle.querySelector('i') : null;
const darkLabel = darkToggle ? darkToggle.querySelector('span') : null;

if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    if (darkIcon) {
        darkIcon.classList.remove('fa-moon');
        darkIcon.classList.add('fa-sun');
    }
    if (darkLabel) darkLabel.textContent = 'الوضع النهاري';
}

if (darkToggle) {
    darkToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const isDark = document.body.classList.contains('dark-mode');
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');

        if (darkIcon) {
            darkIcon.classList.toggle('fa-moon', !isDark);
            darkIcon.classList.toggle('fa-sun', isDark);
        }
        if (darkLabel) {
            darkLabel.textContent = isDark ? 'الوضع النهاري' : 'الوضع الليلي';
        }
    });
}

// ============ Lightbox ============
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox ? lightbox.querySelector('img') : null;

if (lightbox && lightboxImg) {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt || 'صورة';
            lightbox.classList.add('active');
        });
    });

    lightbox.addEventListener('click', () => lightbox.classList.remove('active'));

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') lightbox.classList.remove('active');
    });
}

// ============ Toast ============
const toastEl = document.getElementById('toast');
let toastTimer;

function showToast(message, type = 'success') {
    if (!toastEl) return;

    clearTimeout(toastTimer);
    toastEl.className = 'toast ' + type;
    toastEl.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
        <span>${message}</span>
    `;

    setTimeout(() => toastEl.classList.add('show'), 50);

    toastTimer = setTimeout(() => {
        toastEl.classList.remove('show');
    }, 3000);
}

// ============ Contact Form ============
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const message = document.getElementById('message').value.trim();

        if (!name || !phone || !message) {
            showToast('من فضلك أكمل جميع الحقول', 'error');
            return;
        }

        openWhatsApp(`السلام عليكم، أنا ${name}\nرقم هاتفي: ${phone}\n\n${message}`);
        contactForm.reset();
        showToast('تم فتح واتساب لإرسال رسالتك');
    });
}

// ============ Complaints Form ============
const complaintsForm = document.getElementById('complaintsForm');
if (complaintsForm) {
    complaintsForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('complaintName').value.trim();
        const phone = document.getElementById('complaintPhone').value.trim();
        const type = document.getElementById('complaintType').value;
        const msg = document.getElementById('complaintMessage').value.trim();

        if (!name || !phone || !type || !msg) {
            showToast('من فضلك أكمل جميع الحقول', 'error');
            return;
        }

        openWhatsApp(
            `📋 ${type} - دار الفرقان 📋\n\n` +
            `👤 الاسم: ${name}\n` +
            `📞 الهاتف: ${phone}\n` +
            `📝 النوع: ${type}\n\n` +
            `💬 الرسالة:\n${msg}`
        );
        complaintsForm.reset();
        showToast('تم فتح واتساب لإرسال رسالتك');
    });
}

// ============ Registration Form ============
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
        const pickupPoint = document.getElementById('pickupPoint').value.trim();
        const notes = document.getElementById('notes').value.trim();

        if (!childName || !childAge || !parentName || !parentPhone || !branch || !program) {
            showToast('من فضلك أكمل جميع الحقول المطلوبة', 'error');
            return;
        }

        const branchNames = {
            branch1: 'الفرع الأول - حي عز الدين',
            branch2: 'الفرع الثاني - المنير الجديدة'
        };

        const programNames = {
            quran: 'تحفيظ قرآن كريم',
            full: 'الاشتراك في الحضانة',
            noor: 'منهج نور البيان',
            computer: 'حاسب آلي'
        };

        let msg = `🌟 طلب تسجيل جديد - دار الفرقان 🌟\n\n`;
        msg += `👶 اسم الطفل: ${childName}\n`;
        msg += `🎂 العمر: ${childAge} سنوات\n`;
        msg += `👨‍👩‍👦 ولي الأمر: ${parentName}\n`;
        msg += `📞 الهاتف: ${parentPhone}\n`;
        msg += `📍 الفرع: ${branchNames[branch]}\n`;
        msg += `📚 البرنامج: ${programNames[program]}\n`;

        if (pickupPoint) msg += `🚌 مكان الركوب: ${pickupPoint}\n`;
        if (notes) msg += `📝 ملاحظات: ${notes}\n`;

        openWhatsApp(msg);
        registrationForm.reset();
        showToast('تم إرسال طلب التسجيل بنجاح');
    });
}

// ============ Keyboard: ESC closes sidebar ============
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar && sidebar.classList.contains('open')) {
        closeSidebar();
    }
});

console.log('✅ دار الفرقان — App Layout');
console.log('Design & Development: Youssef, Abdelrahman');