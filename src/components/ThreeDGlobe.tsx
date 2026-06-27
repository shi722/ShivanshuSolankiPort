/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeDGlobe() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const width = mount.clientWidth;
    const height = mount.clientHeight || 350;

    // 1. Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = 15;

    // 2. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    // Group to hold all globe elements for rotation
    const globeGroup = new THREE.Group();
    scene.add(globeGroup);

    // 3. Globe Base Sphere (Wireframe & Mesh)
    const globeRadius = 4.5;
    const sphereGeo = new THREE.SphereGeometry(globeRadius, 32, 32);
    
    // Wireframe for that futuristic "hologram" grid look
    const wireframeMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
      wireframe: true,
      transparent: true,
      opacity: 0.18,
    });
    const globeWire = new THREE.Mesh(sphereGeo, wireframeMat);
    globeGroup.add(globeWire);

    // Glowing points on the surface (star network)
    const pointsGeo = new THREE.BufferGeometry();
    const pointsCount = 450;
    const pointsPositions = new Float32Array(pointsCount * 3);

    for (let i = 0; i < pointsCount; i++) {
      // Golden ratio/uniform sphere distribution
      const phi = Math.acos(-1 + (2 * i) / pointsCount);
      const theta = Math.sqrt(pointsCount * Math.PI) * phi;

      pointsPositions[i * 3] = globeRadius * Math.cos(theta) * Math.sin(phi);
      pointsPositions[i * 3 + 1] = globeRadius * Math.sin(theta) * Math.sin(phi);
      pointsPositions[i * 3 + 2] = globeRadius * Math.cos(phi);
    }

    pointsGeo.setAttribute("position", new THREE.BufferAttribute(pointsPositions, 3));

    // Circle texture for points
    const createCircleTexture = () => {
      const size = 16;
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
      }
      return new THREE.CanvasTexture(canvas);
    };

    const pointsMat = new THREE.PointsMaterial({
      color: 0xbd00ff,
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      map: createCircleTexture(),
      blending: THREE.AdditiveBlending,
    });

    const globePoints = new THREE.Points(pointsGeo, pointsMat);
    globeGroup.add(globePoints);

    // 4. Orbital Cyber Rings around the globe
    const ringsGroup = new THREE.Group();
    globeGroup.add(ringsGroup);

    const ringCount = 2;
    const ringMaterials: THREE.LineBasicMaterial[] = [
      new THREE.LineBasicMaterial({ color: 0x00ffcc, transparent: true, opacity: 0.4 }),
      new THREE.LineBasicMaterial({ color: 0xbd00ff, transparent: true, opacity: 0.3 }),
    ];

    for (let j = 0; j < ringCount; j++) {
      const ringGeo = new THREE.BufferGeometry();
      const ringPoints: number[] = [];
      const radius = globeRadius + 1 + j * 0.4;
      const segments = 64;

      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        ringPoints.push(radius * Math.cos(theta), 0, radius * Math.sin(theta));
      }

      ringGeo.setAttribute("position", new THREE.Float32BufferAttribute(ringPoints, 3));
      const ringLine = new THREE.Line(ringGeo, ringMaterials[j]);
      
      // Angle the rings uniquely
      if (j === 0) {
        ringLine.rotation.x = Math.PI / 4;
        ringLine.rotation.y = Math.PI / 6;
      } else {
        ringLine.rotation.x = -Math.PI / 3;
        ringLine.rotation.z = Math.PI / 8;
      }
      ringsGroup.add(ringLine);
    }

    // 5. Connective Network Arcs / Beams (Curved curves between random vertices)
    const curveCount = 8;
    for (let i = 0; i < curveCount; i++) {
      // Pick random coordinates on sphere
      const u1 = Math.random();
      const v1 = Math.random();
      const theta1 = u1 * 2.0 * Math.PI;
      const phi1 = Math.acos(2.0 * v1 - 1.0);
      
      const p1 = new THREE.Vector3(
        globeRadius * Math.cos(theta1) * Math.sin(phi1),
        globeRadius * Math.sin(theta1) * Math.sin(phi1),
        globeRadius * Math.cos(phi1)
      );

      const u2 = Math.random();
      const v2 = Math.random();
      const theta2 = u2 * 2.0 * Math.PI;
      const phi2 = Math.acos(2.0 * v2 - 1.0);

      const p2 = new THREE.Vector3(
        globeRadius * Math.cos(theta2) * Math.sin(phi2),
        globeRadius * Math.sin(theta2) * Math.sin(phi2),
        globeRadius * Math.cos(phi2)
      );

      // Create a Bezier curve sticking outward
      const midPoint = new THREE.Vector3().addVectors(p1, p2).multiplyScalar(0.5);
      const distance = p1.distanceTo(p2);
      midPoint.normalize().multiplyScalar(globeRadius + distance * 0.3); // Curve height

      const curve = new THREE.QuadraticBezierCurve3(p1, midPoint, p2);
      const curveGeo = new THREE.BufferGeometry().setFromPoints(curve.getPoints(24));
      
      const isCyan = Math.random() > 0.5;
      const curveMat = new THREE.LineBasicMaterial({
        color: isCyan ? 0x00f0ff : 0xbd00ff,
        transparent: true,
        opacity: THREE.MathUtils.randFloat(0.3, 0.75),
        blending: THREE.AdditiveBlending,
      });

      const curveLine = new THREE.Line(curveGeo, curveMat);
      globeGroup.add(curveLine);
    }

    // 6. Glowing "Pin" Marker (Shivanshu's location - India area approx)
    // Spherical coords for India: Lat ~20 N, Lon ~78 E
    const lat = 20.5937 * (Math.PI / 180);
    const lon = 78.9629 * (Math.PI / 180);
    // Convert to 3D Cartesian
    const markerPos = new THREE.Vector3(
      globeRadius * Math.cos(lat) * Math.cos(lon),
      globeRadius * Math.sin(lat),
      globeRadius * Math.cos(lat) * Math.sin(lon)
    );

    const markerGeo = new THREE.SphereGeometry(0.18, 16, 16);
    const markerMat = new THREE.MeshBasicMaterial({
      color: 0xff0055, // Glowing vibrant red/pink for target location
      transparent: true,
      opacity: 0.9,
    });
    const marker = new THREE.Mesh(markerGeo, markerMat);
    marker.position.copy(markerPos);
    globeGroup.add(marker);

    // Glowing ring around the marker pin
    const pulseGeo = new THREE.RingGeometry(0.12, 0.35, 16);
    const pulseMat = new THREE.MeshBasicMaterial({
      color: 0xff0055,
      transparent: true,
      opacity: 0.7,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    });
    const pulseRing = new THREE.Mesh(pulseGeo, pulseMat);
    pulseRing.position.copy(markerPos);
    pulseRing.lookAt(new THREE.Vector3(0, 0, 0)); // face outward from globe center
    globeGroup.add(pulseRing);

    // 7. Mouse interaction / Drag rotating
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaMove = {
        x: e.clientX - previousMousePosition.x,
        y: e.clientY - previousMousePosition.y,
      };

      // Rotate group on drag
      globeGroup.rotation.y += deltaMove.x * 0.005;
      globeGroup.rotation.x += deltaMove.y * 0.005;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
    };

    // Touch support for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      }
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging || e.touches.length !== 1) return;
      const deltaMove = {
        x: e.touches[0].clientX - previousMousePosition.x,
        y: e.touches[0].clientY - previousMousePosition.y,
      };

      globeGroup.rotation.y += deltaMove.x * 0.008;
      globeGroup.rotation.x += deltaMove.y * 0.008;

      previousMousePosition = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };

    const onTouchEnd = () => {
      isDragging = false;
    };

    mount.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    mount.addEventListener("touchstart", onTouchStart);
    mount.addEventListener("touchmove", onTouchMove);
    window.addEventListener("touchend", onTouchEnd);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      if (!mount) return;
      const w = mount.clientWidth;
      const h = mount.clientHeight || 350;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    resizeObserver.observe(mount);

    // 8. Animation loop
    let animationId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsed = clock.getElapsedTime();

      // Continuous automatic rotation when not dragging
      if (!isDragging) {
        globeGroup.rotation.y += 0.0035;
        // Subtle wobble
        globeGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.15;
      }

      // Pulse pin ring effect
      const scale = 1 + Math.sin(elapsed * 6) * 0.4;
      pulseRing.scale.set(scale, scale, 1);
      pulseMat.opacity = 0.8 - (scale - 0.6) * 0.5;

      // Animate rings
      ringsGroup.children.forEach((ring, index) => {
        if (index === 0) {
          ring.rotation.y += 0.005;
        } else {
          ring.rotation.y -= 0.003;
        }
      });

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      mount.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);

      mount.removeEventListener("touchstart", onTouchStart);
      mount.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);

      if (mount && renderer.domElement) {
        mount.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (!(obj instanceof THREE.Mesh || obj instanceof THREE.Points || obj instanceof THREE.Line)) return;
        if (obj.geometry) obj.geometry.dispose();
        if (Array.isArray(obj.material)) {
          obj.material.forEach((mat) => mat.dispose());
        } else if (obj.material) {
          obj.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center">
      <div
        ref={mountRef}
        id="globe-3d-mount"
        className="w-full h-[320px] md:h-[380px] cursor-grab active:cursor-grabbing relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && (
        <div className="absolute bottom-2 bg-slate-900/95 border border-cyan-500/30 text-cyan-400 text-xs px-3 py-1 rounded-full shadow-lg shadow-cyan-950/20 pointer-events-none font-mono animate-fade-in backdrop-blur-md">
          Drag to spin the globe network
        </div>
      )}
    </div>
  );
}
