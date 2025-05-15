import { useEffect, useState } from "react";
import { CypherReality } from "../../core/realities/CypherReality";
import { Model } from "../../core/ideas/media/Model";
import { Image } from "../../core/ideas/media/Image";


import Link from "../ideas/Link";
import Title from "../ideas/Title";
import Analytics from "../ideas/Analytics";
import LightSwitch from "./Multiplayer/ideas/LightSwitch";
import { Interactable } from "../../core";
import { Editor } from "../../core/tools/Editor";

export default function StarterTemplate() {

  const [url, setUrl] = useState(
    "*"
  );

  return (
    <CypherReality
      environmentProps={{ dev: process.env.NODE_ENV === "development" }}
    >
      <Analytics />
      
      <group position-z={-2.25}>
        <Title
          position-y={2.00}
          position-z={-0.75}
          image="./cyphlogo.png"
        >
          welcome to Cypherverse
        </Title>

        <Title
          position-y={2.75}
          position-z={1.75}
        >
          Decentral Station
        </Title>

      
        <group position-y={1.8}>
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
            href="https://github.com/CypherVerseLabs"
            position-x={1.5}
            position-z={0.75}
          >
            visit CypherLabs on github
          </Link>
          <Image
        src="https://uploads.codesandbox.io/uploads/user/b3e56831-8b98s-4fee-b941-0e27f39883ab/I9vI-RoNmD7W.png"
        position={[-8, 2, 6.4]}
        rotation={[0, Math.PI, 0]}
        framed
      />
      <Image
        src={url}
        size={3}
        position={[-4.5, 2, 6.4]}
        rotation={[0, Math.PI, 0]}
        framed
      />
      
      <Image
        src="https://d1htv66kutdwsl.cloudfront.net/ff3aff8a-b3f9-4325-a274-d4ba44676bab/7f386117-5837-4d34-926c-f00ffa56c833.ktx2"
        position={[-9.5, 2, 6.4]}
        rotation={[0, Math.PI, 0]}
      />

      <Interactable
  onClick={() => console.log("Ive been clicked!")}
  onHover={() => console.log("Ive been hovered!")}
>
  <LightSwitch position={[0.5, 1, -2.5]} />
      <Model position-x={16.0} position-y={0.25} src="/RingOfLife.glb" />
</Interactable>
< Editor />
      



        </group>
      </group>

      



    </CypherReality>
  );
}
