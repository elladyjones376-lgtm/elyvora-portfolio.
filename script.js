const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

const toggle = document.querySelector('.nav-toggle');
const menu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const themeToggle = document.querySelector('.theme-toggle');
const applyTheme = (theme) => {
  document.body.classList.toggle('light-mode', theme === 'light');
  const isLight = theme === 'light';
  if (themeToggle) {
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.classList.toggle('is-light', isLight);
  }
};

const savedTheme = localStorage.getItem('ellady-theme');
if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme('dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    localStorage.setItem('ellady-theme', nextTheme);
    applyTheme(nextTheme);
  });
}

const config = window.portfolioConfig || {
  brand: { name: 'ELLADY JONES', title: 'WEB DEVELOPER & GRAPHIC DESIGNER', location: 'Accra, Ghana', email: 'elladydemo@icloud.com', whatsapp: '+233592572292', tagline: 'Turning Ideas Into Digital Experiences.' },
  social: { instagram: '#', tiktok: '#', github: '#', linkedin: '#', behance: '#' },
  skills: [],
  services: [],
  content: [],
  projects: [],
  contact: { note: '' }
};

const setText = (selector, value) => {
  const element = document.querySelector(selector);
  if (element && value) {
    element.innerHTML = value;
  }
};

const setAttribute = (selector, attribute, value) => {
  const element = document.querySelector(selector);
  if (element && value) {
    element.setAttribute(attribute, value);
  }
};

const populateFromConfig = () => {
  setText('#brand-name', config.brand.name);
  setText('#brand-subtitle', config.brand.title);
  setText('#hero-label', 'TECHNOLOGY • CREATIVITY • ENTREPRENEURSHIP');
  setText('#hero-headline', 'Turning Ideas<br />Into Digital Experiences.');
  setText('#hero-copy', 'I explore technology, experiment with AI, create digital content, and build projects that bring ideas to life.');

  setText('#contact-email', config.brand.email);
  setText('#contact-whatsapp', config.brand.whatsapp || '[YOUR WHATSAPP NUMBER WITH COUNTRY CODE]');
  setText('#footer-brand-name', config.brand.name);
  setText('#footer-brand-title', config.brand.title);

  setAttribute('#contact-email', 'href', `mailto:${config.brand.email}`);
  setAttribute('#email-link', 'href', `mailto:${config.brand.email}`);
  setAttribute('#footer-email', 'href', `mailto:${config.brand.email}`);

  const whatsappNumber = config.brand.whatsapp || '+233000000000';
  const whatsappLink = whatsappNumber.startsWith('http') ? whatsappNumber : `https://wa.me/${whatsappNumber.replace(/\D/g, '')}`;
  setAttribute('#contact-whatsapp', 'href', whatsappLink);
  setAttribute('#whatsapp-link', 'href', whatsappLink);

  if (config.social) {
    const socialLinks = {
      instagram: document.getElementById('instagram-link'),
      github: document.getElementById('github-link'),
      linkedin: document.getElementById('linkedin-link'),
      tiktok: document.getElementById('tiktok-link')
    };

    Object.entries(socialLinks).forEach(([key, element]) => {
      if (element && config.social[key]) {
        element.href = config.social[key];
      }
    });
  }
};
populateFromConfig();

const skillGrid = document.getElementById('skills-grid');
if (skillGrid && config.skills.length) {
  skillGrid.innerHTML = config.skills.map((skill) => `
    <article class="skill-card">
      <h3>${skill.title}</h3>
      <p>${skill.description}</p>
    </article>
  `).join('');
}

const servicesGrid = document.getElementById('services-grid');
if (servicesGrid && config.services.length) {
  servicesGrid.innerHTML = config.services.map((service, index) => `
    <article class="service-card">
      <div class="service-icon">${String(index + 1).padStart(2, '0')}</div>
      <h3>${service.title}</h3>
      <p>${service.description}</p>
      <a href="#contact">Discuss a Project</a>
    </article>
  `).join('');
}

const contentGrid = document.getElementById('content-grid');
if (contentGrid && config.content.length) {
  contentGrid.innerHTML = config.content.map((item) => `
    <article class="content-card" data-category="${item.type}">
      <div class="content-thumb"><span>${item.category}</span></div>
      <div class="content-body">
        <p class="content-tag">${item.category}</p>
        <h3>${item.title}</h3>
        <p>${item.description}</p>
        <a href="${item.link || '#'}">View More</a>
      </div>
    </article>
  `).join('');
}

let activeProjectDetails = {};

const projectGrid = document.getElementById('projects-grid');
if (projectGrid && config.projects.length) {
  projectGrid.innerHTML = config.projects.map((project, index) => `
    <article class="project-card" data-category="${project.category}">
      <div class="project-thumb thumb-${(index % 4) + 1}">
        <span>${project.status || 'Concept'}</span>
      </div>
      <div class="project-body">
        <p class="project-category">${project.category}</p>
        <h3>${project.title}</h3>
        <p>${project.short}</p>
        <ul>
          <li>Tools: ${project.stack}</li>
          <li>Role: ${project.role}</li>
        </ul>
        <div class="project-links">
          <button type="button" class="project-details" data-project="project-${index + 1}">Project Details</button>
          <a href="#" aria-disabled="true">Live Demo</a>
        </div>
      </div>
    </article>
  `).join('');

  const projectDetails = {
    'project-1': { title: config.projects[0].title, overview: config.projects[0].short, challenge: 'Define the problem and shape a clear digital direction.', solution: 'Use premium positioning, clear storytelling, and a strong user experience to give the concept personality and clarity.', tools: config.projects[0].stack, contribution: config.projects[0].role, outcome: 'A concept ready for refinement and real-world launch.', url: '[LIVE LINK]', repo: '[SOURCE CODE LINK]' },
    'project-2': { title: config.projects[1].title, overview: config.projects[1].short, challenge: 'Create a mobile-first experience that feels useful and easy to navigate.', solution: 'Focus on a simple journey, clear information hierarchy, and a polished product feel.', tools: config.projects[1].stack, contribution: config.projects[1].role, outcome: 'A concept that clearly communicates the product idea and experience.', url: '[LIVE LINK]', repo: '[SOURCE CODE LINK]' },
    'project-3': { title: config.projects[2].title, overview: config.projects[2].short, challenge: 'Build a brand voice that feels modern, trustworthy, and relevant to a technology audience.', solution: 'Blend storytelling, premium layout, and clean visual identity to bring the content concept to life.', tools: config.projects[2].stack, contribution: config.projects[2].role, outcome: 'A strong content-brand concept that could scale into a meaningful media presence.', url: '[LIVE LINK]', repo: '[SOURCE CODE LINK]' },
    'project-4': { title: config.projects[3].title, overview: config.projects[3].short, challenge: 'Design a visually polished e-commerce concept with strong product storytelling.', solution: 'Use elegant branding, compositional balance, and conversion-focused layout design.', tools: config.projects[3].stack, contribution: config.projects[3].role, outcome: 'A stylish concept that helps the brand feel premium and desirable.', url: '[LIVE LINK]', repo: '[SOURCE CODE LINK]' },
    'project-5': { title: config.projects[4].title, overview: config.projects[4].short, challenge: 'Design an automation concept that reduces friction and saves time.', solution: 'Map the process clearly and show how tools can integrate into a smarter workflow.', tools: config.projects[4].stack, contribution: config.projects[4].role, outcome: 'A simple automation concept that is practical, clear, and easy to build on.', url: '[LIVE LINK]', repo: '[SOURCE CODE LINK]' },
    'project-6': { title: config.projects[5].title, overview: config.projects[5].short, challenge: 'Turn content into a visual story that feels engaging and memorable.', solution: 'Use short-form storytelling, concise editing, and consistent creative direction.', tools: config.projects[5].stack, contribution: config.projects[5].role, outcome: 'A creative concept that can be expanded into a portfolio of authentic digital work.', url: '[LIVE LINK]', repo: '[SOURCE CODE LINK]' }
  };

  activeProjectDetails = projectDetails;
  window.projectDetails = projectDetails;

  const projectDetailKeys = Object.keys(projectDetails);
  projectDetailKeys.forEach((key) => {
    const projectButton = document.querySelector(`[data-project="${key}"]`);
    if (projectButton) {
      projectButton.addEventListener('click', () => openProjectModal(key));
    }
  });
}

const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((element) => revealObserver.observe(element));

const sections = [...document.querySelectorAll('main section[id]')];
const navItems = [...document.querySelectorAll('.nav-menu a[href^="#"]')];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

    if (!visible) return;

    navItems.forEach((item) => {
      const isActive = item.getAttribute('href') === `#${visible.target.id}`;
      item.classList.toggle('active', isActive);
    });
  },
  { threshold: [0.2, 0.5, 0.8] }
);

sections.forEach((section) => sectionObserver.observe(section));

const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.filter;

    filterButtons.forEach((item) => item.classList.toggle('active', item === button));

    projectCards.forEach((card) => {
      const matches = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !matches);
    });
  });
});

const contentFilters = document.querySelectorAll('.content-filter');
contentFilters.forEach((button) => {
  button.addEventListener('click', () => {
    const selected = button.dataset.category;
    contentFilters.forEach((item) => item.classList.toggle('active', item === button));
    document.querySelectorAll('.content-card').forEach((card) => {
      const matches = selected === 'all' || card.dataset.category === selected;
      card.classList.toggle('hidden', !matches);
    });
  });
});

const modal = document.getElementById('project-modal');
const modalTitle = document.getElementById('modal-title');
const modalOverview = document.getElementById('modal-overview');
const modalChallenge = document.getElementById('modal-challenge');
const modalSolution = document.getElementById('modal-solution');
const modalTools = document.getElementById('modal-tools');
const modalContribution = document.getElementById('modal-contribution');
const modalOutcome = document.getElementById('modal-outcome');
const modalUrl = document.getElementById('modal-url');
const modalRepo = document.getElementById('modal-repo');
const modalClose = document.querySelector('.modal-close');

const openProjectModal = (projectKey) => {
  const project = activeProjectDetails[projectKey] || window.projectDetails?.[projectKey];
  if (!project || !modal) return;

  modalTitle.textContent = project.title;
  modalOverview.textContent = project.overview;
  modalChallenge.textContent = project.challenge;
  modalSolution.textContent = project.solution;
  modalTools.textContent = project.tools;
  modalContribution.textContent = project.contribution;
  modalOutcome.textContent = project.outcome;
  modalUrl.textContent = project.url;
  modalRepo.textContent = project.repo;
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
};

document.querySelectorAll('.project-details').forEach((button) => {
  button.addEventListener('click', () => openProjectModal(button.dataset.project));
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
  });
}

if (modal) {
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
    }
  });
}

document.querySelector('.back-to-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const form = document.getElementById('contact-form');
const statusMessage = document.getElementById('form-status');

const showError = (name, message) => {
  const field = document.getElementById(name);
  const error = document.querySelector(`[data-error-for="${name}"]`);

  if (field) field.setAttribute('aria-invalid', 'true');
  if (error) error.textContent = message;
};

const clearError = (name) => {
  const field = document.getElementById(name);
  const error = document.querySelector(`[data-error-for="${name}"]`);

  if (field) field.setAttribute('aria-invalid', 'false');
  if (error) error.textContent = '';
};

const validateForm = () => {
  let isValid = true;

  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const projectType = document.getElementById('projectType').value.trim();
  const message = document.getElementById('message').value.trim();

  clearError('name');
  clearError('email');
  clearError('projectType');
  clearError('message');

  if (!name) {
    showError('name', 'Please enter your full name.');
    isValid = false;
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('email', 'Please enter a valid email address.');
    isValid = false;
  }

  if (!projectType) {
    showError('projectType', 'Please choose a project type.');
    isValid = false;
  }

  if (!message) {
    showError('message', 'Please add a short project message.');
    isValid = false;
  }

  return isValid;
};

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!validateForm()) {
      if (statusMessage) {
        statusMessage.textContent = 'Please correct the highlighted fields and try again.';
      }
      return;
    }

    const formData = new FormData(form);
    const name = formData.get('name')?.toString().trim();
    const email = formData.get('email')?.toString().trim();
    const projectType = formData.get('projectType')?.toString().trim();
    const budget = formData.get('budget')?.toString().trim();
    const message = formData.get('message')?.toString().trim();

    const subject = encodeURIComponent(`Project inquiry: ${projectType}`);
    const body = encodeURIComponent(
      `Full name: ${name}\nEmail: ${email}\nProject type: ${projectType}\nEstimated budget: ${budget || 'Not provided'}\n\nMessage:\n${message}`
    );

    const mailtoLink = `mailto:elladydemo@icloud.com?subject=${subject}&body=${body}`;

    if (statusMessage) {
      statusMessage.textContent = 'Your email app is opening so you can send the message.';
    }

    window.location.href = mailtoLink;
    form.reset();
  });
}
