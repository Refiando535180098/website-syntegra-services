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
    // 
    // DATA CABANG (9 LOKASI)
        const branches = [
            { id: 1, name: "Tangerang Selatan (HO)", 
                     address: "Komp. Ruko BSD Sektor VII, Jl. Pahlawan Seribu No.63-64, Serpong, Tangsel.",
                     phone: "08001778889",
                     email: "ho@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Syntegra+BSD&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" },
            { id: 2, name: "Jakarta Selatan",
                     address: "Gedung Cyber 2 Tower, Kuningan, Jakarta Selatan.",
                     phone: "021555001",
                     email: "jkt@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Cyber+2+Tower&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" },
            { id: 3, name: "Bandung",
                     address: "Jl. Asia Afrika No. 100, Bandung, Jawa Barat.",
                     phone: "022444555",
                     email: "bdg@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Asia+Afrika+Bandung&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" },
            { id: 4, name: "Surabaya",
                     address: "Jl. Tunjungan No. 1, Surabaya, Jawa Timur.",
                     phone: "031999888",
                     email: "sby@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Tunjungan+Surabaya&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" },
            { id: 5, name: "Semarang",
                     address: "Jl. Pemuda No. 150, Semarang, Jawa Tengah.",
                     phone: "024333222",
                     email: "smg@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Pemuda+Semarang&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" },
            { id: 6, name: "Medan",
                     address: "Jl. Putri Hijau No. 10, Medan, Sumut.",
                     phone: "061777666",
                     email: "mdn@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Medan+Putri+Hijau&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" },
            { id: 7, name: "Makassar",
                     address: "Jl. Jend. Sudirman No. 50, Makassar, Sulsel.",
                     phone: "0411222111",
                     email: "mks@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Makassar+Sudirman&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" },
            { id: 8, name: "Bali (Denpasar)",
                     address: "Jl. Teuku Umar No. 88, Denpasar, Bali.",
                     phone: "0361888999",
                     email: "dps@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Teuku+Umar+Bali&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" },
            { id: 9, name: "Balikpapan",
                     address: "Jl. Jenderal Sudirman No. 45, Balikpapan.",
                     phone: "0542123456",
                     email: "bpn@syntegra.com",
                     mapEmbed: "https://maps.google.com/maps?q=Balikpapan+Sudirman&t=&z=13&ie=UTF8&iwloc=&output=embed",
                     mapLink: "https://goo.gl/maps/xyz" }
        ];

        let activeIndex = 0;

        function init() {
            renderTabs();
            updateContent(0);
        }

        function renderTabs() {
            const container = document.getElementById('tab-scroll-container');
            container.innerHTML = '';

            branches.forEach((branch, index) => {
                const btn = document.createElement('button');
                const isActive = index === activeIndex;

                // DESIGN TOMBOL: Modern Pill Shape
                // Active: Hitam Pekat + Text Kuning + Shadow
                // Inactive: Putih + Border Tipis + Text Abu
                const baseClass = "btn-press snap-center flex-shrink-0 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-300 border whitespace-nowrap";
                const activeClass = "bg-gray-900 text-yellow-400 border-gray-900 shadow-md transform scale-100 ring-2 ring-offset-2 ring-gray-200";
                const inactiveClass = "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:bg-gray-50";

                btn.className = `${baseClass} ${isActive ? activeClass : inactiveClass}`;
                btn.innerText = branch.name;
                
                // EVENT CLICK
                btn.onclick = () => handleTabClick(index, btn);
                
                container.appendChild(btn);
            });
        }

        function handleTabClick(index, btnElement) {
            if (activeIndex === index) return; // Jangan reload jika klik tab yang sama
            
            activeIndex = index;
            renderTabs(); // Re-render untuk update style active
            updateContent(index);

            // LOGIKA SCROLL: Tombol otomatis ke tengah layar
            btnElement.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
                inline: 'center'
            });
        }

        function updateContent(index) {
            const data = branches[index];
            const contentCard = document.querySelector('.content-animate');
            const mapLoader = document.getElementById('map-loader');
            const iframe = document.getElementById('map-iframe');

            // 1. Reset Animasi (Trick reflow CSS)
            contentCard.style.animation = 'none';
            contentCard.offsetHeight; /* trigger reflow */
            contentCard.style.animation = 'slideUpFade 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards';

            // 2. Tampilkan Loader Map
            mapLoader.classList.remove('hidden');
            iframe.classList.add('opacity-50');

            // 3. Update Text
            document.getElementById('info-name').innerText = data.name;
            document.getElementById('info-mail').innerText = data.email;
            document.getElementById('info-address').innerText = data.address;
            document.getElementById('info-phone').innerText = data.phone;
            document.getElementById('btn-fullscreen').href = data.mapLink;

            // 4. Update Map dengan sedikit delay agar animasi smooth
            setTimeout(() => {
                iframe.src = data.mapEmbed;
                iframe.onload = () => {
                    mapLoader.classList.add('hidden');
                    iframe.classList.remove('opacity-50');
                };
            }, 100);
        }

        // Jalankan saat load
        init();

    // Mengambil file footer-contact.html dan memasukkannya ke div
    fetch('index.html')
        .then(response => response.text())
        .then(data => {document.getElementById('footer-placeholder').innerHTML = data;});
});