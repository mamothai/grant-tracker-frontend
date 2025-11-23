import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Animated background particles
function BackgroundParticles({ count = 100 }) {
  const particles = useRef();

  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 20;
    positions[i + 1] = (Math.random() - 0.5) * 20;
    positions[i + 2] = (Math.random() - 0.5) * 20;
    
    // Gradient colors from cyan to purple
    const color = new THREE.Color();
    const t = Math.random();
    if (t < 0.5) {
      color.setHex(0x06b6d4); // cyan
    } else {
      color.setHex(0xa855f7); // purple
    }
    colors[i] = color.r;
    colors[i + 1] = color.g;
    colors[i + 2] = color.b;
  }

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.x = state.clock.elapsedTime * 0.1;
      particles.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.1} 
        vertexColors 
        transparent 
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={false}
      />
    </points>
  );
}

// Floating geometric shapes
function FloatingShapes() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.children.forEach((child, i) => {
        child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5;
      });
    }
  });

  return (
    <group ref={groupRef}>
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 3;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const shapes = ['box', 'sphere', 'octahedron'];
        const shape = shapes[i % shapes.length];
        const colors = ['#06b6d4', '#a855f7', '#ec4899'];
        const color = colors[i % colors.length];

        return (
          <mesh key={i} position={[x, 0, z]}>
            {shape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
            {shape === 'sphere' && <sphereGeometry args={[0.2, 16, 16]} />}
            {shape === 'octahedron' && <octahedronGeometry args={[0.25, 0]} />}
            <meshStandardMaterial 
              color={color} 
              emissive={color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.6}
            />
          </mesh>
        );
      })}
    </group>
  );
}

// Main background component
export default function ThreeDBackground({ style = {} }) {
  return (
    <div 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: -1,
        pointerEvents: 'none',
        ...style 
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <BackgroundParticles count={80} />
        <FloatingShapes />
      </Canvas>
    </div>
  );
}

