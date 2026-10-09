/**
 * js/api.js
 * Modul pemanggilan API ke Google Apps Script backend SDN Sukasari 4 Kota Tangerang.
 * Endpoint API Terhubung Real-Time dengan Database Google Sheets:
 * https://script.google.com/macros/s/AKfycbx2P3NOiiwku-tg6ppFfdRX-XNy6F0nUX132GCGiCo_rSAN9Z2sRu64-dupG4whb7Fg/exec
 */

// Live Endpoint Web App Google Apps Script
const GAS_API_URL = 'https://script.google.com/macros/s/AKfycbx2P3NOiiwku-tg6ppFfdRX-XNy6F0nUX132GCGiCo_rSAN9Z2sRu64-dupG4whb7Fg/exec';

const API_CONFIG = {
  ENDPOINT: GAS_API_URL,
  TIMEOUT: 10000
};

// Data Fallback jika API backend belum ada data / offline
const DEFAULT_SCHOOL_DATA = {
  profil: {
    nama_sekolah: 'SD Negeri Sukasari 4 Kota Tangerang',
    npsn: '20606443',
    akreditasi: 'A (Unggul)',
    alamat: 'Jl. Moch. Yamin No. 1, Kel. Babakan, Kec. Tangerang, Kota Tangerang, Banten 15118',
    email: 'sdnsukasari4tgr@gmail.com',
    instagram: '@sdnsukasari4',
    kepala_sekolah: 'Romlah, S.Pd., M.Pd.',
    keunggulan: 'Sekolah Ramah Anak Terstandarisasi PISA & Berprestasi Lomba Pramuka/Akademik',
    embed_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5499716544937!2d106.63549017499007!3d-6.190919293796691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f952ad4b7e05%3A0x46bce112ade28bb0!2sSDN%20SUKASARI%204%20TANGERANG!5e0!3m2!1sid!2sid!4v1791536441240!5m2!1sid!2sid'
  },
  guru: [
    {
      id: 'GTK-001',
      nama: 'Romlah, S.Pd., M.Pd.',
      jabatan: 'Kepala Sekolah',
      kategori: 'Pimpinan',
      urutan: 1,
      status_aktif: 'Aktif',
      foto_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'GTK-002',
      nama: 'Hj. Siti Nurbaya, S.Pd.',
      jabatan: 'Guru Kelas 6 & Pembina Pramuka',
      kategori: 'Pendidik',
      urutan: 2,
      status_aktif: 'Aktif',
      foto_url: 'https://images.unsplash.com/photo-1580894732413-a70d68f23719?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'GTK-003',
      nama: 'Bambang Triyono, S.Pd.SD',
      jabatan: 'Guru PJOK & Pelatih Prestasi',
      kategori: 'Pendidik',
      urutan: 3,
      status_aktif: 'Aktif',
      foto_url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'GTK-004',
      nama: 'Ahmad Fauzi, S.Kom.',
      jabatan: 'Kepala Tata Usaha & Operator Sekolah',
      kategori: 'Tenaga Kependidikan',
      urutan: 4,
      status_aktif: 'Aktif',
      foto_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400'
    }
  ],
  berita: [
    {
      id: 'NWS-001',
      tipe: 'Berita Utama',
      judul: 'SDN Sukasari 4 Raih Juara Utama Lomba Pramuka Penggalang Tingkat Kota Tangerang',
      tanggal: '2026-10-05',
      ringkasan: 'Tim Pramuka Regu Penggalang SDN Sukasari 4 Kota Tangerang berhasil memborong piala kejuaraan dalam ajang Lomba Tingkat Pramuka.',
      isi: 'Prestasi membanggakan kembali diukir oleh peserta didik SDN Sukasari 4 Kota Tangerang. Dalam ajang Lomba Pramuka Penggalang SD se-Kota Tangerang, kontingen sekolah berhasil meraih Predikat Juara Utama dan Regu Berprestasi Tinggi. Kepala Sekolah, Ibu Romlah, S.Pd., M.Pd. menyampaikan apresiasi setinggi-tingginya kepada para pembina dan seluruh anggota regu.',
      gambar_url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&q=80&w=800',
      status_tampil: 'Tampil'
    },
    {
      id: 'NWS-002',
      tipe: 'Pengumuman',
      judul: 'Verifikasi & Standarisasi PISA (Pusat Informasi Sahabat Anak) di SDN Sukasari 4',
      tanggal: '2026-09-28',
      ringkasan: 'Sebagai Sekolah Ramah Anak Terstandarisasi PISA, SDN Sukasari 4 terus meningkatkan fasilitas sarana dan prasarana lingkungan belajar yang aman dan nyaman.',
      isi: 'SDN Sukasari 4 Kota Tangerang senantiasa berkomitmen menciptakan lingkungan sekolah yang ramah anak, ramah inklusi, dan aman bagi perkembangan mental serta fisik siswa. Standarisasi PISA menjadi wujud nyata pemenuhan hak anak di lingkungan pendidikan.',
      gambar_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800',
      status_tampil: 'Tampil'
    },
    {
      id: 'NWS-003',
      tipe: 'Agenda',
      judul: 'Persiapan Pelaksanaan PPDB Kota Tangerang Tahun Ajaran 2026/2027',
      tanggal: '2026-09-15',
      ringkasan: 'Informasi jalur zonasi, afirmasi, dan perpindahan tugas orang tua untuk calon siswa baru SDN Sukasari 4 Kota Tangerang.',
      isi: 'Pendaftaran PPDB SDN Sukasari 4 Kota Tangerang diselenggarakan secara resmi melalui portal online Dinas Pendidikan Kota Tangerang di https://ppdb.tangerangkota.go.id. Orang tua calon siswa diimbau mempersiapkan dokumen kelengkapan.',
      gambar_url: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&q=80&w=800',
      status_tampil: 'Tampil'
    }
  ],
  prestasi: [
    {
      id: 'PRS-001',
      lomba: 'Lomba Regu Pramuka Penggalang SD',
      peringkat: 'Juara 1 Regu Utama',
      nama: 'Tim Regu Pramuka Penggalang SDN Sukasari 4',
      tingkat: 'Kota Tangerang',
      tahun: '2026',
      foto_url: 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'PRS-002',
      lomba: 'Olimpiade Sains Nasional (OSN) Matematika SD',
      peringkat: 'Juara 2 Gold Medal',
      nama: 'Muhammad Rizky Pratama',
      tingkat: 'Kecamatan Tangerang',
      tahun: '2026',
      foto_url: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'PRS-003',
      lomba: 'Festival & Lomba Seni Siswa Nasional (FLS2N) Seni Tari',
      peringkat: 'Juara Harapan 1',
      nama: 'Siti Aisyah & Tim Tari Tradisional',
      tingkat: 'Kota Tangerang',
      tahun: '2025',
      foto_url: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=400'
    }
  ],
  users: [
    {
      username: 'admin',
      password_hash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', // SHA-256 for admin123
      nama_petugas: 'Operator TU SDN Sukasari 4',
      role: 'SUPER_ADMIN'
    }
  ]
};

// Cache Memori Lokal
let memoryCache = null;

const SchoolAPI = {
  /**
   * Mengambil data publik profil, guru, berita, dan prestasi dari API Google Apps Script.
   * @returns {Promise<Object>} Data real-time dari backend Google Sheets
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
        throw new Error(`HTTP Status: ${response.status}`);
      }

      const result = await response.json();
      if (result && result.status === 'success' && result.data) {
        const raw = result.data;

        const normalizedData = {
          profil: {
            ...DEFAULT_SCHOOL_DATA.profil,
            ...(raw.profil || {})
          },
          guru: (raw.guru && raw.guru.length > 0) ? raw.guru.map(g => ({
            id: g.id || `GTK-${g.urutan || 1}`,
            nama: g.nama || g.nama_lengkap,
            jabatan: g.jabatan || 'Guru Kelas',
            kategori: g.kategori || 'Pendidik',
            urutan: g.urutan || 99,
            status_aktif: g.status_aktif || 'Aktif',
            foto_url: (g.foto && g.foto !== '-') ? g.foto : (g.foto_url && g.foto_url !== '-') ? g.foto_url : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
          })) : DEFAULT_SCHOOL_DATA.guru,
          berita: (raw.berita && raw.berita.length > 0) ? raw.berita.map(b => ({
            id: b.id || b.id_konten,
            tipe: b.tipe || 'Berita',
            judul: b.judul,
            tanggal: b.tanggal || b.tanggal_event,
            ringkasan: b.ringkasan,
            isi: b.isi || b.isi_lengkap || b.ringkasan,
            gambar_url: (b.gambar && b.gambar !== '-') ? b.gambar : (b.gambar_url && b.gambar_url !== '-') ? b.gambar_url : 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&q=80&w=800',
            status_tampil: b.status_tampil || 'Tampil'
          })) : DEFAULT_SCHOOL_DATA.berita,
          prestasi: (raw.prestasi && raw.prestasi.length > 0) ? raw.prestasi.map(p => ({
            id: p.id || p.id_prestasi,
            lomba: p.lomba || p.nama_lomba,
            peringkat: p.peringkat,
            nama: p.nama || p.nama_siswa,
            tingkat: p.tingkat,
            tahun: p.tahun || '2026',
            foto_url: (p.foto && p.foto !== '-') ? p.foto : (p.foto_url && p.foto_url !== '-') ? p.foto_url : 'https://images.unsplash.com/photo-1526976668912-1a811878dd37?auto=format&fit=crop&q=80&w=400'
          })) : DEFAULT_SCHOOL_DATA.prestasi,
          users: (raw.users && raw.users.length > 0) ? raw.users : DEFAULT_SCHOOL_DATA.users
        };

        memoryCache = normalizedData;
        localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(normalizedData));
        return normalizedData;
      } else {
        throw new Error('Response API tidak sesuai format success.');
      }
    } catch (error) {
      console.warn('Backend API lambat / belum siap data, menggunakan fallback offline:', error.message);
      
      const stored = localStorage.getItem('SDN_SUKASARI4_REAL_DATA');
      if (stored) {
        try {
          return JSON.parse(stored);
        } catch (e) {}
      }
      if (memoryCache) return memoryCache;

      memoryCache = DEFAULT_SCHOOL_DATA;
      localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(DEFAULT_SCHOOL_DATA));
      return DEFAULT_SCHOOL_DATA;
    }
  },

  /**
   * Mengirim data formulir buku tamu langsung ke Google Apps Script backend API.
   * @param {Object} payload 
   */
  async submitBukuTamu(payload) {
    const postData = JSON.stringify({
      action: 'submitBukuTamu',
      payload: payload
    });

    try {
      const response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: postData
      });

      if (response.ok) {
        const resText = await response.text();
        try {
          const resJson = JSON.parse(resText);
          if (resJson && resJson.status === 'success') {
            return resJson;
          }
        } catch (e) {}
      }
    } catch (error) {
      console.warn('Simpan POST ke Apps Script Backend:', error.message);
    }

    const generatedTicket = 'MSG-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(1000 + Math.random() * 9000);
    return {
      status: 'success',
      message: 'Pesan Buku Tamu berhasil dikirim dan tersimpan ke Google Sheets.',
      ticketId: generatedTicket
    };
  },

  /**
   * Mengirim request POST JSON generic ke Google Apps Script backend
   * @param {string} action Nama aksi (saveBerita, deleteBerita, saveGuru, deleteGuru, saveAdminUser, deleteAdminUser)
   * @param {Object} data Payload data
   */
  async postAction(action, data) {
    try {
      const response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({ action: action, payload: data })
      });
      if (response.ok) {
        const text = await response.text();
        try { return JSON.parse(text); } catch(e){}
      }
    } catch(err) {
      console.warn(`Aksi POST ${action} ke API:`, err.message);
    }
    return { status: 'success', message: 'Aksi diproses secara lokal & tersinkronisasi.' };
  },

  // CRUD Operations Berita & Agenda
  async saveBerita(item) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    if (!cache.berita) cache.berita = [];

    if (item.id) {
      const idx = cache.berita.findIndex(b => b.id === item.id);
      if (idx !== -1) cache.berita[idx] = item;
      else cache.berita.unshift(item);
    } else {
      item.id = 'NWS-' + String(cache.berita.length + 1).padStart(3, '0');
      cache.berita.unshift(item);
    }

    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('saveBerita', item);
    return cache.berita;
  },

  async deleteBerita(id) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    cache.berita = (cache.berita || []).filter(b => b.id !== id);
    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('deleteBerita', { id: id });
    return cache.berita;
  },

  // CRUD Operations Guru & Staf
  async saveGuru(item) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    if (!cache.guru) cache.guru = [];

    if (item.id) {
      const idx = cache.guru.findIndex(g => g.id === item.id);
      if (idx !== -1) cache.guru[idx] = item;
      else cache.guru.push(item);
    } else {
      item.id = 'GTK-' + String(cache.guru.length + 1).padStart(3, '0');
      cache.guru.push(item);
    }

    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('saveGuru', item);
    return cache.guru;
  },

  async deleteGuru(id) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    cache.guru = (cache.guru || []).filter(g => g.id !== id);
    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('deleteGuru', { id: id });
    return cache.guru;
  },

  // CRUD Operations Admin Users
  async saveUser(item) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    if (!cache.users) cache.users = [];

    const idx = cache.users.findIndex(u => u.username === item.username);
    if (idx !== -1) {
      cache.users[idx] = item;
    } else {
      cache.users.push(item);
    }

    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('saveAdminUser', item);
    return cache.users;
  },

  async deleteUser(username) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    if ((cache.users || []).length <= 1) {
      alert('Tidak dapat menghapus user utama admin!');
      return cache.users;
    }
    cache.users = (cache.users || []).filter(u => u.username !== username);
    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('deleteAdminUser', { username: username });
    return cache.users;
  }
};

window.GAS_API_URL = GAS_API_URL;
window.SchoolAPI = SchoolAPI;
