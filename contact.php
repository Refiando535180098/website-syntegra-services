<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hubungi Kami - Syntegra Services</title>

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">
    <link rel="stylesheet" href="style.css">
</head>

<body class="contact-page">

    <?php include 'nav.php'; ?>

    <main>
        <section class="hero">
            <div class="hero-overlay"></div>
            <div class="container hero-content">
                <h1>Hubungi Kami</h1>
                <p class="hero-subtitle">Kami siap membantu Anda. Temukan lokasi kami, ajukan pertanyaan, atau bergabunglah dengan tim kami.</p>
            </div>
        </section>

    <div class="max-w-7xl mx-auto px-4 py-8">
        
        <div class="flex flex-col lg:flex-row gap-8 items-start">
            
            <div class="w-full lg:w-1/3 flex-shrink-0 z-10">
                <div class="sticky top-4">
                    <h3 class="text-lg font-bold text-gray-800 mb-4 px-2 uppercase tracking-wider border-l-4 border-yellow-500 pl-3">
                        Pilih Kantor Kami <br> (Klik untuk melihat detail)
                    </h3>
                    
                    <div id="tab-scroll-container" class="flex lg:flex-col overflow-x-auto lg:overflow-visible gap-3 pb-4 lg:pb-0 no-scrollbar snap-x">
                        </div>
                    
                    <div class="lg:hidden text-center text-xs text-gray-400 mt-2 animate-pulse">
                        <i class="fas fa-arrow-left"></i> Geser <i class="fas fa-arrow-right"></i>
                    </div>
                </div>
            </div>

            <div class="w-full lg:w-2/3" id="main-content">
                <div class="bg-white rounded-[24px] shadow-xl shadow-gray-200/50 overflow-hidden border border-white content-animate relative">
                    
                    <div class="relative h-[300px] lg:h-[400px] w-full bg-gray-100 group">
                        <iframe 
                            id="map-iframe"
                            class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                            frameborder="0" 
                            allowfullscreen 
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                        
                        <div id="map-loader" class="absolute inset-0 flex items-center justify-center bg-gray-100 z-10 transition-opacity duration-300">
                            <div class="text-center">
                                <i class="fas fa-circle-notch fa-spin text-yellow-500 text-3xl mb-2"></i>
                                <p class="text-gray-500 text-sm">Memuat Peta...</p>
                            </div>
                        </div>
                    </div>

                    <div class="p-6 lg:p-8">
                        <div class="mb-6 border-b border-gray-100 pb-4">
                            <span class="text-[10px] font-bold tracking-widest text-yellow-600 bg-yellow-100 px-2 py-1 rounded-md uppercase">Kantor Terpilih</span>
                            <h2 class="text-2xl font-bold text-gray-900 mt-3 leading-tight" id="info-name">Loading...</h2>
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div class="md:col-span-2 flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition">
                                <div class="w-10 h-10 rounded-full bg-yellow-50 flex items-center justify-center flex-shrink-0 text-yellow-600 shadow-sm border border-yellow-100">
                                    <i class="fas fa-map-pin text-lg"></i>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-400 font-bold uppercase mb-1">Alamat</p>
                                    <p class="text-sm text-gray-700 leading-relaxed font-medium" id="info-address">...</p>
                                </div>
                            </div>

                            <div class="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition">
                                <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 text-blue-600 shadow-sm border border-blue-100">
                                    <i class="fas fa-phone-alt text-lg"></i>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-400 font-bold uppercase mb-1">Telepon</p>
                                    <p class="text-sm text-gray-700 font-medium" id="info-phone">...</p>
                                </div>
                            </div>

                            <div class="flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition">
                                <div class="w-10 h-10 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0 text-green-600 shadow-sm border border-green-100">
                                    <i class="fas fa-envelope text-lg"></i>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-400 font-bold uppercase mb-1">Email</p>
                                    <p class="text-sm text-gray-700 font-medium break-all" id="info-mail">...</p>
                                </div>
                            </div>

                            <div class="md:col-span-2 flex gap-4 items-start p-3 hover:bg-gray-50 rounded-lg transition">
                                <div class="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0 text-purple-600 shadow-sm border border-purple-100">
                                    <i class="fas fa-clock text-lg"></i>
                                </div>
                                <div>
                                    <p class="text-xs text-gray-400 font-bold uppercase mb-1">Jam Operasional</p>
                                    <p class="text-sm text-gray-700 font-medium" id="info-hours">...</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

        <!-- <section id="info-maps-section" class="content-section">
            <div class="container">
                <div class="info-maps-grid">
                    <div class="contact-details"> 
                        <h2 style="text-align: left;">Informasi Kontak</h2>
                        <p style="text-align: justify;">Jangan ragu untuk menghubungi kami melalui detail di bawah ini atau kunjungi kantor kami.</p>
                        
                        <div class="info-item">
                            <i class="fas fa-map-marker-alt"></i>
                            <div style="text-align: left;">
                                <strong>Alamat Kantor</strong>
                                <p>Komp. Ruko BSD Sektor VII, Jl. Pahlawan Seribu No.63 - 64 Blok RN, WetanTangerang, Kec. Serpong, Kota Tangerang Selatan, Banten 15310, Indonesia</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-phone-alt"></i>
                            <div style="text-align: left;">
                                <strong>Telepon Kantor</strong>
                                <p>0800-1778889</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-envelope"></i>
                            <div style="text-align: left;">
                                <strong>Email</strong>
                                <p>ho@syntegra-services.com</p>
                            </div>
                        </div>
                        <div class="info-item">
                            <i class="fas fa-clock"></i>
                            <div style="text-align: left;">
                                <strong>Jam Operasional</strong>
                                <p>Senin - Jumat: 09:00 - 18:00 WIB</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="map-container">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.017772652617!2d106.66016931527715!3d-6.26125646303248!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69fb5d33013897%3A0x86181f1ac42e2b0!2sRuko%20BSD%20Sektor%20VII!5e0!3m2!1sen!2sid!4v1662547144930!5m2!1sen!2sid" 
                            width="600" 
                            height="450" 
                            style="border:0;" 
                            allowfullscreen="" 
                            loading="lazy" 
                            referrerpolicy="no-referrer-when-downgrade">
                        </iframe>
                    </div>
                </div>
            </div>
        </section> -->
        
        <section id="form-section" class="content-section">
            <div class="container">
                <div class="form-container-wrapper">
                    <h2>Kirim Pesan atau Lamaran</h2>
                    
                    <div class="form-tabs">
                        <button class="tab-button active" data-form="tanya">
                            <i class="fas fa-question-circle"></i> Ajukan Pertanyaan
                        </button>
                        <button class="tab-button" data-form="karir">
                            <i class="fas fa-briefcase"></i> Bergabung dengan Tim Kami
                        </button>
                    </div>

                    <div class="form-content-wrapper">
                        
                        <div id="tanya-form" class="form-container active">
                            <form action="mailto:ho@syntegra-services.com" method="post" enctype="text/plain">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <input type="text" id="nama-tanya" name="Nama" required>
                                        <label for="nama-tanya">Nama Lengkap</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="email" id="email-tanya" name="Email" required>
                                        <label for="email-tanya">Alamat Email</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <textarea id="pesan-tanya" name="Pesan" rows="5" required></textarea>
                                    <label for="pesan-tanya">Pesan Anda</label>
                                </div>
                                <button type="submit" class="btn-submit">Kirim Pertanyaan <i class="fas fa-paper-plane"></i></button>
                            </form>
                        </div>

                        <div id="karir-form" class="form-container">
                            <p style="text-align: center; margin-bottom: 20px;">Lengkapi data di bawah ini untuk mengajukan lamaran pekerjaan.</p>
                            <form id="form-lamaran-kerja">
                                <div class="form-grid">
                                    <div class="form-group">
                                        <input type="text" id="nama-karir" name="Nama Lengkap" required>
                                        <label for="nama-karir">Nama Lengkap</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" id="ktp-karir" name="No. KTP" required>
                                        <label for="ktp-karir">No. KTP</label>
                                    </div>
                                </div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <input type="email" id="email-karir" name="Email" required>
                                        <label for="email-karir">Alamat Email</label>
                                    </div>
                                    <div class="form-group">
                                        <input type="tel" id="telepon-karir" name="No. Telepon Aktif" required>
                                        <label for="telepon-karir">No. Telepon (WhatsApp)</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <textarea id="alamat-karir" name="Alamat Lengkap" rows="3" required></textarea>
                                    <label for="alamat-karir">Alamat Lengkap (sesuai KTP)</label>
                                </div>
                                <div class="form-grid">
                                    <div class="form-group">
                                        <select id="posisi-karir" name="Posisi yang Dilamar" required>
                                            <option value="" disabled selected>Pilih Posisi...</option>
                                            <option value="Security">Security / Satuan Pengamanan</option>
                                            <option value="Labour Supply">Labour Supply / Tenaga Kerja</option>
                                            <option value="Cleaning Service">Cleaning Service</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                        <label for="posisi-karir" class="label-select">Posisi yang Dilamar</label>
                                    </div>
                                    <div class="form-group">
                                        <select id="pendidikan-karir" name="Pendidikan Terakhir" required>
                                            <option value="" disabled selected>Pilih Pendidikan...</option>
                                            <option value="SMA/SMK Sederajat">SMA/SMK Sederajat</option>
                                            <option value="D3">Diploma (D3)</option>
                                            <option value="S1">Sarjana (S1)</option>
                                            <option value="Lainnya">Lainnya</option>
                                        </select>
                                        <label for="pendidikan-karir" class="label-select">Pendidikan Terakhir</label>
                                    </div>
                                </div>
                                
                                <fieldset class="form-fieldset">
                                    <legend>Persyaratan Fisik (Wajib diisi pelamar Security)</legend>
                                    <div class="form-grid">
                                        <div class="form-group">
                                            <input type="number" id="tinggi-karir" name="Tinggi Badan (cm)">
                                            <label for="tinggi-karir">Tinggi Badan (cm)</label>
                                        </div>
                                        <div class="form-group">
                                            <input type="number" id="berat-karir" name="Berat Badan (kg)">
                                            <label for="berat-karir">Berat Badan (kg)</label>
                                        </div>
                                        <div class="form-group">
                                            <select id="gada-pratama" name="Sertifikat Gada Pratama">
                                                <option value="" disabled selected>Pilih Status...</option>
                                                <option value="Punya">Punya</option>
                                                <option value="Tidak Punya">Tidak Punya</option>
                                            </select>
                                            <label for="gada-pratama" class="label-select">Sertifikat Gada Pratama</label>
                                        </div>
                                    </div>
                                </fieldset>

                                <div class="form-group">
                                    <textarea id="pengalaman-karir" name="Pengalaman Kerja" rows="4" required></textarea>
                                    <label for="pengalaman-karir">Ringkasan Pengalaman Kerja</label>
                                </div>

                                <fieldset class="form-fieldset">
                                    <legend>Unggah Dokumen (Maks. 2MB per file)</legend>
                                    <div class="form-grid-upload">
                                        <div class="form-group-file">
                                            <label for="cv-upload">Curriculum Vitae (CV) (.pdf)</label>
                                            <input type="file" id="cv-upload" name="CV" accept=".pdf" required>
                                        </div>
                                        <div class="form-group-file">
                                            <label for="foto-upload">Foto Terbaru (.jpg, .png)</label>
                                            <input type="file" id="foto-upload" name="Foto" accept=".jpg,.jpeg,.png" required>
                                        </div>
                                    </div>
                                </fieldset>

                                <button type="submit" class="btn-submit">Kirim Lamaran <i class="fas fa-paper-plane"></i></button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <button id="backToTopBtn" title="Kembali ke atas">
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="up-circle" class="icon glyph" fill="#000000" stroke="#000000" stroke-width="0.00024000000000000003"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M12,2A10,10,0,1,0,22,12,10,10,0,0,0,12,2Zm3.71,11.71a1,1,0,0,1-1.42,0L12,11.41l-2.29,2.3a1,1,0,0,1-1.42-1.42l3-3a1,1,0,0,1,1.42,0l3,3A1,1,0,0,1,15.71,13.71Z" style="fill:#231f20"></path></g></svg>
    </button>

    <?php include 'footer.php'; ?>

    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script src="script.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
</body>
</html>