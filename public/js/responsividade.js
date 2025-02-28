function menuShow() {
    const menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
      menuMobile.classList.remove('open');
    } else {
      menuMobile.classList.add('open');
    }
  }