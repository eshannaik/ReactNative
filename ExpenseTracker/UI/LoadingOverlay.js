import { View, StyleSheet, ActivityIndicator} from 'react-native';
import { GlobalStyles } from '../constants/style';

function LoadingOverlay () {
    return (
            <View style={styles.Container}>
                <ActivityIndicator size="large" color="white"/>
            </View>
    )
}

export default LoadingOverlay;

const styles = StyleSheet.create({
    Container : {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        color: GlobalStyles.colors.primary700
    },
})