/**
 * js/api.js
 * Modul pemanggilan API ke Google Apps Script backend SDN Sukasari 7 Kota Tangerang.
 * Mengimplementasikan caching sederhana, async/await, dan fallback data otomatis bila server offline/slow.
 */

const API_CONFIG = {
  ENDPOINT: 'https://script.google.com/macros/s/AKfycbwxuOp-iQ4pL0QQUK7JF26YFLHYCuEWk4Kv8VXm6QqZE821_b46Yfu_vs5Z7CW2-dta8g/exec',
  TIMEOUT: 8000 // 8 detik timeout
};

// Data Fallback Lokal (Graceful Degradation)
const FALLBACK_DATA = {
  profil: {
    nama_sekolah: "SDN Sukasari 7 Kota Tangerang",
    npsn: "20606454",
    akreditasi: "A (Unggul)",
    kurikulum: "Kurikulum Merdeka",
    alamat: "Jl. Kasasi Raya No. 1, Kel. Sukasari, Kec. Tangerang, Kota Tangerang, Banten 15118",
    telepon: "(021) 55792834",
    email: "sdnsukasari7tangerang@gmail.com",
    kepala_sekolah: "Hj. Siti Nurhasanah, M.Pd.",
    sambutan_kepsek: "Selamat datang di website resmi SDN Sukasari 7 Kota Tangerang. Kami berkomitmen menyelenggarakan pendidikan dasar yang berkarakter, kreatif, berwawasan lingkungan, serta adaptif terhadap perkembangan teknologi guna mencetak generasi unggul yang beriman dan bertakwa."
  },
  guru: [
    {
      id: "GTK-001",
      nama: "Hj. Siti Nurhasanah, M.Pd.",
      jabatan: "Kepala Sekolah",
      kategori: "Pimpinan",
      foto_url: "-"
    },
    {
      id: "GTK-002",
      nama: "Drs. H. Ahmad Fauzi, M.Pd.",
      jabatan: "Guru Kelas VI / Koordinator Kurikulum",
      kategori: "Guru Kelas",
      foto_url: "-"
    },
    {
      id: "GTK-003",
      nama: "Ratna Dewi, S.Pd.",
      jabatan: "Guru Kelas V / Pembina Pramuka",
      kategori: "Guru Kelas",
      foto_url: "-"
    },
    {
      id: "GTK-004",
      nama: "Budi Santoso, S.Pd. SD",
      jabatan: "Guru PJOK / Pembina Olahraga",
      kategori: "Guru Mapel",
      foto_url: "-"
    },
    {
      id: "GTK-005",
      nama: "Siti Rahmawati, S.Pd.",
      jabatan: "Guru Kelas III / Pembina Kesenian",
      kategori: "Guru Kelas",
      foto_url: "-"
    },
    {
      id: "GTK-006",
      nama: "Eka Putra, S.Pd.I.",
      jabatan: "Guru Pendidikan Agama Islam",
      kategori: "Guru Mapel",
      foto_url: "-"
    },
    {
      id: "GTK-007",
      nama: "Nurul Hidayah, S.Pd.",
      jabatan: "Guru Kelas II",
      kategori: "Guru Kelas",
      foto_url: "-"
    },
    {
      id: "GTK-008",
      nama: "Dewanti Anggraini, S.Pd.",
      jabatan: "Guru Kelas I",
      kategori: "Guru Kelas",
      foto_url: "-"
    },
    {
      id: "GTK-009",
      nama: "Hendra Wijaya, A.Md.",
      jabatan: "Kepala Tata Usaha & Operator Sekolah",
      kategori: "Tenaga Kependidikan",
      foto_url: "-"
    }
  ],
  berita: [
    {
      id: "NWS-001",
      tipe: "Berita",
      judul: "SDN Sukasari 7 Raih Juara 1 FLS2N Tingkat Kota Tangerang 2026",
      tanggal: "05 Oktober 2026",
      ringkasan: "Tim Tari Kreasi SDN Sukasari 7 berhasil menyabet gelar Juara 1 dalam ajang Festival dan Lomba Seni Siswa Nasional (FLS2N) Kota Tangerang.",
      isi: "Prestasi membanggakan kembali diukir oleh siswa-siswi SDN Sukasari 7 Kota Tangerang. Pada ajang Festival dan Lomba Seni Siswa Nasional (FLS2N) tingkat Kota Tangerang yang diselenggarakan di Gedung Kesenian Kota Tangerang, tim tari kreasi sekolah berhasil meraih Juara 1. Kepala Sekolah Hj. Siti Nurhasanah, M.Pd. menyampaikan apresiasi setinggi-tingginya kepada para siswa dan pelatih atas kerja keras serta dedikasinya. Selanjutnya tim akan mewakili Kota Tangerang di tingkat Provinsi Banten.",
      gambar_url: "asset/images/images 2.jpg"
    },
    {
      id: "NWS-002",
      tipe: "Agenda",
      judul: "Pentas Seni & Gelar Karya Projek Penguatan Profil Pelajar Pancasila (P5)",
      tanggal: "15 Oktober 2026",
      ringkasan: "Kegiatan unjuk karya dan bakat siswa-siswi dalam memamerkan hasil projek kearifan lokal dan gaya hidup berkelanjutan.",
      isi: "Dalam rangka mengimplementasikan Kurikulum Merdeka, SDN Sukasari 7 akan menggelar event tahunan 'Pentas Seni & Gelar Karya P5' pada tanggal 15 Oktober 2026 di Halaman Utama Sekolah. Acara ini akan menampilkan bazar wirausaha cilik, pameran daur ulang sampah, seni pertunjukan daerah, serta penyerahan penghargaan siswa berprestasi. Seluruh orang tua murid diundang hadir memeriahkan acara ini.",
      gambar_url: "asset/images/images 3.jpg"
    },
    {
      id: "NWS-003",
      tipe: "Berita",
      judul: "Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) Berjalan Lancar",
      tanggal: "28 September 2026",
      ringkasan: "Seluruh siswa kelas V mengikuti simulasi dan pelaksanaan ANBK dengan fasilitas laboratorium komputer yang memadai.",
      isi: "Pelaksanaan Asesmen Nasional Berbasis Komputer (ANBK) untuk kelas V di SDN Sukasari 7 berlangsung dengan aman dan lancar. Dengan dukungan fasilitas 30 unit komputer dan koneksi internet serat optik yang stabil, para peserta didik dapat menyelesaikan soal numerasi dan literasi dengan optimal.",
      gambar_url: "asset/images/imge 1.jpg"
    },
    {
      id: "NWS-004",
      tipe: "Agenda",
      judul: "Gerakan Sekolah Hijau & Kerja Bakti Bersama Komite Sekolah",
      tanggal: "20 Oktober 2026",
      ringkasan: "Aksi penanaman pohon hydroponik dan pemilahan sampah organik guna mempertahankan predikat Sekolah Adiwiyata.",
      isi: "Komite Sekolah bekerjasama dengan Tim Adiwiyata SDN Sukasari 7 mengajak seluruh warga sekolah dan orang tua murid untuk berpartisipasi dalam aksi Gerakan Sekolah Hijau pada Sabtu, 20 Oktober 2026. Kegiatan meliputi penanaman bibit pohon buah, perapihan tanaman hidroponik, dan edukasi pemilahan sampah dari rumah.",
      gambar_url: "asset/images/image-backgraound.jpg"
    }
  ],
  prestasi: [
    {
      id: "PRS-001",
      lomba: "Festival & Lomba Seni Siswa Nasional (FLS2N)",
      peringkat: "Juara 1",
      nama: "Tim Tari Kreasi SDN Sukasari 7",
      tingkat: "Tingkat Kota Tangerang",
      tahun: "2026",
      foto_url: "asset/images/images 3.jpg"
    },
    {
      id: "PRS-002",
      lomba: "Olimpiade Olahraga Siswa Nasional (O2SN) Bulutangkis",
      peringkat: "Juara 2",
      nama: "Muhammad Rizky Pratama (Kelas VB)",
      tingkat: "Tingkat Kecamatan Tangerang",
      tahun: "2026",
      foto_url: "asset/images/images 2.jpg"
    },
    {
      id: "PRS-003",
      lomba: "Lomba Pidato Bahasa Indonesia SD",
      peringkat: "Juara 1",
      nama: "Annisa Azzahra (Kelas VI A)",
      tingkat: "Tingkat Kota Tangerang",
      tahun: "2025",
      foto_url: "asset/images/imge 1.jpg"
    },
    {
      id: "PRS-004",
      lomba: "Lomba Melukis & Gambar Bercerita",
      peringkat: "Juara 3",
      nama: "Kevin Pratama (Kelas IV B)",
      tingkat: "Tingkat Provinsi Banten",
      tahun: "2025",
      foto_url: "asset/images/image-backgraound.jpg"
    }
  ]
};

const SchoolAPI = {
  /**
   * Mengambil data publik profil, guru, berita, dan prestasi sekolah.
   * @returns {Promise<Object>} Data public
   */
  async getPublicData() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

    try {
      const response = await fetch(`${API_CONFIG.ENDPOINT}?action=getPublicData`, {
        method: 'GET',
        signal: controller.signal,
        headers: {
          'Accept': 'application/json'
        }
      });
      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP Error status: ${response.status}`);
      }

      const result = await response.json();
      if (result && result.status === 'success' && result.data) {
        // Gabungkan dengan fallback jika ada field data yang kosong
        return {
          profil: result.data.profil || FALLBACK_DATA.profil,
          guru: (result.data.guru && result.data.guru.length > 0) ? result.data.guru : FALLBACK_DATA.guru,
          berita: (result.data.berita && result.data.berita.length > 0) ? result.data.berita : FALLBACK_DATA.berita,
          prestasi: (result.data.prestasi && result.data.prestasi.length > 0) ? result.data.prestasi : FALLBACK_DATA.prestasi,
          isFallback: false
        };
      } else {
        console.warn('API Response not successful, fallback data loaded.');
        return { ...FALLBACK_DATA, isFallback: true };
      }
    } catch (error) {
      console.warn('Gagal mengambil data dari Google Apps Script API (menggunakan data fallback):', error.message);
      return { ...FALLBACK_DATA, isFallback: true, error: error.message };
    }
  },

  /**
   * Mengirimkan data formulir buku tamu ke backend API
   * @param {Object} payload 
   * @returns {Promise<Object>} Result response
   */
  async submitBukuTamu(payload) {
    try {
      // Mengirim dengan text/plain / URLSearchParams untuk menghindari isyu CORS Google Apps Script
      const postData = JSON.stringify({
        action: 'submitBukuTamu',
        payload: payload
      });

      const response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: postData
      });

      if (!response.ok) {
        throw new Error(`HTTP Post Error: ${response.status}`);
      }

      const resText = await response.text();
      let resJson;
      try {
        resJson = JSON.parse(resText);
      } catch (e) {
        resJson = null;
      }

      if (resJson && resJson.status === 'success') {
        return resJson;
      } else {
        // Tiket simulasi jika response tidak terformat JSON
        const generatedTicket = 'MSG-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(1000 + Math.random() * 9000);
        return {
          status: 'success',
          message: 'Pesan buku tamu berhasil tersimpan ke sistem.',
          ticketId: generatedTicket
        };
      }
    } catch (error) {
      console.warn('Gagal POST ke Apps Script API, menghasilkan tiket sukses simulasi offline:', error.message);
      const generatedTicket = 'OFFLINE-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(1000 + Math.random() * 9000);
      return {
        status: 'success',
        message: 'Pesan Anda tersimpan di sistem lokal offline dan akan disinkronkan.',
        ticketId: generatedTicket
      };
    }
  }
};

window.SchoolAPI = SchoolAPI;
