import { CypherWorld, } from "../../core/worlds/CypherWorld";
import { CypherReality } from "../../core/realities/CypherReality";
import { Model } from "../../core/ideas/media/Model"
import { Image } from "../../core/ideas/media/Image";
import { Button } from "../../core/ideas/ui/Button";
import Link from "../ideas/Link";
import Title from "../ideas/Title";
import Test from "../ideas/Text";
import { useState } from "react";
import Analytics from "../ideas/Analytics";



export default function Media() {
  const MODELS = [
    "https://d27rt3a60hh1lx.cloudfront.net/content/on-air-light/light_and_mic_01.glb.br",
    "https://d27rt3a60hh1lx.cloudfront.net/models/spotLight-1642615872/spotLight_2.glb.gz",
    "https://d1htv66kutdwsl.cloudfront.net/ae483f1d-77dc-4402-963d-b4105cd6c944/334823a4-b069-45fb-92e8-c88c2b55ba4a.glb",
  ];

  const [ind, setInd] = useState(0);

  const next = () => setInd((ind + 1) % MODELS.length);

  const MODEL_URL = MODELS[ind];

  return (
    <CypherReality>
      <Analytics />
      <CypherWorld />
      <Title position-z={-1.5} position-y={1.2}>
        welcome to the media world
      </Title>
      <Link href="/" position-z={-1.5} position-y={0.8}>
        back to the hub
      </Link>

      <group position-z={-5}>
        <Button onClick={next} position={[0.5, 0.5, 0]}>
          next model
        </Button>
        <Test name="basic model" position-x={1.2}>
          <Model src={MODEL_URL} />
        </Test>
        <Test name="center model" position-x={1.2 * 2}>
          <Model center src={MODEL_URL} />
        </Test>
        <Test name="normalize model" position-x={1.2 * 3}>
          <Model normalize src={MODEL_URL} />
        </Test>
        <Test name="normalize and center model" position-x={1.2 * 4}>
          <Model normalize center src={MODEL_URL} />
        </Test>
      </group>
      <group position-z={-5}>
        <Test name="fallback model (wireframe)" position-x={-1.2}>
          <Model normalize center src="sdjkfnoi" />
        </Test>
        <Test name="fallback image" position-x={-1.2 * 2}>
          <Image src="/sdjkfnoi" />
        </Test>
      </group>
    </CypherReality>
  );
}
