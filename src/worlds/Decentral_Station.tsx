import React, { useState, useEffect } from "react";
import { CypherWorld } from "../../core/worlds/CypherWorld";
import { CypherReality } from "../../core/realities/CypherReality";
import { Model } from "../../core/ideas/media/Model";
import { Image } from "../../core/ideas/media/Image";
import Link from "../ideas/Link";
import Title from "../ideas/Title";
import Analytics from "../ideas/Analytics";
import Jump from "../../core/tools/Jump/Jump";
import { Fog } from "../../core/ideas/environment/Fog";
import { Rain } from "../../core/ideas/environment/Rain";
import { Cloud, Sky } from "@react-three/drei";
import { Button, Interactable } from "../../core/ideas";


import { Camera } from "../../core";

export default function Decentral_Station() {
  const [url, setUrl] = useState<string>("*");

  // Example of dynamically updating the URL based on some effect
  useEffect(() => { 
    const fetchDynamicUrl = async () => {
      try {
        // Simulate a URL fetch from some API
        const response = await fetch("https://api.example.com/dynamic-url");
        const data = await response.json();
        setUrl(data?.imageUrl || "*"); // Assuming the URL is in the `imageUrl` field
      } catch (error) {
        console.error("Failed to fetch dynamic URL", error);
      }
    };

    fetchDynamicUrl();
  }, []); // Empty dependency array ensures this only runs once on mount

  return (
    <CypherReality environmentProps={{ dev: process.env.NODE_ENV === "development" }}>
      <Analytics />
      <CypherWorld />
      < Sky sunPosition={[0,2,0]}/>
      <Fog color="white" near={10} far={100} />
      < Rain color={"blueviolet"} />
      <Cloud position-y ={25} segments={40} bounds={[20, 2, 2]} volume={10} color="lightblue" />

      <Jump />
      
      

      
      
      <Model position-x={16.0} position-y={0.25} src="../sector_01.2.glb" />

      <group position-z={-2.25}>
        <Title position-y={2.00} position-z={-0.75} image="./cyphlogo.png">
          welcome to Cypherverse
        </Title>

        <Interactable
          onClick={() => console.log("Ive been clicked!")}
        >
          <Title position-y={2.75} position-z={1.75}>
          Decentral Station
          </Title>
        </Interactable> 

        

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
          <Link href="https://github.com/CypherVerseLabs" position-x={1.5} position-z={0.75}>
            visit CypherLabs on github
          </Link>

          <Button
            onClick={() => console.log("Ive been clicked!")}
            fontSize={0.1} // font size, default 0.05
            maxWidth={1} // max width, default no max width
            textColor="white" // text color, default black
            color="blue" // button color, default white
            outline={false} // whether to show an outline, default true
            outlineColor="#9f9f9f" // outline color, default white
              >
              Click me if you want to servive
          </Button>

          <Image
            src="https://uploads.codesandbox.io/uploads/user/b3e56831-8b98s-4fee-b941-0e27f39883ab/I9vI-RoNmD7W.png"
            position={[-8, 2, 6.4]}
            rotation={[0, Math.PI, 0]}
            framed
          />
          <Image
            src={url} // Dynamically updated URL
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
           
        </group>
      </group>
    </CypherReality>
  );
}
