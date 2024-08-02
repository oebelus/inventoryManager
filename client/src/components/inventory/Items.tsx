import { useEffect, useReducer, useState } from "react";
import { Product } from "../../types/product";
import { initialState, reducer } from "../../utils/store";
import ItemsTable from "./ItemsTable";
import { User } from "../../types/User";
import DeleteItem from "./DeleteItem";
import EditItem from "./EditItem";

interface ItemsProps {
    items: Product[];
}

export default function Items({ items }: ItemsProps) {
    const [edit, setEdit] = useState<boolean>(false)
    const [del, setDel] = useState<boolean>(false)

    const [item, setItem] = useState<Product>()

    const [filteredCategory, setFilteredCategory] = useState("")
    const [filteredData, setFilteredData] = useState<Product[]>([])
    const [sumOfNegatives, setSumOfNegatives] = useState(0)
    const [sumOfPositives, setSumOfPositives] = useState(0)

    const minDate = new Date(new Date().setDate(1))
    minDate.setHours(1, 0, 0, 0)

    // const [min, setMin] = useState<Date>(minDate)
    // const [max, setMax] = useState<Date>(new Date())

    const [prompt, setPrompt] = useState<Product['name']>("")
    
    const [state, dispatch] = useReducer(reducer, initialState)
    const user = state.user as User

    useEffect(() => {

        // let filteredTransactions: Transaction[] = transactions
        // if (min && max) {
        //     filteredTransactions = transactions.filter((transaction) => {
        //         const minDate = new Date(min)
        //         const maxDate = new Date(max)
        //         const transactionDate = new Date((new Date(transaction.date)).toISOString().substr(0, 10))
        //         return transactionDate >= minDate && new Date(transactionDate) <= maxDate
        //     })
        // }
        // if (filteredCategory !== "") {
        //     filteredTransactions = filteredTransactions.filter((transaction) => {
        //         return transaction.category === filteredCategory
        //     })
        // }

        // if (prompt !== "") {
        //     filteredTransactions = filteredTransactions.filter((transaction) => {
        //         return transaction.name!.toLowerCase().includes(prompt!.toLowerCase())
        //     })
        // }
        // setFilteredData(filteredTransactions)


    }, []);

    const handleDelete = (selectedItem: Product) => {
        setDel(true)
        setItem(selectedItem)
    }

    const handleEdit = (selectedItem: Product) => {
        setItem(selectedItem)
        setEdit(true)
    }

    const closeEdit = () => {
        setEdit(false)
    }

    const closeDel = () => {
        setDel(false)
    }

    function viewAll() {
        setFilteredCategory("")
        setPrompt("")
        // setMin(minDate)
        // setMax(new Date())
    }

    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold leadi mt-4">My Items</h2>
            {edit && item && <EditItem edit={edit} closeEdit={closeEdit} item={item} />} 
            {item && <DeleteItem del={del} closeDel={closeDel} item={item} />}
            {/*<TransactionsFilter 
                viewAll={viewAll}
                setFilteredCategory={setFilteredCategory}
                setPrompt={setPrompt}
                setMax={setMax}
                setMin={setMin}
                transactions={transactions}
                min={min}
                max={max}
                prompt={prompt}
            /> */}
            <div className="flex p-4 gap-10 justify-left">
                <span>Expired: {sumOfPositives}</span>
            </div>
            <div className="container p-2 sm:p-4 dark:text-gray-100">
                <ItemsTable 
                    prompt={prompt}
                    items={items}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}