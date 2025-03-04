import { BrowserRouter } from 'react-router-dom';

import RerenderProvider from '@_/components/common/RerenderContext/RerenderProvider';
import AppRouter from '@_/routes//app/AppRouter.tsx';
import MURouter from '@_/routes/mu/MURouter.tsx';

function App() {
  return (
    <>
      <RerenderProvider>
        <BrowserRouter>
          <AppRouter />
          <MURouter />
        </BrowserRouter>
      </RerenderProvider>
    </>
  );
}

export default App;
