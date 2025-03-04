import { useState } from 'react';

import { useRerender } from '@_/components/common/RerenderContext/useRerender';
import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import { postFetch } from '@_/fetches/BaseFetches';

export default function MUTestHttpPage() {
  const rerender = useRerender();
  const [message, setMessage] = useState('');

  const [isServerOpened, setIsServerOpened] = useState(true);

  const updateIsServerOpen = async () => {
    const response = await fetch(HTTP_API_END_POINT.testHttp);
    setIsServerOpened(response.ok);
  };
  return (
    <div
      style={{
        backgroundColor: 'red',
        width: '80px',
        height: '50vh',
        overflow: 'hidden',
      }}
    >
      <div>
        <span>현재 서버 상태</span>
        {isServerOpened ? '열림' : '닫힘'}
      </div>
      <button
        onClick={async () => {
          const mockedResponse: ResponseInMocking<MessageResponse> = {
            data: { message: 'Internal Server Error' },
            status: 500,
          };
          await postFetch(HTTP_API_END_POINT.mockTestHttp, {
            body: mockedResponse,
          });

          await updateIsServerOpen();

          alert('서버 닫기 완료');
        }}
      >
        서버 닫기
      </button>

      <label htmlFor="message">
        서버에 입력시킬 value
        <input
          id="message"
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </label>
      <button
        onClick={async () => {
          const mockedResponse: ResponseInMocking<MessageResponse> = {
            data: { message },
            status: 200,
          };
          await postFetch(HTTP_API_END_POINT.mockTestHttp, {
            body: mockedResponse,
          });

          await updateIsServerOpen();

          alert('서버 열기 완료');
        }}
      >
        서버 열기/서버 메세지 업데이트
      </button>

      <button onClick={rerender}>새로고침</button>
    </div>
  );
}
