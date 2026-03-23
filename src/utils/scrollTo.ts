
/**
 * Smoothly scrolls to a target element
 * @param id The ID of the element to scroll to
 */
export const scrollTo = (id: string): void => {
  const section = document.getElementById(id);
  if (!section) return;

  const navbar = document.querySelector("nav");
  const heading = section.querySelector<HTMLElement>("h1, h2, h3");
  const targetElement = heading ?? section;
  const navbarHeight = navbar instanceof HTMLElement ? navbar.offsetHeight : 0;
  const spacingBelowNavbar = 16;
  const targetTop = targetElement.getBoundingClientRect().top + window.scrollY - navbarHeight - spacingBelowNavbar;
  
  window.scrollTo({
    top: Math.max(targetTop, 0),
    behavior: 'smooth'
  });
};

/**
 * Initializes reveal-on-scroll animations for elements with the reveal-on-scroll class
 */
export const initRevealAnimations = (): void => {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        // Only observe once
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all elements with the reveal-on-scroll class
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  revealElements.forEach(element => {
    observer.observe(element);
  });
};
