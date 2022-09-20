import { View, Text, StyleSheet, Dimensions } from 'react-native';

function NumberContainer ({children}) {
    return (
        <View style={styles.container}>
            <Text style= {styles.numberText}>
                {children}
            </Text>
        </View>
    )
}

export default NumberContainer;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: '#CDC50A',
        padding: deviceWidth < 400 ? 12:24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    numberText: {
        color:'#CDC50A',
        fontSize: deviceWidth < 400 ? 22:28,
        fontWeight: 'bold',
    }
})