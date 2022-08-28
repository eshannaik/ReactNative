import { View, Text, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: '#CDC50A',
        padding: 24,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    numberText: {
        color:'#CDC50A',
        fontSize:28,
        fontWeight: 'bold',
    }
})