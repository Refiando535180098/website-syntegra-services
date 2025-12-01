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
    // DATA CABANG DENGAN LATITUDE & LONGITUDE
        // Note: Silakan ganti angka lat/lng dengan koordinat asli kantor Anda.
        const branches = [
            { 
                id: 1, 
                name: "HEAD OFFICE (BSD)", 
                fullName: "HEAD OFFICE - PT. Satria Wira Sriwijaya",
                address: "Komp. Ruko BSD Sektor VII, Jl. Pahlawan Seribu No.63 - 64 Blok RN, WetanTangerang, Kec. Serpong, Kota Tangerang Selatan, Banten 15310, Indonesia",
                lat: -6.282194,
                lng: 106.663528,
                phone: "08001778889",
                email: "ho@syntegra.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
            { 
                id: 2, 
                name: "JABODETABEK REGION", 
                fullName: "JABODETABEK REGION OFFICE",
                address: "Mall of Indonesia Lt. 2 Unit 2 F/A7B JL. Boulevard Barat Raya No. 1 Kelapa Gading Jakarta Utara 14240",
                lat: -6.149500,
                lng: 106.890600,
                phone: "08001778889",
                email: "ho@syntegra.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
            { 
                id: 3, 
                name: "JAWA BARAT REGION",
                fullName: "JAWA BARAT REGION OFFICE",
                address: "Jl. Ciwaruga No.8B, Ciwaruga, Kec. Parongpong, Kota Bandung, Jawa Barat 40559",
                lat: -6.868900, 
                lng: 107.575000,
                phone: "-",
                email: "sws.jabar@syntegra-services.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
            { 
                id: 4, 
                name: "JAWA TENGAH REGION",
                fullName: "JAWA TENGAH REGION OFFICE",
                address: "Dusun II, Wirogunan, Kec. Kartasura, Kabupaten Sukoharjo, Jawa Tengah 57166",
                lat: -7.540840068892038, 
                lng: 110.71914771529245,
                phone: "085702300910",
                email: "sws.jateng@syntegra-services.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
            { 
                id: 5, 
                name: "JAWA TIMUR REGION",
                fullName: "JAWA TIMUR REGION OFFICE",
                address: "JL. Mangga Dua B8 - 8 Kel. Jagir Kec. Wonokromo Kota Surabaya Jawa Timur 60244",
                lat: -7.300000, 
                lng: 112.740000,
                phone: "-",
                email: "sws.jatim@syntegra-services.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
            { 
                id: 6, 
                name: "SUMATERA UTARA REGION",
                fullName: "SUMATERA UTARA REGION OFFICE",
                address: "Jl. Amal No.44, Sunggal, Kec. Medan Sunggal, Kota Medan, Sumatera Utara 20127",
                lat: 3.590000, 
                lng: 98.650000,
                phone: "-",
                email: "sumateraregional@syntegra-services.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
            { 
                id: 7, 
                name: "SUMATERA SELATAN REGION",
                fullName: "SUMATERA SELATAN REGION OFFICE",
                address: "JL. Sirna Raga Blok A2 Kel. 8 Ilir, Palembang Sumatera Selatan 30114",
                lat: -2.960000, 
                lng: 104.750000,
                phone: "-",
                email: "sws.sumsel@syntegra-services.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
            { 
                id: 8, 
                name: "LAMPUNG REGION",
                fullName: "LAMPUNG REGION OFFICE",
                address: "JL. Terusan Riakudu Kel. Jatimulyo Kec. Jatiagung Kab. Lampung Selatan Lampung 35365",
                lat: -5.350000, 
                lng: 105.280000,
                phone: "-",
                email: "sws.lampung@syntegra-services.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
            { 
                id: 9, 
                name: "BENGKULU REGION",
                fullName: "BENGKULU REGION OFFICE",
                address: "JL. Kapten Tendean Kec. Singaran Pati Kota Bengkulu Bengkulu 38224",
                lat: -3.800000, 
                lng: 102.260000,
                phone: "-",
                email: "sws.bengkulu@syntegra-services.com",
                hours: "Senin - Jumat: 09:00 - 18:00"
            },
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
                const baseClass = "snap-center flex-shrink-0 px-5 py-3 rounded-xl text-sm font-bold transition-all duration-300 border flex items-center justify-between group w-auto lg:w-full lg:text-left";
                const activeClass = "bg-gray-900 text-yellow-400 border-gray-900 shadow-lg scale-[1.02] ring-2 ring-offset-2 ring-gray-200";
                const inactiveClass = "bg-white text-gray-500 border-gray-200 hover:border-yellow-400 hover:text-gray-800 hover:bg-yellow-50 hover:pl-6";

                btn.className = `${baseClass} ${isActive ? activeClass : inactiveClass}`;
                btn.innerHTML = `
                    <span class="truncate">${branch.name}</span>
                    <i class="fas fa-chevron-right text-xs opacity-0 ${isActive ? 'opacity-100' : 'group-hover:opacity-100'} transition-opacity hidden lg:block"></i>
                `;
                btn.onclick = () => handleTabClick(index, btn);
                container.appendChild(btn);
            });
        }

        function handleTabClick(index, btnElement) {
            if (activeIndex === index) return;
            activeIndex = index;
            renderTabs(); 
            updateContent(index);
            btnElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
        }

        function updateContent(index) {
            const data = branches[index];
            const contentCard = document.querySelector('.content-animate');
            const mapLoader = document.getElementById('map-loader');
            const iframe = document.getElementById('map-iframe');
            const btnFullscreen = document.getElementById('btn-fullscreen');

            // Reset Animasi
            contentCard.style.animation = 'none';
            contentCard.offsetHeight; 
            contentCard.style.animation = 'slideIn 0.4s ease-out forwards';

            // Loader Map
            mapLoader.classList.remove('opacity-0', 'pointer-events-none');
            iframe.classList.add('opacity-0');

            // UPDATE INFO (TETAP PAKAI TEKS ALAMAT)
            document.getElementById('info-name').innerText = data.fullName;
            document.getElementById('info-mail').innerText = data.email;
            document.getElementById('info-address').innerText = data.address; // Text Alamat (bukan LatLong)
            document.getElementById('info-phone').innerText = data.phone;
            document.getElementById('info-hours').innerText = data.hours;

            // UPDATE MAP (PAKAI LAT & LONG)
            // q = Latitude,Longitude
            const mapCoords = `${data.lat},${data.lng}`;
            const embedUrl = `https://maps.google.com/maps?q=${mapCoords}&z=15&output=embed`;
            const directUrl = `https://www.google.com/maps/search/?api=1&query=${mapCoords}`;

            setTimeout(() => {
                iframe.src = embedUrl;
                iframe.onload = () => {
                    mapLoader.classList.add('opacity-0', 'pointer-events-none');
                    iframe.classList.remove('opacity-0');
                };
            }, 200);
        }

        init();

    // Mengambil file footer-contact.html dan memasukkannya ke div
    fetch('index.html')
        .then(response => response.text())
        .then(data => {document.getElementById('footer-placeholder').innerHTML = data;});
});