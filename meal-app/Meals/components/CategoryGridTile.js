import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

function CategoryGridTile ({title,color, onPress}){
    return(
        <View style = {[styles.gridItem, {backgroundColor: color }]}>
            {/* adding a ripple effect to the grid items on pressing */}
            <Pressable 
                android_ripple={{color: '#ccc'}} 
                style = {({ pressed }) => [
                    styles.button,
                    pressed ? styles.buttonPressed : null,
                ]}
                onPress={onPress}
            > 
                <View style = {styles.innderContainer}>
                    <Text style = {styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default CategoryGridTile;

const styles = StyleSheet.create({
    gridItem : {
        flex: 1,
        marginTop: 30,
        margin: 16,
        height: 150,
        borderRadius: 15,
        elevation: 15,
        overflow: Platform.OS === 'android' ? 'hidden':'visible'  // hide overflow in android but not in IOS
    },
    button : {
        flex: 1
    },
    buttonPressed : {
        opacity: 0.5
    },
    innderContainer : {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18
    }
})