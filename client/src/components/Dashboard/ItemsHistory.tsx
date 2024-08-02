import { Product } from "../../types/product";
import { format } from "../../utils/date";

interface HistoryProps {
  items: Product[]
}

const ItemsHistory = ({items}: HistoryProps) => {

  return (
    <div className="overflow-scroll rounded-sm border border-stroke bg-white px-5 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <h4 className="mb-6 text-xl font-semibold text-black dark:text-white">
        History:
      </h4>
      {
        items.length > 0 ? 
        items.map((product, key) => (
          <div key={key} className="max-w-md p-2 sm:flex sm:space-x-2">
            <div className="flex flex-col space-y-4">
              <div>
                <h2 className="font-semibold">{product.name}</h2>
                <div className="flex gap-6">
                  <span className="text-sm dark:text-gray-400">{format(new Date(product.expiration))}</span>
                  <span className="text-sm dark:text-gray-400">{product.count} items</span>
                </div>
              </div>
            </div>
          </div>
        ))
        :
        <p className="mt-4">| No Recent Expiring Products...</p>
      }
    </div>
  );
};

export default ItemsHistory;
