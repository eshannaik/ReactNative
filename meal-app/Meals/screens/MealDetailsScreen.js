import { useContext, useLayoutEffect } from 'react';
import { Platform, StyleSheet, Text, ScrollView, View, Image } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { MEALS } from '../data/dummy-data';
import { addFavorite, removeFavorite } from '../store/redux/favorites';
// import FavoritesContextProvider, { FavoritesContext } from '../store/context/FavoritesContext';

function MealDetailsScreen ({color,route}){
    // const favoriteMealCtx = useContext(FavoritesContext);
    const favoriteMealIds = useSelector ((state) => state.favoriteMeals.ids);
    const dispatch = useDispatch(); // run the reducer functions

    const mealId = route.params.mealId

    const selectedMeal = MEALS.find((meal) => meal.id === mealId);

    const mealIsFavorite = favoriteMealIds.ids.includes(mealId)

    function headerButtonPressHandler(){
        if(mealIsFavorite){
            dispatch(removeFavorite({id: mealId}));
            // favoriteMealCtx.removeFavorite(mealIds);
        }else{
            dispatch(addFavorite({id: mealId}));
            // favoriteMealCtx.addFavorite(mealIds);
        }
    }

    useLayoutEffect(() =>{
        navigation.setOptions({
            headerRight: () => {
                return(
                    <IconButton
                        icon={mealIsFavorite ? "star" : "star-outline"}
                        color="white"
                        onPress={headerButtonPressHandler}
                    />
                )
            }
        })
    }, [navigation, headerButtonPressHandler]);

    return(
        <ScrollView style = {[styles.rootContainer , {backgroundColor: color }]}>
            <Image source = {{ uri: selectedMeal.imageUrl }} style={styles.image}/>
                <View style = {styles.innderContainer}>

                    <View style = {styles.detail}>
                        <Text style = { styles.detail }>{selectedMeal.duration}mins</Text>
                        <Text style = { styles.detail }>{selectedMeal.affordability.toUpperCase()}</Text>
                        <Text style = { styles.detail }>{selectedMeal.complexity.toUpperCase()}</Text>
                    </View>

                    <View style={styles.OuterlistContainer}>
                        <View style={styles.listContainer}>
                            <Text style = {styles.title}> INGREDIENTS : </Text>
                                {selectedMeal.ingredients.map(ingredients => <Text key={ingredients} style={styles.text}>{'\u2022'}{ingredients}</Text>)}
                            <Text style = {styles.title} > STEPS : </Text>
                                {selectedMeal.steps.map(steps => <Text key={steps} style={styles.text}>{'\u2022'}{steps}</Text>)}
                        </View>
                    </View>

                    {/* <Text style = {styles.title}>Gluten Free : {selectedMeal.isGlutenFree}</Text>
                    <Text style = {styles.title}>Lactose Free :{selectedMeal.isLactoseFree}</Text>
                    <Text style = {styles.title}>Vegan :{selectedMeal.isVegan}</Text>
                    <Text style = {styles.title}>Vegetarian :{selectedMeal.isVegetaria}</Text> */}
                </View>
        </ScrollView>
    )
}

export default MealDetailsScreen;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom:32,
    },
    innderContainer : {
        flex: 1,
        padding: 10,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        padding: 5,
        marginLeft: 5,
        color: '#e2b497',
        borderBottomWidth:2,
        borderBottomColor: '#e2b497',
    },
    text: {
        marginLeft:40,
        padding:5,
        color: '#e29997',
    },
    image: {
        height: 275,
        width: '100%'
    },
    detail: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 8,
        justifyContent: 'center',
        color: 'white',
        fontSize: 16,
    },
    OuterlistContainer:{
        alignItems: 'center',
    },
    listContainer: {
        width: '80%',
    }
})