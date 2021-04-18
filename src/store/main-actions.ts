import { SET_ITEMS } from './types';

export const setItems = (items:Array<object>) => ({type: SET_ITEMS, payload:items });

