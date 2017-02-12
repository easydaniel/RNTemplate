import { handleActions } from 'redux-actions'
import { ActionConst } from 'react-native-router-flux'

const initialState = {
  scene: {}
}

export default handleActions({
    [ActionConst.FOCUS]: {
        next (state, action) {
            return {
                ...state,
                scene: action.scene
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
