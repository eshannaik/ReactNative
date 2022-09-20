import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { Provider } from 'react-redux';

import CategoryScreen from './screens/CategoryScreen';
import MealsOverviewScreen from './screens/MealsOverviewScreen';
import MealDetailsScreen from './screens/MealDetailsScreen';
import FavoritesScreen from './screens/FavoritesScreen';

import CATEGORIES from './data/dummy-data';
import { MEALS } from './data/dummy-data';
// import FavoritesContextProvider from './store/context/FavoritesContext';
import {store} from './store/redux/store';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return(
    <Drawer.Navigator 
        screenOptions = {{
          headerStyle: { backgroundColor: '#351401'},
          headerTintColor: 'white',
          sceneContainerStyle: { backgroundColor: '#3f2f25'}, // background color behind the items
          drawerContentStyle: { backgroundColor: '#351401'},
          drawerInactiveTintColor: 'white',
          drawerActiveTintColor: '#351401',
          drawerActiveBackgroundColor: '#e4baa1'
        }}
      >
      <Drawer.Screen name="Categories" component = { CategoryScreen } options = {{
        title: 'All Categories',
        drawerIcon: ({ color, size }) => (
          <Ionicons name="star" color={color} size={size} />
          )
        }} 
      />

      <Drawer.Screen name="favorites" component = { FavoritesScreen } options = {{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="star" color={color} size={size} />
        )
      }} />
    </Drawer.Navigator>
  )
}

export default function App() {
  return (
    <>
      <StatusBar style='light'/>

      {/* Navigation */}
      {/* <FavoritesContextProvider> */}
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{
            headerStyle: { backgroundColor: '#351401'},
            headerTintColor: 'white',
            contentStyle: {backgroundColor: '#3f2f25'}
          }}>

            <Stack.Screen name="MealsCategories" component={DrawerNavigation} 
              options = {{
                // title: 'All Categories',
                headerShown: false
              }}/>

            <Stack.Screen name="MealsOverview" component={MealsOverviewScreen} 
              options = {( {route}) => {
                const catId = route.params.categoryId;
                const categoryTitle = CATEGORIES.find((category) => category.id === catId).title;
                return {
                  title: categoryTitle,
                };
              }}
            />

            <Stack.Screen name="MealDetail" component={MealDetailsScreen} 
              options = {( {route}) => {
                const mId = route.params.mealId;
                const mealTitle = MEALS.find((meal) => meal.id === mId).title;
                return {
                  title: mealTitle,
                };
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
      {/* </FavoritesContextProvider> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
