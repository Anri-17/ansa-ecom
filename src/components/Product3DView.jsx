import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Product3DView({ product }) {
  const mountRef = useRef(null)

  useEffect(() => {
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    const renderer = new THREE.WebGLRenderer({ alpha: true })
    renderer.setSize(300, 300)
    mountRef.current.appendChild(renderer.domElement)

    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const textureLoader = new THREE.TextureLoader()
    const texture = textureLoader.load(product.image)
    const material = new THREE.MeshBasicMaterial({ map: texture })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

    camera.position.z = 5

    const animate = () => {
      requestAnimationFrame(animate)
      cube.rotation.x += 0.01
      cube.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    animate()

    return () => {
      mountRef.current.removeChild(renderer.domElement)
    }
  }, [product.image])

  return <div ref={mountRef} />
}
