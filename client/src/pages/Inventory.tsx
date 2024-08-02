import { useEffect, useReducer, useState } from "react"
import { initialState, reducer } from "../utils/store"
import axios from "axios"
import { User } from "../types/User"
import { getError } from "../utils/api"
import { ApiError } from "../types/ApiError"
import AddItem from "../components/inventory/AddItem"
import Items from "../components/inventory/Items"
import { Product } from "../types/product"

export default function Inventory() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const user = state.user as User

    const [add, setAdd] = useState<boolean>(false)

    const [items, setItems] = useState<Product[]>([])

    useEffect(() => {
        axios.get(`http://localhost:8080/api/item/${user.id}`)
            .then((response) => {
                console.log(response.data)
                setItems(response.data)
                dispatch({type: 'FETCH_ITEMS', payload: response.data})
            })
            .catch((err) => getError(err as ApiError))
    }, [add])

    const closeAdd = () => {
        setAdd(false)
    }

    const handleAdd = () => {
        setAdd(prev => !prev)
    }

    return (
        <div className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <h1 className="text-3xl font-bold mb-4">Inventory</h1>
        
        <h2 className="text-2xl mb-2">Your Items:</h2>
        <button className="p-4 flex gap-4" onClick={handleAdd}>
            <span className="material-symbols-outlined">
                add_circle
            </span>
            <span>Add an Item</span>
        </button>
        {<AddItem add={add} closeAdd={closeAdd} />}
        <Items items={items}/>
        </div>
    )
}
