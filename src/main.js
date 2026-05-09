import './style.css';

// ====== Nav Toggle ======
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('active'));
  document.addEventListener('click', (e) => { if (!e.target.closest('.nav')) navLinks.classList.remove('active'); });
}

// ====== Smooth scroll ======
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ====== Nav background on scroll ======
window.addEventListener('scroll', () => {
  const nav = document.getElementById('nav');
  nav.style.background = window.scrollY > 100 ? 'rgba(10,10,15,0.95)' : 'rgba(10,10,15,0.85)';
}, { passive: true });

// ====== ROI Calculator ======
const roiIds = ['roiClients', 'roiArpu', 'roiChurn'];
const inputs = {};
roiIds.forEach(id => { inputs[id] = document.getElementById(id); });

function formatPlain(n) { return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }

function calcROI() {
  const clients = parseInt(inputs.roiClients.value);
  const arpu = parseInt(inputs.roiArpu.value);
  const churn = parseFloat(inputs.roiChurn.value) / 100;

  const revenueAtRisk = clients * arpu * churn;
  const recovery = revenueAtRisk * 0.23;
  const implCost = clients * 0.55;
  const roi = implCost > 0 ? recovery / implCost : 0;

  document.getElementById('roiClientsVal').textContent = formatPlain(clients);
  document.getElementById('roiArpuVal').textContent = '$' + formatPlain(arpu);
  document.getElementById('roiChurnVal').textContent = (churn * 100).toFixed(1) + '%';
  document.getElementById('roiLoss').textContent = '$' + formatPlain(Math.round(revenueAtRisk));
  document.getElementById('roiSaved').textContent = '$' + formatPlain(Math.round(recovery));
  document.getElementById('roiROI').textContent = roi.toFixed(1) + 'x';
}

roiIds.forEach(id => { const el = document.getElementById(id); if (el) el.addEventListener('input', calcROI); });
calcROI();

// ====== Contact Form ======
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button');
    btn.textContent = '✓ Отправлено! Мы свяжемся с вами';
    btn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = 'Запросить Profit Simulation';
      btn.style.background = '';
      btn.disabled = false;
      contactForm.reset();
    }, 3000);
  });
}

console.log('🧿 CX Profit Platform — landing live');
