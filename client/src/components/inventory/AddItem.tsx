import { useReducer, useState } from "react";
import { initialState, reducer } from "../../utils/store";
import { Product } from "../../types/product";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/api";
import { ApiError } from "../../types/ApiError";
import { User } from "../../types/User";

interface AddItemProps {
    add: boolean;
    closeAdd: () => void;
}

export default function AddItem({ add, closeAdd }: AddItemProps) {
    const [count, setCount] = useState<Product["count"]>(0);
    const [name, setName] = useState<Product["name"]>("");
    const [expiration, setExpiration] = useState<Product["expiration"]>("");
    const [category, setCategory] = useState<Product["category"]>("");
    const [unit, setUnit] = useState<Product["unit"]>("kg");

    const [state, dispatch] = useReducer(reducer, initialState);
    const user = state.user as User;

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
        const product: Product = { count, name, expiration, category, unit };

        axios.post(`http://localhost:8080/api/item`, {
            count: count,
            name: name,
            expiration: expiration,
            category: category,
            unit: unit,
            user: { id: user.id }
        }).then(() => {
            dispatch({ type: 'ADD_ITEM', payload: product });
            toast.success("Item Added Successfully!");
            closeAdd();
        })
        .catch((err) => toast.error(getError(err as ApiError)));
    }

    return (
        <div className={`relative ${add ? 'block' : 'hidden'}`}>
            <fieldset className="grid grid-cols-4 gap-6 shadow-sm border-slate-600 border-2 p-4 rounded-md">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-medium">Add an Item</p>
                    <p className="text-xs">Provide Your Item Details</p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="name" className="text-sm mb-2">Name</label>
                        <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="Name" className="text-black mt-2 p-2 w-full rounded-md focus:ring focus:ring-indigo-500 dark:border-gray-700 dark:text-gray-900" />
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
                        <label htmlFor="expiration" className="text-sm mb-2">Expiration Date</label>
                        <input value={expiration} onChange={(e) => setExpiration(e.target.value)} id="expiration" type="date" placeholder="Expiration Date" className="text-black mt-2 p-2 w-full rounded-md focus:ring focus:ring-indigo-500 dark:border-gray-700 dark:text-gray-900" required />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="category" className="text-sm mb-2">Category</label>
                        <input value={category} onChange={(e) => setCategory(e.target.value)} id="category" type="text" placeholder="Category" className="text-black mt-2 p-2 w-full rounded-md focus:ring focus:ring-indigo-500 dark:border-gray-700 dark:text-gray-900" required />
                    </div>
                </div>
                <button onClick={handleSubmit} type="submit" style={{ width: "90%" }} className="px-4 py-2 border rounded-md dark:border-gray-100">
                    Add
                </button>
            </fieldset>
        </div>
    );
}
