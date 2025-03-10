import { Route, Routes } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import MainLayout from '@_/routes/app/layout';
import AppMainPage from '@_/routes/app/page';

import AppChatMbtiPage from './chat/mbti/[mbti]/ChatMbtiPage';

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path={APP_END_POINT.main} element={<AppMainPage />} />
        <Route
          path={APP_END_POINT.chatMbtiWithSegment}
          element={<AppChatMbtiPage />}
        />
        {/* <Route path={APP_END_POINT.testHTTP} element={<AppTestHttpPage />} />
        <Route
          path={APP_END_POINT.testWebSocket}
          element={<AppTestWebsocketPage />}
        /> */}
      </Routes>
    </MainLayout>
  );
}
