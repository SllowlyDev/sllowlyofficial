// ============================================
// SllowlyStore - Main JavaScript
// LocalStorage-based e-commerce system
// ============================================

// --- DATA INITIALIZATION ---
const DEFAULT_PRODUCTS = [
    {
        id: 1,
        name: "Tools Auto Create Facebook Mentah",
        description: "Alat program untuk memproduksi akun Facebook mentah belum konfirmasi secara otomatis",
        price: 35000,
        stock: 50,
        category: "tools",
        icon: "fa-robot",
        color: "from-purple-600 to-indigo-600",
        badge: "Tools"
    },
    {
        id: 2,
        name: "Akun Facebook Mentah",
        description: "Akun Facebook belum diberi OTP atau belum dikonfirmasi",
        price: 500,
        stock: 1000,
        category: "facebook",
        icon: "fa-facebook",
        color: "from-blue-600 to-blue-800",
        badge: "FB Mentah"
    },
    {
        id: 3,
        name: "Akun Facebook Fresh",
        description: "Akun Facebook fresh langsung secara manual/otomatis dari tools",
        price: 2000,
        stock: 500,
        category: "facebook",
        icon: "fa-facebook",
        color: "from-blue-500 to-cyan-600",
        badge: "FB Fresh"
    },
    {
        id: 4,
        name: "Akun Facebook Fresh Low",
        description: "Akun Facebook fresh dengan spesifikasi sudah dipasang foto profil lengkap dengan yang lain",
        price: 3000,
        stock: 300,
        category: "facebook",
        icon: "fa-facebook",
        color: "from-indigo-500 to-purple-600",
        badge: "FB Fresh Low"
    },
    {
        id: 5,
        name: "Akun Facebook Fresh Medium",
        description: "Akun Facebook fresh sudah siap pakai berbagai kebutuhan dengan keamanan autentikasi 2 faktor dan email akses",
        price: 5000,
        stock: 200,
        category: "facebook",
        icon: "fa-facebook",
        color: "from-violet-600 to-purple-700",
        badge: "FB Fresh Medium"
    },
    {
        id: 6,
        name: "Akun Gmail Bekas",
        description: "Akun Gmail bekas pemakaian wajar seperti Youtube Premium, TikTok, Facebook dan sebagainya",
        price: 3000,
        stock: 150,
        category: "gmail",
        icon: "fa-envelope",
        color: "from-red-500 to-orange-600",
        badge: "Gmail Bekas"
    },
    {
        id: 7,
        name: "Akun Gmail Fresh",
        description: "Akun Gmail fresh cocok untuk kebutuhan verifikasi aplikasi atau pendaftaran",
        price: 5000,
        stock: 400,
        category: "gmail",
        icon: "fa-envelope",
        color: "from-green-500 to-teal-600",
        badge: "Gmail Fresh"
    }
];

const PAYMENT_INFO = {
    transfer: {
        name: "Transfer Bank",
        details: [
            { bank: "BCA", number: "1234567890", name: "PT SllowlyStore Digital" },
            { bank: "BNI", number: "0987654321", name: "PT SllowlyStore Digital" },
            { bank: "Mandiri", number: "1122334455", name: "PT SllowlyStore Digital" }
        ]
    },
    dana: {
        name: "DANA",
        details: [
            { number: "0812-3456-7890", name: "SllowlyStore" }
        ]
    },
    qris: {
        name: "QRIS",
        details: [
            { info: "Scan QRIS code berikut untuk pembayaran" }
        ]
    }
};

// --- LOCAL STORAGE HELPERS ---
function getStorage(key, defaultValue = null) {
    try {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
    } catch {
        return defaultValue;
    }
}

function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function initData() {
    if (!getStorage('products')) {
        setStorage('products', DEFAULT_PRODUCTS);
    }
    if (!getStorage('cart')) {
        setStorage('cart', []);
    }
    if (!getStorage('orders')) {
        setStorage('orders', []);
    }
    if (!getStorage('adminLoggedIn')) {
        setStorage('adminLoggedIn', false);
    }
}

// --- THEME SYSTEM ---
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    const icon = document.getElementById('themeIcon');

    if (savedTheme === 'light') {
        html.classList.remove('dark');
        html.classList.add('light');
        document.body.classList.remove('bg-dark', 'text-gray-100');
        document.body.classList.add('bg-gray-50', 'text-gray-900');
        if (icon) icon.className = 'fas fa-moon text-purple-400 group-hover:rotate-180 transition-transform duration-500';
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
        document.body.classList.add('bg-dark', 'text-gray-100');
        document.body.classList.remove('bg-gray-50', 'text-gray-900');
        if (icon) icon.className = 'fas fa-sun text-yellow-400 group-hover:rotate-180 transition-transform duration-500';
    }

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        toggle.addEventListener('click', toggleTheme);
    }
}

function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');

    if (isDark) {
        html.classList.remove('dark');
        html.classList.add('light');
        localStorage.setItem('theme', 'light');
        document.body.classList.remove('bg-dark', 'text-gray-100');
        document.body.classList.add('bg-gray-50', 'text-gray-900');
    } else {
        html.classList.add('dark');
        html.classList.remove('light');
        localStorage.setItem('theme', 'dark');
        document.body.classList.add('bg-dark', 'text-gray-100');
        document.body.classList.remove('bg-gray-50', 'text-gray-900');
    }

    initTheme();
}

// --- PARTICLES ---
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 15 + 's';
        particle.style.animationDuration = (10 + Math.random() * 10) + 's';
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        container.appendChild(particle);
    }
}

// --- SCROLL REVEAL ---
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
}

// --- MOBILE MENU ---
function initMobileMenu() {
    const btn = document.getElementById('mobileMenuBtn');
    const menu = document.getElementById('mobileMenu');

    if (btn && menu) {
        btn.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
}

// --- PRODUCT FUNCTIONS ---
function getProducts() {
    return getStorage('products', DEFAULT_PRODUCTS);
}

function formatPrice(price) {
    return 'Rp' + price.toLocaleString('id-ID');
}

function renderProducts() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const products = getProducts();

    grid.innerHTML = products.map((product, index) => `
        <div class="glass rounded-3xl overflow-hidden card-hover scroll-reveal" style="transition-delay: ${index * 0.1}s">
            <div class="relative h-48 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden">
                <div class="absolute inset-0 bg-black/20"></div>
                <i class="fab ${product.icon} text-6xl text-white/30 transform hover:scale-110 transition-transform duration-500"></i>
                <div class="absolute top-4 left-4">
                    <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                        ${product.badge}
                    </span>
                </div>
                <div class="absolute top-4 right-4">
                    <span class="px-3 py-1 rounded-full bg-green-500/20 backdrop-blur-sm text-green-300 text-xs font-medium">
                        Stok: ${product.stock}
                    </span>
                </div>
            </div>
            <div class="p-6">
                <h3 class="text-lg font-bold text-white mb-2 line-clamp-1">${product.name}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed">${product.description}</p>
                <div class="flex items-center justify-between">
                    <div>
                        <span class="text-xs text-gray-500">Harga</span>
                        <div class="text-xl font-bold text-purple-400">${formatPrice(product.price)}</div>
                    </div>
                    <button onclick="addToCart(${product.id})" 
                        class="btn-gradient w-12 h-12 rounded-xl flex items-center justify-center hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-110 active:scale-95"
                        ${product.stock <= 0 ? 'disabled style="opacity:0.5;cursor:not-allowed"' : ''}>
                        <i class="fas fa-plus text-white"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// --- CART FUNCTIONS ---
function getCart() {
    return getStorage('cart', []);
}

function addToCart(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product || product.stock <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Stok Habis',
            text: 'Maaf, produk ini sedang tidak tersedia.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            Swal.fire({
                icon: 'warning',
                title: 'Stok Terbatas',
                text: `Maksimal pembelian ${product.stock} item untuk produk ini.`,
                confirmButtonColor: '#6B21A8',
                background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
            });
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            icon: product.icon,
            color: product.color
        });
    }

    setStorage('cart', cart);
    updateCartCount();

    // Animate cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.classList.add('cart-bounce');
        setTimeout(() => cartBtn.classList.remove('cart-bounce'), 500);
    }

    Swal.fire({
        icon: 'success',
        title: 'Ditambahkan!',
        text: `${product.name} telah ditambahkan ke keranjang.`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
        background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
    });
}

function removeFromCart(productId) {
    let cart = getCart();
    cart = cart.filter(item => item.id !== productId);
    setStorage('cart', cart);
    updateCartCount();
    renderCheckout();
}

function updateCartQuantity(productId, delta) {
    let cart = getCart();
    const item = cart.find(i => i.id === productId);
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!item) return;

    const newQty = item.quantity + delta;

    if (newQty <= 0) {
        removeFromCart(productId);
        return;
    }

    if (product && newQty > product.stock) {
        Swal.fire({
            icon: 'warning',
            title: 'Stok Terbatas',
            text: `Maksimal ${product.stock} item tersedia.`,
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    item.quantity = newQty;
    setStorage('cart', cart);
    renderCheckout();
}

function updateCartCount() {
    const cart = getCart();
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    const badge = document.getElementById('cartCount');

    if (badge) {
        if (count > 0) {
            badge.textContent = count;
            badge.classList.remove('hidden');
        } else {
            badge.classList.add('hidden');
        }
    }
}

function clearCart() {
    setStorage('cart', []);
    updateCartCount();
}

// --- CHECKOUT FUNCTIONS ---
let selectedPaymentMethod = null;
let uploadedProof = null;

function renderCheckout() {
    const cart = getCart();
    const cartItems = document.getElementById('cartItems');
    const emptyCart = document.getElementById('emptyCart');
    const orderSummary = document.getElementById('orderSummary');
    const subtotalEl = document.getElementById('subtotal');
    const totalEl = document.getElementById('totalPrice');

    if (!cartItems) return;

    if (cart.length === 0) {
        if (cartItems) cartItems.classList.add('hidden');
        if (emptyCart) emptyCart.classList.remove('hidden');
        if (orderSummary) orderSummary.innerHTML = '<p class="text-gray-500 text-center py-4">Keranjang kosong</p>';
        if (subtotalEl) subtotalEl.textContent = 'Rp0';
        if (totalEl) totalEl.textContent = 'Rp0';
        return;
    }

    if (cartItems) cartItems.classList.remove('hidden');
    if (emptyCart) emptyCart.classList.add('hidden');

    let subtotal = 0;

    const itemsHTML = cart.map(item => {
        const itemTotal = item.price * item.quantity;
        subtotal += itemTotal;

        return `
            <div class="flex items-center space-x-4 glass rounded-2xl p-4">
                <div class="w-14 h-14 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0">
                    <i class="fab ${item.icon} text-white text-xl"></i>
                </div>
                <div class="flex-1 min-w-0">
                    <h4 class="font-semibold text-white truncate">${item.name}</h4>
                    <p class="text-sm text-purple-400">${formatPrice(item.price)}</p>
                </div>
                <div class="flex items-center space-x-2">
                    <button onclick="updateCartQuantity(${item.id}, -1)" class="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-purple-500/20 transition-all">
                        <i class="fas fa-minus text-xs text-gray-400"></i>
                    </button>
                    <span class="w-8 text-center font-semibold">${item.quantity}</span>
                    <button onclick="updateCartQuantity(${item.id}, 1)" class="w-8 h-8 rounded-lg glass flex items-center justify-center hover:bg-purple-500/20 transition-all">
                        <i class="fas fa-plus text-xs text-gray-400"></i>
                    </button>
                </div>
                <div class="text-right min-w-[80px]">
                    <div class="font-bold text-white">${formatPrice(itemTotal)}</div>
                    <button onclick="removeFromCart(${item.id})" class="text-xs text-red-400 hover:text-red-300 mt-1">
                        <i class="fas fa-trash mr-1"></i>Hapus
                    </button>
                </div>
            </div>
        `;
    }).join('');

    if (cartItems) cartItems.innerHTML = itemsHTML;

    const summaryHTML = cart.map(item => `
        <div class="flex justify-between text-sm">
            <span class="text-gray-400">${item.name} x${item.quantity}</span>
            <span class="text-white">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');

    if (orderSummary) orderSummary.innerHTML = summaryHTML;
    if (subtotalEl) subtotalEl.textContent = formatPrice(subtotal);
    if (totalEl) totalEl.textContent = formatPrice(subtotal);
}

function selectPayment(element) {
    document.querySelectorAll('.payment-card').forEach(card => {
        card.classList.remove('selected');
    });
    element.classList.add('selected');
    selectedPaymentMethod = element.dataset.method;

    const detailsDiv = document.getElementById('paymentDetails');
    const infoDiv = document.getElementById('paymentInfo');

    if (detailsDiv && infoDiv) {
        detailsDiv.classList.remove('hidden');

        const method = PAYMENT_INFO[selectedPaymentMethod];
        let infoHTML = `<div class="font-semibold text-purple-300 mb-2">${method.name}</div>`;

        method.details.forEach(detail => {
            if (detail.bank) {
                infoHTML += `
                    <div class="glass rounded-xl p-3 flex items-center justify-between">
                        <div>
                            <div class="text-sm font-medium text-white">${detail.bank}</div>
                            <div class="text-xs text-gray-400">${detail.name}</div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono text-purple-300">${detail.number}</span>
                            <button onclick="navigator.clipboard.writeText('${detail.number}')" class="text-purple-400 hover:text-purple-300">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else if (detail.number) {
                infoHTML += `
                    <div class="glass rounded-xl p-3 flex items-center justify-between">
                        <div>
                            <div class="text-sm font-medium text-white">Nomor ${method.name}</div>
                            <div class="text-xs text-gray-400">${detail.name}</div>
                        </div>
                        <div class="flex items-center space-x-2">
                            <span class="font-mono text-purple-300">${detail.number}</span>
                            <button onclick="navigator.clipboard.writeText('${detail.number}')" class="text-purple-400 hover:text-purple-300">
                                <i class="fas fa-copy"></i>
                            </button>
                        </div>
                    </div>
                `;
            } else {
                infoHTML += `
                    <div class="glass rounded-xl p-3 text-center">
                        <div class="w-32 h-32 bg-white rounded-xl mx-auto mb-3 flex items-center justify-center">
                            <i class="fas fa-qrcode text-6xl text-gray-800"></i>
                        </div>
                        <p class="text-sm text-gray-400">${detail.info}</p>
                    </div>
                `;
            }
        });

        infoDiv.innerHTML = infoHTML;
    }
}

function initUploadArea() {
    const uploadArea = document.getElementById('uploadArea');
    const fileInput = document.getElementById('proofFile');

    if (!uploadArea || !fileInput) return;

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');

        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
}

function handleFileSelect(event) {
    const file = event.target.files[0];
    if (file) handleFile(file);
}

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        Swal.fire({
            icon: 'error',
            title: 'Format Tidak Valid',
            text: 'Silakan upload file gambar (JPG, PNG, JPEG).',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    if (file.size > 5 * 1024 * 1024) {
        Swal.fire({
            icon: 'error',
            title: 'File Terlalu Besar',
            text: 'Maksimal ukuran file 5MB.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        uploadedProof = e.target.result;

        const preview = document.getElementById('uploadPreview');
        const placeholder = document.getElementById('uploadPlaceholder');
        const previewImage = document.getElementById('previewImage');

        if (preview && placeholder && previewImage) {
            previewImage.src = uploadedProof;
            preview.classList.remove('hidden');
            placeholder.classList.add('hidden');
        }

        Swal.fire({
            icon: 'success',
            title: 'Upload Berhasil',
            text: 'Bukti transfer telah diupload.',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
    };
    reader.readAsDataURL(file);
}

function submitOrder() {
    const cart = getCart();

    if (cart.length === 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Keranjang Kosong',
            text: 'Silakan tambahkan produk ke keranjang terlebih dahulu.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    const name = document.getElementById('customerName')?.value?.trim();
    const email = document.getElementById('customerEmail')?.value?.trim();
    const phone = document.getElementById('customerPhone')?.value?.trim();

    if (!name || !email || !phone) {
        Swal.fire({
            icon: 'warning',
            title: 'Data Belum Lengkap',
            text: 'Silakan lengkapi semua data pembeli.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    if (!selectedPaymentMethod) {
        Swal.fire({
            icon: 'warning',
            title: 'Pilih Metode Pembayaran',
            text: 'Silakan pilih metode pembayaran yang tersedia.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    if (!uploadedProof) {
        Swal.fire({
            icon: 'warning',
            title: 'Upload Bukti Transfer',
            text: 'Silakan upload bukti transfer untuk melanjutkan.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    // Generate invoice
    const invoice = 'INV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    const order = {
        id: invoice,
        customer: { name, email, phone },
        items: [...cart],
        paymentMethod: selectedPaymentMethod,
        proofImage: uploadedProof,
        status: 'Diproses',
        total: total,
        date: new Date().toISOString(),
        timestamp: Date.now()
    };

    // Save order
    const orders = getStorage('orders', []);
    orders.unshift(order);
    setStorage('orders', orders);

    // Update stock
    let products = getProducts();
    cart.forEach(cartItem => {
        const product = products.find(p => p.id === cartItem.id);
        if (product) {
            product.stock -= cartItem.quantity;
        }
    });
    setStorage('products', products);

    // Clear cart
    clearCart();

    // Show invoice
    const invoicePreview = document.getElementById('invoicePreview');
    const invoiceNumber = document.getElementById('invoiceNumber');

    if (invoicePreview && invoiceNumber) {
        invoiceNumber.textContent = invoice;
        invoicePreview.classList.remove('hidden');
    }

    // Update steps
    document.getElementById('step2')?.classList.add('btn-gradient', 'text-white');
    document.getElementById('step2')?.classList.remove('glass', 'text-gray-400');
    document.getElementById('step2Label')?.classList.add('text-purple-300');
    document.getElementById('stepLine2')?.classList.add('step-line');
    document.getElementById('stepLine2')?.classList.remove('bg-gray-700');
    document.getElementById('step3')?.classList.add('btn-gradient', 'text-white');
    document.getElementById('step3')?.classList.remove('glass', 'text-gray-400');
    document.getElementById('step3Label')?.classList.add('text-purple-300');

    // Build WhatsApp message
    const itemsText = order.items.map(item => `- ${item.name} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`).join('%0A');
    const waMessage = `Halo Admin SllowlyStore,%0A%0ASaya ingin konfirmasi pesanan:%0A%0A*Invoice:* ${invoice}%0A*Nama:* ${name}%0A*Email:* ${email}%0A*WhatsApp:* ${phone}%0A%0A*Pesanan:*%0A${itemsText}%0A%0A*Total:* ${formatPrice(total)}%0A*Metode Pembayaran:* ${PAYMENT_INFO[selectedPaymentMethod].name}%0A*Status:* Diproses%0A%0ATerima kasih!`;

    Swal.fire({
        icon: 'success',
        title: 'Pesanan Berhasil!',
        html: `
            <div class="text-left">
                <p class="mb-2">Nomor Invoice: <strong class="text-purple-400">${invoice}</strong></p>
                <p class="text-sm text-gray-400">Silakan simpat nomor invoice untuk cek status pesanan.</p>
            </div>
        `,
        confirmButtonColor: '#6B21A8',
        confirmButtonText: 'Hubungi Admin via WhatsApp',
        showCancelButton: true,
        cancelButtonText: 'Tutup',
        background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
    }).then((result) => {
        if (result.isConfirmed) {
            window.open(`https://wa.me/6281234567890?text=${waMessage}`, '_blank');
        }
    });
}

function copyInvoice() {
    const invoice = document.getElementById('invoiceNumber')?.textContent;
    if (invoice) {
        navigator.clipboard.writeText(invoice);
        Swal.fire({
            icon: 'success',
            title: 'Disalin!',
            text: 'Nomor invoice telah disalin.',
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
    }
}

// --- INVOICE STATUS FUNCTIONS ---
function searchInvoice() {
    const searchInput = document.getElementById('invoiceSearch');
    const invoiceId = searchInput?.value?.trim().toUpperCase();

    if (!invoiceId) {
        Swal.fire({
            icon: 'warning',
            title: 'Masukkan Invoice',
            text: 'Silakan masukkan nomor invoice.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    const orders = getStorage('orders', []);
    const order = orders.find(o => o.id.toUpperCase() === invoiceId);

    const resultDiv = document.getElementById('searchResult');
    const emptyState = document.getElementById('emptyState');

    if (!resultDiv) return;

    if (!order) {
        resultDiv.innerHTML = `
            <div class="glass rounded-3xl p-8 text-center">
                <div class="w-20 h-20 rounded-full glass flex items-center justify-center mx-auto mb-4">
                    <i class="fas fa-times-circle text-3xl text-red-400"></i>
                </div>
                <h3 class="text-xl font-semibold text-white mb-2">Invoice Tidak Ditemukan</h3>
                <p class="text-gray-500">Nomor invoice yang Anda masukkan tidak valid atau belum terdaftar.</p>
            </div>
        `;
        resultDiv.classList.remove('hidden');
        if (emptyState) emptyState.classList.add('hidden');
        return;
    }

    const statusColors = {
        'Diproses': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
        'Berhasil': 'bg-green-500/20 text-green-400 border-green-500/30',
        'Ditolak': 'bg-red-500/20 text-red-400 border-red-500/30'
    };

    const statusIcons = {
        'Diproses': 'fa-clock',
        'Berhasil': 'fa-check-circle',
        'Ditolak': 'fa-times-circle'
    };

    const date = new Date(order.date);
    const formattedDate = date.toLocaleDateString('id-ID', { 
        day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' 
    });

    const itemsHTML = order.items.map(item => `
        <div class="flex justify-between items-center py-2 border-b border-purple-500/10 last:border-0">
            <div class="flex items-center space-x-3">
                <div class="w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center">
                    <i class="fab ${item.icon} text-white text-xs"></i>
                </div>
                <div>
                    <div class="text-sm font-medium text-white">${item.name}</div>
                    <div class="text-xs text-gray-500">${item.quantity}x ${formatPrice(item.price)}</div>
                </div>
            </div>
            <span class="text-sm font-semibold text-white">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');

    resultDiv.innerHTML = `
        <div class="glass rounded-3xl p-6 md:p-8">
            <!-- Header -->
            <div class="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
                <div>
                    <div class="text-sm text-gray-500 mb-1">Nomor Invoice</div>
                    <div class="text-2xl font-bold font-mono text-white">${order.id}</div>
                </div>
                <div class="px-4 py-2 rounded-full border ${statusColors[order.status]} flex items-center space-x-2 status-badge w-fit">
                    <i class="fas ${statusIcons[order.status]}"></i>
                    <span class="font-semibold">${order.status}</span>
                </div>
            </div>

            <!-- Timeline -->
            <div class="flex items-center justify-between mb-8 px-2">
                <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mb-2">
                        <i class="fas fa-shopping-cart text-green-400 text-xs"></i>
                    </div>
                    <span class="text-xs text-gray-400">Dipesan</span>
                </div>
                <div class="flex-1 h-1 mx-2 rounded-full ${order.status !== 'Ditolak' ? 'bg-gradient-to-r from-green-500 to-purple-500' : 'bg-gray-700'}"></div>
                <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full ${order.status === 'Diproses' ? 'bg-yellow-500/20 timeline-dot' : (order.status === 'Berhasil' ? 'bg-green-500/20' : 'bg-red-500/20')} flex items-center justify-center mb-2">
                        <i class="fas ${order.status === 'Diproses' ? 'fa-clock text-yellow-400' : (order.status === 'Berhasil' ? 'fa-check text-green-400' : 'fa-times text-red-400')} text-xs"></i>
                    </div>
                    <span class="text-xs ${order.status === 'Diproses' ? 'text-yellow-400' : (order.status === 'Berhasil' ? 'text-green-400' : 'text-red-400')}">${order.status}</span>
                </div>
                <div class="flex-1 h-1 mx-2 rounded-full ${order.status === 'Berhasil' ? 'bg-gradient-to-r from-purple-500 to-green-500' : 'bg-gray-700'}"></div>
                <div class="flex flex-col items-center">
                    <div class="w-8 h-8 rounded-full ${order.status === 'Berhasil' ? 'bg-green-500/20' : 'bg-gray-700'} flex items-center justify-center mb-2">
                        <i class="fas fa-box text-xs ${order.status === 'Berhasil' ? 'text-green-400' : 'text-gray-600'}"></i>
                    </div>
                    <span class="text-xs ${order.status === 'Berhasil' ? 'text-green-400' : 'text-gray-600'}">Selesai</span>
                </div>
            </div>

            <!-- Customer Info -->
            <div class="glass rounded-2xl p-5 mb-6">
                <h3 class="font-semibold text-white mb-4 flex items-center">
                    <i class="fas fa-user text-purple-400 mr-2"></i>Data Pembeli
                </h3>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <div class="text-xs text-gray-500 mb-1">Nama</div>
                        <div class="text-sm text-white font-medium">${order.customer.name}</div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-500 mb-1">Email</div>
                        <div class="text-sm text-white font-medium">${order.customer.email}</div>
                    </div>
                    <div>
                        <div class="text-xs text-gray-500 mb-1">WhatsApp</div>
                        <div class="text-sm text-white font-medium">${order.customer.phone}</div>
                    </div>
                </div>
            </div>

            <!-- Items -->
            <div class="glass rounded-2xl p-5 mb-6">
                <h3 class="font-semibold text-white mb-4 flex items-center">
                    <i class="fas fa-shopping-bag text-purple-400 mr-2"></i>Detail Pesanan
                </h3>
                <div class="space-y-1">
                    ${itemsHTML}
                </div>
                <div class="flex justify-between items-center pt-4 mt-4 border-t border-purple-500/20">
                    <span class="font-semibold text-white">Total Pembayaran</span>
                    <span class="text-xl font-bold text-purple-400">${formatPrice(order.total)}</span>
                </div>
            </div>

            <!-- Payment Info -->
            <div class="glass rounded-2xl p-5 mb-6">
                <h3 class="font-semibold text-white mb-4 flex items-center">
                    <i class="fas fa-credit-card text-purple-400 mr-2"></i>Metode Pembayaran
                </h3>
                <div class="flex items-center space-x-3">
                    <div class="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
                        <i class="fas ${order.paymentMethod === 'transfer' ? 'fa-university' : (order.paymentMethod === 'dana' ? 'fa-wallet' : 'fa-qrcode')} text-purple-400"></i>
                    </div>
                    <div>
                        <div class="text-sm font-medium text-white">${PAYMENT_INFO[order.paymentMethod]?.name || order.paymentMethod}</div>
                        <div class="text-xs text-gray-500">${formattedDate}</div>
                    </div>
                </div>
            </div>

            <!-- Proof Image -->
            ${order.proofImage ? `
            <div class="glass rounded-2xl p-5">
                <h3 class="font-semibold text-white mb-4 flex items-center">
                    <i class="fas fa-image text-purple-400 mr-2"></i>Bukti Transfer
                </h3>
                <img src="${order.proofImage}" alt="Bukti Transfer" class="rounded-xl max-h-64 mx-auto border border-purple-500/20">
            </div>
            ` : ''}
        </div>
    `;

    resultDiv.classList.remove('hidden');
    if (emptyState) emptyState.classList.add('hidden');
}

function renderRecentOrders() {
    const container = document.getElementById('recentOrders');
    if (!container) return;

    const orders = getStorage('orders', []).slice(0, 5);

    if (orders.length === 0) {
        container.innerHTML = `
            <div class="glass rounded-2xl p-6 text-center">
                <p class="text-gray-500">Belum ada pesanan</p>
            </div>
        `;
        return;
    }

    const statusColors = {
        'Diproses': 'text-yellow-400 bg-yellow-500/10',
        'Berhasil': 'text-green-400 bg-green-500/10',
        'Ditolak': 'text-red-400 bg-red-500/10'
    };

    container.innerHTML = orders.map(order => {
        const date = new Date(order.date);
        const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' });

        return `
            <div class="glass rounded-2xl p-4 flex items-center justify-between cursor-pointer hover:bg-purple-500/5 transition-all" onclick="document.getElementById('invoiceSearch').value='${order.id}'; searchInvoice(); window.scrollTo({top:0, behavior:'smooth'});">
                <div class="flex items-center space-x-4">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 to-violet-600 flex items-center justify-center">
                        <i class="fas fa-receipt text-white text-sm"></i>
                    </div>
                    <div>
                        <div class="font-mono font-semibold text-white text-sm">${order.id}</div>
                        <div class="text-xs text-gray-500">${order.customer.name} • ${formattedDate}</div>
                    </div>
                </div>
                <div class="text-right">
                    <div class="text-sm font-semibold text-white">${formatPrice(order.total)}</div>
                    <span class="text-xs px-2 py-1 rounded-full ${statusColors[order.status]}">${order.status}</span>
                </div>
            </div>
        `;
    }).join('');
}

// --- ADMIN FUNCTIONS ---
function checkAdminLogin() {
    const isLoggedIn = getStorage('adminLoggedIn', false);
    const loginScreen = document.getElementById('loginScreen');
    const dashboard = document.getElementById('dashboard');

    if (isLoggedIn) {
        if (loginScreen) loginScreen.classList.add('hidden');
        if (dashboard) dashboard.classList.remove('hidden');
        renderAdminDashboard();
    } else {
        if (loginScreen) loginScreen.classList.remove('hidden');
        if (dashboard) dashboard.classList.add('hidden');
    }
}

function login() {
    const user = document.getElementById('adminUser')?.value;
    const pass = document.getElementById('adminPass')?.value;

    if (user === 'admin' && pass === 'admin123') {
        setStorage('adminLoggedIn', true);

        Swal.fire({
            icon: 'success',
            title: 'Login Berhasil',
            text: 'Selamat datang di Admin Dashboard.',
            showConfirmButton: false,
            timer: 1500,
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        }).then(() => {
            checkAdminLogin();
        });
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Login Gagal',
            text: 'Username atau password salah.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
    }
}

function logout() {
    setStorage('adminLoggedIn', false);
    Swal.fire({
        icon: 'success',
        title: 'Logout Berhasil',
        showConfirmButton: false,
        timer: 1000,
        background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
    }).then(() => {
        checkAdminLogin();
    });
}

function togglePassword() {
    const input = document.getElementById('adminPass');
    const icon = document.getElementById('passIcon');

    if (input.type === 'password') {
        input.type = 'text';
        icon.className = 'fas fa-eye-slash';
    } else {
        input.type = 'password';
        icon.className = 'fas fa-eye';
    }
}

function showTab(tabName) {
    // Hide all content
    document.querySelectorAll('[id^="content-"]').forEach(el => el.classList.add('hidden'));
    document.querySelectorAll('[id^="tab-"]').forEach(el => {
        el.classList.remove('active', 'text-white');
        el.classList.add('text-gray-400');
    });

    // Show selected
    const content = document.getElementById(`content-${tabName}`);
    const tab = document.getElementById(`tab-${tabName}`);

    if (content) content.classList.remove('hidden');
    if (tab) {
        tab.classList.add('active', 'text-white');
        tab.classList.remove('text-gray-400');
    }

    // Update title
    const titles = {
        'overview': 'Dashboard Overview',
        'products': 'Kelola Produk',
        'orders': 'Daftar Pesanan'
    };
    const titleEl = document.getElementById('pageTitle');
    if (titleEl) titleEl.textContent = titles[tabName] || 'Dashboard';

    if (tabName === 'products') renderAdminProducts();
    if (tabName === 'orders') renderAdminOrders('all');
}

function renderAdminDashboard() {
    const orders = getStorage('orders', []);

    // Stats
    const totalOrders = orders.length;
    const successOrders = orders.filter(o => o.status === 'Berhasil').length;
    const pendingOrders = orders.filter(o => o.status === 'Diproses').length;
    const revenue = orders.filter(o => o.status === 'Berhasil').reduce((sum, o) => sum + o.total, 0);

    const statTotal = document.getElementById('statTotalOrders');
    const statSuccess = document.getElementById('statSuccess');
    const statPending = document.getElementById('statPending');
    const statRevenue = document.getElementById('statRevenue');

    if (statTotal) statTotal.textContent = totalOrders;
    if (statSuccess) statSuccess.textContent = successOrders;
    if (statPending) statPending.textContent = pendingOrders;
    if (statRevenue) statRevenue.textContent = formatPrice(revenue);

    // Recent orders table
    const tableBody = document.getElementById('recentOrdersTable');
    if (tableBody) {
        const recentOrders = orders.slice(0, 5);

        if (recentOrders.length === 0) {
            tableBody.innerHTML = `<tr><td colspan="6" class="py-8 text-center text-gray-500">Belum ada pesanan</td></tr>`;
        } else {
            tableBody.innerHTML = recentOrders.map(order => {
                const date = new Date(order.date);
                const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });

                const statusColors = {
                    'Diproses': 'text-yellow-400 bg-yellow-500/10',
                    'Berhasil': 'text-green-400 bg-green-500/10',
                    'Ditolak': 'text-red-400 bg-red-500/10'
                };

                return `
                    <tr class="order-row border-b border-purple-500/5">
                        <td class="py-3 font-mono text-purple-300">${order.id}</td>
                        <td class="py-3 text-white">${order.customer.name}</td>
                        <td class="py-3 text-gray-400">${order.items.length} produk</td>
                        <td class="py-3 text-white font-medium">${formatPrice(order.total)}</td>
                        <td class="py-3">
                            <span class="px-2 py-1 rounded-full text-xs ${statusColors[order.status]}">${order.status}</span>
                        </td>
                        <td class="py-3 text-gray-500">${formattedDate}</td>
                    </tr>
                `;
            }).join('');
        }
    }
}

function renderAdminProducts() {
    const container = document.getElementById('adminProductList');
    if (!container) return;

    const products = getProducts();

    container.innerHTML = products.map(product => `
        <div class="glass rounded-2xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div class="flex items-center space-x-4">
                <div class="w-12 h-12 rounded-xl bg-gradient-to-br ${product.color} flex items-center justify-center flex-shrink-0">
                    <i class="fab ${product.icon} text-white"></i>
                </div>
                <div>
                    <h4 class="font-semibold text-white">${product.name}</h4>
                    <p class="text-xs text-gray-500">${product.badge} • ID: ${product.id}</p>
                </div>
            </div>
            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div class="flex items-center space-x-2">
                    <span class="text-xs text-gray-500">Harga:</span>
                    <input type="number" value="${product.price}" 
                        onchange="updateProductPrice(${product.id}, this.value)"
                        class="w-24 px-3 py-2 rounded-lg bg-surface border border-purple-500/20 text-white text-sm focus:outline-none focus:border-purple-500">
                </div>
                <div class="flex items-center space-x-2">
                    <span class="text-xs text-gray-500">Stok:</span>
                    <input type="number" value="${product.stock}" 
                        onchange="updateProductStock(${product.id}, this.value)"
                        class="w-20 px-3 py-2 rounded-lg bg-surface border border-purple-500/20 text-white text-sm focus:outline-none focus:border-purple-500">
                </div>
            </div>
        </div>
    `).join('');
}

function updateProductPrice(productId, newPrice) {
    let products = getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        product.price = parseInt(newPrice) || 0;
        setStorage('products', products);

        Swal.fire({
            icon: 'success',
            title: 'Harga Diperbarui',
            text: `Harga ${product.name} telah diperbarui.`,
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
    }
}

function updateProductStock(productId, newStock) {
    let products = getProducts();
    const product = products.find(p => p.id === productId);
    if (product) {
        product.stock = parseInt(newStock) || 0;
        setStorage('products', products);

        Swal.fire({
            icon: 'success',
            title: 'Stok Diperbarui',
            text: `Stok ${product.name} telah diperbarui.`,
            showConfirmButton: false,
            timer: 1500,
            toast: true,
            position: 'top-end',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
    }
}

let currentOrderFilter = 'all';

function filterOrders(status) {
    currentOrderFilter = status;

    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.filter === status) {
            btn.classList.add('active');
            btn.classList.remove('text-gray-400');
        } else {
            btn.classList.add('text-gray-400');
        }
    });

    renderAdminOrders(status);
}

function renderAdminOrders(filter = 'all') {
    const tableBody = document.getElementById('allOrdersTable');
    const noOrdersMsg = document.getElementById('noOrdersMsg');

    if (!tableBody) return;

    let orders = getStorage('orders', []);

    if (filter !== 'all') {
        orders = orders.filter(o => o.status.toLowerCase() === filter.toLowerCase());
    }

    if (orders.length === 0) {
        tableBody.innerHTML = '';
        if (noOrdersMsg) noOrdersMsg.classList.remove('hidden');
        return;
    }

    if (noOrdersMsg) noOrdersMsg.classList.add('hidden');

    const statusColors = {
        'Diproses': 'text-yellow-400 bg-yellow-500/10',
        'Berhasil': 'text-green-400 bg-green-500/10',
        'Ditolak': 'text-red-400 bg-red-500/10'
    };

    tableBody.innerHTML = orders.map(order => {
        const date = new Date(order.date);
        const formattedDate = date.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });

        return `
            <tr class="order-row border-b border-purple-500/5">
                <td class="py-4 font-mono text-purple-300">${order.id}</td>
                <td class="py-4">
                    <div class="text-white font-medium">${order.customer.name}</div>
                    <div class="text-xs text-gray-500">${order.customer.phone}</div>
                </td>
                <td class="py-4">
                    <div class="text-white">${order.items.map(i => i.name).join(', ')}</div>
                    <div class="text-xs text-gray-500">${order.items.length} item</div>
                </td>
                <td class="py-4 text-white font-medium">${formatPrice(order.total)}</td>
                <td class="py-4">
                    <span class="px-2 py-1 rounded-full text-xs ${statusColors[order.status]}">${order.status}</span>
                </td>
                <td class="py-4">
                    ${order.proofImage ? `
                        <button onclick="viewProof('${order.id}')" class="text-purple-400 hover:text-purple-300">
                            <i class="fas fa-image"></i> Lihat
                        </button>
                    ` : '<span class="text-gray-600">-</span>'}
                </td>
                <td class="py-4">
                    <div class="flex items-center space-x-2">
                        <button onclick="updateOrderStatus('${order.id}', 'Berhasil')" 
                            class="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center hover:bg-green-500/30 transition-all"
                            title="Berhasil">
                            <i class="fas fa-check text-green-400 text-xs"></i>
                        </button>
                        <button onclick="updateOrderStatus('${order.id}', 'Ditolak')" 
                            class="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center hover:bg-red-500/30 transition-all"
                            title="Ditolak">
                            <i class="fas fa-times text-red-400 text-xs"></i>
                        </button>
                        <button onclick="viewOrderDetail('${order.id}')" 
                            class="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-all"
                            title="Detail">
                            <i class="fas fa-eye text-purple-400 text-xs"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `;
    }).join('');
}

function updateOrderStatus(orderId, newStatus) {
    let orders = getStorage('orders', []);
    const order = orders.find(o => o.id === orderId);

    if (!order) return;

    order.status = newStatus;
    setStorage('orders', orders);

    Swal.fire({
        icon: 'success',
        title: 'Status Diperbarui',
        text: `Pesanan ${orderId} statusnya menjadi ${newStatus}.`,
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        position: 'top-end',
        background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
    });

    renderAdminOrders(currentOrderFilter);
    renderAdminDashboard();
}

function viewProof(orderId) {
    const orders = getStorage('orders', []);
    const order = orders.find(o => o.id === orderId);

    if (!order || !order.proofImage) return;

    Swal.fire({
        title: 'Bukti Transfer',
        imageUrl: order.proofImage,
        imageAlt: 'Bukti Transfer',
        confirmButtonColor: '#6B21A8',
        background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000',
        width: 'auto'
    });
}

function viewOrderDetail(orderId) {
    const orders = getStorage('orders', []);
    const order = orders.find(o => o.id === orderId);

    if (!order) return;

    const modal = document.getElementById('orderModal');
    const content = document.getElementById('modalContent');

    if (!modal || !content) return;

    const itemsHTML = order.items.map(item => `
        <div class="flex justify-between items-center py-2 border-b border-purple-500/10">
            <span class="text-gray-300">${item.name} x${item.quantity}</span>
            <span class="text-white">${formatPrice(item.price * item.quantity)}</span>
        </div>
    `).join('');

    const statusColors = {
        'Diproses': 'text-yellow-400',
        'Berhasil': 'text-green-400',
        'Ditolak': 'text-red-400'
    };

    content.innerHTML = `
        <h2 class="text-xl font-bold text-white mb-6">Detail Pesanan</h2>
        <div class="space-y-4">
            <div class="glass rounded-xl p-4">
                <div class="text-xs text-gray-500 mb-1">Invoice</div>
                <div class="font-mono text-lg text-purple-400">${order.id}</div>
            </div>

            <div class="glass rounded-xl p-4">
                <div class="text-xs text-gray-500 mb-2">Data Pembeli</div>
                <div class="space-y-1 text-sm">
                    <div class="text-white"><span class="text-gray-500">Nama:</span> ${order.customer.name}</div>
                    <div class="text-white"><span class="text-gray-500">Email:</span> ${order.customer.email}</div>
                    <div class="text-white"><span class="text-gray-500">WA:</span> ${order.customer.phone}</div>
                </div>
            </div>

            <div class="glass rounded-xl p-4">
                <div class="text-xs text-gray-500 mb-2">Pesanan</div>
                ${itemsHTML}
                <div class="flex justify-between items-center pt-2 mt-2 border-t border-purple-500/20">
                    <span class="font-semibold text-white">Total</span>
                    <span class="font-bold text-purple-400">${formatPrice(order.total)}</span>
                </div>
            </div>

            <div class="glass rounded-xl p-4">
                <div class="text-xs text-gray-500 mb-2">Status & Pembayaran</div>
                <div class="flex items-center justify-between">
                    <span class="text-white">Status: <span class="${statusColors[order.status]} font-semibold">${order.status}</span></span>
                    <span class="text-gray-400 text-sm">${PAYMENT_INFO[order.paymentMethod]?.name || order.paymentMethod}</span>
                </div>
            </div>

            ${order.proofImage ? `
            <div class="glass rounded-xl p-4">
                <div class="text-xs text-gray-500 mb-2">Bukti Transfer</div>
                <img src="${order.proofImage}" class="rounded-xl max-h-48 mx-auto border border-purple-500/20">
            </div>
            ` : ''}

            <div class="flex gap-3 pt-2">
                <button onclick="updateOrderStatus('${order.id}', 'Berhasil'); closeOrderModal();" 
                    class="flex-1 py-3 rounded-xl bg-green-500/20 text-green-400 font-semibold hover:bg-green-500/30 transition-all">
                    <i class="fas fa-check mr-2"></i>Berhasil
                </button>
                <button onclick="updateOrderStatus('${order.id}', 'Ditolak'); closeOrderModal();" 
                    class="flex-1 py-3 rounded-xl bg-red-500/20 text-red-400 font-semibold hover:bg-red-500/30 transition-all">
                    <i class="fas fa-times mr-2"></i>Ditolak
                </button>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
}

function closeOrderModal() {
    const modal = document.getElementById('orderModal');
    if (modal) modal.classList.add('hidden');
}


// ============================================
// QUANTITY SELECTOR FUNCTIONS
// ============================================

// Store temporary quantities for each product
let productQuantities = {};

function initProductQuantities() {
    const products = getProducts();
    products.forEach(p => {
        if (!productQuantities[p.id]) {
            productQuantities[p.id] = 1;
        }
    });
}

function updateProductQty(productId, delta) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    let currentQty = productQuantities[productId] || 1;
    let newQty = currentQty + delta;

    // Validate
    if (newQty < 1) newQty = 1;
    if (newQty > product.stock) {
        Swal.fire({
            icon: 'warning',
            title: 'Stok Terbatas',
            text: `Maksimal ${product.stock} item tersedia.`,
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        newQty = product.stock;
    }

    productQuantities[productId] = newQty;

    // Update display
    const qtyDisplay = document.getElementById(`qty-display-${productId}`);
    const qtyInput = document.getElementById(`qty-input-${productId}`);
    const subtotalEl = document.getElementById(`subtotal-${productId}`);

    if (qtyDisplay) qtyDisplay.textContent = newQty;
    if (qtyInput) qtyInput.value = newQty;
    if (subtotalEl) subtotalEl.textContent = formatPrice(product.price * newQty);

    // Animate
    if (qtyDisplay) {
        qtyDisplay.parentElement.classList.add('add-to-cart-anim');
        setTimeout(() => qtyDisplay.parentElement.classList.remove('add-to-cart-anim'), 600);
    }
}

function setProductQty(productId, value) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product) return;

    let qty = parseInt(value) || 1;
    if (qty < 1) qty = 1;
    if (qty > product.stock) {
        qty = product.stock;
        Swal.fire({
            icon: 'warning',
            title: 'Stok Terbatas',
            text: `Maksimal ${product.stock} item tersedia.`,
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
    }

    productQuantities[productId] = qty;

    const qtyDisplay = document.getElementById(`qty-display-${productId}`);
    const subtotalEl = document.getElementById(`subtotal-${productId}`);

    if (qtyDisplay) qtyDisplay.textContent = qty;
    if (subtotalEl) subtotalEl.textContent = formatPrice(product.price * qty);
}

function addToCartWithQty(productId) {
    const products = getProducts();
    const product = products.find(p => p.id === productId);

    if (!product || product.stock <= 0) {
        Swal.fire({
            icon: 'error',
            title: 'Stok Habis',
            text: 'Maaf, produk ini sedang tidak tersedia.',
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    const qty = productQuantities[productId] || 1;

    if (qty > product.stock) {
        Swal.fire({
            icon: 'warning',
            title: 'Stok Tidak Mencukupi',
            text: `Hanya tersedia ${product.stock} item.`,
            confirmButtonColor: '#6B21A8',
            background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
            color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
        });
        return;
    }

    let cart = getCart();
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        const totalQty = existingItem.quantity + qty;
        if (totalQty > product.stock) {
            Swal.fire({
                icon: 'warning',
                title: 'Stok Terbatas',
                text: `Total di keranjang (${existingItem.quantity}) + ${qty} melebihi stok (${product.stock}).`,
                confirmButtonColor: '#6B21A8',
                background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
                color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
            });
            return;
        }
        existingItem.quantity = totalQty;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: qty,
            icon: product.icon,
            color: product.color
        });
    }

    setStorage('cart', cart);
    updateCartCount();

    // Reset quantity
    productQuantities[productId] = 1;
    const qtyDisplay = document.getElementById(`qty-display-${productId}`);
    const qtyInput = document.getElementById(`qty-input-${productId}`);
    const subtotalEl = document.getElementById(`subtotal-${productId}`);

    if (qtyDisplay) qtyDisplay.textContent = 1;
    if (qtyInput) qtyInput.value = 1;
    if (subtotalEl) subtotalEl.textContent = formatPrice(product.price);

    // Animate cart button
    const cartBtn = document.getElementById('cartBtn');
    if (cartBtn) {
        cartBtn.classList.add('cart-bounce');
        setTimeout(() => cartBtn.classList.remove('cart-bounce'), 500);
    }

    // Animate the add button
    const addBtn = document.getElementById(`add-btn-${productId}`);
    if (addBtn) {
        addBtn.classList.add('add-to-cart-anim');
        setTimeout(() => addBtn.classList.remove('add-to-cart-anim'), 600);
    }

    Swal.fire({
        icon: 'success',
        title: 'Ditambahkan!',
        html: `<b>${product.name}</b> x${qty} telah ditambahkan ke keranjang.<br>Total: ${formatPrice(product.price * qty)}`,
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: 'top-end',
        background: document.documentElement.classList.contains('dark') ? '#1A1A2E' : '#fff',
        color: document.documentElement.classList.contains('dark') ? '#fff' : '#000'
    });
}

function renderProductsWithQty() {
    const grid = document.getElementById('productGrid');
    if (!grid) return;

    const products = getProducts();
    initProductQuantities();

    grid.innerHTML = products.map((product, index) => {
        const stockPercent = Math.min((product.stock / 1000) * 100, 100);
        const stockColor = product.stock > 100 ? 'bg-green-500' : (product.stock > 50 ? 'bg-yellow-500' : 'bg-red-500');
        const stockText = product.stock > 100 ? 'Stok Melimpah' : (product.stock > 50 ? 'Stok Menipis' : 'Stok Terbatas');

        return `
        <div class="glass rounded-3xl overflow-hidden card-hover scroll-reveal flex flex-col" style="transition-delay: ${index * 0.1}s">
            <!-- Product Image/Icon Area -->
            <div class="relative h-44 bg-gradient-to-br ${product.color} flex items-center justify-center overflow-hidden flex-shrink-0">
                <div class="absolute inset-0 bg-black/20"></div>
                <div class="absolute inset-0 shimmer opacity-30"></div>
                <i class="fab ${product.icon} text-7xl text-white/20 transform hover:scale-110 transition-transform duration-500"></i>

                <!-- Badge -->
                <div class="absolute top-3 left-3">
                    <span class="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium border border-white/10">
                        ${product.badge}
                    </span>
                </div>

                <!-- Stock Indicator -->
                <div class="absolute top-3 right-3">
                    <span class="px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white text-xs font-medium border border-white/10 flex items-center gap-1">
                        <span class="w-1.5 h-1.5 rounded-full ${stockColor} animate-pulse"></span>
                        ${product.stock} tersedia
                    </span>
                </div>

                <!-- Price Tag -->
                <div class="absolute bottom-3 left-3 right-3">
                    <div class="price-tag rounded-xl px-3 py-2 backdrop-blur-sm border border-white/10">
                        <div class="text-xs text-purple-200 mb-0.5">Harga per item</div>
                        <div class="text-xl font-bold text-white">${formatPrice(product.price)}</div>
                    </div>
                </div>
            </div>

            <!-- Product Info -->
            <div class="p-5 flex-1 flex flex-col">
                <h3 class="text-lg font-bold text-white mb-2 line-clamp-1" title="${product.name}">${product.name}</h3>
                <p class="text-gray-400 text-sm mb-4 line-clamp-2 leading-relaxed flex-1">${product.description}</p>

                <!-- Stock Bar -->
                <div class="mb-4">
                    <div class="flex justify-between text-xs mb-1">
                        <span class="text-gray-500">${stockText}</span>
                        <span class="text-gray-400">${product.stock} unit</span>
                    </div>
                    <div class="h-1.5 rounded-full bg-gray-700/50 overflow-hidden">
                        <div class="h-full rounded-full ${stockColor} stock-bar" style="width: ${stockPercent}%"></div>
                    </div>
                </div>

                <!-- Quantity Selector -->
                <div class="qty-selector glass rounded-xl p-3 mb-3 border border-purple-500/10">
                    <div class="flex items-center justify-between mb-2">
                        <span class="text-xs text-gray-400">Jumlah Pembelian</span>
                        <span class="text-xs text-purple-400 font-medium" id="subtotal-${product.id}">${formatPrice(product.price)}</span>
                    </div>
                    <div class="flex items-center justify-between gap-3">
                        <button onclick="updateProductQty(${product.id}, -1)" 
                            class="qty-btn w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white border border-purple-500/20"
                            ${product.stock <= 0 ? 'disabled' : ''}>
                            <i class="fas fa-minus text-xs"></i>
                        </button>

                        <div class="flex-1 flex items-center justify-center">
                            <input type="number" id="qty-input-${product.id}" 
                                value="1" min="1" max="${product.stock}"
                                onchange="setProductQty(${product.id}, this.value)"
                                class="qty-input w-16 text-center bg-transparent text-white font-bold text-lg focus:outline-none"
                                ${product.stock <= 0 ? 'disabled' : ''}>
                        </div>

                        <button onclick="updateProductQty(${product.id}, 1)" 
                            class="qty-btn w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white border border-purple-500/20"
                            ${product.stock <= 0 ? 'disabled' : ''}>
                            <i class="fas fa-plus text-xs"></i>
                        </button>
                    </div>
                </div>

                <!-- Add to Cart Button -->
                <button id="add-btn-${product.id}" onclick="addToCartWithQty(${product.id})" 
                    class="w-full btn-gradient py-3.5 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 transform active:scale-95 flex items-center justify-center gap-2"
                    ${product.stock <= 0 ? 'disabled style="opacity:0.4;cursor:not-allowed"' : ''}>
                    <i class="fas fa-cart-plus"></i>
                    <span>Tambah ke Keranjang</span>
                </button>
            </div>
        </div>
    `}).join('');
}

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initData();
});