import IDataList from "../model/IDataList"
import IIndividualData from "../model/IIndividualData";

// Persons array on which report will be made
export const persons = [
    'Rahul',
    'Ramesh'
]

// Individuals data seggregated from all expenses
export const getIndividualAmountPaid = (expenses: IDataList[]) => {
    const individualsData = { "Total": 0, } as IIndividualData;
    persons.forEach(person => {
        individualsData[person] = 0;
    })
    expenses.forEach(expense => {
        individualsData["Total"] = individualsData["Total"] + expense['price'];
        individualsData[expense['payeeName']] = (individualsData[expense['payeeName']] || 0) + expense['price'];
    })
    return individualsData;
}

// Get settlement data from individuals data
export const getSettlementPayee = (individualAmounts: IIndividualData) => {
    let personPaidMore = "Rahul";
    persons.forEach(person => {
        if(individualAmounts[person] > (individualAmounts[personPaidMore] || 0)) {
            personPaidMore = person;
        }
    })
    const personPaidLess = persons.find(x => x !== personPaidMore) as string;
    if(individualAmounts[personPaidLess] === individualAmounts[personPaidMore]) {
        return { payor: 'No one', payee: '', amount: (individualAmounts[personPaidMore] || 0) - (individualAmounts[personPaidLess] || 0) }
    } else {
        return { payor: personPaidLess, payee: personPaidMore, amount: (individualAmounts[personPaidMore] || 0) - (individualAmounts[personPaidLess] || 0) }
    }
}