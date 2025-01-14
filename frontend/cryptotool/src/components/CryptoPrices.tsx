import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCryptoPrices } from '../features/cryptoSlice';
import { RootState, AppDispatch } from '../store';

const CryptoPrices: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { prices, loading, error } = useSelector((state: RootState) => state.crypto);

  useEffect(() => {
    dispatch(fetchCryptoPrices('bitcoin,ethereum')); // Example IDs
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Crypto Prices</h2>
      <ul>
        {Object.entries(prices).map(([key, value]) => (
          <li key={key}>
            {key}: ${value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CryptoPrices;
