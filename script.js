// ==============================================
// 1. VARIABEL GLOBAL UNTUK PENYIMPANAN KERANJANG
// ==============================================
let totalItem = 0;
let totalHarga = 0;

// Array untuk menyimpan daftar item yang dipilih oleh pelanggan
let pesananList = [];


// ==========================================
// 2. FUNGSI FILTER KATEGORI MENU
// ==========================================
function filterMenu(kategori) {
    // Mengambil semua elemen tombol filter dan kartu menu dari HTML
    const buttons = document.querySelectorAll('.filter-btn');
    const cards = document.querySelectorAll('.menu-card');

    // Mengatur kelas aktif pada tombol yang diklik
    buttons.forEach(btn => {
        btn.classList.remove('active');
        // Jika teks tombol sesuai dengan kategori, beri kelas active
        if (btn.textContent.toLowerCase() === kategori || (kategori === 'all' && btn.textContent === 'Semua')) {
            btn.classList.add('active');
        }
    });

    // Menampilkan atau menyembunyikan kartu menu berdasarkan kategori
    cards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        
        if (kategori === 'all' || cardCategory === kategori) {
            card.style.display = 'flex'; // Tampilkan kartu
        } else {
            card.style.display = 'none'; // Sembunyikan kartu
        }
    });
}


// ==========================================
// 3. FUNGSI MENAMBAH ITEM KE KERANJANG
// ==========================================
function tambahPesanan(namaMenu, hargaMenu) {
    // Menambahkan data item ke dalam array pesananList
    pesananList.push({ nama: namaMenu, harga: hargaMenu });

    // Memperbarui total hitungan item dan total harga
    totalItem += 1;
    totalHarga += hargaMenu;

    // Memperbarui tampilan pada elemen HTML di footer
    updateTampilanKeranjang();

    // Memberikan efek umpan balik (feedback) sederhana kepada pengguna
    alert(`${namaMenu} berhasil ditambahkan ke pesanan!`);
}


// ==========================================
// 4. FUNGSI MEMPERBARUI TAMPILAN KERANJANG DI HTML
// ==========================================
function updateTampilanKeranjang() {
    const counterElement = document.getElementById('cart-count');
    const totalElement = document.getElementById('cart-total');

    // Mengubah teks HTML dengan nilai terbaru
    counterElement.textContent = totalItem;
    
    // Memformat angka harga agar menjadi format mata uang Rupiah (contoh: Rp 55.000)
    totalElement.textContent = 'Rp ' + totalHarga.toLocaleString('id-ID');
}


// ==========================================
// 5. FUNGSI PROSES / CHECKOUT PESANAN
// ==========================================
function prosesPesanan() {
    // Memeriksa apakah keranjang kosong
    if (totalItem === 0) {
        alert('Keranjang Anda masih kosong. Silakan pilih menu terlebih dahulu!');
        return;
    }

    // Membuat ringkasan pesanan untuk dikirim atau dikonfirmasi
    let ringkasan = "Ringkasan Pesanan Anda:\n";
    pesananList.forEach((item, index) => {
        ringkasan += `${index + 1}. ${item.nama} - Rp ${item.harga.toLocaleString('id-ID')}\n`;
    });
    ringkasan += `\nTotal Pembayaran: Rp ${totalHarga.toLocaleString('id-ID')}\n\nSilakan tunjukkan layar ini kepada pelayan untuk memproses pesanan Anda.`;

    // Menampilkan ringkasan pesanan kepada pelanggan
    alert(ringkasan);
}
