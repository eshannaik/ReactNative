import { View, FlatList, StyleSheet } from 'react-native'
import MealItem from './MealItem'

function MealsList({items}){
    function renderMealItem(itemData){
        const item = itemData.item

        const mealItemProps = {
            id : item.id,
            title : item.title,
            imageUrl : item.imageUrl,
            affordability : item.affordability,
            complexity : item.complexity,
            duration : item.duration,
            gluten : item.isGlutenFree,
            lactose : item.isLactoseFree,
            vegan: item.isVegan,
            vegeterian: item.isVegetaria,
        }
        return <MealItem {...mealItemProps}/>
    }

    return (
        <View style = {styles.container}>
            <FlatList 
                data = {items} // all meals whose id is above 0
                keyExtractor = {(item) => item.id}
                renderItem = {renderMealItem}
            />
        </View>
    )
}

export default MealsList;

const styles = StyleSheet.create({
    container : {
        flex:1,
        padding:16
    }
});