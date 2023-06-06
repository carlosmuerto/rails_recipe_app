import { useRouter } from 'next/router';
import Layout from 'ui/Base/Layout';
import * as Recipes from 'ui/Recipes';


const IndexRecipes = () => {
  const router = useRouter();
  const { id } = router.query;
  const stringId = Array.isArray(id) ? id[0] : id?.toString();

  return (
    <Layout>
      <Recipes.Show.Details id={stringId} />
    </Layout>
  );
};

export default IndexRecipes; 