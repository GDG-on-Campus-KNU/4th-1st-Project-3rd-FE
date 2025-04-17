import { Route, Routes } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import AppAddChatPage from './chatting-list/add-chat/page';
import AppChatMbtiPage from './chat/mbti/[mbti]/ChatMbtiPage';
import AppChattingListPage from './chatting-list/AppChattingListPage';
import AppMainPage from '@_/routes/app/page';
import AppRegisterPage from './register/AppRegisterPage';
import AppRegisterSuccessPage from './register/success/AppRegisterSuccessPage';
import LoginPage from './login/LoginPage';
import MainLayout from '@_/routes/app/layout';

export default function AppRouter() {
  return (
    <MainLayout>
      <Routes>
        <Route path={APP_END_POINT.main} element={<AppMainPage />} />
        <Route
          path={APP_END_POINT.chatMbtiWithSegment}
          element={<AppChatMbtiPage />}
        />
        <Route path={APP_END_POINT.login} element={<LoginPage />} />
        <Route path={APP_END_POINT.register} element={<AppRegisterPage />} />
        <Route
          path={APP_END_POINT.registerSuccess}
          element={<AppRegisterSuccessPage />}
        />
        <Route
          path={APP_END_POINT.chattingList}
          element={<AppChattingListPage />}
        />
        <Route
          path={APP_END_POINT.chattingListAdd}
          element={<AppAddChatPage />}
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
