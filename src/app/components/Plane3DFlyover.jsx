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
      2000
    );
    camera.position.set(0, 0, 6);

    // ===== RENDERER =====
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true
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
      plane.position.set(1, -1, 0);

      scene.add(plane);

      createScrollAnimation();
      render();
    });

    // ===== SCROLL ANIMATION =====
    function createScrollAnimation() {
      gsap.timeline({
  scrollTrigger: {
    trigger: document.body,
    scrub: true,
    start: "top top",
    end: "bottom bottom"
  },
  onUpdate: render
})
.to(plane.position, { x: -3, y: 0.5, duration: 1 })
.to(plane.rotation, { z: -0.3, duration: 1 }, "<") // slight bank
.to(plane.position, { x: 0, y: 1, duration: 1 })
.to(plane.rotation, { z: 0.3, duration: 1 }, "<")
.to(plane.position, { x: 3, y: -0.5, duration: 1 })
.to(plane.rotation, { z: 0, duration: 1 }, "<");
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