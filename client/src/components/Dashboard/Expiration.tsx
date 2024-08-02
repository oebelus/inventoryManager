import { Product } from '../../types/product';
import { format } from '../../utils/date';

interface ExpirationProps {
    expired: Product[],
    expiringSoon: Product[]
}

const Expiration = ({expired, expiringSoon}: ExpirationProps) => {

    const calculateDays = (expirationDate: Date): string => {
        const now = new Date();
        const timeDiff = expirationDate.getTime() - now.getTime();
        return Math.abs(Math.ceil(timeDiff / (1000 * 3600 * 24))).toString();
    };

    return (
        <div className="col-span-12 rounded-sm border border-stroke bg-white py-6 px-7.5 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-7">
        <div className='flex justify-between'>
            <div className='overflow-scroll '>
                <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
                    Will Expire Soon:
                </h4>
                {
                    expiringSoon.length > 0 ? 
                    expiringSoon.map((product, key) => (
                    <div key={key} className="max-w-md p-2 sm:flex sm:space-x-2">
                        <div className="flex flex-col space-y-4">
                        <div>
                            <h2 className="font-semibold">{product.name}</h2>
                            <div className="flex gap-6">
                                <span className="text-sm dark:text-gray-400">{product.count} items</span>
                                <span className="text-sm dark:text-gray-400">{format(new Date(product.expiration))}</span>
                                <span>in {calculateDays(new Date(product.expiration))} days</span>
                            </div>
                        </div>
                        </div>
                    </div>
                    ))
                    :
                    <p className="mt-4">| No Recent Expiring Products...</p>
                }   
            </div>
            <div className='overflow-scroll '>
                <h4 className="mb-2 text-xl font-semibold text-black dark:text-white">
                    Expired:
                </h4>
                {
                    expired.length > 0 ? 
                    expired.map((product, key) => (
                        <div key={key} className="max-w-md p-2 sm:flex sm:space-x-2">
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <h2 className="font-semibold">{product.name}</h2>
                                    <div className="flex gap-6">
                                        <span className="text-sm dark:text-gray-400">{product.count} items</span>
                                        <span className="text-sm dark:text-gray-400">{format(new Date(product.expiration))}</span>
                                        <span>{calculateDays(new Date(product.expiration))} days ago</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    <p className="mt-4">| No Expired Products...</p>
                        }
            </div>
        </div>
    </div>
        
    );
};

export default Expiration;