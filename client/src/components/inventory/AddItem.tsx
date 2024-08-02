import { useReducer, useState } from "react";
import { initialState, reducer } from "../../utils/store";
import { Product } from "../../types/product";
import axios from "axios";
import { User } from "../../types/User";
import { toast } from "react-toastify";
import { getError } from "../../utils/api";
import { ApiError } from "../../types/ApiError";

interface AddItemProps {
    add: boolean;
    closeAdd: () => void;
}

export default function AddItem({ add, closeAdd }: AddItemProps) {
    const [count, setCount] = useState<Product["count"]>(0);
    const [name, setName] = useState<Product["name"]>("");
    const [expiration, setExpiration] = useState<Product["expiration"]>();

    const [state, ] = useReducer(reducer, initialState);
    const user = state.user;

    const handleSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();

        axios.post(`http://localhost:8080/api/user/addItem/${(user as User).id}`, {
            count: count,
            name: name,
            expiration: expiration,
        }).then((response) => {
            console.log(response)
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
                        <input value={name} onChange={(e) => setName(e.target.value)} id="name" type="text" placeholder="Name" className="mt-2 p-2 w-full rounded-md focus:ring focus:ri dark:border-gray-700 dark:text-gray-900" />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="amount" className="text-sm mb-2">Amount</label>
                        <input value={count} onChange={(e) => setCount(parseInt(e.target.value))} id="amount" type="number" placeholder="Amount" className="mt-2 p-2 w-full rounded-md focus:ring focus:ri dark:border-gray-700 dark:text-gray-900" required />
                    </div>
                    <div className="col-span-full sm:col-span-3 mb-2">
                        <label htmlFor="category" className="text-sm mb-2">Expiration Date</label>
                        <input value={expiration} onChange={(e) => setExpiration(e.target.value)} id="category" type="date" placeholder="Category" className="mt-2 p-2 w-full rounded-md focus:ring focus:ri dark:border-gray-700 dark:text-gray-900" required />
                    </div>
                </div>
                <button onClick={handleSubmit} type="submit" style={{ width: "90%" }} className="px-4 py-2 border rounded-md dark:border-gray-100">Add</button>
            </fieldset>
        </div>
    );
}
