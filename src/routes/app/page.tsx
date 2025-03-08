import { Navigate } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';

export default function AppMainPage() {
  return <Navigate to={APP_END_POINT.chatMbti('ISFJ')} />;
}
