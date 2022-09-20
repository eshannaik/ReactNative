import { MEALS } from '../data/dummy-data';
import MealsList from '../components/MealList';

function MealsOverviewScreen({ route }){
    const catId = route.params.categoryId;

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    return <MealsList items={displayedMeals} />
};

export default MealsOverviewScreen;

