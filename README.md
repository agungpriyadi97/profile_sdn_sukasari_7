# 🏫 Website Resmi & Dashboard TU SDN Sukasari 4 Kota Tangerang

Selamat datang di repositori resmi **Website Profil & Dashboard Administrasi TU SDN Sukasari 4 Kota Tangerang**. Website ini dirancang modern, responsif (*mobile-first*), cepat, dan mudah diakses oleh orang tua murid, calon pendaftar PPDB, guru, serta masyarakat luas.

---

## 🛠️ Tech Stack & Arsitektur

- **Frontend Core:** HTML5 Semantik, Vanilla JavaScript (ES6+ Modular)
- **Styling:** Tailwind CSS (via CDN) & Google Fonts (Plus Jakarta Sans)
- **Icons:** Lucide Icons (via Unpkg)
- **Backend API:** Google Apps Script Web App (Serverless)
- **Database:** Google Sheets (`DB_PORTAL_SDN_SUKASARI_4` dengan 6 Worksheets)
- **Fitur Unggulan:** 
  - Profil Sekolah & Kepala Sekolah (Romlah, S.Pd., M.Pd.)
  - Keunggulan Sekolah Ramah Anak Terstandarisasi PISA (Pusat Informasi Sahabat Anak)
  - Prestasi Lomba Tingkat Pramuka Penggalang & Akademik OSN/FLS2N
  - Informasi & Direct Link PPDB Kota Tangerang (`https://ppdb.tangerangkota.go.id`)
  - Form Buku Tamu Asinkronus (AJAX) + Generasi Nomor Tiket
  - Embed Interactive Google Maps SDN Sukasari 4 Kota Tangerang
  - Dashboard Admin TU untuk Manajemen Berita, Guru & Staf, serta Admin Users

---

## 📁 Struktur Direktori Proyek

```text
sdn-sukasari-4/
├── index.html        # Halaman publik website profil resmi sekolah
├── admin.html        # Dashboard administrasi Tata Usaha (TU)
├── js/
│   ├── api.js        # Modul integrasi ke Google Apps Script API & Data Fallback
│   └── app.js        # Logika interaktivitas UI publik, filter, & modal reader
├── css/
│   └── style.css     # Styling kustom & animasi tambahan
├── PRD.md            # Product Requirement Document (PRD) v1.0.0
├── README.md         # Dokumentasi setup, API URL, & panduan deploy
└── .gitignore        # Berkas penutup git ignore
```

---

## 🌐 Live API Endpoint Backend

API menggunakan Google Apps Script Web App yang terhubung ke Google Sheets:
- **Base Endpoint URL:**  
  `https://script.google.com/macros/s/AKfycbx2P3NOiiwku-tg6ppFfdRX-XNy6F0nUX132GCGiCo_rSAN9Z2sRu64-dupG4whb7Fg/exec`
- **Konstanta API di `js/api.js`:**
  ```javascript
  const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbx2P3NOiiwku-tg6ppFfdRX-XNy6F0nUX132GCGiCo_rSAN9Z2sRu64-dupG4whb7Fg/exec';
  ```
- **Fungsi GET (`?action=getPublicData`):** Mengambil data profil sekolah, direktori guru, berita/agenda, dan prestasi siswa.
- **Fungsi POST (`submitBukuTamu`, `saveBerita`, `deleteBerita`, `saveGuru`, `deleteGuru`, `saveAdminUser`, `deleteAdminUser`):** Mengirim request JSON ke backend.

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Proyek ini dibangun menggunakan Vanilla HTML/JS dan Tailwind CSS CDN sehingga tidak memerlukan proses kompilasi Node.js (zero build step).

### Opsi 1: Menggunakan VS Code Live Server (Direkomendasikan)
1. Buka folder proyek ini di Visual Studio Code.
2. Install ekstensi **Live Server** di VS Code.
3. Klik kanan pada file `index.html` atau `admin.html`, lalu pilih **"Open with Live Server"**.
4. Website akan terbuka otomatis di browser Anda.

### Opsi 2: Menggunakan HTTP Server Lokal
Jika Anda memiliki Node.js atau Python:
```bash
# Python 3:
python -m http.server 8000

# npx serve:
npx serve .
```
Akses di browser melalui `http://localhost:8000`.

---

## 🔑 Kredensial Login Admin TU Default

Untuk mengakses `admin.html` secara lokal maupun server:
- **Username:** `admin`
- **Password:** `admin123`
*(Password akan diverifikasi menggunakan hashing SHA-256).*

---

## 📤 Langkah Push ke GitHub & Deploy ke Vercel / Netlify

### 1. Push ke GitHub
```bash
# Commit & Push perubahan ke repositori
git add .
git commit -m "feat: implementasi lengkap website resmi & dashboard TU SDN Sukasari 4 Kota Tangerang"
git push -u origin main
```

### 2. Deploy ke Vercel / Netlify
1. Hubungkan repositori GitHub ke dashboard [Vercel](https://vercel.com) atau [Netlify](https://netlify.com).
2. Set **Framework Preset** ke `Other` (Static Site).
3. Set **Root Directory** ke `./`.
4. Klik **Deploy**. Website akan langsung aktif secara publik dengan SSL HTTPS gratis.

---

## 📄 Lisensi & Hak Cipta

© 2026 UPT Satuan Pendidikan SDN Sukasari 4 Kota Tangerang. Seluruh hak cipta dilindungi undang-undang.
