export const initSlider = (
  sliderBubles,
  sliderHolder,
  slides,
  slidesBottomText,
  textBottomHolder,
  carousel1Title,
  carousel1Author
) => {
  let activeSlide = 0;
  let clickable = true;

  const debounce = (func, wait = 10, immediate = false) => {
    let timeout;
    return function() {
      let context = this,
        args = arguments;
      let later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      let callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
    };
  };

  sliderBubles.forEach(el =>
    el.addEventListener("click", () => {
      if (el.classList.contains("active") || !clickable) return;
      sliderHolder.style.transition = " 0.4s 0.3s linear transform";
      clickable = false;
      //Change the active pagination
      sliderBubles[activeSlide].classList.remove("active");
      el.classList.add("active");

      const lastActiveSlide = slides[activeSlide];
      lastActiveSlide.classList.remove("active");

      activeSlide = Number(el.dataset.index);
      if (activeSlide === 0) {
        sliderHolder.style.transform = `translateX(15%)`;
      } else {
        sliderHolder.style.transform = `translateX(-${55 +
          70 * (activeSlide - 1)}%)`;
      }

      //Change text
      textBottomHolder.classList.add("fade-out");
    })
  );

  //when the image is done sliding, let the user click again, show next text info
  sliderHolder.addEventListener("transitionend", e => {
    if (e.srcElement !== sliderHolder || e.propertyName !== "transform") return;
    slides[activeSlide].classList.add("active");
    clickable = true;

    carousel1Title.innerText = slidesBottomText[activeSlide]["slide-title"];
    carousel1Author.innerText = slidesBottomText[activeSlide]["slide-author"];
    textBottomHolder.classList.remove("fade-out");
  });

  /* REMOVE EVENT LISTENERS OF THE LASTACTIVE SLIDE */
  let moveable = true;
  let lastActiveSlide = slides[activeSlide]; // do not know exactly how to fix it, must find a better solution

  /*Function that update both the slides and the bubbles when the carousel moves */
  const updateActiveSlideAndBubble = n => {
    lastActiveSlide = slides[activeSlide];
    lastActiveSlide.classList.remove("active");
    lastActiveSlide.style.transform = null;

    sliderBubles[activeSlide].classList.remove("active");
    activeSlide += n;
    sliderBubles[activeSlide].classList.add("active");
    slides[activeSlide].classList.add("active");

    window.setTimeout(() => (lastActiveSlide = ""), 200); // do not know exactly how to fix it, must find a better solution
  };

  document.querySelectorAll(".carousel-1-image-item").forEach(el => {
    let parent = el.parentElement;
    const elIdx = slides.indexOf(parent);
    el.addEventListener("click", e => {
      if (parent.classList.contains("active") || parent === lastActiveSlide) {
        return;
      }

      updateActiveSlideAndBubble(elIdx - activeSlide);
      const translateHolderTo = 15 - 70 * activeSlide;
      sliderHolder.style.transform = `translateX(${translateHolderTo}%)`;
    });
  });

  /*Remove the listener of the mousemove for the active element, as well mouseup/leave*/
  let removeListener = () => {
    /*Flag to return if this is false, in the move, createa a bug sometimes without it*/
    moveable = false;
    let lastActive = document.querySelector(
      ".gallery-slide.active .carousel-1-image-item"
    );
    lastActive.removeEventListener("mousemove", debouncedMouseMoveListener);
    lastActive.removeEventListener("mouseup", removeListener);
    lastActive.removeEventListener("mouseleave", removeListener);
    lastActive.removeEventListener("touchmove", removeListener);

    /*Depending on where the user has moved the mouse move the slider that direction */

    if (moveDiference > 0.2 && activeSlide > 0) {
      updateActiveSlideAndBubble(-1);
    } else if (moveDiference < -0.2 && activeSlide < slides.length - 1) {
      updateActiveSlideAndBubble(1);
    } else {
      slides[activeSlide].style.transform = null;
    }
    const translateHolderTo = 15 - 70 * activeSlide;
    sliderHolder.style.transform = `translateX(${translateHolderTo}%)`;
    sliderHolder.style.transition = " 0.4s linear transform";

    /* Reset thos 2 let so for the next slide will start from the point the user have clicked */
    moveDiference = undefined;
    firstTouchAt = undefined;
  };

  let moveDiference;
  let firstTouchAt = undefined; //keeps track of the first touch, where the user has clicked so the move starts at that pos
  let actualHolderPos = 15 - 70 * activeSlide;
  let zoomRatio = 1.2; //the zoom on the active slide

  /* LISTENERS FOR THE MOVEMENT OF THE MOUSE/TOUCH */
  const mouseMoveListener = e => {
    if (!moveable) return;
    const el = e.target;

    if (el.classList.contains("hidden")) {
      //the element is a video and is playing stop it then move on
      el.classList.remove("hidden");
    }

    let slideWidth = el.scrollWidth; //get the width of the slide;

    let touchNow = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;

    /* The diference between first click , and the movement of the mouse(actual position), move and scale slide */
    moveDiference = -((firstTouchAt - touchNow) / slideWidth);
    el.parentElement.style.transform = `scale(${zoomRatio -
      Math.abs(moveDiference / 3)})`;
    sliderHolder.style.transform = `translateX(${actualHolderPos +
      moveDiference * 70}%)`;
  };

  let debouncedMouseMoveListener = debounce(mouseMoveListener); // listener debounced

  const getFirstTouchPosition = e => {
    if (firstTouchAt === undefined) {
      //if we have not seted the firstTouch do it, just once perTouch
      if (e.changedTouches) {
        firstTouchAt = e.changedTouches[0].clientX;
      } else {
        firstTouchAt = e.clientX;
      }
      actualHolderPos = 15 - 70 * slides.indexOf(e.target.parentElement);
    }
  };

  /* ADD THE CLICKDOWN LISTENER TO ALL THE SLIDES */
  document.querySelectorAll(".carousel-1-image-item").forEach(el => {
    const parent = el.parentElement;
    el.addEventListener("mousedown", e => {
      if (!parent.classList.contains("active")) return; // just if it has the active add the move, if not return
      moveable = true;

      /* remove mousemove when this happens */
      el.addEventListener("mouseup", removeListener);
      el.addEventListener("mouseleave", removeListener);
      sliderHolder.style.transition = " 0s";
      /* add mousemove */
      el.addEventListener("mousemove", debouncedMouseMoveListener);
      getFirstTouchPosition(e);
    });
    el.addEventListener("touchstart", e => {
      if (!parent.classList.contains("active")) return; // just if it has the active add the move, if not return
      moveable = true;
      /* remove mousemove when this happens */
      el.addEventListener("touchend", removeListener);
      sliderHolder.style.transition = " 0s";
      /* add mousemove */
      el.addEventListener("touchmove", debouncedMouseMoveListener);
      getFirstTouchPosition(e);
    });
  });
};
