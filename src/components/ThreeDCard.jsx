import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useState } from 'react';

// Simple 3D shape for cards
function CardShape({ shape = 'box', color = '#06b6d4', hovered }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <mesh ref={meshRef} scale={hovered ? 1.2 : 1}>
      {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
      {shape === 'sphere' && <sphereGeometry args={[0.6, 32, 32]} />}
      {shape === 'octahedron' && <octahedronGeometry args={[0.7, 0]} />}
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
        style={{ background: 'transparent', width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, -5]} color={color} intensity={0.5} />
        <CardShape shape={shape} color={color} hovered={hovered} />
      </Canvas>
    </div>
  );
}

