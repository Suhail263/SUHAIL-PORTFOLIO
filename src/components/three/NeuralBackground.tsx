import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 260;
const CONNECT_DISTANCE = 1.8;

function NeuralPoints() {
  const pointsRef = useRef<THREE.Points>(null);
  const lineRef = useRef<THREE.LineSegments>(null);
  const { viewport, mouse } = useThree();

  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 8;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 5;
    }
    return arr;
  }, []);

  const velocities = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 0.004;
    }
    return arr;
  }, []);

  const lineGeometry = useMemo(() => new THREE.BufferGeometry(), []);
  const maxLines = PARTICLE_COUNT * 8;
  const linePositions = useMemo(() => new Float32Array(maxLines * 2 * 3), [maxLines]);

  useFrame(() => {
    const posAttr = pointsRef.current?.geometry.attributes.position as THREE.BufferAttribute | undefined;
    if (!posAttr) return;
    const arr = posAttr.array as Float32Array;

    const targetX = mouse.x * viewport.width * 0.15;
    const targetY = mouse.y * viewport.height * 0.15;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      arr[ix] += velocities[ix] + targetX * 0.0006;
      arr[ix + 1] += velocities[ix + 1] + targetY * 0.0006;
      arr[ix + 2] += velocities[ix + 2];

      if (arr[ix] > 7 || arr[ix] < -7) velocities[ix] *= -1;
      if (arr[ix + 1] > 4 || arr[ix + 1] < -4) velocities[ix + 1] *= -1;
      if (arr[ix + 2] > 2.5 || arr[ix + 2] < -2.5) velocities[ix + 2] *= -1;
    }
    posAttr.needsUpdate = true;

    // Rebuild connective lines between nearby particles
    let lineIdx = 0;
    for (let i = 0; i < PARTICLE_COUNT && lineIdx < maxLines; i++) {
      for (let j = i + 1; j < PARTICLE_COUNT && lineIdx < maxLines; j++) {
        const dx = arr[i * 3] - arr[j * 3];
        const dy = arr[i * 3 + 1] - arr[j * 3 + 1];
        const dz = arr[i * 3 + 2] - arr[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < CONNECT_DISTANCE) {
          const base = lineIdx * 6;
          linePositions[base] = arr[i * 3];
          linePositions[base + 1] = arr[i * 3 + 1];
          linePositions[base + 2] = arr[i * 3 + 2];
          linePositions[base + 3] = arr[j * 3];
          linePositions[base + 4] = arr[j * 3 + 1];
          linePositions[base + 5] = arr[j * 3 + 2];
          lineIdx++;
        }
      }
    }
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions.slice(0, lineIdx * 6), 3));
    lineGeometry.attributes.position.needsUpdate = true;
  });

  return (
    <>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} count={PARTICLE_COUNT} itemSize={3} />
        </bufferGeometry>
        <pointsMaterial color="#7c8bff" size={0.06} transparent opacity={1} sizeAttenuation />
      </points>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color="#5b6cff" transparent opacity={0.3} />
      </lineSegments>
    </>
  );
}

export function NeuralBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      {/* Ambient gradient base — gives the scene depth instead of flat black */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 30% 20%, rgba(91,108,255,0.16), transparent 60%), ' +
            'radial-gradient(ellipse 70% 60% at 80% 80%, rgba(91,108,255,0.10), transparent 60%), ' +
            'var(--color-bg)',
        }}
      />
      <Canvas camera={{ position: [0, 0, 6], fov: 55 }} dpr={[1, 1.5]}>
        <NeuralPoints />
      </Canvas>
      {/* Soft vignette only right at the edges, so the scene reads full-bleed */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 55%, var(--color-bg) 115%)',
        }}
      />
    </div>
  );
}
