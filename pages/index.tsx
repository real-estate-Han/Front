import styled from '@emotion/styled';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import { initializeApollo } from '@utils/apollo/apolloclient';
import MobileHomeContent from '@components/Mobile/Home/MobileHomeContent';
import PCviewContent from '@components/PCview/Home/PCview';

export async function getStaticProps() {
  const apolloClient = initializeApollo();

  await apolloClient.query({
    query: GET_CLUSTER_DATA,
  });

  return {
    props: {
      initialApolloState: apolloClient.cache.extract(),
    },
  };
}

const Home = () => {
  return (
    <Warp>
      <MobileHomeContent />
      <PCviewContent />
    </Warp>
  );
};
export default Home;
const Warp = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  /* background-color: ${({ theme }) => theme.mainColor.blue200}; */
`;
