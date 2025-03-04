import { Route, Routes } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import MainLayout from '@_/routes/app/layout';
import AppMainPage from '@_/routes/app/page';
import AppTestHttpPage from '@_/routes/app/test/http/page';
import AppTestWebsocketPage from '@_/routes/app/test/websocket/page';

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path={APP_END_POINT.main} element={<AppMainPage />} />
        <Route path={APP_END_POINT.testHTTP} element={<AppTestHttpPage />} />
        <Route
          path={APP_END_POINT.testWebSocket}
          element={<AppTestWebsocketPage />}
        />
      </Routes>
    </MainLayout>
  );
}
