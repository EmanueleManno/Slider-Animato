document.addEventListener("DOMContentLoaded", function () {
  const slideParagraphs = document.querySelectorAll(".slide-paragraph");

  slideParagraphs.forEach((slideParagraph) => {
    const textLimit = 100;
    const fullText = slideParagraph.innerText;
    const aTag = slideParagraph.querySelector(".paragraph-anchor-tag");

    slideParagraph.setAttribute("data-expanded", "false");

    if (fullText.length > textLimit) {
      // Mostra solo il testo limitato inizialmente
      slideParagraph.innerHTML =
        fullText.substring(0, textLimit) +
        "... <a href='#' class='read-more'>Leggi di più</a>";

      // Aggiungi un evento al click del link
      slideParagraph
        .querySelector(".read-more")
        .addEventListener("click", (e) => {
          e.preventDefault();
          if (slideParagraph.getAttribute("data-expanded") === "false") {
            // Mostra tutto il testo e rimuove il link
            slideParagraph.innerHTML = fullText;
            slideParagraph.setAttribute("data-expanded", "true");
          }
        });
    }
  });

  const videoParagraphs = document.querySelectorAll(".video-paragraph");

  videoParagraphs.forEach((videoParagraph) => {
    const textLimit = 150;
    const fullText = videoParagraph.innerText;
    const aTag = videoParagraph.querySelector(".video-anchor-tag");

    videoParagraph.setAttribute("data-expanded", "false");

    if (fullText.length > textLimit) {
      videoParagraph.innerHTML =
        fullText.substring(0, textLimit) +
        "... <a href='#' class='read-more'>Leggi di più</a>";

      videoParagraph
        .querySelector(".read-more")
        .addEventListener("click", (e) => {
          e.preventDefault();
          if (videoParagraph.getAttribute("data-expanded") === "false") {
            videoParagraph.innerHTML = fullText;
            videoParagraph.setAttribute("data-expanded", "true");
          }
        });
    }
  });
});

//Caricamento della prima slide
window.addEventListener("DOMContentLoaded", () => {
  const firstSlide = document.querySelector(".first-slide");
  const firstSlideBtn = document.querySelector(".first-slide-btn");
  const firstIndicatorBar = document.querySelector(".first-indicator-bar");

  setTimeout(() => {
    firstSlide.classList.add("active");
  }, 300);

  firstSlideBtn.classList.add("active");
  firstIndicatorBar.classList.add("active");
});

//Autoplay dello Slider
var playSlider;

var repeater = () => {
  playSlider = setInterval(function () {
    slides.forEach((slide) => {
      slide.classList.remove("active");
    });

    slideBtns.forEach((slideBtn) => {
      slideBtn.classList.remove("active");
    });

    slideIndicatorBars.forEach((slideIndicatorBar) => {
      slideIndicatorBar.classList.remove("active");
    });

    slideNumber++;

    if (slideNumber > numberOfSlides - 1) {
      slideNumber = 0;
    }

    slides[slideNumber].classList.add("active");
    slideBtns[slideNumber].classList.add("active");
    slideIndicatorBars[slideNumber].classList.add("active");
  }, 8500);
};

repeater();

//Logica per lo Slider
const slider = document.querySelector(".slider");
const slides = slider.querySelectorAll(".slide");
const numberOfSlides = slides.length;
const slideBtns = document.querySelectorAll(".slide-btn");
const slideIndicatorBars = document.querySelectorAll(".indicator-bar");
var slideNumber = 0;

//Navigazione del precedente e del successivo nello Slider
const nextBtn = document.querySelector(".next-btn");
const prevBtn = document.querySelector(".prev-btn");

//Tasto successivo
nextBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slideBtns.forEach((slideBtn) => {
    slideBtn.classList.remove("active");
  });

  slideIndicatorBars.forEach((slideIndicatorBar) => {
    slideIndicatorBar.classList.remove("active");
  });

  slideNumber++;

  if (slideNumber > numberOfSlides - 1) {
    slideNumber = 0;
  }

  slides[slideNumber].classList.add("active");
  slideBtns[slideNumber].classList.add("active");
  slideIndicatorBars[slideNumber].classList.add("active");

  clearInterval(playSlider);
  repeater();
});

//Tasto precedente
prevBtn.addEventListener("click", () => {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slideBtns.forEach((slideBtn) => {
    slideBtn.classList.remove("active");
  });

  slideIndicatorBars.forEach((slideIndicatorBar) => {
    slideIndicatorBar.classList.remove("active");
  });

  slideNumber--;

  if (slideNumber < 0) {
    slideNumber = numberOfSlides - 1;
  }

  slides[slideNumber].classList.add("active");
  slideBtns[slideNumber].classList.add("active");
  slideIndicatorBars[slideNumber].classList.add("active");

  clearInterval(playSlider);
  repeater();
});

//Paginazione dello Slider
var slideBtnNav = function (slideBtnClick) {
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });

  slideBtns.forEach((slideBtn) => {
    slideBtn.classList.remove("active");
  });

  slideIndicatorBars.forEach((slideIndicatorBar) => {
    slideIndicatorBar.classList.remove("active");
  });

  slides[slideBtnClick].classList.add("active");
  slideBtns[slideBtnClick].classList.add("active");
  slideIndicatorBars[slideBtnClick].classList.add("active");
};

slideBtns.forEach((slideBtn, i) => {
  slideBtn.addEventListener("click", () => {
    slideBtnNav(i);
    clearInterval(playSlider);
    repeater();
    slideNumber = i;
  });
});

//Modali Video
slides.forEach((slide, i) => {
  let watchVideoBtn = slide.querySelector(".watch-video-btn");
  let slideVideoModal = slide.querySelector(".slide-video-modal");
  let videoModalContent = slide.querySelector(".video-modal-content");
  let videoCloseBtn = slide.querySelector(".video-close-btn");
  let animalVideo = slide.querySelector(".animal-video");

  //Apertura del video cliccando sul bottone
  watchVideoBtn.addEventListener("click", () => {
    slideVideoModal.classList.add("active");

    setTimeout(() => {
      videoModalContent.classList.add("active");
    }, 300);

    //Parte il video
    animalVideo.play();

    //Stoppa slider quando clicchi sul bottone video
    if (slideVideoModal.classList.contains("active")) {
      clearInterval(playSlider);
    }
  });

  //Resetta slide corrente dall'autoplay quando c'è mouseover sulla modale video
  slideVideoModal.addEventListener("mouseover", () => {
    clearInterval(playSlider);
  });

  //Chiudi il video della modale cliccando sul relativo bottone
  const videoClose = function (closeBtnClick) {
    //Riparte lo slider
    slideIndicatorBars.forEach((slideIndicatorBar) => {
      slideIndicatorBar.classList.remove("active");
    });

    setTimeout(() => {
      slideIndicatorBars[closeBtnClick].classList.add("active");
    }, 0);
  };

  videoCloseBtn.addEventListener("click", () => {
    slideVideoModal.classList.remove("active");
    videoModalContent.classList.remove("active");

    slideIndicatorBars.forEach((slideIndicatorBar) => {
      slideIndicatorBar.classList.remove("active");
    });

    //Video in pausa
    animalVideo.pause();

    clearInterval(playSlider);
    repeater();
    videoClose(i);
  });
});
