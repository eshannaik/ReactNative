import { StyleSheet, Text, Image, View } from "react-native";

function Top(){
    return(
        <View style={styles.inputContainer}>
            <Image style={styles.image} source={require('../assets/icon.png')}/>
            <Text style={styles.text}>Goals App</Text>
        </View>
    );
}

export default Top;

const styles = StyleSheet.create({
    text:{
        textAlign: 'center',
        marginBottom:25,
        marginTop:10,
        fontSize: 18,
        color: 'white',
    },
    image: {
        width:50,
        height:50,
        marginLeft:160,
        marginTop:10 
    },
    inputContainer: {
        flexDirection:'column',
        justifyContent: 'space-between',
        paddingBottom: 20,
    },
})