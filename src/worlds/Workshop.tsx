import { useEffect, useState } from "react";
import Title from "../ideas/Title";
import Link from "../ideas/Link";
import Analytics from "../ideas/Analytics";
import Bloom from "../ideas/Bloom";
import PreloadImage from "../ideas/PreloadImage";

import { CypherWorld, } from "../../core/worlds/CypherWorld";
import { CypherReality } from "../../core/realities/CypherReality";
import { Model } from "../../core/ideas/media/Model"
import { Image } from "../../core/ideas/media/Image";
import { Interactable } from "../../core/ideas/modifiers/Interactable";
import { Video } from "../../core/ideas/media/Video";
import { TextInput } from "../../core/ideas/ui/TextInput";
import { Switch } from "../../core/ideas/ui/Switch";
import { VisualWorld } from "../../core/ideas/basis/VisualWorld";
import { Dialogue } from "../../core/ideas/ui/Dialogue";
import { Camera } from "../../core/tools/Camera";


export default function Workshop() {
  const [value, setValue] = useState("hello world");

  useEffect(() => {
    if (value === "rand") {
      setValue(Math.random().toString());
    }
  }, [value]);

  const [url, setUrl] = useState(
    "https://dwvo2npct47gg.cloudfront.net/gallery/bladi/IMG_8334.jpg"
  );

  const [size, setSize] = useState(1);

  useEffect(() => {
    setTimeout(
      () =>
        setUrl(
          "https://muse-worlds.s3.us-west-1.amazonaws.com/1d7d3517-d168-4654-8bf8-466bf3369874/assets/bd4a336a-ad58-477b-89b7-1b764a058390/1d7d3517-d168-4654-8bf8-466bf3369874_assets_8c1a0efe-699d-4549-9347-76e307e42066_94a48aaf-6cd1-4c37-a0cc-fc70ee955a76_assets_86616231-19ec-4281-9122-14f12909166b_Screen%2BShot%2B2021-07-13%2Bat%2B5.49.37%2BPM.png"
        ),
      5000
    );
  }, []);

  const [hovering, setHovering] = useState(false);

  return (
    <CypherReality
      environmentProps={{ dev: process.env.NODE_ENV === "development" }}
      playerProps={{ flying: true }}
    >
      <Image
        src="https://uploads.codesandbox.io/uploads/user/b3e56831-8b98s-4fee-b941-0e27f39883ab/I9vI-RoNmD7W.png"
        position={[-8, 2, 6.4]}
        rotation={[0, Math.PI, 0]}
        framed
      />
      <Analytics />
      <CypherWorld />
      <group position-z={-2} position-x={-1}>
        <Title position-y={1.2}>welcome to the workshop</Title>
        <Link href="/" position-y={0.8}>
          back to the hub
        </Link>
      </group>
      <group position-x={-6} position-z={-3}>
        <Dialogue
          position={[0, 1, 5]}
          dialogue={[{ key: "init", text: "hello world" }]}
        />
        <mesh position-y={0.5}>
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshNormalMaterial />
        </mesh>
        <Interactable
          onHover={() => setHovering(true)}
          onUnHover={() => setHovering(false)}
          onClick={() => setSize(Math.random() + 1)}
        >
          <mesh position={[2, 0.5, 0]}>
            <boxBufferGeometry args={[size, size * 0.25, size * 0.1]} />
            <meshStandardMaterial color={hovering ? "red" : "blue"} />
          </mesh>
        </Interactable>
      </group>
      <Image
        src={url}
        size={3}
        position={[-4.5, 2, 6.4]}
        rotation={[0, Math.PI, 0]}
        framed
      />
      <VisualWorld position-x={5} scale={0.5} position-y={0.45} />
      <Image
        src="https://d1htv66kutdwsl.cloudfront.net/ff3aff8a-b3f9-4325-a274-d4ba44676bab/7f386117-5837-4d34-926c-f00ffa56c833.ktx2"
        position={[-9.5, 2, 6.4]}
        rotation={[0, Math.PI, 0]}
      />
      <group position={[1, 0.9, -5.5]}>
        <TextInput
          placeholder="First Name"
          font="https://d27rt3a60hh1lx.cloudfront.net/fonts/custom-branding/FridgeChisel-Regular_lowerUppercase.otf"
          fontSize={0.1}
          width={1}
          value={value}
          onChange={setValue}
          onBlur={() => console.log("blur!")}
          onFocus={() => console.log("focus!")}
        />
        <TextInput
          position-x={1.1}
          type="password"
          placeholder="password"
          fontSize={0.1}
          width={1}
        />
        <TextInput
          position-x={2.2}
          placeholder="email"
          fontSize={0.1}
          width={1}
        />
        <TextInput
          position-x={3.3}
          type="number"
          placeholder="number"
          fontSize={0.175}
          onChange={(s) => console.log(s)}
          width={1}
        />
        <Switch position={[1, -0.3, 0]} onChange={(b) => console.log(b)} />
      </group>
      <PreloadImage />
      <Video
        src="https://dwvo2npct47gg.cloudfront.net/videos/AWGEDVD-final.mp4"
        size={4}
        position={[0, 2.425, 3.076]}
        rotation={[0, -Math.PI, 0]}
        muted
      />
      <Camera />
      
      
      
      <Bloom />
    </CypherReality>
  );
}
