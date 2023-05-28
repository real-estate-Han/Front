import { useRouter } from 'next/router';
import { ChangeEvent, useCallback, useState } from 'react';

type Props = {
  onAddKeyword: (string: string) => void;
};

const Record = ({ onAddKeyword }: Props) => {
  // ① props로 전달받은 onAddKeyword의 데이터로 들어갈 state이다
  const [searchValue, setSearchValue] = useState<string>('');

  const router = useRouter();

  const onChangeSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  }, []);

  const onSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      // ② 로컬 스토리지에 해당 searchValue를 저장해야 한다
      // ③ 다이나믹 라우팅을 위해 해당 쿼리를 받을 페이지로 push 해주었다
      router.push(`/together/search_result/${searchValue}`);
      onAddKeyword(searchValue);
      setSearchValue('');
    },
    [searchValue, router, onAddKeyword],
  );

  return (
    <header>
      {/* <form onSubmit={onSubmit}>
        <input type="search" value={searchValue} onChange={onChangeSearch} placeholder="모임 이름 / 소개 / 태그 검색" />
      </form> */}
    </header>
  );
};

export default Record;
