const slides = [...document.querySelectorAll('.slide')];
const progressBar = document.getElementById('progressBar');
const currentSlide = document.getElementById('currentSlide');
const totalSlides = document.getElementById('totalSlides');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const fullscreenBtn = document.getElementById('fullscreenBtn');
const notesBtn = document.getElementById('notesBtn');
const notesPanel = document.getElementById('speakerNotes');
const notesText = document.getElementById('notesText');

let index = 0;

const notes = [
  `<p><b>Opening — ±30 detik</b></p>
   <p>“Kalau saya menjadi pemilik KOWEB, saya ingin membuat perusahaan yang bagus bukan cuma dari hasil project, tapi juga dari sistem kerja di dalamnya.”</p>
   <p>“Ide saya namanya KOWEB Win-Win System: perusahaan tetap berkembang, tapi karyawan juga ikut merasakan manfaat dari pertumbuhan itu.”</p>`,

  `<p><b>±40 detik</b></p>
   <p>Tekankan bahwa ini bukan ide yang hanya pro-karyawan atau hanya pro-perusahaan.</p>
   <p>“Kalau hanya nyaman tapi bisnis rugi, tidak sustainable. Kalau hanya mengejar hasil tapi orang cepat burnout, juga tidak sustainable.”</p>`,

  `<p><b>±35 detik</b></p>
   <p>Jelaskan 4 pilar secara cepat. Jangan detail dulu.</p>
   <p>“Semua usulan saya masuk ke empat area: cara kerja, fairness, growth, dan efficiency.”</p>`,

  `<p><b>±50 detik</b></p>
   <p>“Saya tidak langsung mengusulkan full WFH. Mulai dari satu hari per minggu dan diuji 3 bulan.”</p>
   <p>Tekankan WFH bukan untuk santai. Untuk pekerjaan design/coding/publishing, ada tugas yang justru lebih efektif saat minim interruption.</p>
   <p>Focus time = 2 jam tanpa meeting internal yang tidak urgent.</p>`,

  `<p><b>±55 detik</b></p>
   <p>“Agency pasti kadang lembur. Yang saya ingin ubah bukan menghilangkan lembur, tapi supaya lembur urgent dibedakan dari pola kerja normal.”</p>
   <p>Lalu masuk ke project reward: kecil pun tidak masalah. Yang penting project sukses terasa sebagai keberhasilan bersama.</p>`,

  `<p><b>±55 detik</b></p>
   <p>“Karyawan seharusnya tahu: kalau ingin naik level atau salary, apa yang harus saya tingkatkan?”</p>
   <p>Review bukan berarti pasti naik gaji. Tapi kriterianya transparan.</p>
   <p>Growth Hours hanya 4 jam/bulan. Sangat kecil dibanding total jam kerja, tapi bisa menjaga skill tim tetap relevan.</p>`,

  `<p><b>±55 detik</b></p>
   <p>“Kita sering mengerjakan pattern yang sama: header, swiper, tab, board, modal, responsive.”</p>
   <p>Library bukan membuat semua website sama. Yang di-reuse adalah structure dan logic.</p>
   <p>Monthly idea membuat workshop seperti ini tidak berhenti sebagai acara tahunan saja.</p>`,

  `<p><b>±45 detik</b></p>
   <p>Ini slide feasibility.</p>
   <p>“Saya tidak ingin mengubah semuanya sekaligus. Uji kecil selama 3 bulan.”</p>
   <p>Tekankan biaya rendah, scope kecil, dan mudah dihentikan / disesuaikan jika tidak efektif.</p>`,

  `<p><b>±45 detik</b></p>
   <p>“Saya tidak ingin menilai program dari feeling.”</p>
   <p>Perusahaan punya indikator sendiri, karyawan juga punya indikator sendiri.</p>
   <p>Kalau productivity naik tapi overtime ikut melonjak, berarti belum win-win.</p>`,

  `<p><b>Closing — ±35 detik</b></p>
   <p>“Saya tidak ingin KOWEB hanya menjadi perusahaan yang punya banyak project. Saya ingin KOWEB menjadi perusahaan yang semakin bagus setiap kali mengerjakan project.”</p>
   <p>“Karena ketika perusahaan berkembang, karyawan juga harus berkembang. Dan ketika karyawan berkembang, perusahaan ikut menjadi lebih kuat.”</p>
   <p><b>감사합니다.</b></p>`
];

function update() {
  slides.forEach((s, i) => s.classList.toggle('is-active', i === index));

  currentSlide.textContent = String(index + 1).padStart(2, '0');
  totalSlides.textContent = String(slides.length).padStart(2, '0');

  progressBar.style.width = `${((index + 1) / slides.length) * 100}%`;

  notesText.innerHTML = notes[index] || '';

  const active = slides[index];

  // UI color otomatis mengikuti slide
  const isLightUI =
    active.classList.contains('theme-light') ||
    active.classList.contains('theme-soft') ||
    active.classList.contains('theme-accent');

  document.body.classList.toggle('ui-light', isLightUI);

  document.title =
    `${String(index + 1).padStart(2,'0')} — ${active.dataset.title} | KOWEB Win-Win System`;

  // restart animation
  active.querySelectorAll('.reveal').forEach(el => {
    el.style.animation = 'none';
    void el.offsetHeight;
    el.style.animation = '';
  });
}

function next() {
  if (index < slides.length - 1) { index++; update(); }
}

function prev() {
  if (index > 0) { index--; update(); }
}

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);

document.addEventListener('keydown', (e) => {
  if (['ArrowRight', 'PageDown', ' '].includes(e.key)) {
    e.preventDefault(); next();
  }
  if (['ArrowLeft', 'PageUp'].includes(e.key)) {
    e.preventDefault(); prev();
  }
  if (e.key.toLowerCase() === 'n') {
    notesPanel.classList.toggle('is-open');
  }
  if (e.key.toLowerCase() === 'f') {
    toggleFullscreen();
  }
  if (e.key === 'Escape') {
    notesPanel.classList.remove('is-open');
  }
});

notesBtn.addEventListener('click', () => notesPanel.classList.toggle('is-open'));

function toggleFullscreen(){
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen?.();
  } else {
    document.exitFullscreen?.();
  }
}
fullscreenBtn.addEventListener('click', toggleFullscreen);

let touchStartX = 0;
document.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive:true});
document.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(dx) > 55) dx < 0 ? next() : prev();
}, {passive:true});

update();
