import axios from 'axios';
import { useReducer, useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../../types/product';
import { initialState, reducer } from '../../utils/store';
import { User } from '../../types/User';
import { getError } from '../../utils/api';
import { ApiError } from '../../types/ApiError';
import { Modal } from '@mui/material'

interface EditItemProps {
    edit: boolean;
    closeEdit: () => void
    item: Product
}

export default function EditItem({edit, closeEdit, item}: EditItemProps) {
    const [count, setCount] = useState<Product["count"]>(item.count || 0)
    const [name, setName] = useState<Product["name"]>(item.name)
    const [expiration, setExpiration] = useState<Product["expiration"]>()
    
    const [state, dispatch] = useReducer(reducer, initialState)
    
    const user = state.user
    
    const handleEdit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axios.put(`http://localhost:4000/budgets/editBudget/${(user as User).id}/${item.id}`, {
              count: count,
              name: name,
              expiration: expiration,
        })
        .then(() => {
           toast.success("Budget Edited Successfully")
           //dispatch({type: 'UPDATE_BUDGET', payload: budget!})
           closeEdit()
        })
        .catch((err) => toast.error(getError(err as ApiError)))
    }

    const handleDelete = () => {
        axios.delete(`http://localhost:4000/budgets/deleteBudget/${(user as User).id}/${item.id}`)
        .then(() => {
          toast("Budget Deleted Successfully!")
          //dispatch({type: 'DELETE_BUDGET', payload: budget!._id!})
          closeEdit()
        })
        .catch((err) => getError(err as ApiError));
    }

    return (
        <Modal
            open={edit}
            onClose={closeEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleEdit} className="mt-40 text-white container flex flex-col mx-auto space-y-12">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-medium">Edit {name} Budget</p>
                    <p className="text-xs">Modify Your Budget Details</p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                    <label htmlFor="firstname" className="text-sm mb-2">Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="Name" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                    <label htmlFor="transaction" className="text-sm mb-2">Amount</label>
                    <input value={count} onChange={(e) => setCount(parseInt(e.target.value))} id="amount" type="number" placeholder="Amount" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" required/>
                    </div>
                    <div className="col-span-full sm:col-span-3">
                    <label htmlFor="remaining" className="text-sm mb-2">Remaining</label>
                    <input value={expiration} onChange={(e) => setExpiration(e.target.value)} id="category" type="number" placeholder="Category" className="w-full rounded-md focus:ring focus:ri focus:ri dark:border-gray-700 dark:text-gray-900" required/>
                    </div>
                    <div className="col-span-full sm:col-span-2">
                    </div>
                </div>
                <div className="flex gap-4">
                    <button type="submit" style={{"width": "90%"}} className="px-4 py-2 border rounded-md dark:border-gray-100">Save</button>
                    <button onClick={handleDelete} style={{"width": "90%"}} className="px-4 py-2 border rounded-md bg-violet-600 dark:border-gray-100">Delete</button>
                </div>
                </fieldset>
            </form>  
        </Modal>
    )
}