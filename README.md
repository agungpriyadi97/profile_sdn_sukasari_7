# 🏫 Website Resmi SDN Sukasari 7 Kota Tangerang

Selamat datang di repositori resmi **Website Profil & Layanan Informasi Publik SDN Sukasari 7 Kota Tangerang**. Website ini dirancang modern, responsif (*mobile-first*), cepat, dan mudah diakses oleh orang tua murid, calon pendaftar PPDB, guru, serta masyarakat luas.

---

## 🛠️ Tech Stack & Arsitektur

- **Frontend Core:** HTML5 Semantik, Vanilla JavaScript (ES6+ Modular)
- **Styling:** Tailwind CSS (via CDN) & Google Fonts (Plus Jakarta Sans)
- **Icons:** Lucide Icons (via Unpkg)
- **Backend API:** Google Apps Script Web App (Serverless)
- **Database:** Google Sheets (`DB_PORTAL_SDN_SUKASARI_7`)
- **Interactive Features:** Responsive Navigation, Skeleton Loaders, News Article Modal Popup, Dynamic GTK Directory with Fallback Avatars, Hall of Fame Prestasi, & Asynchronous Guestbook Form.

---

## 📁 Struktur Direktori Proyek

```text
sdn-sukasari-7/
├── index.html        # Berkas HTML utama halaman portal sekolah
├── js/
│   ├── api.js        # Modul integrasi ke Google Apps Script API & Graceful Fallback
│   └── app.js        # Logika interaktivitas UI, event listeners, filter, & modal
├── PRD.md            # Product Requirement Document (PRD) lengkap
├── README.md         # Petunjuk penggunaan & instruksi deployment
└── .gitignore        # Mengabaikan file sistem & log yang tidak diperlukan
```

---

## 🌐 Live API Endpoint Backend

API menggunakan Google Apps Script Web App yang terhubung ke Google Sheets:
- **Base Endpoint URL:**  
  `https://script.google.com/macros/s/AKfycbwxuOp-iQ4pL0QQUK7JF26YFLHYCuEWk4Kv8VXm6QqZE821_b46Yfu_vs5Z7CW2-dta8g/exec`
- **GET (`?action=getPublicData`):** Mengambil data profil sekolah, direktori guru, berita/agenda, dan prestasi siswa.
- **POST (`action: submitBukuTamu`):** Mengirim entri buku tamu dan menghasilkan nomor tiket konfirmasi.

---

## 🚀 Cara Menjalankan Proyek Secara Lokal

Karena proyek ini dibangun menggunakan Vanilla HTML/JS dan Tailwind CSS CDN, Anda tidak memerlukan instalasi build step kompilasi Node.js (zero setup required).

### Opsi 1: Menggunakan VS Code Live Server (Direkomendasikan)
1. Buka folder proyek ini di Visual Studio Code.
2. Install ekstensi **Live Server** di VS Code.
3. Klik kanan pada file `index.html`, lalu pilih **"Open with Live Server"**.
4. Website akan terbuka otomatis di browser Anda pada alamat `http://127.0.0.1:5500`.

### Opsi 2: Menggunakan HTTP Server Lokal Sederhana
Jika Anda memiliki Node.js atau Python terinstall:
```bash
# Menggunakan Python 3:
python -m http.server 8000

# Menggunakan npx serve:
npx serve .
```
Akses di browser melalui `http://localhost:8000`.

---

## 📤 Langkah Deployment ke GitHub & Vercel

Target Repositori Remote Git:  
`https://github.com/agungpriyadi97/profile_sekolah.git`

### 1. Inisialisasi & Push ke GitHub

Jalankan perintah berikut di terminal root proyek:

```bash
# Inisialisasi Git repositori
git init

# Tambahkan remote repository
git remote add origin https://github.com/agungpriyadi97/profile_sekolah.git

# Stage semua file
git add .

# Commit perdana
git commit -m "feat: inisialisasi awal website resmi SDN Sukasari 7 Kota Tangerang v1.0.0"

# Push ke branch main (atau master)
git branch -M main
git push -u origin main
```

### 2. Deployment ke Vercel

1. Buka dashboard [Vercel](https://vercel.com) dan login dengan akun GitHub Anda.
2. Klik tombol **"Add New..."** -> **"Project"**.
3. Hubungkan akun GitHub Anda dan pilih repositori `agungpriyadi97/profile_sekolah`.
4. Pilih **Framework Preset:** `Other` (Static Site).
5. Klik **"Deploy"**. Vercel akan mempublikasikan website secara otomatis dalam beberapa detik dengan domain gratis `.vercel.app`.

---

## 📄 Lisensi & Hak Cipta

© 2026 UPT Satuan Pendidikan SDN Sukasari 7 Kota Tangerang. Seluruh hak cipta dilindungi undang-undang.
