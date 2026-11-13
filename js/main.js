/**
 * AUTONOVA NUSANTARA - CORE JAVASCRIPT
 * Mengatur interaktivitas: Keranjang belanja, Kalkulasi transaksi kredit/tunai,
 * Countdown flash sale promo, Filter produk & forum, serta Notifikasi invoice.
 */

// Database Kendaraan Resmi AutoNova
const AUTONOVA_VEHICLES = [
  {
    id: "tesla-model-3",
    name: "Tesla Model 3 EV Long Range",
    category: "ev",
    categoryLabel: "Mobil Listrik (EV)",
    price: 1150000000,
    priceStr: "Rp 1.150.000.000",
    image: "images/mobil1.jpg",
    specs: {
      power: "450 HP (Dual Motor AWD)",
      range: "576 KM / Sekali Cas",
      trans: "Single-Speed Fixed Gear",
      seats: "5 Kursi Penumpang",
      accel: "0-100 km/j dalam 3.3 detik",
      battery: "78.1 kWh Lithium-Ion"
    },
    badge: "Paling Populer",
    badgeClass: "bg-primary",
    stock: "Ready 3 Unit",
    desc: "Sedan elektrik mutakhir dengan sistem Full Self-Driving Ready, interior minimalis layar sentuh 15 inci, dan efisiensi konsumsi energi tanpa emisi gas buang."
  },
  {
    id: "corvette-c8",
    name: "Chevrolet Corvette Stingray C8",
    category: "sport",
    categoryLabel: "Sportscar",
    price: 2850000000,
    priceStr: "Rp 2.850.000.000",
    image: "images/mobil2.jpg",
    specs: {
      power: "495 HP @ 6450 RPM",
      range: "6.2L LT2 Naturally Aspirated V8",
      trans: "8-Speed Dual-Clutch Tremec",
      seats: "2 Kursi Sport Bucket",
      accel: "0-100 km/j dalam 2.9 detik",
      battery: "Bensin Oktan 98"
    },
    badge: "Super Performa",
    badgeClass: "bg-danger",
    stock: "Ready 1 Unit",
    desc: "Ikon supercar Amerika dengan tata letak Mid-Engine pertama dalam sejarah, aerodinamika agresif, dan suspensi Magnetic Selective Ride Control 4.0."
  },
  {
    id: "jeep-rubicon",
    name: "Jeep Wrangler Rubicon 4x4",
    category: "suv",
    categoryLabel: "SUV Off-Road",
    price: 1750000000,
    priceStr: "Rp 1.750.000.000",
    image: "images/mobil3.jpg",
    specs: {
      power: "270 HP @ 5250 RPM",
      range: "2.0L Twin-Scroll Turbo I-4",
      trans: "8-Speed Automatic 4WD Rock-Trac",
      seats: "5 Kursi Tahan Air",
      accel: "Tru-Lok Electronic Lockers",
      battery: "Bensin Oktan 92+"
    },
    badge: "Tangguh Ekstrem",
    badgeClass: "bg-success",
    stock: "Ready 2 Unit",
    desc: "Raja penjelajah segala medan dengan gardan Dana 44 heavy-duty, sway-bar disconnect elektronik, atap kanvas modular Freedom Top yang bisa dilepas."
  },
  {
    id: "audi-rs5",
    name: "Audi RS5 Coupe Quattro",
    category: "sport",
    categoryLabel: "Gran Turismo Coupe",
    price: 2100000000,
    priceStr: "Rp 2.100.000.000",
    image: "images/mobil4.jpg",
    specs: {
      power: "444 HP @ 6700 RPM",
      range: "2.9L Bi-Turbo V6 TFSI",
      trans: "8-Speed Tiptronic Quattro AWD",
      seats: "4 Kursi Kulit Nappa RS",
      accel: "0-100 km/j dalam 3.7 detik",
      battery: "Bensin Oktan 98"
    },
    badge: "Eksklusif",
    badgeClass: "bg-dark",
    stock: "Ready 2 Unit",
    desc: "Perpaduan sempurna kenyamanan mobil mewah harian dengan DNA sirkuit balap Audi Sport. Dilengkapi Audio Bang & Olufsen 3D Sound System 755 Watt."
  },
  {
    id: "ferrari-488",
    name: "Ferrari 488 GTB Supercar",
    category: "sport",
    categoryLabel: "Supercar",
    price: 5950000000,
    priceStr: "Rp 5.950.000.000",
    image: "images/mobil5.jpg",
    specs: {
      power: "661 HP @ 8000 RPM",
      range: "3.9L Twin-Turbo F154 V8",
      trans: "7-Speed F1 Dual-Clutch",
      seats: "2 Kursi Karbon Balap",
      accel: "0-100 km/j dalam 3.0 detik",
      battery: "Bensin Oktan 98+"
    },
    badge: "Koleksi Terbatas",
    badgeClass: "bg-danger",
    stock: "Showroom Display",
    desc: "Karya seni otomotif asal Maranello Italia. Pemenang penghargaan International Engine of the Year dengan kecepatan maksimum 330 km/jam."
  },
  {
    id: "mustang-gt",
    name: "Ford Mustang GT Fastback 5.0",
    category: "sport",
    categoryLabel: "Muscle Car",
    price: 1680000000,
    priceStr: "Rp 1.680.000.000",
    image: "images/mobil6.jpg",
    specs: {
      power: "450 HP @ 7000 RPM",
      range: "5.0L Coyote Ti-VCT V8",
      trans: "10-Speed SelectShift Automatic",
      seats: "4 Kursi Sport Bucket",
      accel: "Knalpot Active Valve Exhaust",
      battery: "Bensin Oktan 95+"
    },
    badge: "American Legend",
    badgeClass: "bg-warning text-dark",
    stock: "Ready 4 Unit",
    desc: "Muscle car legendaris dengan deru mesin Coyote V8 yang menggelegar, fitur Line-Lock untuk burn-out terkontrol, dan klaster instrumen digital 12 inci kustom."
  }
];

// Inisialisasi Keranjang Belanja di LocalStorage
function getCart() {
  const cart = localStorage.getItem('autonova_cart');
  return cart ? JSON.parse(cart) : [];
}

function saveCart(cart) {
  localStorage.setItem('autonova_cart', JSON.stringify(cart));
  updateCartBadge();
}

function addToCart(vehicleId) {
  const vehicle = AUTONOVA_VEHICLES.find(v => v.id === vehicleId);
  if (!vehicle) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === vehicleId);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({
      id: vehicle.id,
      name: vehicle.name,
      price: vehicle.price,
      image: vehicle.image,
      qty: 1
    });
  }
  saveCart(cart);
  showToastNotification(`Berhasil ditambahkan! ${vehicle.name} masuk ke daftar booking Anda.`);
}

function updateCartBadge() {
  const cart = getCart();
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  const badges = document.querySelectorAll('.cart-counter-badge');
  badges.forEach(b => {
    b.textContent = totalItems;
    b.style.display = totalItems > 0 ? 'inline-block' : 'none';
  });
}

function renderCartModal() {
  const cart = getCart();
  const listContainer = document.getElementById('cartItemsList');
  const totalContainer = document.getElementById('cartTotalPrice');
  if (!listContainer || !totalContainer) return;

  if (cart.length === 0) {
    listContainer.innerHTML = `
      <div class="text-center py-5">
        <i class="bi bi-cart-x fs-1 text-muted"></i>
        <h6 class="mt-3 text-secondary">Keranjang Pemesanan Anda Masih Kosong</h6>
        <p class="text-muted small">Pilih mobil impian Anda dari katalog dan lakukan booking online secara mudah.</p>
        <a href="produk.html" class="btn btn-an-primary btn-sm mt-2">Jelajahi Katalog</a>
      </div>
    `;
    totalContainer.textContent = 'Rp 0';
    return;
  }

  let total = 0;
  let html = '<div class="list-group list-group-flush">';
  cart.forEach((item, idx) => {
    const subtotal = item.price * item.qty;
    total += subtotal;
    html += `
      <div class="list-group-item d-flex align-items-center justify-content-between py-3 px-2">
        <div class="d-flex align-items-center gap-3">
          <img src="${item.image}" alt="${item.name}" style="width: 70px; height: 50px; object-fit: cover; border-radius: 6px; border: 1px solid #cbd5e1;">
          <div>
            <h6 class="mb-1 fw-bold fs-6">${item.name}</h6>
            <div class="text-primary fw-semibold small">Rp ${item.price.toLocaleString('id-ID')} &times; ${item.qty}</div>
          </div>
        </div>
        <div class="d-flex align-items-center gap-2">
          <button class="btn btn-outline-danger btn-sm py-1 px-2" onclick="removeCartItem(${idx})" title="Hapus"><i class="bi bi-trash"></i></button>
        </div>
      </div>
    `;
  });
  html += '</div>';

  listContainer.innerHTML = html;
  totalContainer.textContent = 'Rp ' + total.toLocaleString('id-ID');
}

function removeCartItem(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCartModal();
}

function clearCart() {
  saveCart([]);
  renderCartModal();
}

// Beli Langsung -> Meneruskan ke form Transaksi (In-page scroll jika ada, atau redirect)
function directBuy(vehicleId) {
  addToCart(vehicleId);
  const txSelect = document.getElementById('txVehicleSelect');
  const txSection = document.getElementById('transaksi');
  if (txSelect && txSection) {
    txSelect.value = vehicleId;
    txSelect.dispatchEvent(new Event('change'));
    txSection.scrollIntoView({ behavior: 'smooth' });
    showToastNotification(`Unit dipilih! Silakan lengkapi formulir pemesanan di bawah ini.`);
  } else {
    window.location.href = `transaksi.html?unit=${vehicleId}`;
  }
}

// Modal Quick View Detail Spesifikasi Kendaraan
function showVehicleDetail(vehicleId) {
  const v = AUTONOVA_VEHICLES.find(item => item.id === vehicleId);
  if (!v) return;

  const modalTitle = document.getElementById('vehicleModalTitle');
  const modalBody = document.getElementById('vehicleModalBody');
  const modalCtaBtn = document.getElementById('vehicleModalCtaBtn');

  if (modalTitle) modalTitle.textContent = v.name;
  if (modalCtaBtn) {
    modalCtaBtn.onclick = () => { directBuy(v.id); };
  }

  if (modalBody) {
    modalBody.innerHTML = `
      <div class="row g-4">
        <div class="col-lg-6">
          <div class="rounded-3 overflow-hidden shadow-sm mb-3">
            <img src="${v.image}" class="img-fluid w-100" alt="${v.name}" style="height: 280px; object-fit: cover;">
          </div>
          <div class="d-flex justify-content-between align-items-center bg-light p-3 rounded-3 border">
            <div>
              <span class="badge ${v.badgeClass} mb-1">${v.badge}</span>
              <div class="car-price-tag mb-0">Rp ${v.price.toLocaleString('id-ID')}</div>
              <small class="text-muted">Harga OTR Jakarta (Termasuk PPN & Garansi)</small>
            </div>
            <span class="badge bg-success-subtle text-success border border-success px-3 py-2 fw-semibold">${v.stock}</span>
          </div>
        </div>
        <div class="col-lg-6">
          <h5 class="fw-bold mb-2">Ringkasan & Deskripsi</h5>
          <p class="text-secondary small mb-4">${v.desc}</p>
          
          <h6 class="fw-bold mb-3 border-bottom pb-2">Spesifikasi Mesin & Interior</h6>
          <table class="table table-sm table-striped small">
            <tbody>
              <tr>
                <td class="text-muted" style="width: 40%;"><i class="bi bi-speedometer2 me-1 text-primary"></i> Tenaga / Mesin</td>
                <td class="fw-semibold">${v.specs.power}</td>
              </tr>
              <tr>
                <td class="text-muted"><i class="bi bi-gear-wide-connected me-1 text-primary"></i> Transmisi</td>
                <td class="fw-semibold">${v.specs.trans}</td>
              </tr>
              <tr>
                <td class="text-muted"><i class="bi bi-lightning-charge me-1 text-primary"></i> Jangkauan / Kapasitas</td>
                <td class="fw-semibold">${v.specs.range}</td>
              </tr>
              <tr>
                <td class="text-muted"><i class="bi bi-stopwatch me-1 text-primary"></i> Akselerasi / Fitur</td>
                <td class="fw-semibold">${v.specs.accel}</td>
              </tr>
              <tr>
                <td class="text-muted"><i class="bi bi-people me-1 text-primary"></i> Kapasitas Tempat Duduk</td>
                <td class="fw-semibold">${v.specs.seats}</td>
              </tr>
              <tr>
                <td class="text-muted"><i class="bi bi-fuel-pump me-1 text-primary"></i> Tipe Daya / BBM</td>
                <td class="fw-semibold">${v.specs.battery}</td>
              </tr>
            </tbody>
          </table>

          <div class="alert alert-info py-2 px-3 small d-flex align-items-center gap-2 mb-0">
            <i class="bi bi-shield-check fs-4"></i>
            <div>Termasuk Garansi Resmi AutoNova 5 Tahun, Gratis Jasa Servis Berkala hingga 50.000 KM, dan Layanan Darurat 24 Jam.</div>
          </div>
        </div>
      </div>
    `;
  }

  const modalEl = document.getElementById('vehicleDetailModal');
  if (modalEl && typeof bootstrap !== 'undefined') {
    const modal = new bootstrap.Modal(modalEl);
    modal.show();
  }
}

// Toast Notifikasi
function showToastNotification(message) {
  let toastContainer = document.getElementById('autonovaToastContainer');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'autonovaToastContainer';
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    toastContainer.style.zIndex = '9999';
    document.body.appendChild(toastContainer);
  }

  const toastId = 'toast_' + Date.now();
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-white bg-dark border-0 shadow-lg" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body d-flex align-items-center gap-2">
          <i class="bi bi-check-circle-fill text-success fs-5"></i>
          <span>${message}</span>
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  toastContainer.insertAdjacentHTML('beforeend', toastHtml);

  const toastEl = document.getElementById(toastId);
  if (toastEl && typeof bootstrap !== 'undefined') {
    const toast = new bootstrap.Toast(toastEl, { delay: 3500 });
    toast.show();
    toastEl.addEventListener('hidden.bs.toast', () => toastEl.remove());
  }
}

// Salin Kode Voucher Promo
function copyVoucherCode(code) {
  navigator.clipboard.writeText(code).then(() => {
    showToastNotification(`Kode voucher "${code}" berhasil disalin! Gunakan saat pengisian formulir transaksi.`);
  }).catch(() => {
    showToastNotification(`Kode voucher: ${code}`);
  });
}

// Inisialisasi Countdown Timer Flash Sale Promo
function initPromoCountdown() {
  const daysEl = document.getElementById('cdDays');
  const hoursEl = document.getElementById('cdHours');
  const minutesEl = document.getElementById('cdMinutes');
  const secondsEl = document.getElementById('cdSeconds');
  if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  // Set target waktu 3 hari 14 jam dari sekarang
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 3);
  targetDate.setHours(targetDate.getHours() + 14);

  function updateTimer() {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    if (distance <= 0) {
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    daysEl.textContent = d < 10 ? '0' + d : d;
    hoursEl.textContent = h < 10 ? '0' + h : h;
    minutesEl.textContent = m < 10 ? '0' + m : m;
    secondsEl.textContent = s < 10 ? '0' + s : s;
  }

  updateTimer();
  setInterval(updateTimer, 1000);
}

// Filter Produk pada produk.html
function initProductFilters() {
  const filterBtns = document.querySelectorAll('.product-filter-btn');
  const searchInput = document.getElementById('productSearchInput');
  const sortSelect = document.getElementById('productSortSelect');
  const productCards = document.querySelectorAll('.product-item-card');

  if (filterBtns.length === 0 && !searchInput && !sortSelect) return;

  function filterCards() {
    const activeBtn = document.querySelector('.product-filter-btn.active');
    const selectedCategory = activeBtn ? activeBtn.getAttribute('data-category') : 'all';
    const keyword = searchInput ? searchInput.value.toLowerCase().trim() : '';

    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      const cardTitle = card.querySelector('.car-title')?.textContent.toLowerCase() || '';
      const cardDesc = card.querySelector('.car-desc')?.textContent.toLowerCase() || '';

      const matchCategory = (selectedCategory === 'all' || cardCategory === selectedCategory);
      const matchSearch = (!keyword || cardTitle.includes(keyword) || cardDesc.includes(keyword));

      if (matchCategory && matchSearch) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
      filterBtns.forEach(b => b.classList.add('btn-outline-secondary'));
      this.classList.remove('btn-outline-secondary');
      this.classList.add('active', 'btn-primary');
      filterCards();
    });
  });

  if (searchInput) {
    searchInput.addEventListener('input', filterCards);
  }

  if (sortSelect) {
    sortSelect.addEventListener('change', function() {
      const container = document.getElementById('productsGridContainer');
      if (!container) return;
      const cardsArr = Array.from(productCards);

      if (this.value === 'price-low') {
        cardsArr.sort((a, b) => parseInt(a.dataset.price) - parseInt(b.dataset.price));
      } else if (this.value === 'price-high') {
        cardsArr.sort((a, b) => parseInt(b.dataset.price) - parseInt(a.dataset.price));
      } else if (this.value === 'name-az') {
        cardsArr.sort((a, b) => a.dataset.name.localeCompare(b.dataset.name));
      }

      cardsArr.forEach(card => container.appendChild(card));
    });
  }
}

// Interaktivitas Forum Komunitas
function initForumInteractive() {
  const forumForm = document.getElementById('forumNewThreadForm');
  const threadsContainer = document.getElementById('forumThreadsContainer');
  const categoryTabs = document.querySelectorAll('.forum-filter-tab');

  if (categoryTabs.length > 0) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', function(e) {
        e.preventDefault();
        categoryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');

        const cat = this.getAttribute('data-forum-category');
        const threads = document.querySelectorAll('.forum-thread-card');
        threads.forEach(th => {
          if (cat === 'all' || th.getAttribute('data-category') === cat) {
            th.style.display = 'block';
          } else {
            th.style.display = 'none';
          }
        });
      });
    });
  }

  if (forumForm && threadsContainer) {
    forumForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const author = document.getElementById('threadAuthor').value.trim();
      const role = document.getElementById('threadRole').value.trim();
      const category = document.getElementById('threadCategory').value;
      const title = document.getElementById('threadTitle').value.trim();
      const content = document.getElementById('threadContent').value.trim();

      if (!author || !title || !content) {
        alert('Mohon lengkapi seluruh formulir sebelum memposting!');
        return;
      }

      const categoryLabels = {
        'tips': { label: 'Tips & Perawatan', cls: 'bg-primary-subtle text-primary' },
        'modifikasi': { label: 'Modifikasi & Tuning', cls: 'bg-warning-subtle text-warning-emphasis' },
        'tanya': { label: 'Tanya Montir / Solusi', cls: 'bg-danger-subtle text-danger' },
        'meetup': { label: 'Agenda Kumpul (Meetup)', cls: 'bg-success-subtle text-success' }
      };

      const catInfo = categoryLabels[category] || { label: 'Diskusi Umum', cls: 'bg-secondary-subtle text-secondary' };

      const newThreadHtml = `
        <div class="forum-thread-card shadow-sm animate__animated animate__fadeInDown" data-category="${category}">
          <div class="d-flex justify-content-between align-items-start mb-3">
            <div class="d-flex align-items-center gap-3">
              <div class="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold" style="width: 44px; height: 44px; font-size: 1.1rem;">
                ${author.charAt(0).toUpperCase()}
              </div>
              <div>
                <h6 class="mb-0 fw-bold">${author} <span class="badge bg-info-subtle text-info border border-info ms-1">${role || 'Member Komunitas'}</span></h6>
                <small class="text-muted"><i class="bi bi-clock me-1"></i>Baru saja &bull; Terverifikasi</small>
              </div>
            </div>
            <span class="badge ${catInfo.cls} px-3 py-2 fw-semibold">${catInfo.label}</span>
          </div>
          <h5 class="fw-bold mb-2 text-dark">${title}</h5>
          <p class="text-secondary small mb-3">${content}</p>
          <div class="d-flex justify-content-between align-items-center pt-2 border-top">
            <div class="d-flex align-items-center gap-3">
              <button class="btn btn-sm btn-outline-secondary border-0 text-muted d-flex align-items-center gap-1" onclick="likeThread(this)">
                <i class="bi bi-hand-thumbs-up"></i> <span class="like-count">1</span> Suka
              </button>
              <span class="text-muted small"><i class="bi bi-chat-dots me-1"></i>0 Balasan</span>
            </div>
            <a href="javascript:void(0)" onclick="alert('Fitur balasan terbuka! Anda sedang berada di thread: ' + '${title}')" class="btn btn-sm btn-an-outline">Balas Diskusi</a>
          </div>
        </div>
      `;

      threadsContainer.insertAdjacentHTML('afterbegin', newThreadHtml);
      forumForm.reset();
      showToastNotification(`Topik diskusi Anda "${title}" berhasil diterbitkan ke komunitas!`);

      // Scroll ke thread baru
      threadsContainer.firstElementChild.scrollIntoView({ behavior: 'smooth', block: 'center' });
    });
  }
}

function likeThread(btn) {
  const countSpan = btn.querySelector('.like-count');
  const icon = btn.querySelector('i');
  let count = parseInt(countSpan.textContent) || 0;

  if (btn.classList.contains('text-primary')) {
    btn.classList.remove('text-primary');
    icon.className = 'bi bi-hand-thumbs-up';
    countSpan.textContent = count - 1;
  } else {
    btn.classList.add('text-primary');
    icon.className = 'bi bi-hand-thumbs-up-fill';
    countSpan.textContent = count + 1;
  }
}

// Inisialisasi Kalkulator Transaksi & Pemesanan
function initTransactionPage() {
  const selectUnit = document.getElementById('txVehicleSelect');
  if (!selectUnit) return;

  // Baca parameter query URL jika ada
  const urlParams = new URLSearchParams(window.location.search);
  const requestedUnit = urlParams.get('unit');

  // Populasi dropdown kendaraan jika kosong
  if (selectUnit.options.length <= 1) {
    AUTONOVA_VEHICLES.forEach(v => {
      const opt = document.createElement('option');
      opt.value = v.id;
      opt.textContent = `${v.name} - Rp ${v.price.toLocaleString('id-ID')}`;
      if (requestedUnit && requestedUnit === v.id) {
        opt.selected = true;
      }
      selectUnit.appendChild(opt);
    });
  } else if (requestedUnit) {
    selectUnit.value = requestedUnit;
  }

  // Bind perubahan kalkulasi
  const paymentMethods = document.querySelectorAll('input[name="txPaymentType"]');
  const dpPercentInput = document.getElementById('txDownPaymentPercent');
  const tenorSelect = document.getElementById('txTenor');
  const voucherInput = document.getElementById('txVoucherCode');
  const applyVoucherBtn = document.getElementById('btnApplyVoucher');
  const txForm = document.getElementById('autonovaBookingForm');

  let activeDiscount = 0;

  function recalculateTransaction() {
    const selectedId = selectUnit.value;
    const vehicle = AUTONOVA_VEHICLES.find(v => v.id === selectedId);

    const previewImg = document.getElementById('txPreviewImg');
    const previewName = document.getElementById('txPreviewName');
    const previewPrice = document.getElementById('txPreviewPrice');
    const previewSpecs = document.getElementById('txPreviewSpecs');

    const sumBasePrice = document.getElementById('sumBasePrice');
    const sumAdminFee = document.getElementById('sumAdminFee');
    const sumInsurance = document.getElementById('sumInsurance');
    const sumDiscount = document.getElementById('sumDiscount');
    const sumTotalFinal = document.getElementById('sumTotalFinal');
    const creditSection = document.getElementById('creditSimulationSection');
    const sumMonthlyInstallment = document.getElementById('sumMonthlyInstallment');

    if (!vehicle) {
      if (previewName) previewName.textContent = 'Pilih Unit Kendaraan';
      if (previewPrice) previewPrice.textContent = 'Rp 0';
      if (sumTotalFinal) sumTotalFinal.textContent = 'Rp 0';
      return;
    }

    if (previewImg) previewImg.src = vehicle.image;
    if (previewName) previewName.textContent = vehicle.name;
    if (previewPrice) previewPrice.textContent = 'Rp ' + vehicle.price.toLocaleString('id-ID');
    if (previewSpecs) previewSpecs.textContent = `${vehicle.specs.power} &bull; ${vehicle.specs.trans}`;

    const basePrice = vehicle.price;
    const adminFee = 2500000; // Biaya administrasi & STNK Plat Putih OTR
    
    // Opsi Asuransi
    let insuranceCost = 0;
    const insuranceOpt = document.querySelector('input[name="txInsurance"]:checked');
    if (insuranceOpt && insuranceOpt.value === 'all-risk') {
      insuranceCost = Math.round(basePrice * 0.025); // 2.5% All Risk
    } else if (insuranceOpt && insuranceOpt.value === 'tlo') {
      insuranceCost = Math.round(basePrice * 0.012); // 1.2% Total Loss Only
    }

    // Cek Pembayaran Tunai atau Kredit
    const isCredit = document.getElementById('payCredit')?.checked;
    if (creditSection) {
      creditSection.style.display = isCredit ? 'block' : 'none';
    }

    let finalTotal = basePrice + adminFee + insuranceCost - activeDiscount;

    if (sumBasePrice) sumBasePrice.textContent = 'Rp ' + basePrice.toLocaleString('id-ID');
    if (sumAdminFee) sumAdminFee.textContent = 'Rp ' + adminFee.toLocaleString('id-ID');
    if (sumInsurance) sumInsurance.textContent = 'Rp ' + insuranceCost.toLocaleString('id-ID');
    if (sumDiscount) sumDiscount.textContent = '- Rp ' + activeDiscount.toLocaleString('id-ID');
    if (sumTotalFinal) sumTotalFinal.textContent = 'Rp ' + Math.max(0, finalTotal).toLocaleString('id-ID');

    // Jika Kredit, hitung estimasi cicilan per bulan
    if (isCredit && sumMonthlyInstallment) {
      const dpPercent = parseInt(dpPercentInput?.value || '20') / 100;
      const tenorMonths = parseInt(tenorSelect?.value || '36');
      const annualInterest = 0.065; // Bunga flat 6.5% per tahun
      
      const dpNominal = basePrice * dpPercent;
      const pokokUtang = basePrice - dpNominal;
      const totalBunga = pokokUtang * annualInterest * (tenorMonths / 12);
      const cicilanPerBulan = Math.round((pokokUtang + totalBunga) / tenorMonths);

      sumMonthlyInstallment.textContent = 'Rp ' + cicilanPerBulan.toLocaleString('id-ID') + ' / bln';
      const dpDisplay = document.getElementById('txDpNominalDisplay');
      if (dpDisplay) dpDisplay.textContent = 'Uang Muka (DP): Rp ' + Math.round(dpNominal).toLocaleString('id-ID');
    }
  }

  selectUnit.addEventListener('change', recalculateTransaction);
  paymentMethods.forEach(radio => radio.addEventListener('change', recalculateTransaction));
  document.querySelectorAll('input[name="txInsurance"]').forEach(r => r.addEventListener('change', recalculateTransaction));
  
  if (dpPercentInput) dpPercentInput.addEventListener('input', recalculateTransaction);
  if (tenorSelect) tenorSelect.addEventListener('change', recalculateTransaction);

  // Kupon Promo
  if (applyVoucherBtn && voucherInput) {
    applyVoucherBtn.addEventListener('click', function() {
      const code = voucherInput.value.trim().toUpperCase();
      if (code === 'AUTONOVA2026' || code === 'SUPERDEAL' || code === 'EVHERO') {
        activeDiscount = 25000000; // Potongan 25 Juta Rupiah
        showToastNotification(`Voucher ${code} Valid! Diskon Rp 25.000.000 telah dipotong.`);
      } else if (code === 'MEMBERNEW') {
        activeDiscount = 10000000; // Potongan 10 Juta Rupiah
        showToastNotification(`Voucher ${code} Valid! Diskon Member Rp 10.000.000 diterapkan.`);
      } else if (code === '') {
        alert('Silakan masukkan kode voucher terlebih dahulu.');
        return;
      } else {
        activeDiscount = 0;
        alert(`Kode voucher "${code}" tidak ditemukan atau masa berlakunya telah berakhir.`);
      }
      recalculateTransaction();
    });
  }

  // Handle Submit Formulir Pemesanan
  if (txForm) {
    txForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const selectedId = selectUnit.value;
      const vehicle = AUTONOVA_VEHICLES.find(v => v.id === selectedId);
      if (!vehicle) {
        alert('Silakan pilih salah satu unit kendaraan terlebih dahulu.');
        return;
      }

      const buyerName = document.getElementById('txBuyerName').value.trim();
      const buyerNik = document.getElementById('txBuyerNik').value.trim();
      const buyerPhone = document.getElementById('txBuyerPhone').value.trim();
      const buyerEmail = document.getElementById('txBuyerEmail').value.trim();
      const buyerAddress = document.getElementById('txBuyerAddress').value.trim();
      const buyerCity = document.getElementById('txBuyerCity').value.trim();
      const showroomCity = document.getElementById('txShowroomBranch').value;

      if (!buyerName || !buyerNik || !buyerPhone || !buyerEmail || !buyerAddress) {
        alert('Mohon isi seluruh data diri dan alamat pemesan secara lengkap.');
        return;
      }

      // Generate Invoice Data
      const invoiceNo = 'INV-AN-' + Math.floor(100000 + Math.random() * 900000);
      const invoiceDate = new Date().toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

      const isCredit = document.getElementById('payCredit')?.checked;
      const paymentTypeStr = isCredit ? 'Kredit Leasing AutoFinance' : 'Transfer Bank Virtual Account';
      const totalStr = document.getElementById('sumTotalFinal').textContent;

      // Populate Modal Invoice
      document.getElementById('invNumber').textContent = invoiceNo;
      document.getElementById('invDate').textContent = invoiceDate;
      document.getElementById('invBuyerName').textContent = buyerName;
      document.getElementById('invBuyerContact').textContent = `${buyerPhone} | ${buyerEmail}`;
      document.getElementById('invBuyerAddress').textContent = `${buyerAddress}, Kota ${buyerCity}`;
      document.getElementById('invVehicleName').textContent = vehicle.name;
      document.getElementById('invShowroom').textContent = `Showroom Resmi AutoNova Cabang ${showroomCity}`;
      document.getElementById('invPaymentMethod').textContent = paymentTypeStr;
      document.getElementById('invTotalAmount').textContent = totalStr;

      // Tampilkan Modal Invoice
      const invoiceModalEl = document.getElementById('invoiceSuccessModal');
      if (invoiceModalEl && typeof bootstrap !== 'undefined') {
        const invoiceModal = new bootstrap.Modal(invoiceModalEl);
        invoiceModal.show();
      }

      // Kosongkan keranjang
      clearCart();
    });
  }

  recalculateTransaction();
}

// Inisialisasi saat DOM Siap
document.addEventListener('DOMContentLoaded', function() {
  updateCartBadge();
  initPromoCountdown();
  initProductFilters();
  initForumInteractive();
  initTransactionPage();

  // Tombol buka keranjang
  const cartTriggerBtns = document.querySelectorAll('.open-cart-modal-btn');
  cartTriggerBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      renderCartModal();
      const modalEl = document.getElementById('cartModal');
      if (modalEl && typeof bootstrap !== 'undefined') {
        const modal = new bootstrap.Modal(modalEl);
        modal.show();
      }
    });
  });
});
