import { useRouter } from 'next/router';
import Layout from 'ui/Base/Layout';
import * as Ingredients from 'ui/Ingredients';


const IndexIngredients = () => {
  const router = useRouter()
  const { pid } = router.query
  return (
    <Layout>
      <Ingredients.Show.Table />
    </Layout>
  );
}

export default IndexIngredients; 