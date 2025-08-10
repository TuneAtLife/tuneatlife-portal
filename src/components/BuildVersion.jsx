import React from 'react';

const BuildVersion = () => {
  // Get build information from environment variables or build time
  const buildInfo = {
    version: import.meta.env.VITE_APP_VERSION || '1.0.0',
    buildTime: import.meta.env.VITE_BUILD_TIME || new Date().toISOString(),
    gitCommit: import.meta.env.VITE_GIT_COMMIT || 'unknown',
    environment: import.meta.env.MODE || 'development'
  };

  return (
    <div className="fixed bottom-2 right-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-50 hover:opacity-100 transition-opacity">
      <div className="flex flex-col space-y-1">
        <div>v{buildInfo.version}</div>
        <div className="text-gray-300">
          {buildInfo.environment}
        </div>
        {buildInfo.gitCommit !== 'unknown' && (
          <div className="text-gray-400 font-mono">
            {buildInfo.gitCommit.substring(0, 7)}
          </div>
        )}
      </div>
    </div>
  );
};

export default BuildVersion;

