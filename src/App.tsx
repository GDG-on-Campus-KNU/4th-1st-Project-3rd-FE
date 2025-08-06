import { BrowserRouter } from 'react-router-dom';

import RerenderProvider from '@_/components/common/RerenderContext/RerenderProvider';
import AppRouter from '@_/routes//app/AppRouter.tsx';
import MURouter from '@_/routes/mu/MURouter.tsx';

import TanstackQueryProvider from './providers/TanstackQueryProvider';

function App() {
  return (
    <>
      <TanstackQueryProvider>
        <RerenderProvider>
          <BrowserRouter>
            <AppRouter />
            {import.meta.env.VITE_MSW && <MURouter />}
          </BrowserRouter>
        </RerenderProvider>
      </TanstackQueryProvider>
    </>
  );
}

export default App;
