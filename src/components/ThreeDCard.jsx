import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';
import * as THREE from 'three';

// Interactive 3D shape for cards
function CardShape({ shape = 'box', color = '#06b6d4', hovered }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
      
      if (hovered) {
        meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
      } else {
        meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
      }
    }
  });

  const geometry = shape === 'box' 
    ? <boxGeometry args={[1, 1, 1]} />
    : shape === 'sphere'
    ? <sphereGeometry args={[0.6, 32, 32]} />
    : <octahedronGeometry args={[0.7, 0]} />;

  return (
    <mesh ref={meshRef}>
      {geometry}
      <meshStandardMaterial 
        color={color} 
        emissive={color}
        emissiveIntensity={hovered ? 0.6 : 0.3}
        metalness={0.8}
        roughness={0.2}
      />
    </mesh>
  );
}

// Main 3D Card Component
export default function ThreeDCard({ 
  shape = 'box',
  color = '#06b6d4',
  style = {},
  className = ''
}) {
  const [hovered, setHovered] = useState(false);

  try {
    return (
      <div
        className={className}
        style={{
          width: '100px',
          height: '100px',
          transition: 'transform 0.3s ease',
          transform: hovered ? 'scale(1.05)' : 'scale(1)',
          ...style
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Canvas
          camera={{ position: [0, 0, 3], fov: 75 }}
          gl={{ alpha: true, antialias: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} />
          <pointLight position={[5, 5, 5]} intensity={1} />
          <pointLight position={[-5, -5, -5]} color={color} intensity={0.5} />
          <CardShape shape={shape} color={color} hovered={hovered} />
        </Canvas>
      </div>
    );
  } catch (error) {
    console.error('Error rendering 3D card:', error);
    return <div style={{ width: '100px', height: '100px', ...style }} />;
  }
}

