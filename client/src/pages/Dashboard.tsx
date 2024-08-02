import { useEffect, useReducer, useState } from 'react';
import CardDataStats from '../components/CardDataStats';
import axios from 'axios';
import { User } from '../types/User';
import { initialState, reducer } from '../utils/store';
import { Product } from '../types/product';
import { getError } from '../utils/api';
import { ApiError } from '../types/ApiError';
import CategoriesChart from '../components/Dashboard/CategoriesChart';
import Expiration from '../components/Dashboard/Expiration';
import ItemsHistory from '../components/Dashboard/ItemsHistory';

const Dashboard = () => {

  const [state, dispatch] = useReducer(reducer, initialState)
  const user = state.user as User

  const [items, setItems] = useState<Product[]>([])
  const [expired, setExpired] = useState<Product[]>([])
  const [expiringSoon, setExpiringSoon] = useState<Product[]>([])

  useEffect(() => {
        axios.get(`http://localhost:8080/api/item/${user.id}`)
            .then((response) => {
                setItems(response.data)
                dispatch({type: 'FETCH_ITEMS', payload: response.data})
            })
            .catch((err) => getError(err as ApiError))
  }, [])

  useEffect(() => {
    const now = new Date();

    const filteredExpiringSoon = items.filter(item => {
      const expirationDate = new Date(item.expiration);
      return expirationDate.getFullYear() === now.getFullYear() &&
          expirationDate.getMonth() === now.getMonth() &&
          expirationDate.getTime() > now.getTime(); 
    });

    const filteredExpired = items.filter(item => {
        const expirationDate = new Date(item.expiration);
        return expirationDate.getTime() < now.getTime(); 
    });

    const sortedExpiringSoon = filteredExpiringSoon.sort((a, b) =>
        new Date(a.expiration).getTime() - new Date(b.expiration).getTime()
    );

    const sortedExpired = filteredExpired.sort((a, b) =>
        new Date(b.expiration).getTime() - new Date(a.expiration).getTime()
    );

    const lengthExpiringSoon = sortedExpiringSoon.length;
    const maxExpiringSoon = lengthExpiringSoon < 4 ? lengthExpiringSoon : 4;

    setExpiringSoon(sortedExpiringSoon.slice(0, maxExpiringSoon));
    setExpired(sortedExpired);
  }, []);

  const cardStats = [
    {
      title: "Total Items",
      number: items.length,
      icon: "inventory_2",
      color: "text-orange-500"
    },
    {
      title: "Expired",
      number: items.filter(item => new Date(item.expiration) > new Date()).length,
      icon: "close",
      rate: items.filter(item => new Date(item.expiration) > new Date()).length / items.length * 100,
      color: "text-red-400"
    },
    {
      title: "Not Expired",
      number: items.filter(item => new Date(item.expiration) < new Date()).length,
      icon: "check",
      rate: items.filter(item => new Date(item.expiration) < new Date()).length / items.length * 100,
      color: "text-green-700"
    },
    {
      title: "Expiring Today",
      number: items.filter(item => new Date(item.expiration) == new Date()).length,
      icon: "warning",
      rate: items.filter(item => new Date(item.expiration) == new Date()).length / items.length * 100,
      color: "text-amber-500"
    },
  ]
    
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {
          cardStats.map((card, key) => (  
            <CardDataStats key={key} title={card.title} total={card.number} rate={card.rate ? card.rate : undefined}>
              <span className={`font-semibold text-3xl material-symbols-outlined text-white ${card.color}`}>
                {card.icon}
              </span>
            </CardDataStats>
          )
        )}
        
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <CategoriesChart items={items} />
        <Expiration expired={expired} expiringSoon={expiringSoon} />
        <div className="col-span-12">
          <ItemsHistory items={items} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
