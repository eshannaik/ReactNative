import {FlatList, StyleSheet} from 'react-native';

import {CATEGORIES} from '../data/dummy-data';

import CategoryGridTile from '../components/CategoryGridTile.js';

function CategoryScreen ({navigation}){

    function renderCategoryItem(itemData){
        function pressHandler (){
            navigation.navigate('MealsOverview',{
                categoryId: itemData.item.id
            });
        }
    
        return (
            <CategoryGridTile 
                title={itemData.item.title} 
                color={itemData.item.color}
                onPress={pressHandler}
            />
        )
    }

    return(
        <FlatList
        data = {CATEGORIES}
        keyExtractor = {(item) => item.id} // getting keys for items
        renderItem = {renderCategoryItem} // rendering the items
        numColumns={2} // in two columns
        />
    )
}

export default CategoryScreen;

const styles = StyleSheet.create({

});