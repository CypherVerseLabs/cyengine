import { LostWorld, StandardReality, Image } from "cyengine";
import Link from "../ideas/Link";
import Title from "../ideas/Title";
import Analytics from "../ideas/Analytics";

export default function Hub() {
  return (
    <StandardReality
      environmentProps={{ dev: process.env.NODE_ENV === "development" }}
    >
      <Analytics />
      <LostWorld />
      <group position-z={-2.25}>
        <Title position-y={1.2} position-z={-0.75} image="/favicon-32x32.ico">
          welcome to cyengine
        </Title>
        <group position-y={0.8}>
          <Link href="/multiplayer" position-x={-1.5} position-z={0.75}>
            visit multiplayer page
          </Link>
          <Link href="/media" position-x={-1}>
            visit media page
          </Link>
          <Link href="/workshop" position-x={1}>
            visit workshop page
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
    </StandardReality>
  );
}
