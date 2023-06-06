import Layout from 'ui/Base/Layout';
import * as Ingredients from 'ui/Ingredients';


const IndexIngredients = () => {
  return (
    <Layout>
      <Ingredients.Show.Table ingredients={Ingredients.model.MockUp} />
    </Layout>
  );
}

export default IndexIngredients; 