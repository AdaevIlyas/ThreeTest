import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

export default function threeInit() {
  let globalScene;
  let globalModel;
  let globalCamera;
  let globalHeight = window.innerHeight;
  let globalWidht = window.innerWidth;

  three();

  function animation() {
    console.log(globalModel);

    // Анимация позиции
    gsap.to(globalModel.position, {
      scrollTrigger: {
        trigger: ".site-container", // Элемент, к которому привязан триггер
        start: 0,
        end: globalHeight * 3, // Весь промежуток от 0 до второго экрана
        scrub: true,
        // markers: true,
      },
      keyframes: [
        { x: 6, y: -1, duration: 3 }, // Движение для screen-1
        { x: -3, y: -1, duration: 3 }, // Движение для screen-2
        { x: -5, y: -2, duration: 3 }, // Движение для screen-2
      ],
    });

    // Анимация вращения
    gsap.to(globalModel.rotation, {
      scrollTrigger: {
        trigger: ".site-container", // Элемент, к которому привязан триггер
        start: 0,
        end: globalHeight * 3, // Весь промежуток от 0 до второго экрана
        scrub: true,
        // markers: true,
      },
      keyframes: [
        { y: -Math.PI / 2, x: -Math.PI / 40, duration: 1 }, // Вращение для screen-1
        { y: -Math.PI / 2, x: -Math.PI / 20, duration: 1 }, // Вращение для screen-2
        { y: Math.PI / 2, x: -Math.PI / 40, z: -Math.PI / 10, duration: 1 }, // Вращение для screen-2
      ],
    });
  }

  function three() {
    // 1. Создание сцены
    const scene = new THREE.Scene();
    scene.background = null;
    globalScene = scene;

    // 2. Создание камеры
    const camera = new THREE.PerspectiveCamera(
      100,
      window.innerWidth / window.innerHeight,
      0.1,
      70
    );
    camera.position.z = 0;
    camera.position.x = 0;
    camera.position.y = 0;

    globalCamera = camera;

    // 3. Создание рендера
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document
      .querySelector("#three-d-container")
      .appendChild(renderer.domElement);

    // 4. Загрузка модели GLTF
    const loader = new GLTFLoader();
    loader.load(
      "/model-3.glb", // Убедитесь, что файл находится в папке public/models
      (gltf) => {
        const model = gltf.scene;
        model.position.set(0, 0, -5); // Установите позицию модели
        model.rotation.x = Math.PI / 8;
        model.rotation.y = -Math.PI / 8;
        // model.rotation.z = 0;
        model.scale.set(0.01, 0.01, 0.01);

        globalModel = model;
        scene.add(model);
        animation();
      },
      (xhr) => {
        console.log(`Загрузка модели: ${(xhr.loaded / xhr.total) * 100}%`);
        console.log(xhr);
      },
      (error) => {
        console.error("Ошибка загрузки модели:", error);
      }
    );

    // 5. Освещение
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Мягкий рассеянный свет
    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Белый цвет, интенсивность 1
    scene.add(ambientLight);

    // Полусферическое освещение (имитация неба и земли)
    const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6); // Небо, земля, интенсивность
    hemisphereLight.position.set(0, 50, 0); // Сверху
    scene.add(hemisphereLight);

    // 6. Анимация
    function animate() {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    }
    animate();

    // 7. Обработка изменения размера окна
    window.addEventListener("resize", () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }
}
