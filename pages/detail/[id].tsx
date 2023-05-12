import { useRouter } from 'next/router';

const DetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  return (
    <div>
      <h1>DetailPage</h1>
    </div>
  );
};

export default DetailPage;
