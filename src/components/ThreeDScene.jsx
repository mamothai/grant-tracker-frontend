import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float } from '@react-three/drei';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Simple rotating shape
function RotatingShape({ position, color, shape = 'box' }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {shape === 'box' && <boxGeometry args={[1, 1, 1]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.5, 32, 32]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[0.6, 0]} />}
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
        style={{ background: 'transparent', width: '100%', height: '100%' }}
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
        
        {interactive && <OrbitControls enableZoom={false} enablePan={false} enableDamping dampingFactor={0.05} />}
      </Canvas>
    </div>
  );
}

