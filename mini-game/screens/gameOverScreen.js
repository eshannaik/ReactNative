import { View, Text, StyleSheet, Image, Dimensions, useWindowDimensions } from 'react-native';
import PrimaryButton from '../components/PrimaryButton';

function GameOver ({onPress,userNumber,count}) {
    const {width,height} = useWindowDimensions();
    let size=0;

    if(width < height){
        size = 350
    }else{
        size = 100
    }

    let marginTop ={
        marginTop:size,
    }
    return(
        <View style ={[styles.inputContainer,marginTop]}>
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

// const deviceWidth = Dimensions.get('window').width;
// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create ( {
    inputContainer: {
        // marginTop: deviceWidth < deviceHeight ? 350:100,
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