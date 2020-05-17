'use strict';
window.addEventListener('DOMContentLoaded', function () {
  const createModal = function (name) {
    const body = document.getElementsByTagName('body')[0];
    const modal = document.getElementsByClassName(name)[0];
    const openBtn = document.getElementsByClassName(name + '-btn');
    const closeBtn = document.getElementsByClassName(name + '__close')[0];
    let isOpen = false;

    const showModal = function () {
      if (sumModal === 0) {
        body.dataset.scrollY = self.pageYOffset;
      }

      body.style.top = `-${body.dataset.scrollY}px`;
      body.classList.add('body-lock');

      modal.style.display = 'flex';

      sumModal++;
      isOpen = true;
    };

    const hideModal = function () {
      modal.style.display = 'none';

      body.classList.remove('body-lock');
      window.scrollTo(0, body.dataset.scrollY);

      sumModal--;
      isOpen = false;
    };

    for (let i = 0; i < openBtn.length; i++) {
      openBtn[i].onclick = function (event) {
        event.preventDefault();

        showModal();
      };
    }

    closeBtn.onclick = function (event) {
      event.preventDefault();

      hideModal();
    };

    modal.onclick = function (event) {
      if (event.target == modal) {
        hideModal();
      }
    };

    document.addEventListener('keydown', function (event) {
      if (event.keyCode == 27 && isOpen === true) hideModal();
    });
  };

  // const createSlider = function (sliderClass, itemsClass, numVisibleItems) {
  //   const slider = document.getElementsByClassName(sliderClass)[0];
  //   const items = document.getElementsByClassName(itemsClass);
  //   const numSlides = items.length;
  //   const width = 100 / numVisibleItems;
  //   let visibleSlide = 0;
  //   let margin = 0;

  //   const createPrev = function () {
  //     let prev = document.createElement('button');
  //     prev.textContent = '<';
  //     prev.classList.add('slider-prev');
  //     slider.insertBefore(prev, items[0]);
  //     return prev;
  //   };

  //   const createNext = function () {
  //     let next = document.createElement('button');
  //     next.textContent = '>';
  //     next.classList.add('slider-next');
  //     slider.appendChild(next);
  //     return next;
  //   };


  //   slider.classList.add('slider');
    
  //   for (let i = 0; i < items.length; i++) {
  //     items[i].style.flexShrink = 0;
  //     items[i].style.flexBasis = width + '%';
  //   }

  //   const prev = createPrev();
  //   const next = createNext();

  //   prev.addEventListener('click', function () {
  //     if (margin >= 0) return;
  //     margin += 33.33;
  //     items[0].style.marginLeft = margin + '%';
  //   });

  //   next.addEventListener('click', function () {
  //     if (margin <= -33.33 * (numSlides - 3)) return;
  //     margin -= 33.33;
  //     items[0].style.marginLeft = margin + '%';
  //   });
  // };

  const Slider = function Slider(slider) {
    this.slider = document.getElementsByClassName(slider)[0];
    this.track = this.slider.children[0];
    this.items = this.track.children;
    this.buttons = this.slider.children[1];
    this.prev = this.buttons.children[0];
    this.next = this.buttons.children[1];
    this.slide = 0;
    this.margin = 0;
  };
  
  Slider.prototype.create = function (visItems) {
    this.visItems = visItems;
    this.itemWidth = 100 / this.visItems;

    let buttons = [];

    this.track.classList.add('slider__track');

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].classList.add('slider__item');
      this.items[i].style.width = this.itemWidth + '%';

      buttons.push(this.items[i].getElementsByTagName('button')[0]);
    }

    for (let i = 3; i < this.items.length; i++) {
      buttons[i].tabIndex = -1;
    }

    this.buttons.style.display = 'block';
  };

  Slider.prototype.remove = function () {
    let buttons = [];

    this.track.classList.remove('slider__track');

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].classList.remove('slider__item');
      this.items[i].style.width = '';

      buttons.push(this.items[i].getElementsByTagName('button')[0]);
    }

    for (let i = 3; i < this.items.length; i++) {
      buttons[i].tabIndex = 0;
    }

    this.buttons.style.display = 'none';
  };

  Slider.prototype.showNextSlide = function () {
    if (this.margin <= -this.itemWidth * (this.items.length - this.visItems)) return;

    let prevButton = this.items[this.slide].getElementsByTagName('button')[0];
    let nextButton = this.items[this.slide + this.visItems].getElementsByTagName('button')[0];
    
    this.slide += 1;

    prevButton.tabIndex = -1;
    nextButton.tabIndex = 0;

    this.margin -= this.itemWidth;
    this.items[0].style.marginLeft = this.margin + '%';
  };

  Slider.prototype.showPrevSlide = function () {
    if (this.margin >= 0) return;

    this.slide -= 1;

    let prevButton = this.items[this.slide].getElementsByTagName('button')[0];
    let nextButton = this.items[this.slide + this.visItems].getElementsByTagName('button')[0];

    prevButton.tabIndex = 0;
    nextButton.tabIndex = -1;

    this.margin += this.itemWidth;
    this.items[0].style.marginLeft = this.margin + '%';
  };

  let glazingSlider = new Slider('glazing-slider');
  
  const adaptSlider = function (mq) {
    if (mq.matches) {
      glazingSlider.remove();
      glazingSlider.create(2);
    } else {
      glazingSlider.remove();
    }
  };
 
  let mq = window.matchMedia("(max-width: 800px)");
  
  adaptSlider(mq);
  
  mq.addListener(adaptSlider);

  glazingSlider.next.addEventListener('click', function () {
    glazingSlider.showNextSlide();
  });

  glazingSlider.prev.addEventListener('click', function () {
    glazingSlider.showPrevSlide();
  });

  const createTabs = function (tabsClass, contentsClass) {
    const tabs = document.getElementsByClassName(tabsClass);
    const contents = document.getElementsByClassName(contentsClass);

    const hideTabContent = function (from) {
      for (let i = from; i < contents.length; i++) {
        contents[i].style.display = 'none';
      }
    };

    const showTabContent = function (num) {
      if (num > contents.length - 1) {
        num = contents.length - 1;
      }

      hideTabContent(0);

      contents[num].style.display = 'flex ';
    };

    const selectTab = function (i) {
      for (let i = 0; i < tabs.length; i++) {
        tabs[i].classList.remove(tabsClass + '_active');
      }

      tabs[i].classList.add(tabsClass + '_active');
    };


    tabs[0].classList.add(tabsClass + '_active');

    hideTabContent(1);

    for (let i = 0; i < tabs.length; i++) {
      tabs[i].onclick = function () {
        selectTab(i);
        showTabContent(i);
      };
    }
  };
  
  const createGalary = function (elementsClass, imgClass) {
    const elements = document.getElementsByClassName(elementsClass);
    const images = document.getElementsByClassName(imgClass);
    const body = document.body;
    
    const showLightbox = function (element) {
      const img = element;

      img.classList.remove(imgClass);
      img.classList.add('lightbox__img');

      lightbox.appendChild(img);

      body.dataset.scrollY = self.pageYOffset;
      body.style.top = `-${body.dataset.scrollY}px`;
      body.classList.add('body-lock');

      body.appendChild(lightbox);
    };

    const hideLightbox = function () {
      const img = lightbox.firstChild;

      lightbox.removeChild(img);

      body.classList.remove('body-lock');
      window.scrollTo(0, body.dataset.scrollY);

      body.removeChild(lightbox);
    };

    const lightbox = document.createElement('div');
    lightbox.classList.add('lightbox', 'fade');

    for (let i = 0; i < elements.length; i++) {
      elements[i].onclick = function () {
        let img = images[i].cloneNode();

        // img.setAttribute('src', 'img/our-jobs/1-big.jpg');
        
        if (lightbox.childNodes.length == 0) showLightbox(img);
      };
    }

    lightbox.onclick = function () {
      hideLightbox();
    };
  };

  const createCountdown = function (name, deadline) {
    const days = document.getElementsByClassName(name + '__days')[0];
    const hours = document.getElementsByClassName(name + '__hours')[0];
    const minutes = document.getElementsByClassName(name + '__minutes')[0];
    const seconds = document.getElementsByClassName(name + '__seconds')[0];
    
    const getTimeRemaining = function (distance) {
      let time = {
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000)
      };
      
      for (let i in time) {
        if (time[i] < 10) {
          time[i] = '0' + time[i];
        }
      }
      
      return time;
    };

    let intervalId = setInterval(function () {
      let distance = Date.parse(deadline) - Date.parse(new Date());

      if (distance <= 0) {
        clearInterval(intervalId);
      } else {
        let time = getTimeRemaining(distance);
        
        days.textContent = time.days;
        hours.textContent = time.hours;
        minutes.textContent = time.minutes;
        seconds.textContent = time.seconds;
      }
    }, 1000);
  };


  //webp
  document.documentElement.classList.remove("no-webp");

  
  //modals
  let sumModal = 0;
  
  createModal('callback');
  createModal('cost');
  createModal('error');

  //slider
  // let glazingTabsSlider = new Slider('glazing-slider', 'glazing-tabs__item', 3);
  // // createSlider(glazingTabsSlider);
  // console.log(glazingTabsSlider);
  
  // createSlider('title-page__features', 'title-page__feature', 2);

  //tabs
  createTabs('glazing-tabs__item', 'glazing-tabs-content__item');
  createTabs('finishing__tab', 'finishing__item');

  //gallery
  createGalary('our-jobs__item', 'our-jobs__img');

  //countdown
  let deadline = 'April 26 2020 00:00:00 GMT+0200';
  createCountdown('countdown', deadline);

  //map
  const init = function () {
    var myMap = new ymaps.Map("map", {
      center: [55.927447068821316, 37.60509449999991],
      zoom: 16,
      controls: ['zoomControl', 'routeButtonControl']
    });

    var myPlacemark = new ymaps.Placemark([55.927447068821316, 37.60509449999991]);
    myMap.geoObjects.add(myPlacemark);

    myMap.behaviors.disable(['scrollZoom']);
  };

  ymaps.ready(init);

  if (Modernizr) {
    console.log('true');
  } else {
    console.log(false);
  }
});

