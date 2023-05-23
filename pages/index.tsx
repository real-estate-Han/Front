import styled from '@emotion/styled';
import { GET_CLUSTER_DATA } from '@utils/apollo/gqls';
import { initializeApollo } from '@utils/apollo/apolloclient';
import MobileHomeContent from '@components/Mobile/Home/MobileHomeContent';

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

  & section:nth-of-type(1) {
    /* border: 1px solid blue; */
    box-sizing: border-box;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
  & section:nth-of-type(2) {
    /* border: 1px solid green; */
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
  }
`;
