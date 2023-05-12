import { useQuery } from '@apollo/client';
import PostItem from '@components/PostItem';
import styled from '@emotion/styled';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import { postType } from '@utils/type';
// 추후 업데이트 예정
export default function Detail() {
  const { data: clusterData, error } = useQuery(GET_CLUSTER_DATA);
  return (
    <div>
      <div>어드민페이지</div>
      <PostList>
        {clusterData?.allpost?.posts?.map((p: postType) => {
          return <PostItem widthPercent={50} key={p.itemUniqueID} postData={p} />;
        })}
      </PostList>
    </div>
  );
}

const PostList = styled.div`
  background-color: red;
  width: 50%;
  min-width: 500px;
  min-height: 400px;
  transition: 0.5s;
  @media (min-width: 1200px) {
    min-width: 600px;
    min-height: 600px;
  }
`;
