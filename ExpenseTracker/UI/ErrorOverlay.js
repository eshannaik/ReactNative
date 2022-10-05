import { View, StyleSheet, Text} from 'react-native';
import { GlobalStyles } from '../constants/style';
import Button from './Button';

function ErrorOverlay ({ message, onConfirm}) {
    return (
            <View style={styles.Container}>
                <Text style={[styles.text,styles.title]}> An error occured! </Text>
                <Text style = {styles.text}> {message} </Text>
                <Button onpress={onConfirm}> Okay </Button>
            </View>
    )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    Container : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        color: GlobalStyles.colors.primary700
    },
    text: {
        color:'whtie',
        marginBottom: 8,
        textAlign: 'center'
    },
    title: {
        fonstSize: 20,
        fontWeight: 'bold'
    }
})