import React, { Suspense } from 'react';

// Regular import for CypherReality
import { CypherReality } from 'realities/CypherReality';

// Dynamically import ZestyBanner using React.lazy
const EaselyBuyButton = React.lazy(() => import('ideas/plugins/EaselyBuyButton'));

export default function DeveloperReality() {
  return (
    <CypherReality>
      {/* Wrap ZestyBanner in Suspense for fallback loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <EaselyBuyButton />
      </Suspense>
    </CypherReality>
  );
}