import React from 'react';

function BusinessIntelligence() {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <iframe
        src="http://127.0.0.1:8000/dash/"
        style={{ height: '100%', width: '100%', border: 'none' }}
        title="Business Intelligence Dashboard"
      />
    </div>
  );
}

export default BusinessIntelligence;
