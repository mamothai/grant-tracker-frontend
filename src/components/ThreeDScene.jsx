import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Rotating 3D shape component
function RotatingShape({ position, color, shape = 'box' }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const geometry = shape === 'box' 
    ? <boxGeometry args={[1, 1, 1]} />
    : shape === 'sphere'
    ? <sphereGeometry args={[0.5, 32, 32]} />
    : <octahedronGeometry args={[0.6, 0]} />;

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshStandardMaterial 
          color={color} 
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
    </Float>
  );
}

// Floating particles
function FloatingParticles({ count = 50 }) {
  const particles = useRef();
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count * 3; i++) {
    positions[i] = (Math.random() - 0.5) * 10;
  }

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#06b6d4" transparent opacity={0.6} />
    </points>
  );
}

// Network connections
function NetworkConnections() {
  const linesRef = useRef();
  const points = [
    [-2, 0, 0], [2, 0, 0], [0, 2, 0], [0, -2, 0],
    [-1.5, 1.5, 1], [1.5, 1.5, 1], [-1.5, -1.5, -1], [1.5, -1.5, -1]
  ];

  const connections = [];
  for (let i = 0; i < points.length; i++) {
    for (let j = i + 1; j < points.length; j++) {
      if (Math.random() > 0.7) {
        connections.push([points[i], points[j]]);
      }
    }
  }

  useFrame((state) => {
    if (linesRef.current) {
      linesRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={linesRef}>
      {connections.map(([start, end], idx) => (
        <line key={idx}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={2}
              array={new Float32Array([...start, ...end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#a855f7" transparent opacity={0.3} />
        </line>
      ))}
      {points.map((pos, idx) => (
        <mesh key={idx} position={pos}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.5} />
        </mesh>
      ))}
    </group>
  );
}

// Main 3D Scene Component
export default function ThreeDScene({ 
  style = {}, 
  showParticles = true, 
  showNetwork = true,
  showShapes = true,
  interactive = true 
}) {
  return (
    <div style={{ width: '100%', height: '100%', ...style }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 75 }}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#a855f7" intensity={0.5} />
        
        {showShapes && (
          <>
            <RotatingShape position={[-2, 1, 0]} color="#06b6d4" shape="box" />
            <RotatingShape position={[2, -1, 0]} color="#a855f7" shape="sphere" />
            <RotatingShape position={[0, 2, -1]} color="#ec4899" shape="octahedron" />
          </>
        )}
        
        {showParticles && <FloatingParticles count={30} />}
        {showNetwork && <NetworkConnections />}
        
        {interactive && <OrbitControls enableZoom={false} enablePan={false} />}
      </Canvas>
    </div>
  );
}

