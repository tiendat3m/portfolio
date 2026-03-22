import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, Sphere } from "@react-three/drei";

function FloatingSphere({ mousePosition }) {
    const meshRef = useRef();
    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
        }
    });
    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
            <Sphere ref={meshRef} args={[1, 100, 200]} scale={2}>
                <MeshDistortMaterial color="#6366f1" distort={0.4} speed={2} roughness={0.2} metalness={0.8} />
            </Sphere>
        </Float>
    );
}

function Particles({ count = 500 }) {
    const points = useRef();
    const particlesPosition = useMemo(() => {
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return positions;
    }, [count]);
    useFrame((state) => {
        if (points.current) {
            points.current.rotation.x = state.clock.elapsedTime * 0.05;
            points.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });
    return (
        <points ref={points}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={particlesPosition} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#8b5cf6" transparent opacity={0.8} sizeAttenuation />
        </points>
    );
}

function HeroScene({ mousePosition }) {
    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }} className="absolute inset-0" gl={{ antialias: true, alpha: true }}>
            <color attach="background" args={["#020617"]} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <pointLight position={[-10, -10, -5]} color="#6366f1" intensity={2} />
            <pointLight position={[10, -10, 5]} color="#ec4899" intensity={2} />
            <FloatingSphere mousePosition={mousePosition} />
            <Particles count={800} />
            <Environment preset="night" />
        </Canvas>
    );
}

export default HeroScene;
