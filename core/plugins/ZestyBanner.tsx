import React, { Suspense } from 'react';

// Regular import for CypherReality
import { CypherReality } from 'realities/CypherReality';

// Dynamically import ZestyBanner using React.lazy
const ZestyBanner = React.lazy(() => import('ideas/plugins/ZestyBanner'));

export default function DeveloperReality() {
  return (
    <CypherReality>
      {/* Wrap ZestyBanner in Suspense for fallback loading */}
      <Suspense fallback={<div>Loading...</div>}>
        <ZestyBanner />
      </Suspense>
    </CypherReality>
  );
}