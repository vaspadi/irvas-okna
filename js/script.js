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






  const Slider = function Slider(slider, mq, visItems, theme) {
    this.slider = document.getElementsByClassName(slider)[0];
    this.mq = window.matchMedia("(max-width: " + mq + ")");
    this.visItems = visItems;
    this.theme = theme;
    this.is = false;
    this.track = this.slider.children[0];
    this.items = this.track.children;
    this.buttons = this.slider.children[1];
    this.prev = this.buttons.children[0];
    this.next = this.buttons.children[1];
    this.mqEvent = false;
    this.itemWidth = 100 / this.visItems;
    this.slide = 0;
    this.margin = 0;
  };

  Slider.prototype.create = function () {
    // let buttons = [];

    this.track.classList.add('slider__track');

    for (let i = 0; i < this.items.length; i++) {
      this.items[i].classList.add('slider__item');
      this.items[i].style.width = this.itemWidth + '%';

      // buttons.push(this.items[i].getElementsByTagName('button')[0]);
    }

    // for (let i = 3; i < this.items.length; i++) {
    //   buttons[i].tabIndex = -1;
    // }

    if (this.theme === 'blue') {
      this.prev.classList.add('slider__prev_blue');
      this.next.classList.add('slider__next_blue');
    }

    this.buttons.style.display = 'block';
  };

  Slider.prototype.remove = function () {
    // let buttons = [];
    
    this.track.classList.remove('slider__track');
    
    for (let i = 0; i < this.items.length; i++) {
      this.items[i].classList.remove('slider__item');
      this.items[i].style.width = 'auto';
      
      // buttons.push(this.items[i].getElementsByTagName('button')[0]);
    }
    
    // for (let i = 3; i < this.items.length; i++) {
      //   buttons[i].tabIndex = 0;
      // }
      
      this.margin = 0;
    this.items[0].style.marginLeft = this.margin + '%';
    
    this.buttons.style.display = 'none';
  };

  Slider.prototype.showNextSlide = function () {
    if (this.margin <= -this.itemWidth * (this.items.length - this.visItems)) return;

    // let prevButton = this.items[this.slide].getElementsByTagName('button')[0];
    // let nextButton = this.items[this.slide + this.visItems].getElementsByTagName('button')[0];
    
    // this.slide += 1;

    // prevButton.tabIndex = -1;
    // nextButton.tabIndex = 0;

    this.margin -= this.itemWidth;
    this.items[0].style.marginLeft = this.margin + '%';
  };

  Slider.prototype.showPrevSlide = function () {
    if (this.margin >= 0) return;

    // this.slide -= 1;

    // let prevButton = this.items[this.slide].getElementsByTagName('button')[0];
    // let nextButton = this.items[this.slide + this.visItems].getElementsByTagName('button')[0];

    // prevButton.tabIndex = 0;
    // nextButton.tabIndex = -1;

    this.margin += this.itemWidth;
    this.items[0].style.marginLeft = this.margin + '%';
  };

  Slider.prototype.addEvents = function (context) {
    this.next.addEventListener('click', function () {
      context.showNextSlide();
    });

    this.prev.addEventListener('click', function () {
      context.showPrevSlide();
    });

    this.mq.addListener(function () {
      if (context.mq.matches) {
        context.create();
      } else {
        context.remove();
      }
    });
  };
  
  Slider.prototype.buld = function () {
    if (!this.is) {
      this.addEvents(this);

      this.is = true;
    }

    if (this.mq.matches) this.create();
  };  

  let glazingSlider = new Slider('glazing-slider', '800px', 2);
  glazingSlider.buld();

  let titlePageSlider = new Slider('title-page__slider', '720px', 2, 'blue');
  titlePageSlider.buld();


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

