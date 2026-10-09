# 📑 PRODUCT REQUIREMENT DOCUMENT (PRD)

## Metadata Dokumen
| Parameter | Detail |
| :--- | :--- |
| **Nama Proyek** | Website Profil Official & Dashboard Administrasi TU SDN Sukasari 4 Kota Tangerang |
| **Instansi / Sekolah** | UPT Satuan Pendidikan SD Negeri Sukasari 4 Kota Tangerang |
| **NPSN & Akreditasi** | 20606443 (Akreditasi A) |
| **Alamat** | Jl. Moch. Yamin No. 1, Kel. Babakan, Kec. Tangerang, Kota Tangerang, Banten 15118 |
| **Kontak Email** | sdnsukasari4tgr@gmail.com |
| **Sosial Media** | Instagram: @sdnsukasari4 |
| **Kepala Sekolah** | Romlah, S.Pd., M.Pd. |
| **Keunggulan Utama** | Sekolah Ramah Anak Terstandarisasi PISA (Pusat Informasi Sahabat Anak), Berprestasi Lomba Tingkat Pramuka & Akademik |
| **Versi Dokumen** | v1.0.0 (Production Ready) |
| **Status** | Approved / Production |
| **Target Platform** | Web Application (Responsive Desktop, Tablet, & Mobile) |
| **Tech Stack** | Frontend: HTML5, Tailwind CSS via CDN, Lucide Icons via unpkg, Vanilla JavaScript (ES6+)<br>Backend API: Google Apps Script Web App<br>Database: Google Sheets (6 Tab Worksheets)<br>Deployment: Vercel / Netlify / GitHub Pages |
| **Live API Endpoint** | `https://script.google.com/macros/s/AKfycbx2P3NOiiwku-tg6ppFfdRX-XNy6F0nUX132GCGiCo_rSAN9Z2sRu64-dupG4whb7Fg/exec` |

---

## 1. Ringkasan Eksekutif & Latar Belakang

### 1.1 Latar Belakang
SD Negeri Sukasari 4 Kota Tangerang merupakan sekolah dasar unggulan di Kecamatan Tangerang yang terakreditasi A dan berstatus Sekolah Ramah Anak Terstandarisasi PISA (Pusat Informasi Sahabat Anak). Sekolah ini memiliki rekam jejak prestasi yang gemilang di tingkat Pramuka, akademik, maupun seni-olahraga. Untuk mendukung transparansi informasi publik dan mempermudah layanan bagi calon wali murid (PPDB), orang tua siswa, dan masyarakat luas, diperlukan platform website resmi dan dashboard administrasi Tata Usaha (TU) secara online.

### 1.2 Tujuan Produk
1. **Pusat Informasi Digital Official:** Menyajikan profil lengkap, legalitas NPSN 20606443, status Akreditasi A, serta sambutan Kepala Sekolah (Romlah, S.Pd., M.Pd.).
2. **Branding Keunggulan Sekolah:** Mengangkat prestasi tingkat Pramuka & Akademik serta status Sekolah Ramah Anak Terstandarisasi PISA.
3. **Portal Layanan PPDB Kota Tangerang:** Menyediakan informasi syarat, alur zonasi/afirmasi, dan tautan langsung ke portal resmi PPDB Kota Tangerang (`https://ppdb.tangerangkota.go.id`).
4. **Formulir Buku Tamu Interaktif (AJAX):** Memfasilitasi pengunjung untuk mengajukan pertanyaan / aspirasi tanpa reload halaman, tersimpan otomatis di backend Google Sheets.
5. **Dashboard TU Berbasis Cloud:** Sistem Manajemen Admin TU modern untuk mengelola Berita & Agenda, Data Guru & Staf, serta Akun Operator TU secara real-time via API Google Apps Script.

---

## 2. Arsitektur Database Google Sheets (6 Tab Worksheets)

Database utama berada pada Google Sheets dengan nama spreadsheet **`DB_PORTAL_SDN_SUKASARI_4`** yang terdiri dari 6 tab:

1. **`Profil_Sekolah`**
   - Kolom: `nama_sekolah`, `npsn`, `akreditasi`, `alamat`, `email`, `instagram`, `kepala_sekolah`, `sambutan`, `embed_maps_url`.
2. **`Guru_Staf`**
   - Kolom: `id_guru`, `nama_lengkap`, `jabatan`, `kategori`, `foto_url`, `urutan_tampil`, `status_aktif`.
3. **`Berita_Agenda`**
   - Kolom: `id_konten`, `tipe`, `judul`, `tanggal_event`, `ringkasan`, `isi_lengkap`, `gambar_url`, `status_tampil`.
4. **`Prestasi_Siswa`**
   - Kolom: `id_prestasi`, `nama_lomba`, `peringkat`, `nama_siswa`, `tingkat`, `tahun`, `foto_url`.
5. **`Buku_Tamu_Aspirasi`**
   - Kolom: `id_pesan`, `timestamp`, `nama_pengirim`, `kategori_tamu`, `no_whatsapp`, `keperluan`, `isi_pesan`, `status`, `catatan_tu`.
6. **`Admin_Users`**
   - Kolom: `username`, `password_hash`, `nama_petugas`, `role`.

---

## 3. Spesifikasi Kontrak API (Google Apps Script)

- **Base URL:**
  `https://script.google.com/macros/s/AKfycbx2P3NOiiwku-tg6ppFfdRX-XNy6F0nUX132GCGiCo_rSAN9Z2sRu64-dupG4whb7Fg/exec`

### 3.1 Endpoint GET (Fetch Data Publik)
- **URL Query:** `?action=getPublicData`
- **Response Format (JSON):**
  ```json
  {
    "status": "success",
    "data": {
      "profil": {
        "nama_sekolah": "SD Negeri Sukasari 4 Kota Tangerang",
        "npsn": "20606443",
        "akreditasi": "A",
        "kepala_sekolah": "Romlah, S.Pd., M.Pd.",
        "email": "sdnsukasari4tgr@gmail.com",
        "instagram": "@sdnsukasari4"
      },
      "guru": [
        {
          "id": "GTK-001",
          "nama": "Romlah, S.Pd., M.Pd.",
          "jabatan": "Kepala Sekolah",
          "kategori": "Pimpinan",
          "foto_url": "..."
        }
      ],
      "berita": [
        {
          "id": "NWS-001",
          "tipe": "Berita",
          "judul": "SDN Sukasari 4 Meraih Juara Utama Lomba Pramuka Kota Tangerang",
          "tanggal": "2026-10-05",
          "ringkasan": "...",
          "isi": "..."
        }
      ],
      "prestasi": [
        {
          "id": "PRS-001",
          "lomba": "Lomba Regu Reguler Pramuka Penggalang",
          "peringkat": "Juara 1",
          "nama": "Tim Pramuka SDN Sukasari 4",
          "tingkat": "Kota Tangerang"
        }
      ]
    }
  }
  ```

### 3.2 Endpoint POST (Aksi Pengunjung & Admin TU)
- **Form Buku Tamu (`action: "submitBukuTamu"`):**
  ```json
  {
    "action": "submitBukuTamu",
    "payload": {
      "nama": "Ahmad Subandi",
      "kategori": "Calon Wali Murid",
      "whatsapp": "081234567890",
      "keperluan": "Informasi Persyaratan PPDB",
      "pesan": "Mohon informasi kuota jalur zonasi untuk kelurahan Babakan."
    }
  }
  ```
- **CRUD Operations Dashboard TU:**
  - `action: "saveBerita"` / `deleteBerita`
  - `action: "saveGuru"` / `deleteGuru`
  - `action: "saveAdminUser"` / `deleteAdminUser`

---

## 4. Modul Halaman Website

1. **`index.html` (Website Profil Publik):**
   - Top Header Bar: NPSN 20606443, Akreditasi A, Email `sdnsukasari4tgr@gmail.com`, IG `@sdnsukasari4`.
   - Navbar & Mobile Navigation Drawer.
   - Hero Banner: Headline Sekolah Ramah Anak PISA & Prestasi Pramuka/Akademik, Tombol CTA PPDB.
   - Sambutan Kepala Sekolah: Romlah, S.Pd., M.Pd.
   - Key Statistics & Badges: NPSN 20606443, Akreditasi A, PISA Ramah Anak, Kurikulum Merdeka.
   - Dynamic Directory: Dewan Guru & Staf, Berita & Agenda, Prestasi Siswa.
   - Section PPDB Kota Tangerang + Link Direct ke `https://ppdb.tangerangkota.go.id`.
   - Buku Tamu AJAX + Embed Google Maps SDN Sukasari 4 Kota Tangerang.
   - Footer Informasi Lengkap.

2. **`admin.html` (Dashboard Administrasi TU):**
   - Halaman Login Keamanan Admin (SHA-256 Hashing).
   - Sidebar/Header Navigasi 3 Tab Modul:
     1. Kelola Berita & Agenda Sekolah.
     2. Kelola Guru & Staf Pendidik.
     3. Kelola Akun Admin Users / Operator.
   - Modal Form Tambah/Edit Data dan Tombol Hapus Data dengan konfirmasi.