import dynamic from "next/dynamic";

const StarterTemplate = dynamic(import("../worlds/StarterTemplate"), { ssr: false });

export default function Index() {
  return <StarterTemplate />;
}
