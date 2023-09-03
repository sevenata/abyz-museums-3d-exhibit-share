import { useState, useMemo, useTransition } from 'react'
import { useControls } from 'leva'
import { Canvas, useLoader } from '@react-three/fiber'
import { AccumulativeShadows, RandomizedLight, Center, Environment, OrbitControls } from '@react-three/drei'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export default function App() {
  return (
    <Canvas shadows camera={{ position: [100, 0, 4.5], fov: 50 }}>
      <group position={[0, -1, 0]}>
        <Sphere />
        <AccumulativeShadows temporal frames={200} color="purple" colorBlend={0.5} opacity={1} scale={10} alphaTest={0.85}>
          <RandomizedLight amount={8} radius={5} ambient={0.5} position={[5, 3, 2]} bias={0.001} />
        </AccumulativeShadows>
      </group>
      <Env />
      <OrbitControls
        autoRotate
        maxDistance={5}
        minDistance={2}
        autoRotateSpeed={0.25}
        enablePan={false}
        enableZoom={true}
        minPolarAngle={Math.PI / 2.1}
        maxPolarAngle={Math.PI / 2.1}
      />
    </Canvas>
  )
}

function Sphere() {
  const gltf = useLoader(GLTFLoader, 'https://nestjs-mobile-gateway-service.vercel.app/api/museums/1/exhibits/2/model/38115623-4654-4d4f-84bf-05f451eebc7f.glb')

  gltf.scene.children.forEach((mesh, i) => {
    mesh.castShadow = true
  })
  gltf.castShadow = true
  gltf.scene.castShadow = true

  return (
    <Center top>
      <mesh castShadow>
        <primitive scale={[0.1, 0.1, 0.1]} object={gltf.scene} />
        <meshStandardMaterial metalness={1} roughness={1} />
      </mesh>
    </Center>
  )
}

function Env() {
  const [preset, setPreset] = useState('sunset')
  return <Environment preset={preset} background blur={1} />
}
