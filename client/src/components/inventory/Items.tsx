import { useEffect, useState } from "react";
import { Product } from "../../types/product";
import EditItem from "./EditItem";
import DeleteItem from "./DeleteItem";
import ItemsTable from "./ItemsTable";

interface ItemsProps {
    items: Product[];
}

export default function Items({ items }: ItemsProps) {
    const [edit, setEdit] = useState<boolean>(false);
    const [del, setDel] = useState<boolean>(false);
    const [item, setItem] = useState<Product>();

    const [filteredCategory, setFilteredCategory] = useState("");
    const [filteredData, setFilteredData] = useState<Product[]>([]);
    const [prompt, setPrompt] = useState<Product['name']>("");
    const [expirationFilter, setExpirationFilter] = useState<string>("all");

    const [sumOfExpired, setSumOfExpired] = useState<number>(0);

    const getUniqueCategories = (items: Product[]): string[] => {
        const categories = items.map(item => item.category[0].toUpperCase() + item.category.slice(1).toLowerCase());
        return Array.from(new Set(categories));
    };

    useEffect(() => {
        let filteredProducts: Product[] = items;

        if (filteredCategory) {
            filteredProducts = filteredProducts.filter((product) => 
                product.category.toLowerCase() === filteredCategory.toLowerCase()
            );
        }

        if (prompt) {
            filteredProducts = filteredProducts.filter((product) => 
                product.name.toLowerCase().includes(prompt.toLowerCase())
            );
        }

        if (expirationFilter !== "all") {
            const currentDate = new Date();
            filteredProducts = filteredProducts.filter((item) => {
                const isExpired = new Date(item.expiration) < currentDate;
                return expirationFilter === "expired" ? isExpired : !isExpired;
            });
        }

        setFilteredData(filteredProducts);

        const expiredItems = items.filter(item => new Date(item.expiration) < new Date());
        const sumExpired = expiredItems.reduce((sum, item) => sum + (item.count || 0), 0);

        setSumOfExpired(sumExpired);

    }, [items, filteredCategory, prompt, expirationFilter]);

    const handleDelete = (selectedItem: Product) => {
        setDel(true);
        setItem(selectedItem);
    }

    const handleEdit = (selectedItem: Product) => {
        setItem(selectedItem);
        setEdit(true);
    }

    const closeEdit = () => {
        setEdit(false);
    }

    const closeDel = () => {
        setDel(false);
    }

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setFilteredCategory(e.target.value);
    }

    const handlePromptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrompt(e.target.value);
    }

    const handleExpirationFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setExpirationFilter(e.target.value);
    };

    const viewAll = () => {
        setFilteredCategory("");
        setPrompt("");
        setExpirationFilter("all")
    }

    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold mt-4">My Items</h2>
            {edit && item && <EditItem edit={edit} closeEdit={closeEdit} item={item} />}
            {item && <DeleteItem del={del} closeDel={closeDel} item={item} />}
            
            <div className="flex p-4 gap-10 justify-left">
                <span>Expired: {sumOfExpired}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <input 
                    type="text" 
                    placeholder="Search by name" 
                    value={prompt} 
                    onChange={handlePromptChange} 
                    className="p-2 border rounded-md text-black"
                />

                <select className="p-2 border rounded-md text-black" id="categoryFilter" value={filteredCategory} onChange={handleCategoryChange}>
                    <option className="" value="">All Categories</option>
                    {getUniqueCategories(items).map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </select>

                <select className="p-2 border rounded-md text-black" id="expirationFilter" value={expirationFilter} onChange={handleExpirationFilterChange}>
                    <option value="all">All Items</option>
                    <option value="expired">Expired</option>
                    <option value="notExpired">Non-Expired</option>
                </select>

                <button onClick={viewAll} className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-all">
                    View All
                </button>
            </div>

            <div className="container p-2 sm:p-4 dark:text-gray-100">
                <ItemsTable 
                    prompt={prompt}
                    items={filteredData}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                />
            </div>
        </div>
    );
}
