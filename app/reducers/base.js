import { handleActions } from 'redux-actions'

const initialState = {
  count: 0
}

export default handleActions({
    ACTION: {
        next (state, action) {
            return {
                ...state,
                count: state.count + 1
            }
        },
        throw (state, action) {
            return {
                ...state
            }
        }
    },
    default: (state, action) => {
        return {
            ...state
        }
    }
}, initialState)
