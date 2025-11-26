// Menunggu seluruh konten HTML dimuat sebelum menjalankan JavaScript
document.addEventListener('DOMContentLoaded', function() {

    // --- BAGIAN 1: KODE GLOBAL (Berjalan di semua halaman jika elemennya ada) ---

    // 1.1 Logika untuk Sidebar (Menu Mobile)
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    if (menuToggle && sidebar) {
        const sidebarLinks = document.querySelectorAll('.sidebar a');
        
        menuToggle.addEventListener('click', function() {
            menuToggle.classList.toggle('active');
            sidebar.classList.toggle('active');
        });

        sidebarLinks.forEach(link => {
            link.addEventListener('click', function() {
                menuToggle.classList.remove('active');
                sidebar.classList.remove('active');
            });
        });
    }

    // 1.2 Inisialisasi Swiper.js (Carousel)
    if (document.querySelector('.mySwiper')) {
        new Swiper('.mySwiper', {
            loop: true,
            autoplay: {
                delay: 2500, // Sedikit diperlambat agar lebih nyaman dilihat
                disableOnInteraction: false,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
        });
    }

    // 1.3 Kode untuk Smooth Scrolling ke anchor link
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
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
        window.onscroll = function() {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                backToTopButton.classList.add("show");
            } else {
                backToTopButton.classList.remove("show");
            }
        };

        backToTopButton.addEventListener("click", function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- BAGIAN 2: KODE KHUSUS HALAMAN LAYANAN (jika ada .service-nav-sticky) ---
    const serviceNav = document.querySelector('.service-nav-sticky');
    if (serviceNav) {
        // Kode ini akan berjalan hanya jika elemen .service-nav-sticky ditemukan
        const serviceSections = document.querySelectorAll('.service-section');
        const serviceNavLinks = serviceNav.querySelectorAll('.nav-link');
        
        if (serviceSections.length > 0) {
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

            serviceSections.forEach(section => serviceObserver.observe(section));
        }
    }

    // --- BAGIAN 3: KODE KHUSUS HALAMAN KONTAK (jika ada #form-section) ---
    const contactFormSection = document.getElementById('form-section');
    if (contactFormSection) {
        
        // 3.1 Logika Tab untuk Formulir (Pertanyaan & Karir)
        const tabButtons = document.querySelectorAll('.tab-button');
        const formContainers = document.querySelectorAll('.form-container');
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

        // 3.2 Logika untuk membuka tab form tertentu via URL (misal: contact.html?form=karir)
        const urlParams = new URLSearchParams(window.location.search);
        const directForm = urlParams.get('form');
        if (directForm) {
            const targetFormButton = document.querySelector(`.tab-button[data-form="${directForm}"]`);
            if (targetFormButton) {
                contactFormSection.scrollIntoView({ behavior: 'smooth' });
                targetFormButton.click();
            }
        }
        
        // 3.3 Logika untuk Form Lamaran Kerja yang terhubung ke Google Sheet & Drive
        const formLamaran = document.getElementById('form-lamaran-kerja');
        if (formLamaran) {
            const submitButton = formLamaran.querySelector('button[type="submit"]');
            const cvInput = document.getElementById('cv-upload');
            const fotoInput = document.getElementById('foto-upload');
            // Pastikan semua variabel dari HTML sesuai
            // ID input sudah cocok: 'cv-upload', 'foto-upload'

            const originalButtonText = submitButton.innerHTML;

            // Helper function untuk membaca file sebagai Base64
            function readFileAsBase64(file) {
                return new Promise((resolve, reject) => {
                    const reader = new FileReader();
                    reader.onload = () => resolve(reader.result.split(',')[1]);
                    reader.onerror = (error) => reject(error);
                    reader.readAsDataURL(file);
                });
            }

            formLamaran.addEventListener('submit', async function(e) {
                e.preventDefault();

                // Validasi: Pastikan kedua file diunggah
                if (!cvInput.files[0] || !fotoInput.files[0]) {
                    alert('Mohon unggah file CV dan Foto.');
                    return;
                }

                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirim...';

                try {
                    const [cvFileData, photoFileData] = await Promise.all([
                        readFileAsBase64(cvInput.files[0]),
                        readFileAsBase64(fotoInput.files[0])
                    ]);

                    const formDataObject = {};
                    new FormData(formLamaran).forEach((value, key) => {
                        if (key !== 'CV' && key !== 'Foto') {
                            formDataObject[key] = value;
                        }
                    });

                    const payload = {
                        cvFileName: cvInput.files[0].name,
                        cvMimeType: cvInput.files[0].type,
                        cvFileData: cvFileData,
                        photoFileName: fotoInput.files[0].name,
                        photoMimeType: fotoInput.files[0].type,
                        photoFileData: photoFileData,
                        formData: formDataObject
                    };

                    // URL Google Apps Script Anda
                    const scriptURL = 'https://script.google.com/macros/s/AKfycbws2XhLNyUceejdlG1Wn_FRxQoW5gISsbuM8M-kfv6Yc-15IixnNWayA8e7NEpRJMUJ/exec';

                    const response = await fetch(scriptURL, {
                        method: 'POST',
                        body: JSON.stringify(payload),
                        headers: { 'Content-Type': 'text/plain;charset=utf-8' }
                    });

                    const result = await response.json();
                    console.log('Success!', result);
                    alert('Terima kasih! Lamaran Anda telah berhasil dikirim.');
                    formLamaran.reset();

                } catch (error) {
                    console.error('Error!', error.message);
                    alert('Maaf, terjadi kesalahan. Pastikan ukuran file tidak terlalu besar.');
                } finally {
                    submitButton.disabled = false;
                    submitButton.innerHTML = originalButtonText;
                }
            });
        }
    }
    // Mengambil file footer-contact.html dan memasukkannya ke div
    fetch('index.html')
        .then(response => response.text())
        .then(data => {document.getElementById('footer-placeholder').innerHTML = data;});
});