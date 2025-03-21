import { Route, Routes } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import MUMainLayout from '@_/routes/mu/layout';
import MUMainPage from '@_/routes/mu/page';

import MuChatMbtiPage from './chat/mbti/[mbti]/page';
import MULoginPage from './login/LoginPage';

export default function MURouter() {
  return (
    <MUMainLayout>
      <Routes>
        <Route path={APP_END_POINT.main} element={<MUMainPage />} />
        <Route
          path={APP_END_POINT.chatMbtiWithSegment}
          element={<MuChatMbtiPage />}
        />
        <Route path={APP_END_POINT.login} element={<MULoginPage />} />
        <Route path={APP_END_POINT.register} element={<MULoginPage />} />
        {/* <Route path={APP_END_POINT.testHTTP} element={<MUTestHttpPage />} />
        <Route
          path={APP_END_POINT.testWebSocket}
          element={<MUTestWebsocketPage />}
        /> */}
      </Routes>
    </MUMainLayout>
  );
}
