import { useRouter } from 'next/router';
import Layout from 'ui/Base/Layout';
import * as Recipes from 'ui/Recipes';


const IndexRecipes = () => {
  const router = useRouter()
  const { id } = router.query
  const recipe = Recipes.model.MockUp.find(recipe => recipe.id === Number(id))
  if (recipe  === undefined) {
    return null
  }
  return (
    <Layout>
        <Recipes.Show.Details { ...recipe } />
    </Layout>
  );
}

export default IndexRecipes; 