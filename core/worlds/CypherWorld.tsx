
import { Background } from "../ideas/environment/Background";
import { CypherFloor } from "../ideas/mediated/CypheFloor";

export function CypherWorld() {
  return (
    <group name="cypher-world">
      
      <directionalLight position-y={1} intensity={1.8} />
      <ambientLight intensity={1} />
      <Background color="white" />
      <CypherFloor />
    </group>
  );
}
