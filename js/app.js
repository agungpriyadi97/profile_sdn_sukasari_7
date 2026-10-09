/**
 * js/app.js
 * Logika interaktivitas UI, rendering data dinamis dari SchoolAPI,
 * penanganan modal berita, filter kategori, dan validasi form buku tamu.
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

  // DOM Elements
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  const teacherGrid = document.getElementById('teacher-grid');
  const newsGrid = document.getElementById('news-grid');
  const achievementGrid = document.getElementById('achievement-grid');
  const guestbookForm = document.getElementById('guestbook-form');
  const formAlert = document.getElementById('form-alert');
  const newsModal = document.getElementById('news-modal');
  const closeNewsModalBtn = document.getElementById('close-news-modal');

  // Inisialisasi Aplikasi
  initApp();

  async function initApp() {
    setupEventListeners();

    // Re-create icons untuk static HTML
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Load Data dari API / Fallback
    try {
      const publicData = await window.SchoolAPI.getPublicData();
      state.profil = publicData.profil;
      state.guru = publicData.guru;
      state.berita = publicData.berita;
      state.prestasi = publicData.prestasi;

      renderProfil();
      renderGuru();
      renderBerita();
      renderPrestasi();
    } catch (error) {
      console.error('Terjadi kesalahan saat memuat data aplikasi:', error);
    }
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    // Mobile Navigation Drawer Toggle
    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
      });

      mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
          mobileMenu.classList.add('hidden');
        });
      });
    }

    // GTK Category Filter Tabs
    const gtkTabs = document.querySelectorAll('.gtk-tab');
    gtkTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        gtkTabs.forEach(t => {
          t.classList.remove('active', 'bg-brand-600', 'text-white');
          t.classList.add('bg-slate-100', 'text-slate-600');
        });

        const target = e.currentTarget;
        target.classList.add('active', 'bg-brand-600', 'text-white');
        target.classList.remove('bg-slate-100', 'text-slate-600');

        state.selectedGtkCategory = target.getAttribute('data-category');
        renderGuru();
      });
    });

    // News & Agenda Filter Tabs
    const newsTabs = document.querySelectorAll('.news-tab');
    newsTabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        newsTabs.forEach(t => {
          t.classList.remove('active', 'bg-brand-600', 'text-white');
          t.classList.add('bg-white', 'text-slate-600');
        });

        const target = e.currentTarget;
        target.classList.add('active', 'bg-brand-600', 'text-white');
        target.classList.remove('bg-white', 'text-slate-600');

        state.selectedNewsType = target.getAttribute('data-type');
        renderBerita();
      });
    });

    // Close Modal Event Handlers
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

    // Guestbook Form Submit Handler
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

  // Helper Fallback Avatar Generator
  function getAvatarUrl(name, photoUrl) {
    if (photoUrl && photoUrl !== '-' && photoUrl.trim() !== '') {
      return photoUrl;
    }
    // Jika tidak ada foto, gunakan UI Avatars API dengan nama guru
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=16a34a&color=fff&size=200&bold=true`;
  }

  // 2. Render Direktori Guru & Staf
  function renderGuru() {
    if (!teacherGrid) return;

    let filteredGuru = state.guru;
    if (state.selectedGtkCategory !== 'Semua') {
      filteredGuru = state.guru.filter(g => g.kategori === state.selectedGtkCategory);
    }

    if (filteredGuru.length === 0) {
      teacherGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <i data-lucide="user-x" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
          <p class="text-sm font-semibold">Tidak ada data guru untuk kategori ini.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    teacherGrid.innerHTML = filteredGuru.map(guru => {
      const avatarSrc = getAvatarUrl(guru.nama, guru.foto_url);
      return `
        <div class="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm hover:shadow-md transition duration-300 flex flex-col items-center text-center group">
          <div class="w-24 h-24 rounded-full p-1 bg-gradient-to-tr from-brand-500 to-emerald-300 mb-4 group-hover:scale-105 transition duration-300">
            <img src="${avatarSrc}" alt="${guru.nama}" class="w-full h-full object-cover rounded-full bg-slate-100" onerror="this.src='https://ui-avatars.com/api/?name=${encodeURIComponent(guru.nama)}&background=16a34a&color=fff&size=200'">
          </div>
          <span class="px-2.5 py-0.5 rounded-full bg-brand-50 text-brand-700 text-[11px] font-bold uppercase tracking-wider mb-2">
            ${guru.kategori || 'Pendidik'}
          </span>
          <h3 class="text-base font-bold text-slate-900 group-hover:text-brand-600 transition">${guru.nama}</h3>
          <p class="text-xs text-slate-500 font-medium mt-1">${guru.jabatan}</p>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // 3. Render Berita & Agenda
  function renderBerita() {
    if (!newsGrid) return;

    let filteredNews = state.berita;
    if (state.selectedNewsType !== 'Semua') {
      filteredNews = state.berita.filter(n => n.tipe === state.selectedNewsType);
    }

    if (filteredNews.length === 0) {
      newsGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <i data-lucide="newspaper" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
          <p class="text-sm font-semibold">Belum ada berita atau agenda pada kategori ini.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    newsGrid.innerHTML = filteredNews.map(item => {
      const isAgenda = item.tipe === 'Agenda';
      const badgeClass = isAgenda ? 'bg-amber-500 text-white' : 'bg-brand-600 text-white';
      const defaultImg = isAgenda 
        ? 'asset/images/images 3.jpg'
        : 'asset/images/images 2.jpg';
      const imgSrc = (item.gambar_url && item.gambar_url !== '-') ? item.gambar_url : defaultImg;

      return `
        <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-lg transition duration-300 flex flex-col group cursor-pointer" onclick="openNewsModal('${item.id}')">
          <div class="h-48 overflow-hidden relative bg-slate-100">
            <img src="${imgSrc}" alt="${item.judul}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute top-3 left-3">
              <span class="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${badgeClass} shadow-md">
                ${item.tipe}
              </span>
            </div>
          </div>
          <div class="p-5 flex-grow flex flex-col justify-between space-y-3">
            <div>
              <div class="text-xs text-slate-400 font-semibold mb-2 flex items-center gap-1.5">
                <i data-lucide="calendar" class="w-3.5 h-3.5 text-brand-600"></i>
                ${item.tanggal}
              </div>
              <h3 class="text-lg font-bold text-slate-900 line-clamp-2 group-hover:text-brand-600 transition leading-snug">
                ${item.judul}
              </h3>
              <p class="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                ${item.ringkasan}
              </p>
            </div>
            <div class="pt-2 border-t border-slate-100 flex items-center text-brand-600 text-xs font-bold gap-1 group-hover:translate-x-1 transition duration-200">
              <span>Baca Selengkapnya</span>
              <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // Modal Detail Berita
  window.openNewsModal = function(id) {
    const item = state.berita.find(b => b.id === id);
    if (!item || !newsModal) return;

    document.getElementById('modal-title').textContent = item.judul;
    document.getElementById('modal-date').textContent = item.tanggal;
    document.getElementById('modal-content').textContent = item.isi || item.ringkasan;
    
    const badgeEl = document.getElementById('modal-badge');
    badgeEl.textContent = item.tipe;
    if (item.tipe === 'Agenda') {
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-amber-500 shadow-md';
    } else {
      badgeEl.className = 'px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider text-white bg-brand-600 shadow-md';
    }

    const defaultImg = item.tipe === 'Agenda'
      ? 'asset/images/images 3.jpg'
      : 'asset/images/images 2.jpg';
    document.getElementById('modal-image').src = (item.gambar_url && item.gambar_url !== '-') ? item.gambar_url : defaultImg;

    newsModal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (window.lucide) window.lucide.createIcons();
  };

  function closeModal() {
    if (!newsModal) return;
    newsModal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  // 4. Render Prestasi Siswa
  function renderPrestasi() {
    if (!achievementGrid) return;

    if (!state.prestasi || state.prestasi.length === 0) {
      achievementGrid.innerHTML = `
        <div class="col-span-full py-12 text-center text-slate-400">
          <i data-lucide="award" class="w-12 h-12 mx-auto mb-2 opacity-50"></i>
          <p class="text-sm font-semibold">Belum ada data prestasi siswa.</p>
        </div>
      `;
      if (window.lucide) window.lucide.createIcons();
      return;
    }

    achievementGrid.innerHTML = state.prestasi.map(item => {
      const defaultImg = 'asset/images/images 3.jpg';
      const imgSrc = (item.foto_url && item.foto_url !== '-') ? item.foto_url : defaultImg;

      return `
        <div class="bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition flex flex-col group">
          <div class="h-44 bg-slate-100 relative overflow-hidden">
            <img src="${imgSrc}" alt="${item.lomba}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
            <div class="absolute top-3 right-3 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-extrabold text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
              <i data-lucide="trophy" class="w-3.5 h-3.5"></i>
              ${item.peringkat}
            </div>
          </div>
          <div class="p-4 flex-grow flex flex-col justify-between space-y-2">
            <div>
              <span class="text-[11px] font-bold text-brand-600 uppercase tracking-wider block">${item.tingkat} (${item.tahun})</span>
              <h3 class="text-sm font-bold text-slate-900 mt-1 line-clamp-2">${item.lomba}</h3>
              <p class="text-xs text-slate-500 mt-1 font-medium">Pemenang: ${item.nama}</p>
            </div>
          </div>
        </div>
      `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
  }

  // 5. Penanganan Submit Buku Tamu
  async function handleGuestbookSubmit(e) {
    e.preventDefault();
    const btnSubmit = document.getElementById('btn-submit-guestbook');
    if (!btnSubmit) return;

    // Loading State UI
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
          <p class="text-[11px] text-emerald-600 italic mt-1">Petugas Tata Usaha SDN Sukasari 7 akan menghubungi nomor WhatsApp Anda jika diperlukan.</p>
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
      
      // Auto Scroll to Alert
      formAlert.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
});
