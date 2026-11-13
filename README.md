# AutoNova Nusantara - Portal Web Terpadu
> **Tema Proyek:** Penjualan Online, Web Profile, Pemasaran/Promosi, dan Forum/Komunitas.

---

## 📌 Struktur Folder & File Proyek

Proyek ini telah ditata dan dirapikan ke dalam folder-folder terstruktur dengan **`index.html`** sebagai berkas utama (*main entry point*):

```text
ENGKI-PROJEK/
│
├── index.html                   # ⭐ HALAMAN UTAMA (Main Portal Terpadu AutoNova Nusantara)
├── Utama.html                   # Salinan sinkronisasi halaman utama terpadu
│
├── css/
│   └── style.css                # Desain sistem & stylesheet modern responsif
│
├── js/
│   └── main.js                  # Logika keranjang belanja, filter, kalkulator kredit & modal faktur
│
├── images/
│   ├── banner_mobil.jpg         # Banner showroom utama
│   ├── mobil1.jpg               # Tesla Model 3 EV Long Range
│   ├── mobil2.jpg               # Chevrolet Corvette Stingray C8
│   ├── mobil3.jpg               # Jeep Wrangler Rubicon 4x4
│   ├── mobil4.jpg               # Audi RS5 Coupe Quattro
│   ├── mobil5.jpg               # Ferrari 488 GTB Supercar
│   └── mobil6.jpg               # Ford Mustang GT Fastback 5.0
│
├── pages/                       # 📂 Halaman Modular Terpisah
│   ├── produk.html              # Penjualan Online & Katalog Mobil
│   ├── promosi.html             # Pemasaran, Flash Sale & Kupon Voucher
│   ├── komunitas.html           # Forum Diskusi & Komunitas Otomotif
│   └── transaksi.html           # Formulir Pemesanan & Simulasi Cicilan Kredit
│
├── arsip-tugas-lama/            # 📂 Arsip Seluruh Berkas Praktikum/Tugas Lama
│   ├── latihan-dasar/           # baru.html, coba.html, desain_sederhana.html, jss.html, navigasi.htm
│   ├── praktikum-css/           # css1.html - css4.html, CSS2.css, Pert 1.css, style1.css
│   └── tugas-showroom-tabel/    # tugas.html, galeri.html, hubkami.html, keranjang.html, dll.
│
└── README.md                    # Dokumentasi proyek & panduan Git
```

---

## 🚀 Fitur & Komponen Unggulan

1. **Halaman Utama Terpadu (`index.html`)**:
   - **Hero Carousel**: 3 Slide interaktif Bootstrap 5 otomatis dengan tombol aksi langsung.
   - **Web Profile**: Sejarah PT AutoNova Nusantara Motor, visi-misi, nilai layanan garansi 5 tahun, profil jajaran direksi dan master teknisi bersertifikasi ASE.
   - **Penjualan Online**: Katalog lengkap 6 mobil pilihan siap kirim, filter kategori, pencarian instan, sorting harga, modal detail spesifikasi, dan tombol pemesanan.
   - **Pemasaran & Promosi**: Hitungan mundur (*countdown timer*) flash sale, 4 kartu voucher diskon dengan tombol salin otomatis, dan paket bundel hemat.
   - **Forum Komunitas**: Wadah diskusi *AutoNova Club Indonesia* dengan filter kategori, tombol suka (*like counter*) interaktif, dan formulir pembuatan topik diskusi baru secara langsung.
   - **Formulir Transaksi**: Formulir pemesanan lengkap (data diri pemesan, pilihan warna, asuransi, skema tunai vs kredit leasing dengan simulasi DP & tenor, serta pembuatan faktur digital yang siap dicetak).
2. **Konten 100% Asli**: Bebas dari teks *lorem ipsum* dan menggunakan foto mobil berkualitas tinggi.
3. **Responsif**: Optimal di seluruh ukuran layar (ponsel pintar, tablet, maupun layar desktop).

---

## 🛠️ Panduan Operasional Git

### 1. Sambung Akun Git
```bash
# Unset akun lama:
git config --global --unset user.email
git config --global --unset user.name

# Set akun baru:
git config --global user.email "252011216@asia.ac.id"
git config --global user.name "252011216"
```

### 2. Menyimpan & Mengunggah Perubahan (Commit & Push)
```bash
git add .
git commit -m "Rapikan struktur folder proyek dan jadikan index.html sebagai main"
git push
```
