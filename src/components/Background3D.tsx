/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Background3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x020208, 0.015);

    // 2. Camera setup
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 25);
    camera.lookAt(0, 2, 0);

    // 3. Renderer setup
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x020208, 1);
    container.appendChild(renderer.domElement);

    // 4. Lights
    const ambientLight = new THREE.AmbientLight(0x08081a, 0.5);
    scene.add(ambientLight);

    const blueLight = new THREE.PointLight(0x00f0ff, 3, 50);
    blueLight.position.set(-15, 10, -5);
    scene.add(blueLight);

    const purpleLight = new THREE.PointLight(0xbd00ff, 3, 50);
    purpleLight.position.set(15, 10, -5);
    scene.add(purpleLight);

    const centerLight = new THREE.PointLight(0x00ffcc, 1, 30);
    centerLight.position.set(0, 2, 10);
    scene.add(centerLight);

    // 5. Starfield & Particles (3D Star Field)
    const starsCount = 1000;
    const starsGeo = new THREE.BufferGeometry();
    const starPositions = new Float32Array(starsCount * 3);
    const starColors = new Float32Array(starsCount * 3);

    for (let i = 0; i < starsCount; i++) {
      // Cylindrical or spherical distribution
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const r = THREE.MathUtils.randFloat(10, 80);
      const y = THREE.MathUtils.randFloat(-20, 60);

      starPositions[i * 3] = r * Math.cos(theta);
      starPositions[i * 3 + 1] = y;
      starPositions[i * 3 + 2] = r * Math.sin(theta);

      // Cyberpunk gradient: mixtures of cyan, blue, purple, dark magenta
      const rand = Math.random();
      if (rand < 0.4) {
        // Cyan
        starColors[i * 3] = 0.0;
        starColors[i * 3 + 1] = 0.94;
        starColors[i * 3 + 2] = 1.0;
      } else if (rand < 0.7) {
        // Purple/Neon Pink
        starColors[i * 3] = 0.74;
        starColors[i * 3 + 1] = 0.0;
        starColors[i * 3 + 2] = 1.0;
      } else {
        // Blue
        starColors[i * 3] = 0.0;
        starColors[i * 3 + 1] = 0.4;
        starColors[i * 3 + 2] = 1.0;
      }
    }

    starsGeo.setAttribute("position", new THREE.BufferAttribute(starPositions, 3));
    starsGeo.setAttribute("color", new THREE.BufferAttribute(starColors, 3));

    // Simple custom circular particle shader texture using canvas API
    const createCircleTexture = () => {
      const size = 16;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(
          size / 2,
          size / 2,
          0,
          size / 2,
          size / 2,
          size / 2
        );
        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(0.2, "rgba(255, 255, 255, 0.8)");
        gradient.addColorStop(0.5, "rgba(0, 240, 255, 0.3)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, size, size);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.25,
      map: createCircleTexture(),
      transparent: true,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const starParticles = new THREE.Points(starsGeo, starsMaterial);
    scene.add(starParticles);

    // 6. Tron Cyber Grid Floor
    // We create a custom scrolling wireframe grid to give a beautiful high-fidelity feeling.
    const gridRows = 40;
    const gridCols = 40;
    const gridSpacing = 2;
    const gridGeo = new THREE.BufferGeometry();
    const gridVertices: number[] = [];
    const gridLineColors: number[] = [];

    // Horizontal lines (along X axis)
    for (let r = 0; r <= gridRows; r++) {
      const z = (r - gridRows / 2) * gridSpacing;
      gridVertices.push(-gridCols * gridSpacing / 2, 0, z);
      gridVertices.push(gridCols * gridSpacing / 2, 0, z);

      // Add gradients based on Z distance (fades towards horizon)
      const ratio = 1 - Math.abs(z) / (gridRows * gridSpacing / 2);
      for (let j = 0; j < 2; j++) {
        gridLineColors.push(0.0, 0.4 * ratio, 0.8 * ratio); // Cyber blue fade
      }
    }

    // Vertical lines (along Z axis)
    for (let c = 0; c <= gridCols; c++) {
      const x = (c - gridCols / 2) * gridSpacing;
      gridVertices.push(x, 0, -gridRows * gridSpacing / 2);
      gridVertices.push(x, 0, gridRows * gridSpacing / 2);

      for (let j = 0; j < 2; j++) {
        gridLineColors.push(0.0, 0.4, 0.8); // Main vertical beams
      }
    }

    gridGeo.setAttribute("position", new THREE.Float32BufferAttribute(gridVertices, 3));
    gridGeo.setAttribute("color", new THREE.Float32BufferAttribute(gridLineColors, 3));

    const gridMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.45,
      blending: THREE.AdditiveBlending,
    });

    const cyberGrid = new THREE.LineSegments(gridGeo, gridMaterial);
    cyberGrid.position.y = -3; // Put below the camera view
    scene.add(cyberGrid);

    // 7. Dynamic Floating Glowing Orbs (represented by volumetric light meshes)
    const orbGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    const orbMaterials = [
      new THREE.MeshBasicMaterial({
        color: 0xbd00ff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00f0ff,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending,
      }),
      new THREE.MeshBasicMaterial({
        color: 0x00ffcc,
        transparent: true,
        opacity: 0.12,
        blending: THREE.AdditiveBlending,
      }),
    ];

    const orbs: THREE.Mesh[] = [];
    const orbSpeeds: Array<{ x: number; y: number; z: number }> = [];

    for (let i = 0; i < 3; i++) {
      const orb = new THREE.Mesh(orbGeometry, orbMaterials[i]);
      orb.position.set(
        THREE.MathUtils.randFloat(-15, 15),
        THREE.MathUtils.randFloat(0, 10),
        THREE.MathUtils.randFloat(-10, 5)
      );
      scene.add(orb);
      orbs.push(orb);
      orbSpeeds.push({
        x: THREE.MathUtils.randFloat(0.005, 0.015),
        y: THREE.MathUtils.randFloat(0.005, 0.012),
        z: THREE.MathUtils.randFloat(0.004, 0.01),
      });
    }

    // 8. Vertical Neon Light Beams (Awwwards feature)
    const beamCount = 10;
    const beamGeo = new THREE.CylinderGeometry(0.04, 0.04, 30, 4);
    const beams: THREE.Mesh[] = [];
    
    for (let i = 0; i < beamCount; i++) {
      const isCyan = Math.random() > 0.5;
      const beamMat = new THREE.MeshBasicMaterial({
        color: isCyan ? 0x00f0ff : 0xbd00ff,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.08, 0.22),
        blending: THREE.AdditiveBlending,
      });
      const beam = new THREE.Mesh(beamGeo, beamMat);
      beam.position.set(
        THREE.MathUtils.randFloat(-25, 25),
        10,
        THREE.MathUtils.randFloat(-30, 0)
      );
      scene.add(beam);
      beams.push(beam);
    }

    // Mouse interactive event handlers
    const onMouseMove = (event: MouseEvent) => {
      // Map to normalized device coordinates (-1 to 1)
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // Responsive sizing logic with ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(container);

    // 9. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Slow rotational star animation
      starParticles.rotation.y = elapsed * 0.012;
      starParticles.rotation.x = elapsed * 0.006;

      // Tron Grid Floor continuous scrolling effect
      // By shifting the vertices or simply moving the mesh and wrapping position:
      cyberGrid.position.z = (elapsed * 3) % gridSpacing;

      // Smoothly interpolate (lerp) mouse movement for reactive lighting
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Adjust camera slightly based on mouse
      camera.position.x = mouseRef.current.x * 3;
      camera.position.y = 5 + mouseRef.current.y * 1.5;
      camera.lookAt(0, 2, -10);

      // Drifting Orbs physics
      orbs.forEach((orb, index) => {
        const speed = orbSpeeds[index];
        orb.position.x += Math.sin(elapsed * speed.x * 10) * 0.02;
        orb.position.y += Math.cos(elapsed * speed.y * 10) * 0.015;
        orb.position.z += Math.sin(elapsed * speed.z * 10) * 0.015;
      });

      // Interactive mouse reactive lights
      blueLight.position.x = -15 + mouseRef.current.x * 8;
      purpleLight.position.x = 15 + mouseRef.current.x * 8;

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // 10. Clean-up memory
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", onMouseMove);
      resizeObserver.disconnect();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      // Traverse and dispose materials and geometries
      scene.traverse((object) => {
        if (!(object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.LineSegments)) return;
        if (object.geometry) object.geometry.dispose();
        if (Array.isArray(object.material)) {
          object.material.forEach((mat) => mat.dispose());
        } else if (object.material) {
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="3d-cyber-background"
      className="fixed inset-0 w-full h-full -z-20 overflow-hidden select-none pointer-events-none"
    />
  );
}
