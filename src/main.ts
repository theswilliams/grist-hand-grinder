import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/courier-prime/400.css';
import '@fontsource/courier-prime/700.css';
import './style.css';
import { grinderSVG, particleField } from './drawing';
import { BASE_PRICE, BURRS, COMPARE, EXTRAS, FAQ, FINISHES, METHODS, PARTS, REVIEWS, SPECS } from './data';

const $ = <T extends HTMLElement = HTMLElement>(id: string) => document.getElementById(id) as T;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const money = (n: number) => `$${n}`;

// ---------- drawings ----------
$('heroArt').innerHTML = grinderSVG({ id: 'heroSvg', dims: true, viewBox: '50 170 540 560', label: 'Side elevation drawing of the Grist One hand grinder with height and burr dimensions' });
$('tearArt').innerHTML = grinderSVG({ id: 'tearSvg', balloons: true, label: 'Exploded drawing of the Grist One showing crank, bearing cap, body, adjuster ring, burr and catch cup' });
$('specArt').innerHTML = grinderSVG({ id: 'specSvg', label: 'Your configured Grist One' });

const heroSvg = $('heroSvg');
const dockCfg = $('dockCfg');
const dockPrice = $('dockPrice');

// ---------- teardown ----------
const tearSvg = $('tearSvg');
const tear = $('teardown');
const list = $('partList');
const note = $('partNote');
let active = -1;

PARTS.forEach((p, i) => {
  const li = document.createElement('li');
  li.innerHTML = `<button type="button" data-i="${i}"><span class="partlist__name"><i>${i + 1}</i>${p.name}</span><span class="partlist__dim">${p.dim}</span></button>`;
  list.appendChild(li);
});

function setActive(i: number) {
  active = i;
  list.querySelectorAll('button').forEach((b, k) => {
    if (k === i) b.setAttribute('aria-current', 'true');
    else b.removeAttribute('aria-current');
  });
  tearSvg.querySelectorAll<SVGGElement>('.part').forEach((g) => g.classList.toggle('is-on', g.dataset.part === PARTS[i].id));
  note.textContent = PARTS[i].note;
}

function tearProgress() {
  if (reduced) { tearSvg.style.setProperty('--ex', '1'); return; }
  const r = tear.getBoundingClientRect();
  const span = r.height - innerHeight;
  const p = Math.min(1, Math.max(0, -r.top / span));
  tearSvg.style.setProperty('--ex', Math.min(1, p / 0.3).toFixed(3));
  const idx = Math.min(PARTS.length - 1, Math.floor((Math.max(0, p - 0.3) / 0.7) * PARTS.length));
  if (idx !== active) setActive(idx);
}

function goTo(i: number) {
  if (reduced) { setActive(i); return; }
  const r = tear.getBoundingClientRect();
  const span = r.height - innerHeight;
  const p = 0.3 + ((i + 0.5) / PARTS.length) * 0.7;
  scrollTo({ top: scrollY + r.top + p * span, behavior: 'smooth' });
}
list.addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest('button');
  if (b) goTo(Number(b.dataset.i));
});
tearSvg.addEventListener('click', (e) => {
  const g = (e.target as Element).closest('.part') as SVGGElement | null;
  if (g) goTo(PARTS.findIndex((x) => x.id === g.dataset.part));
});
setActive(0);

// ---------- grind dial ----------
const clicks = $<HTMLInputElement>('clicks');
const out = $('dialOut');
const field = $('field');
const methods = $('methods');
METHODS.forEach((m) => {
  const b = document.createElement('button');
  b.type = 'button';
  b.className = 'chip';
  b.textContent = m.name;
  b.dataset.from = String(m.from);
  b.dataset.to = String(m.to);
  b.addEventListener('click', () => { clicks.value = String(Math.round((m.from + m.to) / 2)); renderDial(); });
  methods.appendChild(b);
});
$('dialScale').innerHTML = Array.from({ length: 13 }, (_, i) => `<span>${i * 5}</span>`).join('');

function renderDial() {
  const c = Number(clicks.value);
  const mm = (c * 0.02).toFixed(2);
  const m = METHODS.find((x) => c >= x.from && c <= x.to);
  out.innerHTML = `<b>${c}</b> clicks = <b>${mm} mm</b> gap${m ? `<span class="dial__hit">${m.name} range</span>` : ''}`;
  methods.querySelectorAll<HTMLButtonElement>('button').forEach((b) => {
    b.setAttribute('aria-pressed', String(c >= Number(b.dataset.from) && c <= Number(b.dataset.to)));
  });
  const w = Math.max(320, Math.round(field.clientWidth || 520));
  field.setAttribute('viewBox', `0 0 ${w} 160`);
  field.innerHTML = particleField(c, w, 160);
}
clicks.addEventListener('input', renderDial);
addEventListener('resize', renderDial);
renderDial();

// ---------- configurator ----------
const radio = (name: string, id: string, label: string, sub: string, checked: boolean, swatch?: string) =>
  `<label class="opt"><input type="radio" name="${name}" value="${id}" ${checked ? 'checked' : ''}>${swatch ? `<i class="sw" style="background:${swatch}"></i>` : ''}<span class="opt__t">${label}</span><span class="opt__s">${sub}</span></label>`;
$('finishOpts').innerHTML = FINISHES.map((f, i) => radio('finish', f.id, f.name, f.add ? `+${money(f.add)}` : 'Included', i === 0, f.hex)).join('');
$('burrOpts').innerHTML = BURRS.map((b, i) => radio('burr', b.id, `${b.name} burr set`, `${b.detail} · ${b.add ? '+' + money(b.add) : 'Included'}`, i === 0)).join('');
$('extraOpts').innerHTML = EXTRAS.map((x) => `<label class="opt"><input type="checkbox" name="extra" value="${x.id}"><span class="opt__t">${x.name}</span><span class="opt__s">+${money(x.add)}</span></label>`).join('');

const form = $<HTMLFormElement>('configForm');
const sum = $('sum');
const specSvg = $('specSvg');

function config() {
  const fd = new FormData(form);
  const f = FINISHES.find((x) => x.id === fd.get('finish'))!;
  const b = BURRS.find((x) => x.id === fd.get('burr'))!;
  const extras = EXTRAS.filter((x) => fd.getAll('extra').includes(x.id));
  const price = BASE_PRICE + f.add + b.add + extras.reduce((a, x) => a + x.add, 0);
  const label = `Grist One, ${f.name}, ${b.name.toLowerCase()} burrs${extras.length ? ', ' + extras.map((x) => x.name.toLowerCase()).join(', ') : ''}`;
  return { f, label, price };
}
function renderConfig() {
  const { f, label, price } = config();
  specSvg.style.setProperty('--finish', f.hex);
  dockCfg.textContent = label.replace('Grist One, ', '');
  dockPrice.textContent = money(price);
  sum.innerHTML = `<span class="buy__cfg">${label.replace('Grist One, ', '')}</span><span class="buy__price">${money(price)}</span>`;
}
form.addEventListener('change', renderConfig);
renderConfig();

// ---------- cart ----------
interface Line { id: number; label: string; price: number }
let lines: Line[] = [];
try { lines = JSON.parse(localStorage.getItem('grist-cart') || '[]'); } catch { lines = []; }
let nextId = lines.reduce((m, l) => Math.max(m, l.id), 0) + 1;
const cart = $('cart');
const toggle = $('cartToggle');
function saveCart() { try { localStorage.setItem('grist-cart', JSON.stringify(lines)); } catch { /* storage unavailable */ } }
function renderCart() {
  $('cartCount').textContent = String(lines.length);
  $('cartItems').innerHTML = lines.map((l) => `<li><span>${l.label}</span><span class="cart__p">${money(l.price)}</span><button type="button" data-rm="${l.id}" aria-label="Remove ${l.label}">Remove</button></li>`).join('');
  $('cartEmpty').hidden = lines.length > 0;
  $('cartTotal').textContent = money(lines.reduce((a, l) => a + l.price, 0));
  ($('checkout') as HTMLButtonElement).disabled = lines.length === 0;
  $('checkoutMsg').textContent = '';
}
function openCart(open: boolean) {
  cart.hidden = !open;
  toggle.setAttribute('aria-expanded', String(open));
  if (open) $('cartClose').focus();
  else toggle.focus();
}
toggle.addEventListener('click', () => openCart(cart.hasAttribute('hidden')));
$('cartClose').addEventListener('click', () => openCart(false));
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !cart.hasAttribute('hidden')) openCart(false); });
$('cartItems').addEventListener('click', (e) => {
  const b = (e.target as HTMLElement).closest('button[data-rm]') as HTMLElement | null;
  if (!b) return;
  lines = lines.filter((l) => l.id !== Number(b.dataset.rm));
  saveCart();
  renderCart();
});
$('checkout').addEventListener('click', () => {
  $('checkoutMsg').textContent = 'There is no checkout. Grist is a concept project and nothing is for sale.';
});
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const { label, price } = config();
  lines.push({ id: nextId++, label, price });
  saveCart();
  renderCart();
  openCart(true);
});
renderCart();

// ---------- tables, reviews, faq ----------
$('specRows').innerHTML = SPECS.map(([k, v]) => `<tr><th scope="row">${k}</th><td>${v}</td></tr>`).join('');
$('cmpRows').innerHTML = COMPARE.map((r) => `<tr><th scope="row">${r.row}</th><td class="hl">${r.grist}</td><td>${r.typical}</td></tr>`).join('');
$('revList').innerHTML = REVIEWS.map((r) => `<li><blockquote>${r.q}</blockquote><p>${r.who}</p></li>`).join('');
$('faqList').innerHTML = FAQ.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('');

// ---------- scroll: teardown progress + dock visibility ----------
const dock = $('dock');
const heroEl = document.querySelector('.hero') as HTMLElement;
const specifyEl = $('specify');
let ticking = false;
function onScroll() {
  ticking = false;
  tearProgress();
  const pastHero = heroEl.getBoundingClientRect().bottom < 0;
  const r = specifyEl.getBoundingClientRect();
  const atSpecify = r.top < innerHeight * 0.6 && r.bottom > 0;
  dock.classList.toggle('is-on', pastHero && !atSpecify);
}
addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
addEventListener('resize', onScroll);
onScroll();

// hero: the drawing opens slightly, then closes to its assembled state (the one authored entrance)
if (!reduced) {
  heroSvg.style.setProperty('--ex', '0.4');
  heroSvg.classList.add('settle');
  setTimeout(() => heroSvg.style.setProperty('--ex', '0'), 250);
}
