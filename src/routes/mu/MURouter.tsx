import { Route, Routes } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import MUMainLayout from '@_/routes/mu/layout';
import MUMainPage from '@_/routes/mu/page';

import MuChatMbtiPage from './chat/mbti/[mbti]/page';
import MURegisterPage from './register/MURegisterPage';

export default function MURouter() {
  return (
    <MUMainLayout>
      <Routes>
        <Route path={APP_END_POINT.main} element={<MUMainPage />} />
        <Route
          path={APP_END_POINT.chatMbtiWithSegment}
          element={<MuChatMbtiPage />}
        />
        <Route path={APP_END_POINT.register} element={<MURegisterPage />} />
      </Routes>
    </MUMainLayout>
  );
}
