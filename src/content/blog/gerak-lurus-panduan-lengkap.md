---
title: 'Memahami Gerak Lurus: Panduan Lengkap'
description: 'Pelajari konsep gerak lurus beraturan (GLB) dan gerak lurus berubah beraturan (GLBB) dengan penjelasan mendalam, rumus, dan contoh soal interaktif.'
heroImage: "./_images/physics-general.png"
pubDate: 'Dec 29 2024'
author: 'Tim Klub Fisika'
category: 'Mekanika'
tags: ['kinematika', 'GLB', 'GLBB', 'gerak']
featured: true
---

Gerak lurus adalah salah satu konsep fundamental dalam fisika yang menjadi dasar untuk memahami berbagai fenomena alam. Dalam artikel ini, kita akan membahas secara mendalam tentang gerak lurus beraturan (GLB) dan gerak lurus berubah beraturan (GLBB).

## Pendahuluan

Sebelum kita masuk ke pembahasan utama, penting untuk memahami beberapa konsep dasar yang akan sering kita gunakan. Gerak didefinisikan sebagai perubahan posisi suatu benda terhadap titik acuan dalam selang waktu tertentu.

Dalam kehidupan sehari-hari, kita sering menjumpai berbagai jenis gerak. Mobil yang melaju di jalan raya, bola yang dilempar ke atas, atau bahkan gerakan planet mengelilingi matahari—semuanya dapat dianalisis menggunakan prinsip-prinsip kinematika.

<div class="callout callout-info">
<strong>💡 Apa itu Kinematika?</strong>
<p>Kinematika adalah cabang mekanika yang mempelajari gerak benda tanpa memperhatikan penyebab geraknya (gaya). Fokus utamanya adalah pada posisi, kecepatan, dan percepatan.</p>
</div>

## Besaran-Besaran dalam Gerak

Untuk menganalisis gerak, kita perlu memahami beberapa besaran penting:

### Perpindahan dan Jarak

**Perpindahan** adalah perubahan posisi benda dari titik awal ke titik akhir. Perpindahan merupakan besaran vektor yang memiliki nilai dan arah.

**Jarak** adalah panjang lintasan yang ditempuh benda. Jarak merupakan besaran skalar yang hanya memiliki nilai.

Perhatikan perbedaan keduanya:

- Jika kamu berjalan 3 meter ke utara, lalu 4 meter ke timur, maka:
  - **Jarak** yang ditempuh = 3 + 4 = 7 meter
  - **Perpindahan** = 5 meter (ke arah timur laut), dihitung dengan teorema Pythagoras

### Kecepatan dan Kelajuan

**Kecepatan** adalah laju perubahan perpindahan terhadap waktu. Secara matematis:

$$v = \frac{\Delta s}{\Delta t}$$

**Kelajuan** adalah laju perubahan jarak terhadap waktu. Kelajuan selalu bernilai positif.

<div class="callout callout-tip">
<strong>💡 Tips Mengingat</strong>
<p>Perpindahan → Kecepatan (keduanya vektor)<br>
Jarak → Kelajuan (keduanya skalar)</p>
</div>

### Percepatan

**Percepatan** adalah laju perubahan kecepatan terhadap waktu:

$$a = \frac{\Delta v}{\Delta t}$$

Percepatan dapat bernilai positif (benda dipercepat) atau negatif (benda diperlambat/deselerasi).

---

## Gerak Lurus Beraturan (GLB)

Gerak lurus beraturan adalah gerak benda pada lintasan lurus dengan kecepatan tetap. Artinya, benda menempuh jarak yang sama dalam selang waktu yang sama.

### Karakteristik GLB

1. Lintasan berbentuk garis lurus
2. Kecepatan konstan ($v = \text{tetap}$)
3. Percepatan nol ($a = 0$)
4. Grafik $s$-$t$ berupa garis lurus miring
5. Grafik $v$-$t$ berupa garis horizontal

### Persamaan GLB

Persamaan dasar GLB sangat sederhana:

$$s = v \cdot t$$

Di mana:
- $s$ = perpindahan (m)
- $v$ = kecepatan (m/s)
- $t$ = waktu (s)

Jika benda memiliki posisi awal $s_0$, maka:

$$s = s_0 + v \cdot t$$

<details class="accordion">
<summary><strong>📝 Contoh Soal GLB</strong></summary>
<div class="accordion-content">

**Soal:** Sebuah mobil bergerak dengan kecepatan tetap 72 km/jam. Berapa jarak yang ditempuh mobil dalam waktu 2,5 jam?

**Penyelesaian:**

Diketahui:
- v = 72 km/jam
- t = 2,5 jam

Ditanya: s = ?

Jawab:

$$s = v \cdot t = 72 \times 2{,}5 = 180 \text{ km}$$

Jadi, jarak yang ditempuh mobil adalah **180 km**.

</div>
</details>

### Grafik GLB

<div class="tabs-container">
<div class="tabs-header">
<button class="tab-btn active" data-tab="tab1">Grafik s-t</button>
<button class="tab-btn" data-tab="tab2">Grafik v-t</button>
<button class="tab-btn" data-tab="tab3">Grafik a-t</button>
</div>
<div class="tabs-content">
<div class="tab-panel active" id="tab1">

Grafik posisi terhadap waktu (s-t) pada GLB berbentuk **garis lurus** dengan kemiringan (gradien) sama dengan kecepatan.

Semakin curam garis, semakin besar kecepatan benda.

</div>
<div class="tab-panel" id="tab2">

Grafik kecepatan terhadap waktu (v-t) pada GLB berbentuk **garis horizontal** karena kecepatan konstan.

Luas daerah di bawah grafik v-t sama dengan perpindahan.

</div>
<div class="tab-panel" id="tab3">

Grafik percepatan terhadap waktu (a-t) pada GLB adalah **garis horizontal pada sumbu waktu** (a = 0) karena tidak ada perubahan kecepatan.

</div>
</div>
</div>

---

## Gerak Lurus Berubah Beraturan (GLBB)

Gerak lurus berubah beraturan adalah gerak benda pada lintasan lurus dengan percepatan tetap. Kecepatan benda berubah secara teratur setiap satuan waktu.

### Karakteristik GLBB

1. Lintasan berbentuk garis lurus
2. Percepatan konstan ($a = \text{tetap}$, $a \neq 0$)
3. Kecepatan berubah secara linear terhadap waktu
4. Grafik $v$-$t$ berupa garis lurus miring
5. Grafik $s$-$t$ berupa parabola

### Persamaan GLBB

Ada tiga persamaan utama dalam GLBB yang saling berkaitan:

**Persamaan 1: Kecepatan sebagai fungsi waktu**

$$v_t = v_0 + a \cdot t$$

**Persamaan 2: Perpindahan sebagai fungsi waktu**

$$s = v_0 \cdot t + \frac{1}{2} a \cdot t^2$$

**Persamaan 3: Hubungan kecepatan dan perpindahan**

$$v_t^2 = v_0^2 + 2 \cdot a \cdot s$$

Di mana:
- $v_t$ = kecepatan akhir (m/s)
- $v_0$ = kecepatan awal (m/s)
- $a$ = percepatan (m/s²)
- $t$ = waktu (s)
- $s$ = perpindahan (m)

<div class="callout callout-warning">
<strong>⚠️ Perhatian!</strong>
<p>Tanda percepatan sangat penting:</p>
<ul>
<li><strong>Positif (+)</strong>: benda dipercepat (kecepatan bertambah)</li>
<li><strong>Negatif (−)</strong>: benda diperlambat (kecepatan berkurang)</li>
</ul>
<p>Pastikan konsistensi tanda dalam perhitungan!</p>
</div>

### Penurunan Rumus GLBB

<details class="accordion">
<summary><strong>📐 Lihat penurunan rumus lengkap</strong></summary>
<div class="accordion-content">

**Penurunan Persamaan 1:**

Dari definisi percepatan, kita integralkan untuk mendapatkan:

$$v_t - v_0 = a \cdot t$$

Sehingga:

$$v_t = v_0 + a \cdot t$$

**Penurunan Persamaan 2:**

Substitusi persamaan 1 ke definisi kecepatan dan integralkan:

$$s = v_0 \cdot t + \frac{1}{2} a \cdot t^2$$

**Penurunan Persamaan 3:**

Eliminasi variabel t dari persamaan 1 dan 2:

$$v_t^2 = v_0^2 + 2 \cdot a \cdot s$$

</div>
</details>

### Contoh Penerapan GLBB

<details class="accordion">
<summary><strong>📝 Contoh 1: Mobil Dipercepat</strong></summary>
<div class="accordion-content">

**Soal:** Sebuah mobil bergerak dari keadaan diam dan dipercepat sebesar 2 m/s². Tentukan:

a) Kecepatan mobil setelah 5 detik

b) Jarak yang ditempuh selama 5 detik

**Penyelesaian:**

Diketahui: $v_0 = 0$, $a = 2$ m/s², $t = 5$ s

a) Kecepatan setelah 5 detik:

$$v_t = v_0 + a \cdot t = 0 + 2 \times 5 = 10 \text{ m/s}$$

b) Jarak yang ditempuh:

$$s = v_0 \cdot t + \frac{1}{2} a \cdot t^2 = 0 + \frac{1}{2} \times 2 \times 25 = 25 \text{ m}$$

</div>
</details>

<details class="accordion">
<summary><strong>📝 Contoh 2: Mobil Direm</strong></summary>
<div class="accordion-content">

**Soal:** Sebuah mobil bergerak dengan kecepatan 20 m/s kemudian direm hingga berhenti dalam waktu 4 detik. Tentukan:

a) Perlambatan mobil

b) Jarak pengereman

**Penyelesaian:**

Diketahui: $v_0 = 20$ m/s, $v_t = 0$, $t = 4$ s

a) Perlambatan:

$$a = \frac{v_t - v_0}{t} = \frac{0 - 20}{4} = -5 \text{ m/s}^2$$

(Tanda negatif menunjukkan perlambatan)

b) Jarak pengereman:

$$s = v_0 \cdot t + \frac{1}{2} a \cdot t^2 = 20 \times 4 + \frac{1}{2} \times (-5) \times 16$$

$$s = 80 - 40 = 40 \text{ m}$$

</div>
</details>

---

## Gerak Jatuh Bebas

Gerak jatuh bebas adalah kasus khusus GLBB di mana benda jatuh dari ketinggian tertentu hanya di bawah pengaruh gravitasi (tanpa kecepatan awal vertikal).

### Persamaan Gerak Jatuh Bebas

Dengan mengganti $a$ dengan $g$ (percepatan gravitasi $\approx 10$ m/s²):

$$v_t = g \cdot t$$

$$h = \frac{1}{2} g \cdot t^2$$

$$v_t^2 = 2 \cdot g \cdot h$$

Di mana $h$ adalah ketinggian jatuh.

<details class="accordion">
<summary><strong>📝 Contoh: Benda Jatuh dari Gedung</strong></summary>
<div class="accordion-content">

**Soal:** Sebuah batu dijatuhkan dari puncak gedung setinggi 45 meter. Tentukan:

a) Waktu yang diperlukan batu untuk mencapai tanah

b) Kecepatan batu saat menyentuh tanah

(Gunakan $g = 10$ m/s²)

**Penyelesaian:**

a) Waktu jatuh:

$$h = \frac{1}{2} g \cdot t^2$$

$$45 = \frac{1}{2} \times 10 \times t^2$$

$$t^2 = 9 \rightarrow t = 3 \text{ detik}$$

b) Kecepatan saat menyentuh tanah:

$$v_t = g \cdot t = 10 \times 3 = 30 \text{ m/s}$$

</div>
</details>

---

## Gerak Vertikal ke Atas

Ketika benda dilempar vertikal ke atas, benda mengalami perlambatan akibat gravitasi hingga mencapai titik tertinggi, kemudian jatuh kembali.

### Karakteristik Gerak Vertikal ke Atas

1. Kecepatan awal ke atas ($v_0 > 0$)
2. Percepatan $= -g$ (berlawanan arah gerak)
3. Di titik tertinggi, $v = 0$
4. Waktu naik = waktu turun
5. Kecepatan saat kembali ke titik awal $= v_0$ (arah berlawanan)

### Persamaan Penting

**Tinggi maksimum:**

$$h_{max} = \frac{v_0^2}{2g}$$

**Waktu mencapai titik tertinggi:**

$$t_{naik} = \frac{v_0}{g}$$

**Waktu total di udara:**

$$t_{total} = \frac{2 v_0}{g}$$

---

## Uji Pemahaman

Sekarang saatnya menguji pemahamanmu tentang materi yang telah dipelajari!

<div class="quiz-container" data-correct="1">
<p class="quiz-question"><strong>1.</strong> Sebuah benda bergerak dengan kecepatan tetap 5 m/s. Jenis gerak apakah ini?</p>
<div class="quiz-options">
<button class="quiz-option" data-index="0">A. Gerak Lurus Berubah Beraturan</button>
<button class="quiz-option" data-index="1">B. Gerak Lurus Beraturan</button>
<button class="quiz-option" data-index="2">C. Gerak Jatuh Bebas</button>
<button class="quiz-option" data-index="3">D. Gerak Parabola</button>
</div>
<p class="quiz-explanation">Gerak dengan kecepatan tetap (konstan) disebut Gerak Lurus Beraturan (GLB). Pada GLB, $a = 0$.</p>
<p class="quiz-feedback"></p>
</div>

<div class="quiz-container" data-correct="1">
<p class="quiz-question"><strong>2.</strong> Sebuah mobil dipercepat dari keadaan diam dengan percepatan 4 m/s². Berapa kecepatan mobil setelah 3 detik?</p>
<div class="quiz-options">
<button class="quiz-option" data-index="0">A. 7 m/s</button>
<button class="quiz-option" data-index="1">B. 12 m/s</button>
<button class="quiz-option" data-index="2">C. 16 m/s</button>
<button class="quiz-option" data-index="3">D. 36 m/s</button>
</div>
<p class="quiz-explanation">Menggunakan rumus $v = v_0 + at = 0 + 4 \times 3 = 12$ m/s</p>
<p class="quiz-feedback"></p>
</div>

<div class="quiz-container" data-correct="1">
<p class="quiz-question"><strong>3.</strong> Benda dijatuhkan dari ketinggian 20 m. Berapa waktu yang diperlukan untuk mencapai tanah? (g = 10 m/s²)</p>
<div class="quiz-options">
<button class="quiz-option" data-index="0">A. 1 detik</button>
<button class="quiz-option" data-index="1">B. 2 detik</button>
<button class="quiz-option" data-index="2">C. 3 detik</button>
<button class="quiz-option" data-index="3">D. 4 detik</button>
</div>
<p class="quiz-explanation">Dari $h = \frac{1}{2}gt^2$, maka $20 = \frac{1}{2} \times 10 \times t^2$, sehingga $t^2 = 4$, dan $t = 2$ detik.</p>
<p class="quiz-feedback"></p>
</div>

<div class="quiz-container" data-correct="2">
<p class="quiz-question"><strong>4.</strong> Pada gerak vertikal ke atas, di titik tertinggi berlaku...</p>
<div class="quiz-options">
<button class="quiz-option" data-index="0">A. Kecepatan maksimum</button>
<button class="quiz-option" data-index="1">B. Percepatan nol</button>
<button class="quiz-option" data-index="2">C. Kecepatan nol</button>
<button class="quiz-option" data-index="3">D. Percepatan maksimum</button>
</div>
<p class="quiz-explanation">Di titik tertinggi, benda berhenti sesaat sebelum jatuh kembali, sehingga kecepatannya nol. Namun percepatan tetap ada ($= g$) karena gravitasi selalu bekerja.</p>
<p class="quiz-feedback"></p>
</div>

---

## Rangkuman

<div class="callout callout-success">
<strong>✅ Poin-Poin Penting</strong>
<ol>
<li><strong>GLB</strong>: Kecepatan tetap, percepatan nol, $s = vt$</li>
<li><strong>GLBB</strong>: Percepatan tetap, tiga persamaan utama</li>
<li><strong>Gerak Jatuh Bebas</strong>: GLBB dengan $a = g$, $v_0 = 0$</li>
<li><strong>Gerak Vertikal ke Atas</strong>: GLBB dengan $a = -g$</li>
<li>Perhatikan tanda (+/−) untuk arah gerak dan percepatan</li>
</ol>
</div>

## Latihan Mandiri

Untuk memperdalam pemahaman, coba kerjakan soal-soal berikut:

1. Sebuah kereta bergerak dengan kecepatan 90 km/jam. Berapa jarak yang ditempuh dalam 20 menit?

2. Mobil bergerak dari keadaan diam dan mencapai kecepatan 72 km/jam dalam waktu 10 detik. Tentukan percepatan dan jarak yang ditempuh!

3. Bola dilempar vertikal ke atas dengan kecepatan awal 30 m/s. Tentukan tinggi maksimum dan waktu total bola di udara!

4. Dua mobil A dan B berada pada jarak 100 m. Mobil A bergerak dengan kecepatan tetap 10 m/s mengejar mobil B yang diam kemudian bergerak dengan percepatan 2 m/s². Kapan dan di mana mobil A menyusul mobil B?

---

## Tabel Rumus Lengkap

<div class="tabs-container">
<div class="tabs-header">
<button class="tab-btn active" data-tab="rumus1">GLB</button>
<button class="tab-btn" data-tab="rumus2">GLBB</button>
<button class="tab-btn" data-tab="rumus3">Jatuh Bebas</button>
<button class="tab-btn" data-tab="rumus4">Vertikal Atas</button>
<button class="tab-btn" data-tab="rumus5">Gerak Parabola</button>
<button class="tab-btn" data-tab="rumus6">Gerak Melingkar</button>
<button class="tab-btn" data-tab="rumus7">Momentum</button>
</div>
<div class="tabs-content">
<div class="tab-panel active" id="rumus1">

**Gerak Lurus Beraturan (GLB)**

$$s = v \cdot t$$

$$s = s_0 + v \cdot t$$

</div>
<div class="tab-panel" id="rumus2">

**Gerak Lurus Berubah Beraturan (GLBB)**

$$v_t = v_0 + a \cdot t$$

$$s = v_0 \cdot t + \frac{1}{2} a \cdot t^2$$

$$v_t^2 = v_0^2 + 2 \cdot a \cdot s$$

</div>
<div class="tab-panel" id="rumus3">

**Gerak Jatuh Bebas**

$$v_t = g \cdot t$$

$$h = \frac{1}{2} g \cdot t^2$$

$$v_t^2 = 2 \cdot g \cdot h$$

</div>
<div class="tab-panel" id="rumus4">

**Gerak Vertikal ke Atas**

$$h_{max} = \frac{v_0^2}{2g}$$

$$t_{naik} = \frac{v_0}{g}$$

</div>
<div class="tab-panel" id="rumus5">

**Gerak Parabola** (materi lanjutan)

$$x = v_0 \cos\theta \cdot t$$

$$y = v_0 \sin\theta \cdot t - \frac{1}{2}gt^2$$

</div>
<div class="tab-panel" id="rumus6">

**Gerak Melingkar** (materi lanjutan)

$$v = \omega \cdot r$$

$$a_s = \frac{v^2}{r} = \omega^2 \cdot r$$

</div>
<div class="tab-panel" id="rumus7">

**Momentum** (materi lanjutan)

$$p = m \cdot v$$

$$I = F \cdot \Delta t$$

</div>
</div>
</div>

---

## Referensi

- Halliday, D., Resnick, R., & Walker, J. (2013). *Fundamentals of Physics*. Wiley.
- Tipler, P. A., & Mosca, G. (2007). *Physics for Scientists and Engineers*. W.H. Freeman.
- Giancoli, D. C. (2014). *Physics: Principles with Applications*. Pearson.

---

*Artikel ini adalah bagian dari seri pembelajaran Mekanika di Klub Fisika. Jika ada pertanyaan atau diskusi, silakan hubungi kami melalui halaman kontak.*
