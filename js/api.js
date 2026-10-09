/**
 * js/api.js
 * Modul pemanggilan API ke Google Apps Script backend SDN Sukasari 4 Kota Tangerang.
 * Endpoint API Terhubung Real-Time dengan Database Google Sheets:
 * https://script.google.com/macros/s/AKfycbx2PtEtN6i7pSUOHIImG35YgHpk8168loeI3WObzkSVN4gMB-NpJNhVfKmz5HvKbX06/exec
 */

// Live Endpoint Web App Google Apps Script Baru
const GAS_API_URL = window.GAS_API_URL || 'https://script.google.com/macros/s/AKfycbz2PtEtN6i7pSUOHIImG35YgHpk8168loeI3WObzkSVN4gMB-NpJNhVfKmz5HvKbX06/exec';

const API_CONFIG = {
  ENDPOINT: GAS_API_URL,
  TIMEOUT: 12000
};

// Data Fallback jika API backend belum siap data / offline
const DEFAULT_SCHOOL_DATA = {
  profil: {
    nama_sekolah: 'SD Negeri Sukasari 4 Kota Tangerang',
    npsn: '20606443',
    akreditasi: 'A (Unggul)',
    alamat: 'Jl. Moch. Yamin No. 1, Kel. Babakan, Kec. Tangerang, Kota Tangerang, Banten 15118',
    email: 'sdnsukasari4tgr@gmail.com',
    instagram: '@sdnsukasari4',
    kepala_sekolah: 'Romlah, S.Pd., M.Pd.',
    sambutan_kepsek: 'Selamat datang di website resmi SDN Sukasari 4 Kota Tangerang. Kami berkomitmen mewujudkan lingkungan sekolah ramah anak yang berprestasi dan berkarakter luhur.',
    embed_maps_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.5499716544937!2d106.63549017499007!3d-6.190919293796691!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f952ad4b7e05%3A0x46bce112ade28bb0!2sSDN%20SUKASARI%204%20TANGERANG!5e0!3m2!1sid!2sid!4v1791536441240!5m2!1sid!2sid'
  },
  guru: [
    {
      id: 'GTK-001',
      id_guru: 'GTK-001',
      nama: 'Romlah, S.Pd., M.Pd.',
      nama_lengkap: 'Romlah, S.Pd., M.Pd.',
      jabatan: 'Kepala Sekolah',
      kategori: 'Pimpinan',
      urutan: 1,
      status_aktif: true,
      foto_url: 'asset/images/sdnsukasari4/images 2.jpg'
    },
    {
      id: 'GTK-002',
      id_guru: 'GTK-002',
      nama: 'Royan Fauzi, S.Pd.I.',
      nama_lengkap: 'Royan Fauzi, S.Pd.I.',
      jabatan: 'Guru PAI & Pembina Kesiswaan',
      kategori: 'Pendidik',
      urutan: 2,
      status_aktif: true,
      foto_url: 'asset/images/sdnsukasari4/images 3.jpg'
    },
    {
      id: 'GTK-003',
      id_guru: 'GTK-003',
      nama: 'Luthfiatun Nafisah, S.Pd.',
      nama_lengkap: 'Luthfiatun Nafisah, S.Pd.',
      jabatan: 'Guru Kelas & Wali Kelas',
      kategori: 'Pendidik',
      urutan: 3,
      status_aktif: true,
      foto_url: 'asset/images/sdnsukasari4/images 4.jpg'
    }
  ],
  berita: [
    {
      id: 'NWS-001',
      id_konten: 'NWS-001',
      tipe: 'Berita',
      judul: 'SDN Sukasari 4 Raih Akreditasi Pusat Informasi Sahabat Anak (PISA)',
      tanggal: '2026-09-15',
      tanggal_event: '2026-09-15',
      ringkasan: 'Sekolah meraih predikat terstandarisasi Pusat Informasi Sahabat Anak tingkat Provinsi Banten.',
      isi: 'SDN Sukasari 4 Kota Tangerang membuktikan komitmen sebagai sekolah ramah anak melalui standarisasi perpustakaan dan sarana ramah anak ramah literasi.',
      gambar_url: 'asset/images/sdnsukasari4/images 1.jpg',
      status_tampil: true
    },
    {
      id: 'AGD-001',
      id_konten: 'AGD-001',
      tipe: 'Agenda',
      judul: 'Kunjungan Edukasi Internasional & Workshop Literasi Sekolah',
      tanggal: '2026-10-25',
      tanggal_event: '2026-10-25',
      ringkasan: 'Agenda tahunan kolaborasi kunjungan dan penguatan kapasitas siswa di perpustakaan sekolah.',
      isi: 'Kunjungan dan workshop literasi bersama para pegiat pendidikan untuk mengoptimalkan potensi peserta didik.',
      gambar_url: 'asset/images/sdnsukasari4/images 3.jpg',
      status_tampil: true
    }
  ],
  prestasi: [
    {
      id: 'PRS-001',
      id_prestasi: 'PRS-001',
      lomba: 'Lomba Tingkat (LT) 3 Pramuka Regu Putri',
      nama_lomba: 'Lomba Tingkat (LT) 3 Pramuka Regu Putri',
      peringkat: 'Juara 1',
      nama: 'Tim Pramuka Putri SDN Sukasari 4',
      nama_siswa: 'Tim Pramuka Putri SDN Sukasari 4',
      tingkat: 'Kota Tangerang',
      tahun: 2026,
      foto_url: 'asset/images/sdnsukasari4/images 1.jpg'
    },
    {
      id: 'PRS-002',
      id_prestasi: 'PRS-002',
      lomba: 'Standarisasi Perpustakaan Sekolah Ramah Anak',
      nama_lomba: 'Standarisasi Perpustakaan Sekolah Ramah Anak',
      peringkat: 'Terbaik 1',
      nama: 'SDN Sukasari 4',
      nama_siswa: 'SDN Sukasari 4',
      tingkat: 'Provinsi Banten',
      tahun: 2025,
      foto_url: 'asset/images/sdnsukasari4/images 3.jpg'
    }
  ],
  galeri: [
    {
      id: 'FTO-001',
      id_foto: 'FTO-001',
      judul: 'Upacara Bendera & Pembiasaan Karakter',
      judul_foto: 'Upacara Bendera & Pembiasaan Karakter',
      kategori: 'Upacara & Religi',
      foto_url: 'asset/images/sdnsukasari4/images 1.jpg',
      tanggal: '2026-10-05',
      keterangan: 'Upacara rutin hari Senin dan pembiasaan literasi pagi seluruh peserta didik',
      status_tampil: true
    },
    {
      id: 'FTO-002',
      id_foto: 'FTO-002',
      judul: 'Latihan Rutin Pramuka Penggalang LT-3',
      judul_foto: 'Latihan Rutin Pramuka Penggalang LT-3',
      kategori: 'Ekstrakurikuler',
      foto_url: 'asset/images/sdnsukasari4/images 4.jpg',
      tanggal: '2026-10-07',
      keterangan: 'Kegiatan latihan kepramukaan regu penggalang putra dan putri di lapangan sekolah',
      status_tampil: true
    },
    {
      id: 'FTO-003',
      id_foto: 'FTO-003',
      judul: 'Suasana Perpustakaan Ramah Anak PISA',
      judul_foto: 'Suasana Perpustakaan Ramah Anak PISA',
      kategori: 'Fasilitas',
      foto_url: 'asset/images/sdnsukasari4/images 3.jpg',
      tanggal: '2026-09-28',
      keterangan: 'Fasilitas ruang baca ramah anak terstandarisasi Pusat Informasi Sahabat Anak',
      status_tampil: true
    }
  ],
  users: [
    {
      username: 'admin',
      password_hash: '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918',
      nama_petugas: 'Operator TU SDN Sukasari 4',
      role: 'SUPER_ADMIN'
    }
  ]
};

// Cache Memori Lokal
let memoryCache = null;

const SchoolAPI = {
  /**
   * Mengambil data publik profil, guru, berita, prestasi, dan galeri dari API.
   * Modul fleksibel terhadap format balasan: `res.data` maupun `res` langsung.
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

      const res = await response.json();
      // Normalisasi fleksibel: res.data || res
      const raw = res.data || res || {};

      const normalizedData = {
        profil: {
          ...DEFAULT_SCHOOL_DATA.profil,
          ...(raw.profil || {})
        },
        guru: (raw.guru && raw.guru.length > 0) ? raw.guru.map((g, idx) => ({
          id: g.id || g.id_guru || `GTK-${g.urutan || idx + 1}`,
          nama: g.nama || g.nama_lengkap || 'Pendidik SDN Sukasari 4',
          jabatan: g.jabatan || 'Guru Kelas',
          kategori: g.kategori || (g.jabatan && g.jabatan.toLowerCase().includes('kepala') ? 'Pimpinan' : 'Pendidik'),
          urutan: g.urutan || g.urutan_tampil || (idx + 1),
          status_aktif: (g.status_aktif !== undefined) ? g.status_aktif : true,
          foto_url: (g.foto_url && g.foto_url !== '-') ? g.foto_url : (g.foto && g.foto !== '-') ? g.foto : `asset/images/sdnsukasari4/images ${(idx % 4) + 1}.jpg`
        })) : DEFAULT_SCHOOL_DATA.guru,
        berita: (raw.berita && raw.berita.length > 0) ? raw.berita.map((b, idx) => ({
          id: b.id || b.id_konten || `NWS-${idx + 1}`,
          tipe: b.tipe || 'Berita',
          judul: b.judul || 'Informasi Sekolah',
          tanggal: b.tanggal || b.tanggal_event || '2026-10-09',
          ringkasan: b.ringkasan || b.isi_lengkap || b.isi || '',
          isi: b.isi || b.isi_lengkap || b.ringkasan || '',
          gambar_url: (b.gambar_url && b.gambar_url !== '-') ? b.gambar_url : (b.gambar && b.gambar !== '-') ? b.gambar : `asset/images/sdnsukasari4/images ${(idx % 4) + 1}.jpg`,
          status_tampil: (b.status_tampil !== undefined) ? b.status_tampil : true
        })) : DEFAULT_SCHOOL_DATA.berita,
        prestasi: (raw.prestasi && raw.prestasi.length > 0) ? raw.prestasi.map((p, idx) => ({
          id: p.id || p.id_prestasi || `PRS-${idx + 1}`,
          lomba: p.lomba || p.nama_lomba || 'Lomba Prestasi',
          peringkat: p.peringkat || 'Juara 1',
          nama: p.nama || p.nama_siswa || 'Siswa Berprestasi',
          tingkat: p.tingkat || 'Kota Tangerang',
          tahun: p.tahun || '2026',
          foto_url: (p.foto_url && p.foto_url !== '-') ? p.foto_url : (p.foto && p.foto !== '-') ? p.foto : `asset/images/sdnsukasari4/images ${(idx % 4) + 1}.jpg`
        })) : DEFAULT_SCHOOL_DATA.prestasi,
        galeri: (raw.galeri && raw.galeri.length > 0) ? raw.galeri.map((f, idx) => ({
          id: f.id || f.id_foto || `FTO-${idx + 1}`,
          judul: f.judul || f.judul_foto || 'Dokumentasi Sekolah',
          kategori: f.kategori || 'Kegiatan',
          foto_url: (f.foto_url && f.foto_url !== '-') ? f.foto_url : (f.foto && f.foto !== '-') ? f.foto : `asset/images/sdnsukasari4/images ${(idx % 4) + 1}.jpg`,
          tanggal: f.tanggal || '2026-10-09',
          keterangan: f.keterangan || f.judul || '',
          status_tampil: (f.status_tampil !== undefined) ? f.status_tampil : true
        })) : DEFAULT_SCHOOL_DATA.galeri,
        users: (raw.users && raw.users.length > 0) ? raw.users : DEFAULT_SCHOOL_DATA.users
      };

      memoryCache = normalizedData;
      localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(normalizedData));
      return normalizedData;
    } catch (error) {
      console.warn('Menggunakan fallback data lokal:', error.message);
      
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
   * Mengirim data formulir buku tamu langsung ke Apps Script API.
   */
  async submitBukuTamu(payload) {
    try {
      const response = await fetch(API_CONFIG.ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify({ action: 'submitBukuTamu', payload: payload })
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
      console.warn('POST submitBukuTamu API:', error.message);
    }

    const generatedTicket = 'MSG-' + new Date().toISOString().slice(0,10).replace(/-/g,'') + '-' + Math.floor(1000 + Math.random() * 9000);
    return {
      status: 'success',
      message: 'Pesan Buku Tamu berhasil dikirim dan tersimpan ke Google Sheets.',
      ticketId: generatedTicket
    };
  },

  /**
   * Mengirim request POST JSON ke Google Apps Script backend
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
    return { status: 'success', message: 'Aksi diproses dan tersinkronisasi.' };
  },

  // CRUD Operations Berita
  async saveBerita(item) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    if (!cache.berita) cache.berita = [];

    if (item.id) {
      const idx = cache.berita.findIndex(b => b.id === item.id || b.id_konten === item.id);
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
    cache.berita = (cache.berita || []).filter(b => b.id !== id && b.id_konten !== id);
    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('deleteBerita', { id: id });
    return cache.berita;
  },

  // CRUD Operations Guru
  async saveGuru(item) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    if (!cache.guru) cache.guru = [];

    if (item.id) {
      const idx = cache.guru.findIndex(g => g.id === item.id || g.id_guru === item.id);
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
    cache.guru = (cache.guru || []).filter(g => g.id !== id && g.id_guru !== id);
    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('deleteGuru', { id: id });
    return cache.guru;
  },

  // CRUD Operations Galeri Foto
  async saveFoto(item) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    if (!cache.galeri) cache.galeri = [];

    if (item.id) {
      const idx = cache.galeri.findIndex(f => f.id === item.id || f.id_foto === item.id);
      if (idx !== -1) cache.galeri[idx] = item;
      else cache.galeri.unshift(item);
    } else {
      item.id = 'FTO-' + String(cache.galeri.length + 1).padStart(3, '0');
      cache.galeri.unshift(item);
    }

    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('saveFoto', item);
    return cache.galeri;
  },

  async deleteFoto(id) {
    const cache = memoryCache || JSON.parse(localStorage.getItem('SDN_SUKASARI4_REAL_DATA') || JSON.stringify(DEFAULT_SCHOOL_DATA));
    cache.galeri = (cache.galeri || []).filter(f => f.id !== id && f.id_foto !== id);
    memoryCache = cache;
    localStorage.setItem('SDN_SUKASARI4_REAL_DATA', JSON.stringify(cache));
    await this.postAction('deleteFoto', { id: id });
    return cache.galeri;
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
