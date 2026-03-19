const header = document.querySelector('header');

if (header) {
  const toggleScrolledClass = () => {
    if (window.scrollY > 0) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', toggleScrolledClass);
  toggleScrolledClass();
}

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');

      if (targetId === '#' || targetId === '') return;

      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;

      e.preventDefault();

      const currentPath = window.location.pathname;
      const linkPath = this.pathname;

      if (linkPath !== '' && linkPath !== currentPath) {
        const url = linkPath + targetId;
        window.location.href = url;
      } else {
        const headerHeight = document.querySelector('header') ? document.querySelector('header').offsetHeight : 0;
        const windowHeight = window.innerHeight;
        const elementHeight = targetElement.offsetHeight;

        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - (windowHeight / 2) + (elementHeight / 2);

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });

        history.pushState(null, null, targetId);
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');

      if (href === '#') return;

      const targetElement = document.querySelector(href);

      if (targetElement) {
        e.preventDefault();

        const offset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const mobileMenuButton = document.querySelector('.mobile-menu-button');
  const closeMenuButton = document.querySelector('.close-menu-button');
  const headerNav = document.querySelector('.header-nav');

  function isMobileView() {
    return window.innerWidth <= 1024;
  }

  function openMenu() {
    if (isMobileView()) {
      headerNav.classList.add('show');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMenu() {
    headerNav.classList.remove('show');
    document.body.style.overflow = '';
  }

  mobileMenuButton.addEventListener('click', openMenu);
  closeMenuButton.addEventListener('click', closeMenu);

  const menuLinks = document.querySelectorAll('.main-menu a');
  menuLinks.forEach(link => {
    link.addEventListener('click', function() {
      if (isMobileView()) {
        closeMenu();
      }
    });
  });

  window.addEventListener('resize', function() {
    if (window.innerWidth > 1024) {
      closeMenu();
    }
  });

});

function checkVisibility() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    // Проверяем, находится ли блок в футере
    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

    const isVisible = rect.top <= windowHeight - offset && rect.bottom >= 0;

    if (isVisible) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

function checkAllBlocks() {
  const blocks = document.querySelectorAll('.animate-block');

  blocks.forEach(block => {
    if (block.hasAttribute('data-animated')) {
      return;
    }

    const rect = block.getBoundingClientRect();
    const windowHeight = window.innerHeight;

    const isInFooter = block.closest('footer');
    const offset = (isInFooter || window.innerWidth < 768) ? 0 : 0;

    if (rect.top <= windowHeight - offset && rect.bottom >= 0) {
      const delay = block.getAttribute('data-delay') || 0;
      setTimeout(() => {
        block.classList.add('animated');
        block.setAttribute('data-animated', 'true');
      }, parseInt(delay));
    }
  });
}

window.addEventListener('load', function() {
  checkVisibility();
  setTimeout(checkAllBlocks, 500);
});

window.addEventListener('scroll', checkVisibility);

window.addEventListener('resize', function() {
  setTimeout(checkAllBlocks, 100);
});

document.addEventListener('DOMContentLoaded', function() {
  const accordionItems = document.querySelectorAll('.accordion-item');

  if (accordionItems) {
    accordionItems.forEach(item => {
      const trigger = item.querySelector('.accordion-item-header');
      const content = item.querySelector('.accordion-item-content');

      trigger.addEventListener('click', function() {
        const parent = this.parentNode;

        if (parent.classList.contains('active')) {
          parent.classList.remove('active');
          content.style.height = '0';
        } else {
          document.querySelectorAll('.accordion-item').forEach(child => {
            child.classList.remove('active');
            child.querySelector('.accordion-item-content').style.height = '0';
          });
          parent.classList.add('active');
          content.style.height = content.scrollHeight + 'px';
        }
      });
    });
  }
});
