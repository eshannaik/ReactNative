import { View, StyleSheet } from 'react-native';
import ExpenseList from './ExpenseList';
import ExpensesSummary from './ExpensesSummary';

import { GlobalStyles } from '../constants/style';

const DUMMY_EXPENSES = [
    {
        id: 'e1',
        description: 'A pair of shoes',
        amount: 24.99,
        date: new Date('2021-05-02')
    },
    {
        id: 'e2',
        description: 'A pair of socks',
        amount: 4.99,
        date: new Date('2021-07-03')
    },
    {
        id: 'e3',
        description: 'A book',
        amount: 44.99,
        date: new Date('2022-02-14')
    },
    {
        id: 'e4',
        description: 'A phone',
        amount: 140.99,
        date: new Date('2022-06-19')
    },
]

function ExpenseOutput ({expenses, expensesPeriod}) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
            <ExpenseList expenses={expenses}/>
        </View>
    )
}

export default ExpenseOutput;

const styles = StyleSheet.create({
    container: {
        flex:1,
        paddingHorizontal: 24,
        paddingTop: 24,
        paddingBottom: 0,
        backgroundColor: GlobalStyles.colors.primary700,
    },
});