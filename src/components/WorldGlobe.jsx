import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Float, Line, OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

const EARTH_TEXTURE_URL = "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg";

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
    const t = (clock.getElapsedTime() * 0.18 + offset) % 1;
    const point = curve.getPointAt(t);
    ref.current.position.copy(point);
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.045, 16, 16]} />
      <meshBasicMaterial color="#A9D4FF" transparent opacity={0.95} />
    </mesh>
  );
}

function GlobeCore() {
  const groupRef = useRef(null);
  const colorMap = useLoader(THREE.TextureLoader, EARTH_TEXTURE_URL);

  const routes = useMemo(() => {
    const india = latLngToVector(destinations[0].lat, destinations[0].lng);
    return destinations.slice(1).map((destination) => {
      const target = latLngToVector(destination.lat, destination.lng);
      const distance = india.distanceTo(target);
      const lift = 1.55 + distance * 0.35;
      const mid = india.clone().add(target).multiplyScalar(0.5).normalize().multiplyScalar(lift);
      const curve = new THREE.CatmullRomCurve3([india, mid, target]);
      return { curve, points: curve.getPoints(100) };
    });
  }, []);

  const markerPositions = useMemo(
    () => destinations.map((d) => latLngToVector(d.lat, d.lng, 1.58)),
    [],
  );

  useFrame(({ pointer }) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y += 0.0045;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, pointer.y * 0.16, 0.04);
    groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, pointer.x * 0.12, 0.04);
  });

  return (
    <group ref={groupRef}>
      <Float rotationIntensity={0.1} speed={1.6}>
        <Sphere args={[1.5, 48, 48]}>
          <meshStandardMaterial map={colorMap} metalness={0.1} roughness={0.7} />
        </Sphere>
        <Sphere args={[1.53, 32, 32]}>
          <meshBasicMaterial color="#2E7BFF" transparent opacity={0.08} side={THREE.BackSide} />
        </Sphere>
        {routes.map((route, index) => (
          <group key={index}>
            <Line color="#A9D4FF" lineWidth={1.4} points={route.points} transparent opacity={0.6} />
            <RoutePulse curve={route.curve} offset={index * 0.3} />
          </group>
        ))}
        {markerPositions.map((position, index) => (
          <mesh key={index} position={position}>
            <sphereGeometry args={[0.06, 16, 16]} />
            <meshBasicMaterial color={index === 0 ? "#A9D4FF" : "#5FA0FF"} />
          </mesh>
        ))}
      </Float>
    </group>
  );
}

export default function WorldGlobe() {
  return (
    <div className="relative aspect-square min-h-[320px] overflow-hidden rounded-[32px] border border-white/10 bg-brand-navy shadow-float">
      <Canvas camera={{ position: [0, 0, 4.3], fov: 44 }}>
        <ambientLight intensity={0.6} />
        <directionalLight color="#ffffff" intensity={1.8} position={[3, 3, 4]} />
        <Suspense fallback={null}>
          <GlobeCore />
        </Suspense>
        <OrbitControls enablePan={false} enableRotate={false} enableZoom={false} />
      </Canvas>
    </div>
  );
}