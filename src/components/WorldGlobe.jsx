import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const destinations = [
  { name: "India", lat: 20.5937, lng: 78.9629 },
  { name: "Dubai", lat: 25.2048, lng: 55.2708 },
  { name: "Europe", lat: 50.1109, lng: 8.6821 },
  { name: "Australia", lat: -33.8688, lng: 151.2093 },
];

function latLngToVector(lat, lng, radius = 1.55) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;

  return new THREE.Vector3(
    -radius * Math.sin(phi) * Math.cos(theta),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta),
  );
}

function RoutePulse({ curve, offset }) {
  const ref = useRef(null);

  useFrame(({ clock }) => {
    const t = (clock.getElapsedTime() * 0.12 + offset) % 1;
    const point = curve.getPointAt(t);
    ref.current.position.copy(point);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 20, 20]} />
      <meshBasicMaterial color="#8EC5FF" transparent opacity={0.95} />
    </mesh>
  );
}

function GlobeCore() {
  const groupRef = useRef(null);

  const routes = useMemo(() => {
    const india = latLngToVector(destinations[0].lat, destinations[0].lng);
    return destinations.slice(1).map((destination, index) => {
      const target = latLngToVector(destination.lat, destination.lng);
      const mid = india.clone().add(target).multiplyScalar(0.5).normalize().multiplyScalar(2.3 + index * 0.08);
      const curve = new THREE.CatmullRomCurve3([india, mid, target]);
      return { curve, points: curve.getPoints(80) };
    });
  }, []);

  const markerPositions = useMemo(
    () => destinations.map((destination) => latLngToVector(destination.lat, destination.lng, 1.58)),
    [],
  );

  useFrame(({ pointer }) => {
    if (!groupRef.current) {
      return;
    }

    groupRef.current.rotation.y += 0.0012;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.16, 0.04);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, pointer.x * 0.12, 0.04);
  });

  return (
    <group ref={groupRef}>
      <Float rotationIntensity={0.1} speed={1.6}>
        <Sphere args={[1.5, 48, 48]}>
          <meshStandardMaterial color="#08152D" emissive="#0c2d6f" emissiveIntensity={0.45} metalness={0.18} roughness={0.55} />
        </Sphere>
        <Sphere args={[1.515, 48, 48]}>
          <meshBasicMaterial color="#2E7BFF" transparent opacity={0.08} wireframe />
        </Sphere>
        {routes.map((route, index) => (
          <group key={index}>
            <Line color="#8EC5FF" lineWidth={1.8} points={route.points} transparent opacity={0.9} />
            <RoutePulse curve={route.curve} offset={index * 0.22} />
          </group>
        ))}
        {markerPositions.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.06, 20, 20]} />
            <meshBasicMaterial color={index === 0 ? "#8EC5FF" : "#2E7BFF"} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function WorldGlobe() {
  return (
    <div className="relative aspect-square min-h-[320px] overflow-hidden rounded-[32px] border border-white/10 bg-brand-navy shadow-float">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(46,123,255,0.25),transparent_34%)]" />
      <div className="absolute inset-0 map-watermark opacity-70" />
      <svg className="pointer-events-none absolute inset-0 h-full w-full opacity-30" viewBox="0 0 100 100">
        <path className="flight-path" d="M6 72 C 22 34, 44 28, 64 42 S 92 54, 96 18" fill="none" stroke="rgba(142,197,255,0.85)" />
        <path className="flight-path" d="M8 48 C 24 54, 34 60, 46 44 S 70 16, 90 22" fill="none" stroke="rgba(46,123,255,0.65)" />
      </svg>
      <Canvas camera={{ position: [0, 0, 4.3], fov: 44 }}>
        <ambientLight intensity={0.8} />
        <directionalLight color="#8EC5FF" intensity={2.2} position={[3, 3, 4]} />
        <Suspense fallback={null}>
          <GlobeCore />
        </Suspense>
        <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}
