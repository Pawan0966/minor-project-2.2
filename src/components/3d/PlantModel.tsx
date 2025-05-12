import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  OrbitControls, 
  useGLTF, 
  Environment, 
  PresentationControls,
  Float,
  Stars,
  Html,
  ContactShadows,
  useProgress,
  Center
} from '@react-three/drei';
import { Leaf, Loader } from 'lucide-react';
import { motion } from 'framer-motion';

interface PlantModelProps {
  modelUrl: string;
  name: string;
}

function Loader3D() {
  const { progress } = useProgress();
  return (
    <Html center>
      <div className="flex flex-col items-center">
        <Loader className="h-8 w-8 text-primary-600 animate-spin mb-2" />
        <p className="text-primary-600 font-medium">{progress.toFixed(0)}% loaded</p>
      </div>
    </Html>
  );
}

function Model({ modelUrl }: { modelUrl: string }) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF(modelUrl);
  const [hovered, setHovered] = useState(false);
  
  useFrame((state) => {
    if (modelRef.current && !hovered) {
      modelRef.current.rotation.y += 0.002;
    }
    // Add subtle floating animation
    if (modelRef.current) {
      modelRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.1;
    }
  });
  
  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={0.5}
      floatingRange={[-0.1, 0.1]}
    >
      <primitive 
        ref={modelRef} 
        object={scene} 
        scale={1.5} 
        position={[0, -1, 0]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      />
    </Float>
  );
}

const PlantModel: React.FC<PlantModelProps> = ({ modelUrl, name }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <motion.div 
      layout
      className={`relative transition-all duration-300 ease-in-out ${
        isFullscreen 
          ? 'fixed inset-0 z-50 bg-black/90 p-4' 
          : 'w-full aspect-square md:aspect-[4/3] lg:aspect-[16/9] bg-gray-100 rounded-xl overflow-hidden shadow-inner'
      }`}
    >
      {modelUrl ? (
        <>
          <Canvas 
            camera={{ 
              position: [0, 0, 8], 
              fov: 40,
              near: 0.1,
              far: 1000
            }}
            shadows
          >
            <color attach="background" args={['#f8fafc']} />
            <ambientLight intensity={0.7} />
            <spotLight 
              position={[10, 10, 10]} 
              angle={0.15} 
              penumbra={1} 
              intensity={0.8}
              castShadow
            />
            <spotLight position={[-10, -10, -10]} intensity={0.3} />
            
            <Suspense fallback={<Loader3D />}>
              <Center>
                <PresentationControls
                  global
                  snap
                  rotation={[0, 0.3, 0]}
                  polar={[-Math.PI / 4, Math.PI / 4]}
                  azimuth={[-Math.PI / 4, Math.PI / 4]}
                >
                  <Model modelUrl={modelUrl} />
                </PresentationControls>
              </Center>
              <ContactShadows 
                opacity={0.5}
                scale={10}
                blur={1}
                far={10}
                resolution={256}
                color="#000000"
              />
              <Environment preset="city" />
              <Stars 
                radius={100} 
                depth={50} 
                count={1000} 
                factor={4} 
                saturation={0}
                fade
                speed={1}
              />
            </Suspense>
            <OrbitControls
              autoRotate
              autoRotateSpeed={1}
              enablePan={false}
              enableZoom={true}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
            />
          </Canvas>
          
          <motion.button
            onClick={handleFullscreen}
            className="absolute bottom-3 right-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs text-gray-700 font-medium hover:bg-white/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFullscreen ? 'Exit Fullscreen' : 'View Fullscreen'}
          </motion.button>
        </>
      ) : (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50"
        >
          <motion.div
            animate={{ 
              rotate: 360,
              transition: { duration: 20, repeat: Infinity, ease: "linear" }
            }}
          >
            <Leaf className="h-20 w-20 text-primary-200 mb-4" />
          </motion.div>
          <p className="text-gray-400 text-center px-4">
            3D model for <span className="font-medium">{name}</span> is not available
          </p>
        </motion.div>
      )}
      
      <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-xs text-gray-700"
        >
          <span className="font-medium">Controls:</span>
          <ul className="mt-1 space-y-1">
            <li>🖱️ Left click + drag to rotate</li>
            <li>🖱️ Scroll to zoom</li>
            <li>👆 Double click to reset view</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PlantModel;