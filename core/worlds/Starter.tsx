import { Fog } from "../ideas/environment/Fog";
import { Background } from "../ideas/environment/Background";
import { ParcelFloor } from "../ideas/mediated/ParcelFloor";

export function StarterWorld() {
  return (
    <group name="starter-world">
      
      <Fog color="white" near={0.1} far={15} />
      <directionalLight position-y={1} intensity={1.8} />
      <ambientLight intensity={1} />
      <Background color="white" />
      <ParcelFloor />
    </group>
  );
}
