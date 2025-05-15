import dynamic from "next/dynamic";

const Decentral_Station = dynamic(import("../worlds/Decentral_Station"), { ssr: false });

export default function Index() {
  return <Decentral_Station />;
}
