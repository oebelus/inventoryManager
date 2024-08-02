import { Product } from "../../types/product";
import { day, format } from "../../utils/date";

interface ItemsTableProps {
    prompt: string;
    //filteredCategory: string;
    // min: Date;
    // max: Date;
    // filteredData: Transaction[];
    // prompt: string;
    items: Product[];
    handleEdit: (transaction: Product) => void;
    handleDelete: (transaction: Product) => void;
}

export default function ItemsTable({items, handleEdit, handleDelete}: ItemsTableProps) {
    
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full text-xs">
                <colgroup>
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead className="dark:bg-gray-700">
                    <tr className="text-left">
                        <th className="p-3 text-center">Category</th>
                        <th className="p-3 text-center">Name</th>
                        <th className="p-3 text-center">Amount</th>
                        <th className="p-3 text-center">Expiration Date</th>
                        <th className="p-3 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                {/* {(min || max || prompt !== "" || filteredCategory !== "") ? 
                filteredData.map((el: Transaction, key: number) => (
                    <tr key={key} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{format(new Date(el.date))}</p>
                            <p className="dark:text-gray-400 text-center">{day(new Date(el.date))}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{el.name}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{el.amount > 0 ? `+${el.amount}` : el.amount} {state.currency}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{el.category}</p>
                        </td>
                        <td className="p-3 text-right" style={{ width: '20%' }}>
                            <p className="text-center"><FontAwesomeIcon icon={recurringDictionary[el.recurring.toString()]}/></p>
                        </td>
                        <td className="p-3 dark:bg-gray-800">
                            <button onClick={() => handleEdit(el)}><FontAwesomeIcon className="fa-thin mb-2" icon={faPen} /></button>
                            <button onClick={() => handleDelete(el)}><FontAwesomeIcon className="fa-thin" icon={faTrash} /></button>
                        </td>
                    </tr>
                )) :  */}
                {items.map((el: Product, key: number) => (
                    <tr key={key} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{el.category}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{el.name}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{el.count}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{format(new Date(el.expiration))}</p>
                            <p className="text-center">{day(new Date(el.expiration))}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-center">{new Date(el.expiration) > new Date() ? "Not Expired" : "Expired"}</p>
                        </td>
                        <td className="p-3 dark:bg-gray-800 border-none">
                            <button onClick={() => handleEdit(el)}>
                                <span className="material-symbols-outlined">
                                    edit
                                </span>
                            </button>
                            <button onClick={() => handleDelete(el)}>
                                <span className="material-symbols-outlined">
                                    delete
                                </span>
                            </button>
                        </td>
                    </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}