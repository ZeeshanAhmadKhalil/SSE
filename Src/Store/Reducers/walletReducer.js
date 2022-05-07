import {
    ADD_DEPOSIT_REQUEST,
    CHANGE_DEPOSIT_REQUESTS,
    CHANGE_TRANSACTIONS,
    CHANGE_BALANCE,
} from '../Actions/types'

const initialState = {
    transactions: [],
    depositRequests: [],
    balance: 0,
}

export default (state = initialState, { type, payload }) => {
    // console.log('TYPE::')
    // console.log(type)
    // console.log('PAYLOAD::')
    // console.log(payload)
    switch (type) {
        case CHANGE_BALANCE:
            return {
                ...state,
                balance: payload.data
            }
        case CHANGE_TRANSACTIONS:
            return {
                ...state,
                transactions: payload
            }
        case CHANGE_DEPOSIT_REQUESTS:
            return {
                ...state,
                depositRequests: payload
            }
        case ADD_DEPOSIT_REQUEST:
            const { accountNumber, accountTitle, amount, bankName, createdOn } = payload
            return {
                ...state,
                depositRequests: [
                    {
                        accountNumber,
                        accountTitle,
                        amount,
                        bankName,
                        depositRequestStatus: { depositRequestStatus: "Accepted" }, //todo: to include admin write Pending
                        createdOn,
                    }
                ].concat(state.depositRequests)
            }
        default:
            return state;
    }
}