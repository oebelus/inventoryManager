import { Product } from "../types/product"
import { User } from "../types/User"

type AppState = {
    user: User | string,
    products: Product[]
}

console.log(localStorage.getItem('user'))

const user = localStorage.getItem('user')
? JSON.parse(localStorage.getItem('user')!)
: "null"

export const initialState: AppState = {
    user: user ? user as User : "null",
    products: []
}

export type Action = 
    | { type: 'USER_SIGNIN'; payload: User }
    | { type: 'USER_SIGNOUT' }
    | { type: 'ADD_ITEM', payload: Product }
    | { type: 'FETCH_ITEMS', payload: Product[] }
    | { type: 'DELETE_ITEM', payload: string }

export function reducer(state: AppState, action: Action): AppState {
    switch (action.type) {
        case 'USER_SIGNIN': 
            return { ...state, user: action.payload };
        case 'USER_SIGNOUT': 
            return { ...state }
        case 'ADD_ITEM':
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case 'FETCH_ITEMS':
            return { ...state, products: action.payload }
        case 'DELETE_ITEM':
            return { 
                ...state, 
                products: state.products.filter(product => product.id != action.payload)     
            }
        default:
            return state
    }
}