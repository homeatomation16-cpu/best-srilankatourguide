"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PlaneFlyover() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // ===== SCENE =====
    const scene = new THREE.Scene();

    // ===== CAMERA =====
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      2000,
    );
    camera.position.set(0, 0, 6);

    // ===== RENDERER =====
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;

    container.appendChild(renderer.domElement);

    // ===== LIGHTING =====
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
    keyLight.position.set(5, 10, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 1);
    fillLight.position.set(-5, 5, -5);
    scene.add(fillLight);

    let plane;

    // ===== LOAD GLB =====
    const loader = new GLTFLoader();
    loader.load("/plane.glb", (gltf) => {
      plane = gltf.scene;

      // ✅ Use original GLB materials
      plane.traverse((child) => {
        if (child.isMesh) {
          child.material.needsUpdate = true;
        }
      });

      plane.scale.set(0.8, 0.8, 0.8);
      plane.position.set(-3, -1, 0);

      scene.add(plane);

      createScrollAnimation();
      render();
    });

    // ===== SCROLL ANIMATION =====
    function createScrollAnimation() {

  // ✈️ Create smooth curved path
  const curve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(-1, 2, 0),
    new THREE.Vector3(0, 0, 1),
    new THREE.Vector3(1, 0, 0),
    new THREE.Vector3(-2, 1, -2),
    new THREE.Vector3(-4, 2, -5),
    new THREE.Vector3(0, 0, -8),
    // new THREE.Vector3(-4, 2, -5),
    // new THREE.Vector3(-2, 1, -3),
    // new THREE.Vector3(-1, 0, -1),
    // new THREE.Vector3(-1, 0, 0),
    // new THREE.Vector3(-1, 0, -2),
  ]);

  const progress = { t: 0 };

  gsap.to(progress, {
    t: 1,
    ease: "none",
    scrollTrigger: {
      trigger: document.body,
      scrub: true,
      start: "top top",
      end: "bottom bottom"
    },
    onUpdate: () => {

      // 📍 Position along curve
      const point = curve.getPoint(progress.t);
      plane.position.copy(point);

      // 🎯 Look forward direction
      const tangent = curve.getTangent(progress.t).normalize();
      const axis = new THREE.Vector3(0, 1, 0);
      const radians = Math.atan2(tangent.x, tangent.z);

      plane.rotation.y = radians;
      plane.rotation.x = -tangent.y * 0.5; // slight tilt

      render();
    }
  });
}

    function render() {
      renderer.render(scene, camera);
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      render();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-40"
    />
  );
}