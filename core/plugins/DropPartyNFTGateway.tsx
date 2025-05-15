import React, { Suspense, lazy } from "react";

// Dynamically import the components using React.lazy
import { CypherReality } from 'realities/CypherReality';
const Idea = lazy(() => import("ideas/DropPartyNFTGateway"));

export default function DeveloperReality() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CypherReality>
        <Idea />
      </CypherReality>
    </Suspense>
  );
}