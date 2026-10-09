/**
 * js/app.js
 * Logika interaktivitas UI publik SDN Sukasari 4 Kota Tangerang.
 * Rendering data dinamis dari SchoolAPI (GET getPublicData),
 * pembersihan skeleton loader, pemuatan gambar lokal resmi (asset/images/sdnsukasari4/),
 * penanganan modal detail berita, filter kategori GTK & Berita, dan validasi form buku tamu.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    profil: null,
    guru: [],
    berita: [],
    prestasi: [],
    selectedGtkCategory: 'Semua',
    selectedNewsType: 'Semua'
  };

  // Daftar Gambar Lokal Resmi dari folder asset/images/sdnsukasari4/
  const LOCAL_IMAGES = [
    'asset/images/sdnsukasari4/images 1.jpg',
    'asset/images/sdnsukasari4/images 2.jpg',
    'asset/images/sdnsukasari4/images 3.jpg',
    'asset/images/sdnsukasari4/images 4.jpg'
  ];

  // DOM Elements (Mendukung ID lama & baru)
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-menu-overlay');
  const closeMobileMenuBtn = document.getElementById('close-mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  const guestbookForm = document.getElementById('guestbook-form');
  const formAlert = document.getElementById('form-alert');
  const newsModal = document.getElementById('news-modal');
  const closeNewsModalBtn = document.getElementById('close-news-modal');

  // Inisialisasi Utama Aplikasi
  initApp();

  async function initApp() {
    setupEventListeners();

    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Load Data dari API / Graceful Fallback
    try {
      const publicData = await window.SchoolAPI.getPublicData();
      state.profil = (publicData && publicData.profil) ? publicData.profil : {};
      state.guru = (publicData && publicData.guru && publicData.guru.length > 0) ? publicData.guru : [];
      state.berita = (publicData && publicData.berita && publicData.berita.length > 0) ? publicData.berita : [];
      state.prestasi = (publicData && publicData.prestasi && publicData.prestasi.length > 0) ? publicData.prestasi : [];

      renderProfil();
      renderGuru();
      renderBerita();
      renderPrestasi();
    } catch (error) {
      console.error('Terjadi kesalahan saat memuat data aplikasi:', error);
      renderProfil();
      renderGuru();
      renderBerita();
      renderPrestasi();
    }
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Mobile Drawer Toggle
    function openDrawer() {
      if (mobileMenu && mobileOverlay) {
        mobileOverlay.classList.remove('opacity-0', 'pointer-events-none');
        mobileOverlay.classList.add('opacity-100');
        mobileMenu.classList.remove('translate-x-full');
        mobileMenu.classList.add('translate-x-0');
        document.body.style.overflow = 'hidden';
      }
    }

    function closeDrawer() {
      if (mobileMenu && mobileOverlay) {
        mobileOverlay.classList.remove('opacity-100');
        mobileOverlay.classList.add('opacity-0', 'pointer-events-none');
        mobileMenu.classList.remove('translate-x-0');
        mobileMenu.classList.add('translate-x-full');
        document.body.style.overflow = '';
      }
    }

    if (mobileMenuBtn) mobileMenuBtn.addEventListener('click', openDrawer);
    if (closeMobileMenuBtn) closeMobileMenuBtn.addEventListener('click', closeDrawer);
    if (mobileOverlay) mobileOverlay.addEventListener('click', closeDrawer);

    mobileLinks.forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // GTK Category Filter Tabs
    const gtkTabs = document.querySelectorAll('.gtk-tab');
    gtkTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        gtkTabs.forEach(t => {
          t.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-md');
          t.classList.add('bg-slate-100', 'text-slate-600');
        });

        const target = e.currentTarget;
        target.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-md');
        target.classList.remove('bg-slate-100', 'text-slate-600');

        state.selectedGtkCategory = target.getAttribute('data-category') || 'Semua';
        renderGuru();
      });
    });

    // News & Agenda Filter Tabs
    const newsTabs = document.querySelectorAll('.news-tab');
    newsTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        newsTabs.forEach(t => {
          t.classList.remove('active', 'bg-indigo-600', 'text-white', 'shadow-md');
          t.classList.add('bg-white', 'text-slate-600');
        });

        const target = e.currentTarget;
        target.classList.add('active', 'bg-indigo-600', 'text-white', 'shadow-md');
        target.classList.remove('bg-white', 'text-slate-600');

        state.selectedNewsType = target.getAttribute('data-type') || 'Semua';
        renderBerita();
      });
    });

    // Close Modal Reader
    if (closeNewsModalBtn && newsModal) {
      closeNewsModalBtn.addEventListener('click', closeModal);
      newsModal.addEventListener('click', (e) => {
        if (e.target === newsModal) closeModal();
      });
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !newsModal.classList.contains('hidden')) {
          closeModal();
        }
      });
    }

    // Guestbook Form Handler
    if (guestbookForm) {
      guestbookForm.addEventListener('submit', handleGuestbookSubmit);
    }
  }

  // --- RENDER FUNCTIONS ---

  // 1. Render Profil & Sambutan Kepsek
  function renderProfil() {
    if (!state.profil) return;

    const kepsekNameEl = document.getElementById('kepsek-name');
    const kepsekSambutanEl = document.getElementById('kepsek-sambutan');

    if (kepsekNameEl && state.profil.kepala_sekolah) {
      kepsekNameEl.textContent = state.profil.kepala_sekolah;
    }
    if (kepsekSambutanEl && state.profil.sambutan_kepsek) {
      kepsekSambutanEl.textContent = `"${state.profil.sambutan_kepsek}"`;
    }
  }

  // Helper Resolver Gambar Lokal Resmi
  function getGuruPhoto(photoUrl, index = 0) {
    if (photoUrl && photoUrl !== '-' && photoUrl.trim() !== '' && !photoUrl.includes('unsplash')) {
      return photoUrl;
    }
    // Rotasi gambar lokal resmi dari folder asset/images/sdnsukasari4/
    const defaultGuruPhotos = [
      'asset/images/sdnsukasari4/images 2.jpg',
      'asset/images/sdnsukasari4/images 3.jpg',
      'asset/images/sdnsukasari4/images 4.jpg',
      'asset/images/sdnsukasari4/images 1.jpg'
    ];
    return defaultGuruPhotos[index % defaultGuruPhotos.length];
  }

  function getNewsImage(item, index = 0) {
    const url = item.gambar_url || item.gambar;
    if (url && url !== '-' && url.trim() !== '' && !url.includes('unsplash')) {
      return url;
    }
    const defaultNewsPhotos = [
      'asset/images/sdnsukasari4/images 1.jpg',
      'asset/images/sdnsukasari4/images 3.jpg',
      'asset/images/sdnsukasari4/images 4.jpg',
      'asset/images/sdnsukasari4/images 2.jpg'
    ];
    return defaultNewsPhotos[index % defaultNewsPhotos.length];
  }

  function getPrestasiImage(photoUrl, index = 0) {
    if (photoUrl && photoUrl !== '-' && photoUrl.trim() !== '' && !photoUrl.includes('unsplash')) {
      return photoUrl;
    }
    const defaultPrestasiPhotos = [
      'asset/images/sdnsukasari4/images 1.jpg',
      'asset/images/sdnsukasari4/images 3.jpg',
      'asset/images/sdnsukasari4/images 4.jpg',
      'asset/images/sdnsukasari4/images 2.jpg'
    ];
    return defaultPrestasiPhotos[index % defaultPrestasiPhotos.length];
  }

  // 2. Render Direktori Guru & Staf (Bersihkan Skeleton)
  function renderGuru() {
    const container = document.getElementById('teacher-grid') || document.getElementById('guruContainer');
    if (!container) return;

    let filteredGuru = state.guru || [];
    if (state.selectedGtkCategory !== 'Semua') {
      filteredGuru = filteredGuru.filter(g => {
        const cat = g.kategori || 'Pendidik';
        if (state.selectedGtkCategory === 'Staf TU') {
          return cat === 'Tenaga Kependidikan' || cat === 'Staf TU';
        }
        return cat === state.selectedGtkCategory;
      });
    }

    if (filteredGuru.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <i data-lucide="user-x" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
          <p class="text-sm font-semibold">Tidak ada data guru untuk kategori ini.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Hapus Skeleton Loader & Render Kartu Guru Berfoto Lokal Resmi
    container.innerHTML = filteredGuru.map((guru, index) => {
      const name = guru.nama || guru.nama_lengkap || 'Dewan Guru';
      const rawPhoto = guru.foto_url || guru.foto;
      const imgSrc = getGuruPhoto(rawPhoto, index);
      const category = guru.kategori || 'Pendidik';

      return `
        <div class="bento-card bg-white rounded-3xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center group">
          <div class="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-amber-400 to-emerald-400 mb-4 group-hover:scale-105 transition duration-300">
            <img src="${imgSrc}" alt="${name}" class="w-full h-full object-cover rounded-full bg-slate-100" onerror="this.onerror=null; this.src='asset/images/sdnsukasari4/images 2.jpg';">
          </div>
          <span class="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-[11px] font-extrabold uppercase tracking-wider mb-2">
            ${category}
          </span>
          <h3 class="text-base font-bold text-slate-900 font-heading group-hover:text-indigo-600 transition">${name}</h3>
          <p class="text-xs text-slate-500 font-medium mt-1">${guru.jabatan || 'Tenaga Pendidik'}</p>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // 3. Render Berita & Agenda (Bersihkan Skeleton)
  function renderBerita() {
    const container = document.getElementById('news-grid') || document.getElementById('beritaContainer');
    if (!container) return;

    let filteredNews = state.berita || [];
    if (state.selectedNewsType !== 'Semua') {
      filteredNews = filteredNews.filter(n => {
        const type = n.tipe || 'Berita';
        if (state.selectedNewsType === 'Agenda Kegiatan') {
          return type === 'Agenda' || type === 'Agenda Kegiatan';
        }
        return type === state.selectedNewsType;
      });
    }

    if (filteredNews.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <i data-lucide="newspaper" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
          <p class="text-sm font-semibold">Belum ada berita atau agenda pada kategori ini.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Hapus Skeleton Loader & Render Kartu Berita Berfoto Lokal Resmi
    container.innerHTML = filteredNews.map((item, index) => {
      const isAgenda = item.tipe === 'Agenda' || item.tipe === 'Agenda Kegiatan';
      const badgeClass = isAgenda ? 'bg-amber-500 text-slate-950 font-black' : 'bg-indigo-600 text-white font-bold';
      const imgSrc = getNewsImage(item, index);
      const idStr = item.id || item.id_konten || `NWS-${index+1}`;

      return `
        <div class="bento-card bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-lg transition duration-300 flex flex-col group cursor-pointer" onclick="openNewsModal('${idStr}')">
          <div class="h-48 overflow-hidden relative bg-slate-100">
            <img src="${imgSrc}" alt="${item.judul}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.onerror=null; this.src='asset/images/sdnsukasari4/images 1.jpg';">
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 rounded-full text-xs uppercase tracking-wider ${badgeClass} shadow-md">
                ${item.tipe || 'Berita'}
              </span>
            </div>
          </div>
          <div class="p-6 flex-grow flex flex-col justify-between space-y-3">
            <div>
              <div class="text-xs text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-indigo-600"></i>
                ${item.tanggal || item.tanggal_event || '2026-10-09'}
              </div>
              <h3 class="text-base font-bold text-slate-900 font-heading line-clamp-2 group-hover:text-indigo-600 transition leading-snug">
                ${item.judul}
              </h3>
              <p class="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                ${item.ringkasan}
              </p>
            </div>
            <div class="pt-2 border-t border-slate-100 flex items-center text-indigo-600 text-xs font-bold gap-1 group-hover:translate-x-1 transition duration-200">
              <span>Baca Selengkapnya</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Modal Detail Reader
  window.openNewsModal = function(id) {
    const item = (state.berita || []).find(b => (b.id === id || b.id_konten === id));
    if (!item || !newsModal) return;

    document.getElementById('modal-title').textContent = item.judul;
    document.getElementById('modal-date').textContent = item.tanggal || item.tanggal_event || '2026-10-09';
    document.getElementById('modal-content').textContent = item.isi || item.isi_lengkap || item.ringkasan;
    
    const badgeEl = document.getElementById('modal-badge');
    badgeEl.textContent = item.tipe || 'Berita';
    if (item.tipe === 'Agenda' || item.tipe === 'Agenda Kegiatan') {
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider text-slate-950 bg-amber-500 shadow-md';
    } else {
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-indigo-600 shadow-md';
    }

    const modalImg = document.getElementById('modal-image');
    modalImg.src = getNewsImage(item, 0);
    modalImg.onerror = function() {
      this.onerror = null;
      this.src = 'asset/images/sdnsukasari4/images 1.jpg';
    };

    newsModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  };

  function closeModal() {
    if (!newsModal) return;
    newsModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // 4. Render Prestasi Siswa (Bersihkan Skeleton)
  function renderPrestasi() {
    const container = document.getElementById('achievement-grid') || document.getElementById('prestasiContainer');
    if (!container) return;

    if (!state.prestasi || state.prestasi.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <i data-lucide="award" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
          <p class="text-sm font-semibold">Belum ada data prestasi siswa.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    // Hapus Skeleton Loader & Render Kartu Prestasi Berfoto Lokal Resmi
    container.innerHTML = state.prestasi.map((item, index) => {
      const rawPhoto = item.foto_url || item.foto;
      const imgSrc = getPrestasiImage(rawPhoto, index);
      const lomba = item.lomba || item.nama_lomba || 'Lomba Prestasi';
      const nama = item.nama || item.nama_siswa || 'Siswa Berprestasi';

      return `
        <div class="bento-card bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-sm hover:shadow-md transition flex flex-col group">
          <div class="h-44 bg-slate-100 relative overflow-hidden">
            <img src="${imgSrc}" alt="${lomba}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.onerror=null; this.src='asset/images/sdnsukasari4/images 3.jpg';">
            <div class="absolute top-3 right-3 bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <i data-lucide="trophy" class="w-3.5 h-3.5 text-slate-950"></i>
              ${item.peringkat || 'Juara 1'}
            </div>
          </div>
          <div class="p-5 flex-grow flex flex-col justify-between space-y-2">
            <div>
              <span class="text-[11px] font-bold text-indigo-600 uppercase tracking-wider block font-heading">${item.tingkat || 'Kota Tangerang'} (${item.tahun || '2026'})</span>
              <h3 class="text-sm font-bold text-slate-900 font-heading mt-1 line-clamp-2">${lomba}</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">Pemenang: ${nama}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // 5. Submit Form Buku Tamu AJAX
  async function handleGuestbookSubmit(e) {
    e.preventDefault();
    const btnSubmit = document.getElementById('btn-submit-guestbook');
    if (!btnSubmit) return;

    btnSubmit.disabled = true;
    btnSubmit.innerHTML = `
      <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline-block" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
      Mengirim Pesan...
    `;

    const formData = {
      nama: document.getElementById('nama').value.trim(),
      kategori: document.getElementById('kategori').value,
      whatsapp: document.getElementById('whatsapp').value.trim(),
      keperluan: document.getElementById('keperluan').value.trim(),
      pesan: document.getElementById('pesan').value.trim()
    };

    try {
      const response = await window.SchoolAPI.submitBukuTamu(formData);

      if (response && response.status === 'success') {
        formAlert.className = 'mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 space-y-1 block';
        formAlert.innerHTML = `
          <div class="flex items-center gap-2 font-bold text-sm text-emerald-900">
            <i data-lucide="check-circle-2" class="w-5 h-5 text-emerald-600"></i>
            ${response.message || 'Pesan Anda berhasil dikirim!'}
          </div>
          <p class="text-xs text-emerald-700">
            Nomor Tiket Layanan Anda: <strong class="bg-emerald-200 text-emerald-950 px-2 py-0.5 rounded font-mono text-xs">${response.ticketId || 'TKT-PENDING'}</strong>
          </p>
          <p class="text-[11px] text-emerald-600 italic mt-1">Petugas Tata Usaha SDN Sukasari 4 akan menghubungi nomor WhatsApp Anda jika diperlukan.</p>
        `;

        guestbookForm.reset();
      } else {
        throw new Error(response ? response.message : 'Gagal mengirim pesan.');
      }
    } catch (err) {
      formAlert.className = 'mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 block';
      formAlert.innerHTML = `
        <div class="flex items-center gap-2 font-bold text-sm text-rose-900">
          <i data-lucide="alert-circle" class="w-5 h-5 text-rose-600"></i>
          Terjadi Gangguan
        </div>
        <p class="text-xs text-rose-700 mt-1">${err.message || 'Silakan coba beberapa saat lagi.'}</p>
      `;
    } finally {
      btnSubmit.disabled = false;
      btnSubmit.innerHTML = `
        <i data-lucide="send" class="w-4 h-4"></i>
        Kirim Pesan Buku Tamu
      `;
      if (window.lucide) window.lucide.createIcons();
      formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
});
