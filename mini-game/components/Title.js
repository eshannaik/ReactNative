import { Text, StyleSheet, Dimensions } from 'react-native';

function Title({children}) {
    return(
            <Text style = {styles.title}>
                {children}
            </Text>
    )
}

export default Title;

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create ({
    title: {
        marginTop:deviceWidth < 410 ? 10:60,
        fontSize:24,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor:'white',
        padding:15,
        // maxHeight: '80%',
        // height: 65,
    },
})