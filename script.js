/* ---------- NAV INDICATOR + MOBILE MENU (every page) ---------- */
function positionIndicator(){
  const active = document.querySelector('#mainNav .navlink.active');
  const ind = document.getElementById('navIndicator');
  if(!active || !ind) return;
  ind.style.left = active.offsetLeft + 'px';
  ind.style.width = active.offsetWidth + 'px';
}
window.addEventListener('load', positionIndicator);
window.addEventListener('resize', positionIndicator);

document.addEventListener('DOMContentLoaded', ()=>{
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  if(hamburger && mobileNav){
    hamburger.addEventListener('click', ()=> mobileNav.classList.toggle('open'));
  }
});

/* ---------- STAT COUNTER (home page) ---------- */
function animateStats(){
  document.querySelectorAll('.stat-num').forEach(el=>{
    const target = parseInt(el.dataset.count, 10);
    let cur = 0; const step = Math.max(1, Math.round(target/40));
    const tick = ()=>{
      cur += step;
      if(cur >= target){ el.textContent = target.toLocaleString(); return; }
      el.textContent = cur.toLocaleString();
      requestAnimationFrame(()=>setTimeout(tick, 16));
    };
    tick();
  });
}
if(document.querySelector('.stat-num')){
  window.addEventListener('load', ()=> setTimeout(animateStats, 300));
}

/* ---------- CAR DATA (home + cars pages) ---------- */
const cars = [
  {
    name:"Sakthi Velocity GT", category:"Coupe", price:"₹68.5 Lakh", mileage:"9 kmpl", fuel:"Petrol",
    colors:["#1a1a1a","#c9a227","#8c3230"],
    img:"https://images.unsplash.com/photo-1767907571229-01cf4ba03590?fm=jpg&q=80&w=900&auto=format&fit=crop"
  },
  {
    name:"Sakthi Prestige Sedan", category:"Sedan", price:"₹24.9 Lakh", mileage:"16 kmpl", fuel:"Petrol",
    colors:["#0d1b2a","#c0c0c0","#1a1a1a"],
    img:"https://images.unsplash.com/photo-1716702528916-18c7a8c1ecde?fm=jpg&q=80&w=900&auto=format&fit=crop"
  },
  {
    name:"Sakthi Ember Coupe", category:"Coupe", price:"₹1.15 Crore", mileage:"7 kmpl", fuel:"Petrol",
    colors:["#8c1f1f","#1a1a1a"],
    img:"https://images.unsplash.com/photo-1708516893277-232fb2bfb198?fm=jpg&q=80&w=900&auto=format&fit=crop"
  },
  {
    name:"Sakthi Nova EV", category:"Electric", price:"₹31.2 Lakh", mileage:"420 km range", fuel:"Electric",
    colors:["#1c3d5a","#e8e8e8"],
    img:"https://images.unsplash.com/photo-1767907571229-01cf4ba03590?fm=jpg&q=80&w=900&auto=format&fit=crop",
    filter:"hue-rotate(180deg) saturate(1.3)"
  },
  {
    name:"Sakthi Terra SUV", category:"SUV", price:"₹29.8 Lakh", mileage:"14 kmpl", fuel:"Diesel",
    colors:["#2e2e2e","#5a3d1f","#c0c0c0"],
    img:"https://images.unsplash.com/photo-1716702528916-18c7a8c1ecde?fm=jpg&q=80&w=900&auto=format&fit=crop",
    filter:"hue-rotate(60deg) saturate(1.1)"
  },
  {
    name:"Sakthi Classic Sedan", category:"Sedan", price:"₹18.4 Lakh", mileage:"19 kmpl", fuel:"Petrol",
    colors:["#3a1010","#1a1a1a","#c0c0c0"],
    img:"https://images.unsplash.com/photo-1708516893277-232fb2bfb198?fm=jpg&q=80&w=900&auto=format&fit=crop",
    filter:"grayscale(0.4) brightness(0.9)"
  }
];

function carCard(c){
  return `<div class="car-card" data-cat="${c.category}">
    <div class="car-media"><img src="${c.img}" style="${c.filter?`filter:${c.filter}`:''}" alt="${c.name}">
      <span class="car-tag">${c.category}</span>
    </div>
    <div class="car-body">
      <h3>${c.name}</h3>
      <div class="car-price">${c.price}</div>
      <div class="car-specs">
        <span>⛽ ${c.fuel}</span>
        <span>◷ ${c.mileage}</span>
      </div>
      <div class="swatches">${c.colors.map(col=>`<span class="swatch" style="background:${col}"></span>`).join('')}</div>
      <a class="cta-outline" href="contact.html">Book Test Drive</a>
    </div>
  </div>`;
}

const featuredGrid = document.getElementById('featuredGrid');
if(featuredGrid){ featuredGrid.innerHTML = cars.slice(0,3).map(carCard).join(''); }

const carsGrid = document.getElementById('carsGrid');
if(carsGrid){
  carsGrid.innerHTML = cars.map(carCard).join('');
  const filterRow = document.getElementById('filterRow');
  filterRow.addEventListener('click', e=>{
    const btn = e.target.closest('.chip'); if(!btn) return;
    filterRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    carsGrid.querySelectorAll('.car-card').forEach(card=>{
      card.style.display = (f==='all' || card.dataset.cat===f) ? '' : 'none';
    });
  });
}

/* ---------- GALLERY DATA (gallery page) ---------- */
const galleryGrid = document.getElementById('galleryGrid');
if(galleryGrid){
  const galleryItems = [
    {cat:"exterior", img:"https://images.unsplash.com/photo-1755288348835-dc6c29852299?fm=jpg&q=80&w=700&auto=format&fit=crop", label:"Showroom floor"},
    {cat:"exterior", img:"https://images.unsplash.com/photo-1767907571229-01cf4ba03590?fm=jpg&q=80&w=700&auto=format&fit=crop", label:"Velocity GT — night display"},
    {cat:"exterior", img:"https://images.unsplash.com/photo-1716702528916-18c7a8c1ecde?fm=jpg&q=80&w=700&auto=format&fit=crop", label:"Prestige Sedan line-up"},
    {cat:"exterior", img:"https://images.unsplash.com/photo-1708516893277-232fb2bfb198?fm=jpg&q=80&w=700&auto=format&fit=crop", label:"Ember Coupe — studio light"},
    {cat:"interior", img:"https://images.unsplash.com/photo-1748214311838-576a62d44c7d?fm=jpg&q=80&w=700&auto=format&fit=crop", label:"Cabin & dashboard finish"},
    {cat:"engine", img:"https://images.unsplash.com/photo-1627508795178-e852bd067a72?fm=jpg&q=80&w=700&auto=format&fit=crop", label:"Engine bay detailing"},
  ];
  const videoItem = `<div class="gallery-item video" data-cat="videos">
      <div style="text-align:center;">
        <div class="play-btn" style="margin:0 auto 10px;">▶</div>
        <p style="font-size:13px;color:var(--text-dim);">Showroom walkthrough</p>
      </div>
    </div>`;
  const reviews = [
    {name:"Kavitha S.", initials:"KS", text:"Straightforward pricing, no last-minute surprises. Picked up my Prestige Sedan in a week."},
    {name:"Rahul V.", initials:"RV", text:"Service desk actually calls back. Warranty claim was sorted in two visits."},
    {name:"Ananya M.", initials:"AM", text:"Test drove three cars in one afternoon, no pressure to decide on the spot."}
  ];
  function galleryCard(g){
    return `<div class="gallery-item" data-cat="${g.cat}">
      <img src="${g.img}" alt="${g.label}">
      <div class="g-label">${g.label}</div>
    </div>`;
  }
  function reviewCard(r){
    return `<div class="review-card" data-cat="reviews">
      <div class="review-top"><div class="avatar">${r.initials}</div>
        <div><div class="review-name">${r.name}</div><div class="stars">★★★★★</div></div>
      </div>
      <p>"${r.text}"</p>
    </div>`;
  }
  galleryGrid.innerHTML = galleryItems.map(galleryCard).join('') + videoItem + reviews.map(reviewCard).join('');

  const galFilterRow = document.getElementById('galFilterRow');
  galFilterRow.addEventListener('click', e=>{
    const btn = e.target.closest('.chip'); if(!btn) return;
    galFilterRow.querySelectorAll('.chip').forEach(c=>c.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.gfilter;
    galleryGrid.querySelectorAll(':scope > div').forEach(card=>{
      card.style.display = (f==='all' || card.dataset.cat===f) ? '' : 'none';
    });
  });
}

/* ---------- FORMS (services + contact pages, frontend-only) ---------- */
const bookingForm = document.getElementById('bookingForm');
if(bookingForm){
  bookingForm.addEventListener('submit', e=>{
    e.preventDefault();
    document.getElementById('bookingMsg').classList.add('show');
    e.target.reset();
  });
}
const contactForm = document.getElementById('contactForm');
if(contactForm){
  contactForm.addEventListener('submit', e=>{
    e.preventDefault();
    document.getElementById('contactMsg').classList.add('show');
    e.target.reset();
  });
}
