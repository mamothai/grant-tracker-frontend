import { Canvas } from '@react-three/fiber';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

// Simple floating shapes
function FloatingShapes() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
      groupRef.current.children.forEach((child, i) => {
        if (child.position) {
          child.position.y = Math.sin(state.clock.elapsedTime + i) * 0.5;
        }
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
        <FloatingShapes />
      </Canvas>
    </div>
  );
}

