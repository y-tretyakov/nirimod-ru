const root = document.documentElement;
const themeToggle = document.querySelector('[data-theme-toggle]');
const themeIcon = document.querySelector('[data-theme-icon]');

const setTheme = (theme) => {
  root.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
};

const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
setTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

themeToggle?.addEventListener('click', () => {
  const nextTheme = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  setTheme(nextTheme);
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

document.querySelectorAll('.tab').forEach((button) => {
  button.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach((tab) => tab.classList.remove('is-active'));
    document.querySelectorAll('.panel').forEach((panel) => panel.classList.remove('is-active'));

    button.classList.add('is-active');
    const panel = document.getElementById(`panel-${button.dataset.tab}`);
    panel?.classList.add('is-active');
  });
});

document.querySelectorAll('.faq-item').forEach((item) => {
  const button = item.querySelector('.faq-question');
  button?.addEventListener('click', () => {
    item.classList.toggle('is-open');
  });
});

const copyButton = document.querySelector('[data-copy]');
copyButton?.addEventListener('click', async () => {
  const text = copyButton.dataset.copy || copyButton.textContent;
  try {
    await navigator.clipboard.writeText(text);
    const original = copyButton.textContent;
    copyButton.textContent = 'Скопировано';
    setTimeout(() => {
      copyButton.textContent = original;
    }, 1400);
  } catch {
    copyButton.textContent = 'Не удалось';
  }
});
