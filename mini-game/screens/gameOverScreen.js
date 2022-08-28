import { View, Text, StyleSheet, Image } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

function GameOver ({onPress,userNumber,count}) {
    return(
        <View style ={styles.inputContainer}>
        {/* <View> */}
            <Text style ={styles.textInput}>
                Game Over!
            </Text>
            {/* <View style={styles.imageContainer}>
                <Image source={require('../assets/GO.jpg')} />
            </View> */}

            <View>
                <Text style={styles.summaryText}>
                    Your phone needed <Text style={styles.highlight}>{count}</Text> rounds to guess the number {''}
                    <Text style={styles.highlight}>{userNumber}</Text>
                </Text>
            </View>

            <PrimaryButton onPress={onPress}>Play Again!</PrimaryButton>
        </View>
    )
}

export default GameOver;

const styles = StyleSheet.create ( {
    inputContainer: {
        marginTop: 350,
        marginHorizontal: 15,
        padding: 10,
        backgroundColor: '#610000',
        borderRadius:10,
    },
    textInput: {
        height: 50,
        fontSize: 25,
        color: '#CDC50A',
        marginVertical: 8,
        fontWeight: 'bold',
        margin: 56,
        textAlign: 'center',
    },
    // imageContainer:{
    //     width:400,
    //     height:400,
    //     borderRadius:200,
    //     borderWidth:3,
    //     borderColor:'grey',
    //     overflow:'hidden',
    //     margin:35,
    // },
    summaryText: {
        color: "#CDC50A",
        fontSize: 18,
        textAlign: 'center'
    },
    highlight: {
        color: "white",
        fontWeight: 'bold',
    }
})