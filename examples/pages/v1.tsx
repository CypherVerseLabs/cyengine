import dynamic from "next/dynamic";

const V1 = dynamic(import("../worlds/V1"), { ssr: false });

export default function Index() {
  return <V1 />;
}
