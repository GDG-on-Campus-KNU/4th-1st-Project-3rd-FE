import { useNavigate } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';

export default function AppMainPage() {
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', margin: '30%' }}>
      <button
        onClick={() => navigate(APP_END_POINT.testHTTP)}
        style={{ margin: '0 20px', width: 100, height: 100 }}
      >
        http
      </button>
      <button
        onClick={() => navigate(APP_END_POINT.testWebSocket)}
        style={{ margin: '0 20px', width: 100, height: 100 }}
      >
        websocket
      </button>
    </div>
  );
}
