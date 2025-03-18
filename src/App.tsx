import { BrowserRouter } from 'react-router-dom';

import RerenderProvider from '@_/components/common/RerenderContext/RerenderProvider';
import AppRouter from '@_/routes//app/AppRouter.tsx';
import MURouter from '@_/routes/mu/MURouter.tsx';

import NetworkErrorBoundary from './fetches/NetworkErrorBoundary';

function App() {
  return (
    <>
      <RerenderProvider>
        <BrowserRouter>
          <NetworkErrorBoundary>
            <AppRouter />
            {import.meta.env.VITE_MSW && <MURouter />}
          </NetworkErrorBoundary>
        </BrowserRouter>
      </RerenderProvider>
    </>
  );
}

export default App;
