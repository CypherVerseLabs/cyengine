import React from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

const WorldBuilder = () => {
  const { scene } = useThree();

  const addInteractiveObject = (type: string) => {
    let object;
    switch (type) {
      case 'cube':
        object = new THREE.Mesh(
          new THREE.BoxGeometry(1, 1, 1),
          new THREE.MeshStandardMaterial({ color: 'blue' })
        );
        break;
      case 'sphere':
        object = new THREE.Mesh(
          new THREE.SphereGeometry(0.5, 32, 32),
          new THREE.MeshStandardMaterial({ color: 'red' })
        );
        break;
      default:
        return;
    }

    object.position.set(Math.random() * 10 - 5, 0.5, Math.random() * 10 - 5);
    object.userData = { interactive: true }; // Mark as interactive
    scene.add(object);
  };

  return (
    <div>
      <button onClick={() => addInteractiveObject('cube')}>Add Cube</button>
      <button onClick={() => addInteractiveObject('sphere')}>Add Sphere</button>
    </div>
  );
};

export default WorldBuilder;
