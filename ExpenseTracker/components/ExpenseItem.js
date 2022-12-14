import { View, Text, Pressable, StyleSheet } from 'react-native';
import { GlobalStyles } from '../constants/style';
import { getFormattedDate } from '../util/date';
import { useNavigation } from '@react-navigation/native';

function ExpenseItem ({id,description,date,amount}) {
    const navigation = useNavigation();

    function expensePressHandler(){
        navigation.navigate('ManageExpense',{
            expenseId: id
        })
    }
    // console.log(amount[1])

    return (
        <Pressable  
            onPress={expensePressHandler}
            style = {({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.expenseItem}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {description}
                    </Text>
                    <Text style={styles.textBase}>
                        {getFormattedDate(date)}
                    </Text>
                </View>
            
                <View style={styles.amountContainer}>
                    <Text style={styles.amount}>
                        {amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    )
}

export default ExpenseItem;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.75,
        overflow: 'hidden',
    },
    expenseItem: {
        padding:12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
    },
    textBase: {
        color:GlobalStyles.colors.priamry50,
    },
    description: {
        fonstSize:16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
        minWidth: 80
    },
    amount: {
        color: GlobalStyles.colors.primary500,
        fontWeight: 'bold',
    }
})