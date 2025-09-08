// Menunggu seluruh konten HTML dimuat sebelum menjalankan JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // --- BAGIAN 1: KODE GLOBAL (Berjalan di semua halaman jika elemennya ada) ---

    // 1.1 Logika untuk Sidebar (Menu Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        const sidebarLinks = document.querySelectorAll('.sidebar a');
        
        // Buka/Tutup sidebar saat tombol hamburger di-klik
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
        });

        // Tutup sidebar saat salah satu link di dalamnya di-klik
        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('active');
            });
        });
    }

    // 1.2 Inisialisasi Swiper.js (Carousel)
    if (document.querySelector('.mySwiper')) {
        const swiper = new Swiper('.mySwiper', {
            loop: true,
            autoplay: {
                delay: 1500,
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // 1.3 Kode untuk Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Cek jika href bukan link kosong '#' agar tidak error
            if (this.getAttribute('href').length > 1) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // 1.4 Tombol "Back to Top"
    const backToTopButton = document.getElementById("backToTopBtn");
    if (backToTopButton) {
        // Tampilkan tombol ketika pengguna scroll ke bawah
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        };

        // Ketika tombol diklik, scroll kembali ke puncak
        backToTopButton.addEventListener("click", function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }


    // --- BAGIAN 2: KODE KHUSUS HALAMAN LAYANAN ---
    
    // 2.1 Navigasi Sticky pada Halaman Layanan
    const serviceNav = document.querySelector('.service-nav-sticky');
    if (serviceNav) {
        const serviceSections = document.querySelectorAll('.service-section');
        const serviceNavLinks = serviceNav.querySelectorAll('.nav-link');

        if (serviceSections.length > 0 && serviceNavLinks.length > 0) {
            const observerOptions = {
                rootMargin: '-80px 0px -50% 0px',
                threshold: 0
            };

            const serviceObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const id = entry.target.getAttribute('id');
                        serviceNavLinks.forEach(link => {
                            link.classList.remove('active');
                            if (link.getAttribute('href') === `#${id}`) {
                                link.classList.add('active');
                            }
                        });
                    }
                });
            }, observerOptions);

            serviceSections.forEach(section => {
                serviceObserver.observe(section);
            });
        }
    }


    // --- BAGIAN 3: KODE KHUSUS HALAMAN KONTAK ---

    // Cek apakah kita berada di halaman kontak dengan mencari elemen uniknya
    const contactFormSection = document.getElementById('form-section');
    if (contactFormSection) {
        
        // 3.1 Efek Transisi saat Scroll di Halaman Kontak
        const contactSections = document.querySelectorAll('.contact-page section'); // Lebih spesifik
        const contactObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.1
        });

        contactSections.forEach(section => {
            contactObserver.observe(section);
        });

        // 3.2 Logika Tab untuk Formulir
        const tabButtons = document.querySelectorAll('.tab-button');
        const formContainers = document.querySelectorAll('.form-container');
        if (tabButtons.length > 0) {
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const formId = button.dataset.form;
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    button.classList.add('active');
                    formContainers.forEach(form => {
                        form.classList.toggle('active', form.id === `${formId}-form`);
                    });
                });
            });
        }

        // 3.3 Logika Form Lamaran Kerja Dinamis
        const posisiSelect = document.getElementById('posisi-dilamar');
        if (posisiSelect) {
            const securityFields = document.getElementById('security-fields');
            const cleaningFields = document.getElementById('cleaning-fields');
            const labourFields = document.getElementById('labour-fields');

            posisiSelect.addEventListener('change', () => {
                securityFields.style.display = 'none';
                cleaningFields.style.display = 'none';
                labourFields.style.display = 'none';
                const selectedPosition = posisiSelect.value;
                if (selectedPosition === 'Security') securityFields.style.display = 'block';
                else if (selectedPosition === 'Cleaning Service') cleaningFields.style.display = 'block';
                else if (selectedPosition === 'Labour Supply') labourFields.style.display = 'block';
            });
        }

        // 3.4 Logika untuk Direct Link ke Form
        const urlParams = new URLSearchParams(window.location.search);
        const directForm = urlParams.get('form');
        if (directForm) {
            const targetFormButton = document.querySelector(`.tab-button[data-form="${directForm}"]`);
            if (targetFormButton) {
                contactFormSection.scrollIntoView({ behavior: 'smooth' });
                targetFormButton.click();
            }
        }
    }
});

// --- BAGIAN 3: KODE KHUSUS HALAMAN KONTAK ---

// Pastikan kode ini hanya berjalan jika kita berada di halaman kontak
// dengan cara mengecek keberadaan elemen unik dari halaman tersebut.
const contactFormSection = document.getElementById('form-section');

document.addEventListener('DOMContentLoaded', function () {
    const tabButtons = document.querySelectorAll('.tab-button');
    const formContainers = document.querySelectorAll('.form-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Hapus kelas 'active' dari semua tombol dan form
            tabButtons.forEach(btn => btn.classList.remove('active'));
            formContainers.forEach(form => form.classList.remove('active'));

            // Tambahkan kelas 'active' ke tombol yang diklik
            button.classList.add('active');

            // Tampilkan form yang sesuai
            const formId = button.getAttribute('data-form');
            const targetForm = document.getElementById(formId + '-form');
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    })});

if (contactFormSection) {
    
    // --- 3.1 Logika untuk Tab Formulir (Pertanyaan & Karir) ---
    const tabButtons = document.querySelectorAll('.tab-button');
    const formContainers = document.querySelectorAll('.form-container');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetFormId = button.dataset.form; // Mengambil data-form dari tombol

            // 1. Hapus kelas 'active' dari semua tombol
            tabButtons.forEach(btn => btn.classList.remove('active'));
            // 2. Tambahkan kelas 'active' ke tombol yang diklik
            button.classList.add('active');

            // 3. Sembunyikan semua kontainer form
            formContainers.forEach(form => {
                form.classList.remove('active');
            });

            // 4. Tampilkan kontainer form yang sesuai dengan tombol yang diklik
            const targetForm = document.getElementById(targetFormId + '-form');
            if (targetForm) {
                targetForm.classList.add('active');
            }
        });
    });

    // --- 3.2 Efek Label Melayang pada Input yang sudah terisi saat halaman dimuat ---
    // Ini berguna jika browser melakukan autofill
    const allInputs = document.querySelectorAll('.form-group input, .form-group textarea');
    allInputs.forEach(input => {
        // Jika input punya nilai, tambahkan 'valid' agar labelnya tetap di atas
        if (input.value.trim() !== '') {
            input.nextElementSibling.classList.add('label-up');
        }
        input.addEventListener('blur', () => {
             if (input.value.trim() !== '') {
                input.nextElementSibling.classList.add('label-up');
            } else {
                input.nextElementSibling.classList.remove('label-up');
            }
        });
    });

    const allFieldsets = document.querySelectorAll('.form-fieldset');
    allFieldsets.forEach(fieldset => {
        const legend = fieldset.querySelector('legend');
        if (legend) {
            legend.addEventListener('click', () => {
                fieldset.classList.toggle('collapsed');
            });
        }
    });
    
}

