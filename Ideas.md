basis/

VisualIdea - Visualizes an Idea
<VisualIdea idea={new Idea()} />

VisualSite - Visualizes a Site
<VisualSite idea={new Site()} />


VisualWorld - Visualizes a World
<VisualWorld idea={new World()} />


environment/

Background - Sets the background color of the space
<Background color="blue" />

Fog - Adds fog to the scene
<Fog color="white" near={10} far={100} />

InfinitePlane - Adds an infinite plane to walk on
<InfinitePlane
  height={-0.0001}
  size={[100, 100]}
  visible={false}
/>


media/

Audio - Positional audio component for media playback
<Audio
  url="https://link-to-your-audio.mp3"
  position={[0, 4, 0]}
  volume={1}
  rollOff={1}
  dCone={new Vector3(coneInnerAngle, coneOuterAngle, coneOuterGain)}
  fftSize={128}
/>

HDRI - Sets the background to an HDRI image
<HDRI
  src="https://link-to-your-hdri.hdr"
  disableBackground={false}
  disableEnvironment={false}
/>

Image - Adds an image to the scene
<Image
  src="https://link-to-your-image.png"
  size={1}
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

Model - Adds a GLTF/GLB model to the scene
<Model
  src="https://link-to-your-model.glb"
  center
  normalize
/>

Video - Adds a video file with positional audio
<Video
  src="https://link-to-your-video.mp4"
  size={1}
  volume={1}
  muted
  framed
/>



mediated/

Frame - Builds a frame around media (especially images)
<Frame
  width={1}
  height={1}
  thickness={0.1}
  material={new MeshBasicMaterial({ color: "red" })}
  innerFrameMaterial={new MeshBasicMaterial({ color: "blue" })}
/>

LostFloor - Creates an infinite floor effect
<LostFloor />


modifiers/

Collidable - Adds collision detection to objects
<Collidable
  triLimit={1000}
  enabled={true}
  hideCollisionMeshes={false}
/>

Interactable - Makes objects react to clicks and hover actions
<Interactable
  onClick={() => console.log("Ive been clicked!")}
  onHovered={() => console.log("Ive been hovered!")}
  onUnHovered={() => console.log("Ive been unhovered?")}
>
  <Stuff />
</Interactable>

Tool - Turns objects into interactive tools
<Tool
  name="My Tool"
  pos={[0, 0]}
  face={true}
  pinY={false}
  range={0}
  orderIndex={0}
  onSwitch={(enabled: boolean) => {}}
>
  <Stuff />
</Tool>

Anchor - Links objects to external URLs or actions
<Anchor
  href="https://link-to-your-website.com"
  target="_blank"
>
  <Stuff />
</Anchor>

FacePlayer - Makes objects always face the player
<FacePlayer enabled={true} lockX={false} lockY={false} lockZ={false} />

Floating - Adds a floating animation to objects
<Floating height={0.2} speed={1} />

LookAtPlayer - Makes objects face the player with easing
<LookAtPlayer enabled={true} />

Spinning - Makes objects spin along specified axes
<Spinning xSpeed={0} ySpeed={1} zSpeed={0} />

VisualEffect - Adds post-processing effects to the environment
<VisualEffect index={1}>
  <unrealBloomPass args={[new Vector2(256, 256), 0.1, 0.01, 0.95]} />
</VisualEffect>


ui/

TextInput - A text input component (mimicking HTML input)
<TextInput
  type="text"
  value={text}
  onChange={setText}
  onSubmit={(s: string) => console.log(s)}
  font="https://link-to-your-font.ttf"
  fontSize={0.1}
  width={1}
  placeholder="Enter your name"
/>

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

Arrow - A simple arrow icon
<Arrow dark={false} />

Button - A clickable button component
<Button
  onClick={() => console.log("Ive been clicked!")}
  font="https://link-to-your-font.ttf"
  fontSize={0.1}
  maxWidth={1}
  textColor="red"
  color="green"
  outline={false}
  outlineColor="#9f9f9f"
>
  Click me!
</Button>

Key - A virtual keyboard key component
<Key
  keyCode="a"
  keyPress={["a, A"]}
  onPressed={(evt) => console.log("Ive been pressed!")}
/>

Switch - A boolean switch component
<Switch value={value} onChange={setValue} />

<Switch position={[1, -0.3, 0]} onChange={(b) => console.log(b)} />

Link -
<Link href="/multiplayer" position-x={-1.5} position-z={0.75}>
            visit multiplayer page
</Link>

Title - Adds Title
<Title position-y={2.00}
position-z={-0.75}
image="./cyphlogo.png">

welcome to Cypherverse
</Title>

Model - add model to scene

<Model position-x={16.0}
position-y={0.25}
src="../sector_01.2.glb"
/>

Test -
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

Dialog -
<Dialogue
position={[0, 1, 5]}
dialogue={[{ key: "init", text: "hello world" }]}
/>