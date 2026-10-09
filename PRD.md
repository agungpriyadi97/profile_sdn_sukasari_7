# 📑 PRODUCT REQUIREMENT DOCUMENT (PRD)

## Metadata Dokumen
| Parameter | Detail |
| :--- | :--- |
| **Nama Proyek** | Website Profil & Layanan Informasi SDN Sukasari 7 Kota Tangerang |
| **Instansi / Sekolah** | UPT Satuan Pendidikan SDN Sukasari 7 (NPSN: 20606454) |
| **Alamat** | Jl. Kasasi Raya No. 1, Kel. Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118 |
| **Versi Dokumen** | v1.0.0 (Production Ready) |
| **Status** | Approved / Development Phase |
| **Target Platform** | Web App (Responsive Mobile, Tablet, & Desktop) |
| **Tech Stack** | Frontend (HTML5, Tailwind CSS via CDN, Vanilla JS ES6), Backend (Google Apps Script API), Database (Google Sheets), Version Control (Git/GitHub), Deployment (Vercel) |
| **Live API Endpoint** | `https://script.google.com/macros/s/AKfycbwxuOp-iQ4pL0QQUK7JF26YFLHYCuEWk4Kv8VXm6QqZE821_b46Yfu_vs5Z7CW2-dta8g/exec` |

---

## 1. Ringkasan Eksekutif & Tujuan

### 1.1 Latar Belakang
SD Negeri Sukasari 7 Kota Tangerang membutuhkan kanal informasi digital resmi yang modern, cepat, dan transparan untuk memudahkan orang tua murid, calon pendaftar (PPDB), guru, dan masyarakat luas dalam mengakses pengumuman, data pendidik, jadwal kegiatan, serta prestasi sekolah tanpa hambatan.

### 1.2 Tujuan Produk
1. **Transparansi Informasi Publik:** Menyajikan profil sekolah, legalitas NPSN, visi-misi, sarpras, dan direktori GTK secara interaktif.
2. **Pusat Informasi PPDB:** Menjelaskan alur zonasi, syarat pendaftaran, dan rujukan ke portal PPDB resmi Kota Tangerang.
3. **Etalase Prestasi Siswa:** Dokumentasi rekam jejak juara lomba tingkat kecamatan, kota, hingga provinsi.
4. **Layanan Tamu Terintegrasi:** Form buku tamu dan permohonan informasi digital yang langsung tersimpan di Google Sheets secara real-time.
5. **Zero Infrastructure Cost:** Backend serverless menggunakan Google Apps Script terhubung Google Sheets.

---

## 2. Arsitektur Data & Endpoint API

### 2.1 Skema Tabel Google Sheets (`DB_PORTAL_SDN_SUKASARI_7`)
1. **`Profil_Sekolah`**: Menyimpan konfigurasi dasar (nama sekolah, alamat, npsn, telepon, moto, kepsek, sambutan).
2. **`Guru_Staf`**: `id_guru`, `nama_lengkap`, `jabatan`, `kategori`, `foto_url`, `urutan_tampil`, `status_aktif`.
3. **`Berita_Agenda`**: `id_konten`, `tipe`, `judul`, `tanggal_event`, `ringkasan`, `isi_lengkap`, `gambar_url`, `status_tampil`.
4. **`Prestasi_Siswa`**: `id_prestasi`, `nama_lomba`, `peringkat`, `nama_siswa`, `tingkat`, `tahun`, `foto_url`.
5. **`Buku_Tamu_Aspirasi`**: `id_pesan`, `timestamp`, `nama_pengirim`, `kategori_tamu`, `no_whatsapp`, `keperluan`, `isi_pesan`, `status`, `catatan_tu`.
6. **`Admin_Users`**: `username`, `password_hash`, `nama_petugas`, `role`.

### 2.2 Spesifikasi Kontrak API
- **Base URL:** `https://script.google.com/macros/s/AKfycbwxuOp-iQ4pL0QQUK7JF26YFLHYCuEWk4Kv8VXm6QqZE821_b46Yfu_vs5Z7CW2-dta8g/exec`
- **Metode GET (Fetch Data Publik):**
  - Query: `?action=getPublicData`
  - Response:
    ```json
    {
      "status": "success",
      "data": {
        "profil": { "nama_sekolah": "...", "npsn": "...", "sambutan_kepsek": "..." },
        "guru": [ { "id": "GTK-001", "nama": "...", "jabatan": "...", "kategori": "...", "foto": "..." } ],
        "berita": [ { "id": "NWS-001", "tipe": "Berita", "judul": "...", "tanggal": "...", "ringkasan": "...", "isi": "..." } ],
        "prestasi": [ { "id": "PRS-001", "lomba": "...", "peringkat": "...", "nama": "...", "tingkat": "..." } ]
      }
    }
    ```
- **Metode POST (Simpan Buku Tamu):**
  - Payload JSON:
    ```json
    {
      "action": "submitBukuTamu",
      "payload": {
        "nama": "Nama Tamu",
        "kategori": "Calon Wali Murid",
        "whatsapp": "081234567890",
        "keperluan": "Informasi PPDB",
        "pesan": "Pertanyaan..."
      }
    }
    ```
  - Response:
    ```json
    {
      "status": "success",
      "message": "Pesan berhasil disimpan",
      "ticketId": "MSG-202610-123"
    }
    ```

---

## 3. Spesifikasi UI & Komponen Halaman

1. **Top Bar & Navbar:** Kontak ringkas, NPSN, akreditasi, logo sekolah, link navigasi responsif dengan mobile toggle drawer.
2. **Hero Section:** Headline visual elegan, badge status sekolah negeri resmi, call-to-action (CTA) tombol informasi PPDB dan Profil.
3. **Statistik Cepat:** Badge Akreditasi A, NPSN 20606454, Kurikulum Merdeka, dan Kegiatan Ekskul.
4. **Sambutan Kepala Sekolah:** Foto representatif dan pesan visi misi kepemimpinan sekolah.
5. **Direktori Guru & Tenaga Kependidikan:** Render kartu guru secara dinamis dengan fallback avatar bila foto belum tersedia.
6. **Kabar & Agenda Sekolah:** Kartu berita dan agenda kegiatan dengan tanggal pelaksanaan dan popup/modal baca selengkapnya.
7. **Hall of Fame Prestasi:** Kartu penghargaan lomba (FLS2N, O2SN, dsb).
8. **Informasi Jalur PPDB:** Panduan berkas, jalur afirmasi/zonasi, dan tombol direct link ke `https://ppdb.tangerangkota.go.id`.
9. **Layanan Tamu & Embed Google Maps:**
   - Formulir buku tamu AJAX (tanpa reload).
   - Embed iframe Google Maps resmi SDN Sukasari 7:
     `https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15866.476449588117!2d106.62284878715823!3d-6.181705499999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f92df00d2825%3A0x45e33f4381edc088!2sSekolah%20Dasar%20Negeri%20Sukasari%207!5e0!3m2!1sid!2sid!4v1791527350842!5m2!1sid!2sid`
10. **Footer:** Hak cipta, kontak telepon/email, dan tautan resmi kedinasan.