import React, { useState } from 'react';

export default function MuChatMbtiPage() {
  const [inputText, setInputText] = useState('');
  const [serverActive, setServerActive] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

const handleServer =async (e:React.MouseEvent<HTMLButtonElement>) => {
  e.preventDefault();
  try { 
    const action = serverActive ? 'stop' : 'start';
    const response = await fetch(`https://tesdasfdfjasdlkfjslkfjt.com/mock/chat/mbti/isfj/${action}`, {
        method: 'POST'
      });
      const data = await response.json();
      console.log(`${action} 서버 응답:`, data);
      setServerActive(!serverActive);  // 서버 상태 토글
    } catch (error) {
      console.error('서버 제어 에러:', error);
    }
  };


  const handleSubmit = async (e : React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!serverActive) {
      const message = "서버가 현재 비활성화 상태입니다.";
      console.error(message);
      setErrorMessage(message); // 오류 메시지 상태 설정
      return;
    }
      setErrorMessage(''); // 오류 메시지 초기화

     // 서버에 POST 요청 보내기
     try {
      const response = await fetch('https://tesdasfdfjasdlkfjslkfjt.com/mock/chat/mbti/isfj', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: inputText })
      });
      const data = await response.json();
      console.log('전송 응답:', data);
      setInputText(""); // 입력창 초기화
    } catch (error) {
      console.error('Fetch 에러입니다', error);
      setErrorMessage('메시지 전송에 실패하였습니다.'); // 오류 메시지 설정
    }
  };

  return (
    <div style={{ 
      width: '250px', 
      height: '400px', 
      backgroundColor: '#E7CBCB',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <h1 style={{
        fontSize: '24px',
        textAlign: 'center',
        marginTop: '10px'
      }}>Server</h1>

      {errorMessage && <p style={{ color: 'red', textAlign: 'center' }}>{errorMessage}</p>}


      <form onSubmit={handleSubmit}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요"
          style={{ 
            margin: '20px auto',
            height: '80px',
            width: '200px',
            display: 'block'
          }}
        />
        <button type="submit">전송</button>
      </form>
      <button onClick={handleServer}>
        {serverActive ? '서버 닫기' : '서버 열기'}
      </button>
    </div>
  );
}
