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
    const [expiration, setExpiration] = useState<Date>(new Date(item.expiration))
    const [category, setCategory] = useState<Product["category"]>(item.category)
    const [unit, setUnit] = useState<Product["unit"]>(item.unit);
    
    const [state, ] = useReducer(reducer, initialState)
    
    const user = state.user
    
    const handleEdit = (e: React.SyntheticEvent) => {
        e.preventDefault()
        axios.put(`http://localhost:8080/api/item/edit/${(user as User).id}/${item.id}`, {
              count: count,
              name: name,
              expiration: expiration,
              category: category,
              unit: unit
        })
        .then(() => {
           toast.success("Budget Edited Successfully")
           //dispatch({type: 'UPDATE_BUDGET', payload: budget!})
           closeEdit()
        })
        .catch((err) => toast.error(getError(err as ApiError)))
    }
    
    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputDate = new Date(e.target.value);
        if (!isNaN(inputDate.getTime())) {
            setExpiration(inputDate);
        } else {
            setExpiration(new Date());
        }
    };

    return (
        <Modal
            open={edit}
            onClose={closeEdit}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <form onSubmit={handleEdit} className="mt-40 text-white container flex flex-col mx-auto space-y-12">
                <fieldset className="ml-[20%] grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900 bg-[#24303F] text-white">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Edit "{name}"</p>
                        <p className="text-xs">Modify Your Item Details</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="name" className="text-sm mb-2">Name</label>
                            <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="Name" className="text-black mt-2 p-2 w-full rounded-md focus:ring focus:ri dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full sm:col-span-3 grid grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="amount" className="text-sm mb-2">Amount</label>
                                <input value={count} onChange={(e) => setCount(parseInt(e.target.value))} id="amount" type="number" placeholder="Amount" className="text-black mt-2 p-2 w-full rounded-md focus:ring focus:ring-indigo-500 dark:border-gray-700 dark:text-gray-900" required />
                            </div>
                            <div>
                                <label htmlFor="unit" className="text-sm mb-2">Unit</label>
                                <input value={unit} onChange={(e) => setUnit(e.target.value)} id="unit" type="text" placeholder="Unit" className="text-black mt-2 p-2 w-full rounded-md focus:ring focus:ring-indigo-500 dark:border-gray-700 dark:text-gray-900" />
                            </div>
                        </div>
                        <div className="col-span-full sm:col-span-3 mb-2">
                            <label htmlFor="category" className="text-sm mb-2">Expiration Date</label>
                            <input value={(new Date(expiration)).toISOString().slice(0, 10)} onChange={handleDateChange} id="category" type="date" placeholder="Category" className="text-black mt-2 p-2 w-full rounded-md focus:ring focus:ri dark:border-gray-700 dark:text-gray-900" required />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="amount" className="text-sm mb-2">Category</label>
                            <input value={category} onChange={(e) => setCategory(e.target.value)} id="amount" type="text" placeholder="Category" className="text-black mt-2 p-2 w-full rounded-md focus:ring focus:ri dark:border-gray-700 dark:text-gray-900" required />
                        </div>
                    </div>
                    <div className="flex gap-4 w-fit">
                        <button type="submit" style={{"width": "90%"}} className="px-4 py-2 border rounded-md dark:border-gray-100">Save</button>
                        <button onClick={closeEdit} style={{"width": "90%"}} className="px-4 py-2 border rounded-md bg-violet-600 dark:border-gray-100">Close</button>
                    </div>
                </fieldset>
            </form>  
        </Modal>
    )
}