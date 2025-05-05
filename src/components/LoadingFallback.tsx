import { FC } from 'react';

const LoadingFallback: FC = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-white"></div>
    <span className="ml-4 text-xl">Loading...</span>
  </div>
);

export default LoadingFallback; 