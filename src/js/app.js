$(() => {
  $('a[href="#"]').click($ => {
    $.preventDefault();
  });

  const $window = $(window);
  if ($window.width() > 767) {
    new WOW().init();
  }

  $('.screenshots--slides').owlCarousel({
    items: 1,
    loop: true,
    autoplay: true,
    smartSpeed: 800,
    margin: 30,
    center: true,
    dots: true,
    responsive: {
      0: {
        items: 1,
      },
      480: {
        items: 3,
      },
      992: {
        items: 5,
      },
    },
  });

  // Hacky way to get the nav dots
  $('.owl-carousel')
    .find('.owl-dots')
    .removeClass('disabled');
  /* eslint-disable-next-line func-names */
  $('.owl-carousel').on('changed.owl.carousel', function() {
    $(this)
      .find('.owl-dots')
      .removeClass('disabled');
  });

  $('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    speed: 1000,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav',
  });

  $('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 1000,
    asNavFor: '.slider-for',
    dots: true,
    centerMode: true,
    focusOnSelect: true,
    infinite: true,
    slide: 'div',
    autoplay: true,
    centerPadding: '-20px',
    mobileFirst: true,
    prevArrow: '<i class="ion-chevron-left"></i>',
    nextArrow: '<i class="ion-chevron-right"></i>',
  });
  const c1 = new CountUp('c1', 0, 90, 0, 3);
  const c2 = new CountUp('c2', 0, 60, 0, 3);
  const c3 = new CountUp('c3', 0, 40, 0, 3);
  const c4 = new CountUp('c4', 0, 20, 0, 3);
  /* eslint-disable-next-line no-unused-vars */
  const waypoint = new Waypoint({
    element: document.getElementById('stats'),
    handler() {
      c1.start();
      c2.start();
      c3.start();
      c4.start();
    },
    offset: '50%',
  });

  $window.on('scroll', () => {
    if ($window.scrollTop() > 50) {
      $('header').addClass('sticky slideInDown');
    } else {
      $('header').removeClass('sticky slideInDown');
    }
  });
});
