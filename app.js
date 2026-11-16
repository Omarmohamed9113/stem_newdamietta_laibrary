// --- 1. قاموس اللغات ---
const translations = {
    ar: {
        welcome_title: "مرحباً بك في مكتبة STEM 📚",
        welcome_desc: "مساحتك الخاصة للوصول للمصادر الدراسية، الروايات، وحجز الكتب الورقية بكل سهولة. هل أنت مستعد؟",
        start_btn: "لنبدأ رحلتنا 🚀",
        library_title: "مكتبة STEM Damietta 📚",
        tab_pdf: "الكتب الإلكترونية (PDF)",
        tab_physical: "الكتب الورقية (للحجز)",
        sub_academic: "كتب دراسية",
        sub_novels: "روايات عالمية",
        sub_students: "إبداعات الطلاب",
        book_upstream_title: "كتاب Upstream", book_upstream_desc: "مادة اللغة الإنجليزية",
        book_utopia_title: "رواية يوتوبيا", book_utopia_desc: "د. أحمد خالد توفيق",
        book_martian_title: "رواية المريخي", book_martian_desc: "آندي وير",
        book4_title: "الفيزياء الجامعية", book4_desc: "كتاب مرجعي - متوفر 2 نسخة",
        download_btn: "⬇️ تحميل الكتاب",
        download_novel: "⬇️ تحميل الرواية",
        reserve_btn: "📅 احجز الآن",
        add_book_btn: "➕ إضافة كتاب (لأصدقاء المكتبة)",
        add_modal_title: "إضافة كتاب ورقي جديد",
        save_book_btn: "حفظ وإضافة",
        modal_title: "تأكيد حجز الكتاب",
        modal_name_ph: "الاسم ثلاثي",
        modal_class_ph: "اختر الصف والفصل",
        modal_submit: "إرسال طلب الحجز",
        lang_btn_text: "English"
    },
    en: {
        welcome_title: "Welcome to STEM Library 📚",
        welcome_desc: "Your dedicated space for academic resources, novels, and reserving physical books. Ready?",
        start_btn: "Let's Start 🚀",
        library_title: "STEM Damietta Library 📚",
        tab_pdf: "E-Books (PDF)",
        tab_physical: "Physical Books (Reserve)",
        sub_academic: "Academic",
        sub_novels: "Global Novels",
        sub_students: "Student Creations",
        book_upstream_title: "Upstream Textbook", book_upstream_desc: "English Subject",
        book_utopia_title: "Utopia Novel", book_utopia_desc: "Dr. Ahmed Khaled Tawfik",
        book_martian_title: "The Martian", book_martian_desc: "Andy Weir",
        book4_title: "University Physics", book4_desc: "Reference - 2 Copies Available",
        download_btn: "⬇️ Download Book",
        download_novel: "⬇️ Download Novel",
        reserve_btn: "📅 Reserve Now",
        add_book_btn: "➕ Add Book (Library Friends)",
        add_modal_title: "Add New Physical Book",
        save_book_btn: "Save & Add",
        modal_title: "Confirm Reservation",
        modal_name_ph: "Full Name",
        modal_class_ph: "Select Grade & Class",
        modal_submit: "Send Request",
        lang_btn_text: "عربي"
    }
};

// --- الرمز السري لأصدقاء المكتبة ---
const SECRET_CODE = "STEM2026"; 

// --- 2. إعدادات التحميل الأولي ---
window.onload = () => {
    // فحص شاشة الترحيب (تظهر مرة واحدة فقط)
    if (localStorage.getItem("hasVisited") === "true") {
        document.getElementById("welcome-section").style.display = "none";
        document.getElementById("library-section").style.display = "block";
    }

    if (localStorage.getItem("theme") === "dark") {
        document.body.classList.add("dark-mode");
        document.getElementById("theme-btn").innerText = "☀️";
    }

    const savedLang = localStorage.getItem("lang") || "ar";
    applyLanguage(savedLang);
};

// زر لنبدأ
function startApp() {
    localStorage.setItem("hasVisited", "true");
    document.getElementById("welcome-section").style.display = "none";
    document.getElementById("library-section").style.display = "block";
}

// --- 3. وظائف الوضع المظلم واللغة ---
function toggleTheme() {
    const isDark = document.body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    document.getElementById("theme-btn").innerText = isDark ? "☀️" : "🌙";
}

function toggleLang() {
    let currentLang = document.documentElement.lang;
    let newLang = currentLang === "ar" ? "en" : "ar";
    applyLanguage(newLang);
    localStorage.setItem("lang", newLang);
}

function applyLanguage(lang) {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.getElementById("lang-btn").innerText = translations[lang].lang_btn_text;

    document.querySelectorAll("[data-i18n]").forEach(el => {
        const key = el.getAttribute("data-i18n");
        if (translations[lang][key]) {
            el.innerText = translations[lang][key];
        }
    });

    document.getElementById("modal_name").placeholder = translations[lang].modal_name_ph;
    
    // إعادة رسم الكتب المضافة ديناميكياً لتحديث لغتها
    renderAddedBooks();
}

// --- 4. وظائف التنقل ---
function switchMain(section) {
    document.getElementById('pdf-section').style.display = section === 'pdf' ? 'block' : 'none';
    document.getElementById('physical-section').style.display = section === 'physical' ? 'flex' : 'none';
    document.getElementById('tab-pdf').classList.toggle('active', section === 'pdf');
    document.getElementById('tab-physical').classList.toggle('active', section === 'physical');
}

function switchSub(tabName) {
    const tabs = ['academic', 'novels', 'students'];
    tabs.forEach(tab => {
        document.getElementById(`content-${tab}`).style.display = tab === tabName ? 'flex' : 'none';
        document.getElementById(`sub-${tab}`).classList.toggle('active', tab === tabName);
    });
}

// --- 5. وظائف الحجز ---
function openReserveModal(bookNameAr, bookNameEn) {
    let currentLang = document.documentElement.lang;
    let bookName = currentLang === 'ar' ? bookNameAr : bookNameEn;
    document.getElementById('bookToReserve').innerText = bookName;
    document.getElementById('inputBookName').value = bookName;
    document.getElementById('reservationModal').style.display = 'flex';
}

function closeReserveModal() {
    document.getElementById('reservationModal').style.display = 'none';
}

// --- 6. وظائف أصدقاء المكتبة (إضافة الكتب) ---
function checkSecretCode() {
    let currentLang = document.documentElement.lang;
    let promptMsg = currentLang === 'ar' ? "أدخل الرمز السري لأصدقاء المكتبة:" : "Enter the Library Friends secret code:";
    
    let code = prompt(promptMsg);
    if (code === SECRET_CODE) {
        document.getElementById("addBookModal").style.display = "flex";
    } else if (code !== null) {
        alert(currentLang === 'ar' ? "الرمز غير صحيح ❌" : "Incorrect Code ❌");
    }
}

function closeAddBookModal() {
    document.getElementById("addBookModal").style.display = "none";
}

function saveNewBook() {
    let titleAr = document.getElementById("newBookTitleAr").value.trim();
    let titleEn = document.getElementById("newBookTitleEn").value.trim();
    let descAr = document.getElementById("newBookDescAr").value.trim();
    let descEn = document.getElementById("newBookDescEn").value.trim();
    
    if (!titleAr || !titleEn) {
        alert("يرجى إدخال اسم الكتاب على الأقل!");
        return;
    }

    let newBook = { titleAr, titleEn, descAr, descEn };
    let books = JSON.parse(localStorage.getItem("addedBooks")) || [];
    books.push(newBook);
    localStorage.setItem("addedBooks", JSON.stringify(books));
    
    // تفريغ الحقول وإغلاق النافذة
    document.getElementById("newBookTitleAr").value = "";
    document.getElementById("newBookTitleEn").value = "";
    document.getElementById("newBookDescAr").value = "";
    document.getElementById("newBookDescEn").value = "";
    closeAddBookModal();
    
    // تحديث العرض
    renderAddedBooks();
}

function renderAddedBooks() {
    let currentLang = document.documentElement.lang;
    let books = JSON.parse(localStorage.getItem("addedBooks")) || [];
    
    // مسح الكتب القديمة المضافة ديناميكياً حتى لا تتكرر
    document.querySelectorAll('.dynamic-book').forEach(e => e.remove());
    
    let grid = document.getElementById("physical-books-grid");
    
    books.forEach(book => {
        let title = currentLang === 'ar' ? book.titleAr : book.titleEn;
        let desc = currentLang === 'ar' ? book.descAr : book.descEn;
        let reserveText = currentLang === 'ar' ? "📅 احجز الآن" : "📅 Reserve Now";
        
        let card = document.createElement("div");
        card.className = "book-card dynamic-book";
        card.innerHTML = `
            <h3>${title}</h3>
            <p>${desc}</p>
            <button class="action-btn reserve" onclick="openReserveModal('${book.titleAr}', '${book.titleEn}')">${reserveText}</button>
        `;
        grid.appendChild(card);
    });
}