import React, { useState } from 'react';

import HTTP_API_END_POINT from '@_/constants/httpApiEndpoint';
import styles from './page.module.css';

export default function MuChatMbtiPage() {
  const [inputText, setInputText] = useState('');
  const mbti = window.location.pathname
    .split('/')
    .at(-1)
    ?.toUpperCase() as Mbti;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //async -> 비동기적, await 사용 가능
    e.preventDefault(); //기본 동작 방지 매서드           //매개변수 e, <HTMLFormElement> 타입임. HTML의 form 요소에서 발생

    // 서버에 POST 요청 보내기
    try {
      const response = await fetch(HTTP_API_END_POINT.mockMbtiChat(mbti), {
        method: 'POST', // await -> fetch 함수가 응답할 때까지 기다림
        headers: {
          'Content-Type': 'application/json', //요청 본문 타입이 json임
        },
        body: JSON.stringify({ content: inputText }), // 자바스트립트를 json 문자열로 환
      });
      const data = await response.json();
      console.log('전송 응답:', data);
      setInputText(''); // 입력창 초기화
    } catch (error) {
      console.error('Fetch 에러입니다', error);
    }
  };

  const handleRefresh = () => {
    //초기화 함수
    setInputText(''); // 입력창 내용만 초기화함
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>AI REPLY SERVICE</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <textarea
          className={styles.textarea}
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="메시지를 입력하세요"
        />

        <div className={styles.buttonsContainer}>
          <button className={styles.submitButton} type="submit">
            전송
          </button>
          <button
            className={styles.refreshButton}
            type="button"
            onClick={handleRefresh}
          >
            새로고침
          </button>
        </div>
      </form>
    </div>
  );
}
