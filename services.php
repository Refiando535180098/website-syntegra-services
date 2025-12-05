<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>SYNTEGRA SERVICES | Layanan Kami</title>
    
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />
    <link rel="stylesheet" href="style.css">
</head>
<body>

    <?php include 'nav.php'; ?>

    <main>
        <section class="hero">
            <div class="hero-overlay"></div>
            <div class="container hero-content">
            <h1>Layanan Terbaik Kami</h1>
            </div>
        </section>

    <div class="service-page-wrapper">
        <nav class="service-nav-sticky">
            <ul>
                <li><a href="#security" class="nav-link">Keamanan</a></li>
                <li><a href="#labour" class="nav-link">Labour</a></li>
                <li><a href="#cleaning" class="nav-link">Cleaning</a></li>
                <li><a href="#parking" class="nav-link">Parkir</a></li>
                <div class="nav-pill"></div>
            </ul>
        </nav>

        <main class="service-content-scroll">
            <section id="security" class="service-section">
                <div class="service-image">
                    <img src="img/Doc2.jpeg" alt="Security Guard">
                </div>
                <div class="service-details">
                    <h2>Syntegra Security Service (SSS)</h2>
                    <p class="tagline">Kami memastikan keamanan Anda lebih dari sekedar perlindungan.</p>
                    <div class="feature-pills">
                        <span>Operasi di Seluruh Indonesia</span>
                        <span>Standar Keamanan dan K3</span>
                    </div>
                    <p style="text-align: justify;">Solusi kebutuhan keamanan Anda bukan hanya sekedar perlindungan fisik. Kami melindungi Anda lebih jauh dengan framework terintegrasi yang terdiri dari Plan-Prevent-Protect, solusi komprehensif untuk melindungi aset berharga Anda dan mencegah kerugian.</p>
                    <a href="contact.html" class="cta-button"> Kontak Kami <span class="arrow">&rarr;</span></a>
                </div>
            </section>
            <section id="labour" class="service-section">
                <div class="service-image">
                    <img src="img/LS2.jpeg" alt="Team Working">
                </div>
                <div class="service-details">
                    <h2>Syntegra Labour Supply (SLS)</h2>
                    <p class="tagline">Penyediaan tenaga kerja profesional dan terampil untuk segala kebutuhan bisnis.</p>
                    <div class="feature-pills">
                        <span>Proses Rekrutmen Ketat</span>
                        <span>Tenaga Kerja Terlatih</span>
                    </div>
                    <p style="text-align: justify;">Kami menyediakan sumber daya manusia yang telah melalui proses seleksi dan pelatihan ketat sesuai kebutuhan industri Anda. Fokus pada efisiensi operasional dan serahkan manajemen tenaga kerja kepada kami untuk mendukung produktivitas perusahaan Anda.</p>
                    <a href="contact.html" class="cta-button"> Kontak Kami <span class="arrow">&rarr;</span></a>
                </div>
            </section>

            <section id="cleaning" class="service-section">
                <div class="service-image">
                    <img src="img/CS1.jpg" alt="Cleaning Professional">
                </div>
                <div class="service-details">
                    <h2>Syntegra Cleaning Service (SCS)</h2>
                    <p class="tagline">Menciptakan lingkungan kerja yang bersih, sehat, dan nyaman.</p>
                    <div class="feature-pills">
                        <span>Peralatan Modern</span>
                        <span>Staf Profesional</span>
                    </div>
                    <p style="text-align: justify;">Layanan kebersihan kami menggunakan peralatan modern dan bahan pembersih ramah lingkungan yang ditangani oleh staf profesional. Kami memastikan setiap sudut fasilitas Anda bersih dan higienis, meningkatkan kenyamanan dan produktivitas kerja.</p>
                    <a href="contact.html" class="cta-button"> Kontak Kami <span class="arrow">&rarr;</span></a>
                </div>
            </section>

            <section id="parking" class="service-section">
                <div class="service-image">
                    <img src="img/parking.png" alt="Parking Service">
                </div>
                <div class="service-details">
                    <h2>Syntegra Parking Service (SPS)</h2>
                    <p class="tagline">Mengelola parkir dengan efisien dan aman untuk kenyamanan pelanggan Anda.</p>
                    <div class="feature-pills">
                        <span>Manajemen Parkir Terintegrasi</span>
                        <span>Keamanan Terjamin</span>
                    </div>
                    <p style="text-align: justify;">Layanan parkir kami menggabungkan teknologi modern dan staf terlatih untuk memastikan pengelolaan parkir yang efisien dan aman. Kami membantu mengoptimalkan ruang parkir dan meningkatkan pengalaman pelanggan Anda.</p>
                    <a href="contact.html" class="cta-button"> Kontak Kami <span class="arrow">&rarr;</span></a>
                </div>
            </section>
        </main>
    </div>
        <?php include 'footer.php'; ?>

    <script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
    <script src="script.js"></script>
</body>
</html>