import { Modal } from "@mui/material";
import axios from "axios";
import { useReducer } from "react";
import { Product } from "../../types/product";
import { initialState, reducer } from "../../utils/store";
import { toast } from "react-toastify";
import { getError } from "../../utils/api";
import { ApiError } from "../../types/ApiError";
import { User } from "../../types/User";

interface DeleteItemProps {
    del: boolean;
    closeDel: () => void;
    item: Product;
}

export default function DeleteItem({ del, closeDel, item }: DeleteItemProps) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const user = state.user as User;

    const deleteTx = async () => {
        try {
            await axios.delete(`http://localhost:8080/api/item/delete/${user.id}/${item.id}`);
            dispatch({ type: "DELETE_ITEM", payload: item });
            toast.success("Transaction Deleted Successfully");
            closeDel();
        } catch (err) {
            console.log(getError(err as ApiError));
        }
    };

    return (
        <Modal
            open={del}
            onClose={closeDel}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className="flex items-center justify-center h-full">
                <div className="flex flex-col max-w-md gap-2 p-6 rounded-md shadow-md bg-[#24303F] text-white">
                    <h2 className="text-xl font-semibold leading-tight tracking-tight text-center">Delete Item</h2>
                    <p className="flex-1 text-center">Are you sure that you want to delete this item?</p>
                    <div className="flex justify-center gap-3 mt-6 sm:mt-8 sm:flex-row">
                        <button onClick={closeDel} className="px-6 py-2 rounded-sm bg-gray-700 hover:bg-gray-600">
                            Cancel
                        </button>
                        <button onClick={deleteTx} className="px-6 py-2 rounded-sm shadow-sm bg-red-600 hover:bg-red-500 text-white">
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
