// main.js — JobHook UI Clone interactions

// ── Job Data ──────────────────────────────────────────────────────────────
const jobs = [
  {
    id: 1, company: 'Google', title: 'Senior Frontend Engineer',
    type: 'Full-Time', experience: 'Expert', location: 'Remote',
    applicants: 34, packageOffered: '42-55', category: 'Engineering',
    about: 'Design and build high-scale, accessible web applications using React, Next.js, and TypeScript for millions of users worldwide.',
    posted: '2 days ago', saved: false
  },
  {
    id: 2, company: 'Amazon', title: 'Full Stack Developer',
    type: 'Full-Time', experience: 'Intermediate', location: 'Bangalore',
    applicants: 28, packageOffered: '28-38', category: 'Engineering',
    about: 'Build resilient, scalable microservices and customer-facing interfaces powered by AWS cloud technologies and Node.js.',
    posted: '1 day ago', saved: false
  },
  {
    id: 3, company: 'Meta', title: 'Product UI/UX Designer',
    type: 'Full-Time', experience: 'Expert', location: 'Remote',
    applicants: 19, packageOffered: '35-48', category: 'Design',
    about: 'Lead user experience research, design systems, and rapid prototyping for cutting-edge consumer software products.',
    posted: '3 days ago', saved: true
  },
  {
    id: 4, company: 'Netflix', title: 'Data Scientist / ML Engineer',
    type: 'Full-Time', experience: 'Intermediate', location: 'Remote',
    applicants: 45, packageOffered: '40-52', category: 'Data',
    about: 'Develop personalized recommendation algorithms, deep learning models, and big data pipelines at massive global scale.',
    posted: '5 hours ago', saved: false
  },
  {
    id: 5, company: 'Spotify', title: 'Growth Marketing Lead',
    type: 'Part-Time', experience: 'Entry Level', location: 'Remote',
    applicants: 15, packageOffered: '18-25', category: 'Marketing',
    about: 'Drive user acquisition and content engagement campaigns using data-driven digital marketing and SEO strategies.',
    posted: '4 days ago', saved: false
  },
  {
    id: 6, company: 'Microsoft', title: 'Cloud DevOps Architect',
    type: 'Full-Time', experience: 'Expert', location: 'Hyderabad',
    applicants: 22, packageOffered: '36-50', category: 'Engineering',
    about: 'Manage Azure cloud infrastructure, CI/CD automation, Kubernetes clusters, and mission-critical enterprise security.',
    posted: '3 days ago', saved: false
  },
  {
    id: 7, company: 'Figma', title: 'Design Systems Engineer',
    type: 'Contract', experience: 'Intermediate', location: 'Remote',
    applicants: 14, packageOffered: '30-42', category: 'Design',
    about: 'Bridge the gap between design and engineering by building reusable component libraries and web graphics tooling.',
    posted: '2 days ago', saved: false
  },
  {
    id: 8, company: 'Oracle', title: 'HR Business Partner',
    type: 'Full-Time', experience: 'Intermediate', location: 'Mumbai',
    applicants: 11, packageOffered: '20-28', category: 'HR',
    about: 'Partner with leadership to drive talent acquisition, high-impact employee onboarding, and culture initiatives.',
    posted: '1 week ago', saved: false
  }
];

// ── Render Jobs ────────────────────────────────────────────────────────────
function renderJobs(data) {
  const grid = document.getElementById('jobsGrid');
  if (!grid) return;
  if (!data || data.length === 0) {
    grid.innerHTML = `<div class="no-jobs">No jobs found matching your search.</div>`;
    return;
  }
  grid.innerHTML = data.map(job => `
    <div class="job-card" data-id="${job.id}">
      <div>
        <div class="job-card-header">
          <div class="job-company-box">
            <div class="job-company-logo">
              <img src="assets/Icons/${job.company}.png" alt="${job.company}" />
            </div>
            <div class="job-info-meta">
              <h4 class="job-title" title="${job.title}">${job.title}</h4>
              <div class="job-company-sub">
                <span class="job-company-name">${job.company}</span>
                <span class="meta-dot">•</span>
                <span class="job-applicants">${job.applicants} Applicants</span>
              </div>
            </div>
          </div>
          <button class="btn-bookmark ${job.saved ? 'saved' : ''}" onclick="toggleBookmark(event, ${job.id})" title="${job.saved ? 'Saved' : 'Save Job'}" aria-label="Bookmark Job">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="${job.saved ? '#ffbd20' : 'none'}" stroke="${job.saved ? '#ffbd20' : 'currentColor'}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/>
            </svg>
          </button>
        </div>

        <div class="job-pill-row">
          <span class="job-pill">${job.experience}</span>
          <span class="job-pill">${job.type}</span>
          <span class="job-pill">${job.location}</span>
        </div>

        <p class="job-about">${job.about}</p>
      </div>

      <div>
        <div class="job-card-divider"></div>

        <div class="job-card-footer">
          <div class="job-package">₹${job.packageOffered} LPA</div>
          <div class="job-time-posted">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
            </svg>
            <span>Posted ${job.posted}</span>
          </div>
        </div>

        <button class="btn-apply-job" onclick="applyJob('${job.title}', '${job.company}')">
          View & Apply
        </button>
      </div>
    </div>
  `).join('');
}

// ── Bookmark Toggle ────────────────────────────────────────────────────────
function toggleBookmark(event, id) {
  event.stopPropagation();
  const job = jobs.find(j => j.id === id);
  if (!job) return;
  job.saved = !job.saved;
  renderJobs(currentFilteredJobs || jobs);
  showToast(job.saved ? `★ Saved "${job.title}" to Job History` : `Removed "${job.title}" from saved`);
}

let currentFilteredJobs = null;

// ── Filter Job Tabs ────────────────────────────────────────────────────────
function filterJobTab(type, btn) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  if (type === 'All') {
    currentFilteredJobs = null;
    renderJobs(jobs);
  } else if (type === 'Remote') {
    currentFilteredJobs = jobs.filter(j => j.location.toLowerCase() === 'remote');
    renderJobs(currentFilteredJobs);
  } else {
    currentFilteredJobs = jobs.filter(j => j.category === type || j.type === type);
    renderJobs(currentFilteredJobs);
  }
}

// ── Category Filter ────────────────────────────────────────────────────────
function filterCategory(cat) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active-cat'));
  if (event && event.currentTarget) {
    event.currentTarget.classList.add('active-cat');
  }

  const filtered = cat === 'All' ? jobs : jobs.filter(j => j.category === cat);
  currentFilteredJobs = filtered.length ? filtered : jobs;
  renderJobs(currentFilteredJobs);

  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast(filtered.length ? `Showing ${filtered.length} ${cat} job openings` : 'Showing all jobs');
}

// ── Search ─────────────────────────────────────────────────────────────────
function handleSearch() {
  const title = document.getElementById('searchJob')?.value.trim().toLowerCase();
  const loc   = document.getElementById('searchLoc')?.value.trim().toLowerCase();

  const results = jobs.filter(j => {
    const matchTitle = !title || j.title.toLowerCase().includes(title)
                               || j.company.toLowerCase().includes(title)
                               || j.category.toLowerCase().includes(title)
                               || j.experience.toLowerCase().includes(title);
    const matchLoc   = !loc   || j.location.toLowerCase().includes(loc);
    return matchTitle && matchLoc;
  });

  renderJobs(results.length ? results : jobs);
  document.getElementById('featured')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  showToast(results.length
    ? `Found ${results.length} job${results.length > 1 ? 's' : ''}`
    : 'No matches — showing all jobs'
  );
}

// ── Apply ──────────────────────────────────────────────────────────────────
function applyJob(title, company) {
  showToast(`✓ Applied to "${title}" at ${company}!`);
}

// ── Subscribe ──────────────────────────────────────────────────────────────
function handleSubscribe() {
  const email = document.getElementById('emailInput')?.value.trim();
  if (!email || !email.includes('@')) {
    showToast('⚠ Please enter a valid email address'); return;
  }
  document.getElementById('emailInput').value = '';
  showToast(`🎉 Subscribed with ${email}!`);
}

// ── Toast ──────────────────────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ── Navbar scroll ──────────────────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar')?.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger menu ─────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Init Lucide icons
  if (window.lucide) lucide.createIcons();

  // Render job cards
  renderJobs(jobs);

  // Hamburger
  const ham   = document.getElementById('hamburger');
  const links = document.getElementById('navLinks');
  if (ham && links) {
    ham.addEventListener('click', () => links.classList.toggle('open'));
    document.addEventListener('click', e => {
      if (!e.target.closest('.navbar')) links.classList.remove('open');
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
    });
  });

  // Enter key on search inputs
  ['searchJob', 'searchLoc'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') handleSearch();
    });
  });

  // Enter key on email input
  document.getElementById('emailInput')?.addEventListener('keydown', e => {
    if (e.key === 'Enter') handleSubscribe();
  });

  // Carousel navigation
  const track = document.getElementById('catCarousel');
  const prevBtn = document.getElementById('catPrev');
  const nextBtn = document.getElementById('catNext');

  if (track && prevBtn && nextBtn) {
    const scrollAmount = 280;
    prevBtn.addEventListener('click', () => {
      track.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
    nextBtn.addEventListener('click', () => {
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }

  // Initialize auth state
  updateNavbarAuth();

  // Open modal if URL has hash
  if (window.location.hash === '#login') openAuthModal('login');
  if (window.location.hash === '#signup') openAuthModal('signup');

  // Close modal on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeAuthModal();
  });
});

// ── Auth Modal Functions ──────────────────────────────────────────────────
function handleNavAuth(event, title) {
  if (event) event.preventDefault();
  document.getElementById('navLinks')?.classList.remove('open');
  openAuthModal('login');
  showToast(`🔒 Please login to access ${title}`);
}

function openAuthModal(tab = 'login') {
  const overlay = document.getElementById('authModalOverlay');
  if (!overlay) return;
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  switchAuthTab(tab);
}

function closeAuthModal() {
  const overlay = document.getElementById('authModalOverlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

function closeAuthModalOnOutsideClick(e) {
  if (e.target.id === 'authModalOverlay') {
    closeAuthModal();
  }
}

function switchAuthTab(tab) {
  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const loginBtn = document.getElementById('tabLoginBtn');
  const signupBtn = document.getElementById('tabSignupBtn');

  if (tab === 'login') {
    if (loginForm) loginForm.style.display = 'block';
    if (signupForm) signupForm.style.display = 'none';
    if (loginBtn) loginBtn.classList.add('active');
    if (signupBtn) signupBtn.classList.remove('active');
    setTimeout(() => document.getElementById('loginEmail')?.focus(), 60);
  } else {
    if (loginForm) loginForm.style.display = 'none';
    if (signupForm) signupForm.style.display = 'block';
    if (loginBtn) loginBtn.classList.remove('active');
    if (signupBtn) signupBtn.classList.add('active');
    setTimeout(() => document.getElementById('signupName')?.focus(), 60);
  }
}

let selectedAccountType = 'APPLICANT';
function selectAccountType(type) {
  selectedAccountType = type;
  document.querySelectorAll('.account-type-option').forEach(el => {
    el.classList.toggle('selected', el.id === (type === 'APPLICANT' ? 'accTypeApplicant' : 'accTypeEmployer'));
  });
}

function togglePasswordVisibility(inputId, btn) {
  const input = document.getElementById(inputId);
  if (!input) return;
  const isPwd = input.type === 'password';
  input.type = isPwd ? 'text' : 'password';
  btn.innerHTML = isPwd
    ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>`
    : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;
}

function handleLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById('loginEmail')?.value.trim();
  const password = document.getElementById('loginPassword')?.value;
  const btn = document.getElementById('loginSubmitBtn');

  if (!email || !password) {
    showToast('⚠ Please fill in all required fields');
    return;
  }

  if (btn) btn.innerHTML = '<span>Logging in...</span>';

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('jobhook_users') || '[]');
    const existingUser = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    const user = existingUser || {
      name: email.split('@')[0],
      email: email,
      accountType: 'APPLICANT'
    };

    localStorage.setItem('jobhook_current_user', JSON.stringify(user));
    updateNavbarAuth();
    closeAuthModal();
    if (btn) btn.innerHTML = '<span>Login to Account</span>';
    showToast(`🎉 Welcome back, ${user.name}!`);
  }, 500);
}

function handleSignupSubmit(e) {
  e.preventDefault();
  const name = document.getElementById('signupName')?.value.trim();
  const email = document.getElementById('signupEmail')?.value.trim();
  const password = document.getElementById('signupPassword')?.value;
  const confirmPassword = document.getElementById('signupConfirmPassword')?.value;
  const btn = document.getElementById('signupSubmitBtn');

  if (!name || !email || !password) {
    showToast('⚠ Please fill in all required fields');
    return;
  }
  if (password.length < 6) {
    showToast('⚠ Password must be at least 6 characters');
    return;
  }
  if (password !== confirmPassword) {
    showToast('⚠ Passwords do not match');
    return;
  }

  if (btn) btn.innerHTML = '<span>Creating account...</span>';

  setTimeout(() => {
    const users = JSON.parse(localStorage.getItem('jobhook_users') || '[]');
    const newUser = {
      name,
      email,
      password,
      accountType: selectedAccountType,
      createdAt: new Date().toISOString()
    };
    users.push(newUser);
    localStorage.setItem('jobhook_users', JSON.stringify(users));
    localStorage.setItem('jobhook_current_user', JSON.stringify(newUser));

    updateNavbarAuth();
    closeAuthModal();
    if (btn) btn.innerHTML = '<span>Create Account</span>';
    showToast(`🎉 Welcome to JobHook, ${name}!`);
  }, 600);
}

function handleForgotPassword() {
  const email = prompt('Enter your registered email address to reset password:');
  if (email && email.includes('@')) {
    showToast(`✉ Password reset link sent to ${email}`);
  }
}

function updateNavbarAuth() {
  const user = JSON.parse(localStorage.getItem('jobhook_current_user') || 'null');
  const navBtn = document.getElementById('navAuthBtn');
  if (!navBtn) return;

  if (user) {
    const initials = (user.name || 'User').split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();
    navBtn.outerHTML = `
      <div class="user-profile-badge" id="navAuthBtn">
        <div class="user-avatar">${initials}</div>
        <span class="user-name">${user.name}</span>
        <button class="btn-logout" onclick="handleLogout()" title="Logout">✕</button>
      </div>
    `;
  } else {
    navBtn.outerHTML = `<button class="btn-outline" id="navAuthBtn" onclick="openAuthModal('login')">Login</button>`;
  }
}

function handleLogout() {
  localStorage.removeItem('jobhook_current_user');
  updateNavbarAuth();
  showToast('Logged out successfully');
}
