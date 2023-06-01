import Layout from 'ui/Base/Layout';
import * as Recipes from 'ui/Recipes';


const IndexRecipes = () => {
  return (
    <Layout>
      <Recipes.Show.Table recipesList={Recipes.model.MockUp}/>
    </Layout>
  );
}

export default IndexRecipes; 