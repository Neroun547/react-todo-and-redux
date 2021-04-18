import { SET_ITEMS } from './types';

interface IState {
    items:Array<{
        id: number
        text: string,
        check:boolean
        }>
}

const initialState:IState = {
    items:[]
}

export default function reposReducer(state = initialState, action:any) {
    switch (action.type) {
        case SET_ITEMS:
            return {
                items:action.payload
            }
        default:
            return state
    }
}