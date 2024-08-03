import { Product } from "../../types/product";
import { day, format } from "../../utils/date";

interface ItemsTableProps {
    prompt: string;
    items: Product[];
    handleEdit: (transaction: Product) => void;
    handleDelete: (transaction: Product) => void;
}

export default function ItemsTable({items, handleEdit, handleDelete}: ItemsTableProps) {
    
    return (
        <div className="overflow-x-auto sm:w-[100%] w-[125%]">
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
                        <th className="text-lg p-3 text-center">Category</th>
                        <th className="text-lg p-3 text-center">Name</th>
                        <th className="text-lg p-3 text-center">Amount</th>
                        <th className="text-lg p-3 text-center">Expiration</th>
                        <th className="text-lg p-3 text-center">Status</th>
                    </tr>
                </thead>
                <tbody>
                {items.map((el: Product, key: number) => (
                    <tr key={key} className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-base text-center">{el.category}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-base text-center">{el.name}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-base text-center">{el.count + (el.unit ? " " + el.unit : "")}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-base text-center">{format(new Date(el.expiration))}</p>
                            <p className="text-center">{day(new Date(el.expiration))}</p>
                        </td>
                        <td className="p-3" style={{ width: '20%' }}>
                            <p className="text-base text-center">{new Date(el.expiration) > new Date() ? "Not Expired" : "Expired"}</p>
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