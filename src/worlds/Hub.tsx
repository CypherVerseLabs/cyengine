import { Image } from "../../core/ideas/media/Image";
import Link from "../ideas/Link";
import Title from "../ideas/Title";
import Analytics from "../ideas/Analytics";
import { CypherWorld } from "../../core/worlds/CypherWorld";
import { CypherReality } from "../../core/realities/CypherReality";

export default function Hub() {
  return (
    <CypherReality
      environmentProps={{ dev: process.env.NODE_ENV === "development" }}
    >
      <Analytics />
      <CypherWorld />
      <group position-z={-2.25}>
        <Title position-y={1.2} position-z={-0.75} image="./cyphlogo.png">
          Welcome to Cyengine
        </Title>
        <group position-y={0.8}>
          <Link href="/multiplayer" position-x={-1.5} position-z={0.75}>
            visit multiplayer page
          </Link>
          <Link href="/media" position-x={-1}>
            visit Marketplace
          </Link>
          <Link href="/workshop" position-x={1}>
            visit Workshop
          </Link>
          <Link
            href="https://github.com/CypherVerseLabs/cyengine"
            position-x={1.5}
            position-z={0.75}
          >
            visit github
          </Link>
        </group>
      </group>
    </CypherReality>
  );
}
