import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import Record from './record';

interface keyInterface {
  id: number;
  text: string;
}

interface onAddKeyword {
  id: number;
  text: string;
}
type Props = {
  onAddKeyword: (string: string) => void;
};
// interface SearchProps {
//   onClickSearchBtn: () => void;
// }

const RecentSearch = () => {
  // 로컬 스토리지에 저장한 검색어를 관리할 useState keywords
  const [keywords, setKeywords] = useState<keyInterface[]>([]);
  // ① window 즉, 브라우저가 모두 렌더링된 상태에서 해당 함수를 실행할 수 있도록 작업
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const result = localStorage.getItem('keywords') || '[]';
      setKeywords(JSON.parse(result));
    }
  }, []);

  // ② keywords 객체를 의존하여, 변경될 경우 새롭게 localStroage의 아이템 'keywords'를 세팅한다
  useEffect(() => {
    localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  // 검색어 추가
  const handleAddKeyword = (text: string) => {
    const newKeyword = {
      id: Date.now(),
      text,
    };
    setKeywords([newKeyword, ...keywords]);
  };

  // 단일 검색어 삭제
  const handleRemoveKeyword = (id: number) => {
    const nextKeyword = keywords.filter(keyword => {
      return keyword.id !== id;
    });
    setKeywords(nextKeyword);
  };

  // 검색어 전체 삭제
  const handleClearKeywords = () => {
    setKeywords([]);
  };
  // };
  return (
    <>
      <RecentContainer>
        <Record onAddKeyword={handleAddKeyword} />
        <RecentTitle>최근 검색</RecentTitle>
        {keywords.length ? (
          <RecentRomove type="button" onClick={handleClearKeywords}>
            전체 삭제
          </RecentRomove>
        ) : (
          <RecentNothing>최근 검색어가 없습니다</RecentNothing>
        )}
      </RecentContainer>

      <ul>
        {keywords.length
          ? keywords.map(k => (
              <li key={k.id}>
                <p>{k.text}</p>
                <button
                  className="removeBtn"
                  type="button"
                  onClick={() => handleRemoveKeyword(k.id)}
                >
                  <img src="/images/together/btn_delete.svg" alt="삭제" />
                </button>
              </li>
            ))
          : ''}
      </ul>
    </>
  );
};
const RecentContainer = styled.div`
  width: 90%;
  height: 552px;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  margin-top: 10px;
  margin-left: 20px;
`;

const RecentTitle = styled.div`
  font-size: 18px;
  color: black;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 20px;
`;
const RecentNothing = styled.div`
  font-size: 16px;
  color: black;
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-left: 20px;
`;
const RecentRomove = styled.button`
  font-size: 14px;
  color: #888888;
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  margin-left: 80px;
`;

export default RecentSearch;
