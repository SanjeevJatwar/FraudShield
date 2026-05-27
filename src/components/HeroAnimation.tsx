import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    try {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current.clientWidth / containerRef.current.clientHeight,
        0.1,
        1000
      );

      const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      containerRef.current.appendChild(renderer.domElement);

      const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
      const cubes: THREE.Mesh[] = [];

      for (let i = 0; i < 15; i++) {
        const material = new THREE.MeshBasicMaterial({
          color: i % 2 === 0 ? 0x247bff : 0xd74fff,
          wireframe: true,
          transparent: true,
          opacity: 0.6
        });

        const cube = new THREE.Mesh(cubeGeometry, material);
        cube.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10
        );
        cube.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        );
        cube.scale.set(
          0.3 + Math.random() * 0.5,
          0.3 + Math.random() * 0.5,
          0.3 + Math.random() * 0.5
        );

        scene.add(cube);
        cubes.push(cube);
      }

      camera.position.z = 8;

      const animate = () => {
        requestAnimationFrame(animate);

        cubes.forEach((cube, index) => {
          cube.rotation.x += 0.002 * (index % 2 === 0 ? 1 : -1);
          cube.rotation.y += 0.003 * (index % 2 === 0 ? 1 : -1);

          cube.position.y += Math.sin(Date.now() * 0.001 + index) * 0.002;
        });

        scene.rotation.y += 0.001;

        renderer.render(scene, camera);
      };

      animate();

      const handleResize = () => {
        if (!containerRef.current) return;

        camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
      };

      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
        renderer.dispose();
        containerRef.current?.removeChild(renderer.domElement);
      };
    } catch (error) {
      console.error('WebGL not supported:', error);
      setWebGLSupported(false);
    }
  }, []);

  if (!webGLSupported) {
    return (
      <div className="w-full h-full rounded-2xl overflow-hidden">
        <div className="w-full h-full bg-gradient-to-br from-[#247BFF] via-[#1a66e0] to-[#D74FFF] opacity-60 animate-pulse" />
      </div>
    );
  }

  return <div ref={containerRef} className="w-full h-full" />;
}
