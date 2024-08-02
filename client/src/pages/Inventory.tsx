import { useEffect, useReducer, useState } from "react"
import { initialState, reducer } from "../utils/store"
import { Product } from "../types/product"
import axios from "axios"
import { User } from "../types/User"
import { getError } from "../utils/api"
import { ApiError } from "../types/ApiError"
import AddItem from "../components/inventory/AddItem"
import EditItem from "../components/inventory/EditItem"

export default function Inventory() {
    const [state, dispatch] = useReducer(reducer, initialState)
    const user = state.user

    const [add, setAdd] = useState<boolean>(false)
    const [edit, setEdit] = useState<boolean>(false)

    const [item, setItem] = useState<Product>()

    useEffect(() => {
        axios.get(`http://localhost:4000/budgets/${(user as User).id}`)
        .then((response) => {
        //dispatch({type: 'FETCH_BUDGET', payload: response.data})
        })
        .catch((err) => getError(err as ApiError))
    }, [(user as User).id])

    const closeAdd = () => {
        setAdd(false)
    }

    const closeEdit = () => {
        setEdit(false)
    }

    const openEdit = () => {
        setEdit(true)
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
        <div className="">
            <AddItem add={add} closeAdd={closeAdd}/>
        </div>
        {item && <EditItem edit={edit} closeEdit={closeEdit} item={item}/>}
            
        {/* {
            budgets.map((budget, key) => {
            return (
                <div key={key} className="lg:w-[65%] p-4">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">{budget.name} <button onClick={() => openEdit(budget)}><FontAwesomeIcon icon={faPen}/></button></h3>
                <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm">{budget.remaining} {state.currency} of {budget.amount} {state.currency}</span>
                    <span className="text-sm text-gray-800 dark:text-white">You used {(100-(budget.remaining / budget.amount)*100).toFixed(2)}%</span>
                </div>
                <div 
                    className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700" 
                    role="progressbar" 
                    aria-valuenow={0} 
                    aria-valuemin={0} 
                    aria-valuemax={100}
                >
                    <div className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-violet-500" style={{"width": `${(100-(budget.remaining / budget.amount)*100) > 100 ? 100 : (100-(budget.remaining / budget.amount)*100)}%`}}></div>
                </div>
                </div>
            )
            })
        } */}
        </div>
    )
}
