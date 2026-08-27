import RecipeDetail from "@/Component/UI/RecipeDetail";
import { getRecipeById } from "@/lib/api/recipes";


const RecipeDetailPage = async ({ params }) => {
    const { id } = await params;
    const recipe = await getRecipeById(id);

    return (
        <div>
            <RecipeDetail recipe={recipe}></RecipeDetail>
        </div>
    );
};

export default RecipeDetailPage;