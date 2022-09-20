import { useContext } from 'react';
import {StyleSheet, Text, View, Image } from 'react-native';
import MealsList from '../components/MealList';
import { FavoritesContext } from '../store/context/FavoritesContext';
import { MEALS } from '../data/dummy-data.js';
import { useSelector } from 'react-redux';

function FavoritesScreen (){
    // const favoriteMealCtx = useContext(FavoritesContext);
    const favoriteMealIds = useSelector(state => state.favoriteMeals.ids);

    const favoriteMeals = MEALS.filter((meal) => 
        favoriteMealIds.ids.includes(meal.id)
    )

    if (favoriteMeals.length === 0){
        return (
            <View style = {styles.rootContainer}>
                <Text style = {styles.text}>
                    You have no favorite meals yet
                </Text>
            </View>
        )
    }
    return(
        <MealsList items = {favoriteMeals} />
    )
}

export default FavoritesScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    }
})