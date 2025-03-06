import { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';

import APP_END_POINT from '@_/constants/appEndpoint';
import WEBSOCKET_API_END_POINT from '@_/constants/websocketEndpoint';

export default function AppTestWebsocketPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<string[]>([]);
  const [socket] = useState(
    new WebSocket(WEBSOCKET_API_END_POINT.testWebsocket),
  );

  useEffect(() => {
    const handleOpen = () => {
      console.log('open');
      setMessages((prev) => [...prev, 'open']);
    };

    const handleMessage = (e: MessageEvent<string>) => {
      console.log('message');
      setMessages((prev) => [...prev, e.data]);
    };

    const handleClose = () => {
      console.log('close');
      setMessages((prev) => [...prev, 'close']);
    };

    socket.addEventListener('open', handleOpen);
    socket.addEventListener('message', handleMessage);
    socket.addEventListener('close', handleClose);

    return () => {
      socket.removeEventListener('open', handleOpen);
      socket.removeEventListener('message', handleMessage);
      socket.removeEventListener('close', handleClose);
    };
  }, [socket]);
  return (
    <>
      <div style={{ width: '400px', height: '300px' }}>
        {messages.map((c) => (
          <>
            {c}
            <br />
          </>
        ))}
      </div>
      <button onClick={() => socket.send('hi')}>{"메세지('hi') 보내기"}</button>
      <button onClick={() => navigate(APP_END_POINT.main)}>
        메인 페이지 가기
      </button>
    </>
  );
}
