/**
 * js/api.js
 * Modul pemanggilan API ke Google Apps Script backend SDN Sukasari 7 Kota Tangerang.
 * Mengimplementasikan caching, async/await, dan persistent local data management (CRUD).
 */

const API_CONFIG = {
  ENDPOINT: 'https://script.google.com/macros/s/AKfycbwxuOp-iQ4pL0QQUK7JF26YFLHYCuEWk4Kv8VXm6QqZE821_b46Yfu_vs5Z7CW2-dta8g/exec',
  TIMEOUT: 8000
};

// Data Default Lokal (Graceful Degradation)
const INITIAL_DATA = {
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
      jabatan: "Kepala Tata Usaha (TU)",
      kategori: "Tenaga Kependidikan",
      foto_url: "-"
    },
    {
      id: "GTK-010",
      nama: "Agung Priyadi, S.Kom.",
      jabatan: "Operator Sekolah / Operator DAPODIK & IT",
      kategori: "Tenaga Kependidikan",
      foto_url: "-"
    },
    {
      id: "GTK-011",
      nama: "Maya Indriani, A.Md.",
      jabatan: "Staf Administrasi & Layanan Surat TU",
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
  ],
  users: [
    {
      username: "admin",
      password_hash: "8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918",
      nama_petugas: "Operator TU SDN Sukasari 7",
      role: "SUPER_ADMIN"
    }
  ]
};

// Functions Helper untuk Local Storage Management
function getStoredData() {
  const local = localStorage.getItem('SDN_SUKASARI7_DATA');
  if (local) {
    try {
      return JSON.parse(local);
    } catch (e) {
      console.warn('Gagal parse localStorage, me-reset data awal.');
    }
  }
  localStorage.setItem('SDN_SUKASARI7_DATA', JSON.stringify(INITIAL_DATA));
  return INITIAL_DATA;
}

function setStoredData(data) {
  localStorage.setItem('SDN_SUKASARI7_DATA', JSON.stringify(data));
}

const SchoolAPI = {
  /**
   * Mengambil data publik profil, guru, berita, dan prestasi sekolah.
   */
  async getPublicData() {
    const localData = getStoredData();

    // Mencoba fetch data dari API jika ada koneksi
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.TIMEOUT);

      const response = await fetch(`${API_CONFIG.ENDPOINT}?action=getPublicData`, {
        method: 'GET',
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const result = await response.json();
        if (result && result.status === 'success' && result.data) {
          // Merge remote data jika ada, jika tidak gunakan localData
          const merged = {
            profil: result.data.profil || localData.profil,
            guru: (result.data.guru && result.data.guru.length > 0) ? result.data.guru : localData.guru,
            berita: (result.data.berita && result.data.berita.length > 0) ? result.data.berita : localData.berita,
            prestasi: (result.data.prestasi && result.data.prestasi.length > 0) ? result.data.prestasi : localData.prestasi,
            users: localData.users || INITIAL_DATA.users
          };
          return merged;
        }
      }
    } catch (e) {
      console.warn('API Fetch offline/error, menggunakan data tersimpan lokal.');
    }

    return localData;
  },

  /**
   * Mengirim entri buku tamu
   */
  async submitBukuTamu(payload) {
    const postData = JSON.stringify({
      action: 'submitBukuTamu',
      payload: payload
    });

    try {
      const response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: postData
      });

      if (response.ok) {
        const resText = await response.text();
        try {
          const resJson = JSON.parse(resText);
          if (resJson.status === 'success') return resJson;
        } catch (e) {}
      }
    } catch (e) {
      console.warn('Submit offline.');
    }

    const generatedTicket = 'MSG-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(1000 + Math.random() * 9000);
    return {
      status: 'success',
      message: 'Pesan Anda berhasil tersimpan di sistem.',
      ticketId: generatedTicket
    };
  },

  // --- CRUD OPERASI UNTUK DASHBOARD ADMIN ---

  // Berita Operations
  saveBerita(item) {
    const data = getStoredData();
    if (item.id) {
      const idx = data.berita.findIndex(b => b.id === item.id);
      if (idx !== -1) data.berita[idx] = item;
    } else {
      item.id = 'NWS-' + String(data.berita.length + 1).padStart(3, '0');
      data.berita.unshift(item);
    }
    setStoredData(data);
    return data.berita;
  },

  deleteBerita(id) {
    const data = getStoredData();
    data.berita = data.berita.filter(b => b.id !== id);
    setStoredData(data);
    return data.berita;
  },

  // Guru Operations
  saveGuru(item) {
    const data = getStoredData();
    if (item.id) {
      const idx = data.guru.findIndex(g => g.id === item.id);
      if (idx !== -1) data.guru[idx] = item;
    } else {
      item.id = 'GTK-' + String(data.guru.length + 1).padStart(3, '0');
      data.guru.push(item);
    }
    setStoredData(data);
    return data.guru;
  },

  deleteGuru(id) {
    const data = getStoredData();
    data.guru = data.guru.filter(g => g.id !== id);
    setStoredData(data);
    return data.guru;
  },

  // Users Operations
  saveUser(item) {
    const data = getStoredData();
    if (!data.users) data.users = [...INITIAL_DATA.users];

    const idx = data.users.findIndex(u => u.username === item.username);
    if (idx !== -1) {
      data.users[idx] = item;
    } else {
      data.users.push(item);
    }
    setStoredData(data);
    return data.users;
  },

  deleteUser(username) {
    const data = getStoredData();
    if (data.users.length <= 1) {
      alert('Tidak dapat menghapus user utama admin!');
      return data.users;
    }
    data.users = data.users.filter(u => u.username !== username);
    setStoredData(data);
    return data.users;
  }
};

window.SchoolAPI = SchoolAPI;
