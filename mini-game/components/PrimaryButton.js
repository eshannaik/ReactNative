import { StyleSheet, Text, View, Pressable } from "react-native"

function PrimaryButton ({children, onPress}) {
    return (
        <View>
            <Pressable onPress={onPress}>
                <Text style = {styles.button}>
                    {children}
                </Text>
            </Pressable>
        </View>
        
    )
}

export default PrimaryButton;

const styles = StyleSheet.create ({
    button: {
        borderWidth: 1,
        borderRadius: 15,
        padding: 10,
        elevation: 10,
        backgroundColor: '#800000',
        textAlign: 'center',
    }
})
