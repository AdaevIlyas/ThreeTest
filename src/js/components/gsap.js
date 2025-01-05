import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function animation() {
  gsap.to(".first-screen__left", {
    scrollTrigger: {
      trigger: ".first-screen",
      start: "top",
      end: "bottom",
      scrub: true,
      // markers: true,
    },
    x: -300,
    opacity: 0,
  });

  gsap.to(".first-screen__right", {
    scrollTrigger: {
      trigger: ".first-screen",
      start: "top",
      end: "bottom",
      scrub: true,
    },
    x: 300,
    opacity: 0,
  });

  // Анимация появления 2 блок
  gsap.from(".second-screen__block", {
    scrollTrigger: {
      trigger: ".first-screen",
      start: "center center",
      end: "bottom 10%",
      scrub: true,
    },
    x: -600,
    opacity: 0,
    duration: 1,
  });

  // Анимация исчезновения 2 блок
  gsap.from(".second-screen__block", {
    scrollTrigger: {
      trigger: ".second-screen",
      start: "top top",
      end: "bottom 0%",
      scrub: true,
    },
    x: 0,
    opacity: 1,
    duration: 100,
  });

  // Анимация появления 3 блок правый
  gsap.from(".third-screen__block", {
    scrollTrigger: {
      trigger: ".second-screen",
      start: "center center",
      end: "bottom 10%",
      scrub: true,
    },
    x: 1000,
    opacity: 0,
    duration: 1,
  });

  // Анимация исчезновения 3 блок правый
  gsap.from(".third-screen__block", {
    scrollTrigger: {
      trigger: ".third-screen",
      start: "top top",
      end: "bottom top",
      scrub: true,
      // markers: true,
    },
    x: 0,
    opacity: 1,
    duration: 100,
  });

  // Анимация появления 3 блок левый
  gsap.from(".third-screen__left", {
    scrollTrigger: {
      trigger: ".third-screen",
      start: "35% 50%",
      end: "90% 90%",
      scrub: true,
      // markers: true,
    },
    x: -100,
    opacity: 0,
    duration: 1,
  });

  // Анимация исчезновения 3 блок левый
  gsap.from(".third-screen__left", {
    scrollTrigger: {
      trigger: ".third-screen",
      start: "top top",
      end: "bottom top",
      scrub: true,
      // markers: true,
    },
    x: 0,
    opacity: 1,
    duration: 100,
  });

  // Анимация появления 4 блок правый
  gsap.from(".four-screen__block", {
    scrollTrigger: {
      trigger: ".third-screen",
      start: "center center",
      end: "105% 5%",
      scrub: true,
      // markers: true,
    },
    x: 1000,
    opacity: 0,
    duration: 1,
  });

  // Анимация появления 4 блок левый
  gsap.from(".four-screen__left", {
    scrollTrigger: {
      trigger: ".four-screen",
      start: "-50% top",
      end: "bottom bottom",
      scrub: true,
      // markers: true,
    },
    x: -400,
    y: -1000,
    opacity: 0,
    duration: 1,
  });
}
