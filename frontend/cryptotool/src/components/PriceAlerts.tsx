import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, removeAlert, toggleAlert } from '../features/alertsSlice';
import { Bell, BellOff, Trash2 } from 'lucide-react';
import type { RootState } from '../store';
import type { PriceAlert } from '../features/alertsSlice';

type AlertCondition = 'above' | 'below';

interface NewAlertState {
  coinId: string;
  targetPrice: string;
  condition: AlertCondition;
}

const PriceAlerts = () => {
  const dispatch = useDispatch();
  const alerts = useSelector((state: RootState) => state.alerts.alerts);
  
  const [newAlert, setNewAlert] = useState<NewAlertState>({
    coinId: 'bitcoin',
    targetPrice: '',
    condition: 'above'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.targetPrice) return;

    dispatch(addAlert({
      coinId: newAlert.coinId,
      targetPrice: Number(newAlert.targetPrice),
      condition: newAlert.condition,
      isActive: true
    }));

    setNewAlert(prev => ({ ...prev, targetPrice: '' }));
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 dark:text-white">Price Alerts</h2>
      
      {/* Add New Alert Form */}
      <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="flex gap-4 flex-wrap">
          <select
            value={newAlert.coinId}
            onChange={(e) => setNewAlert(prev => ({ ...prev, coinId: e.target.value }))}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="bitcoin">Bitcoin</option>
            <option value="ethereum">Ethereum</option>
            <option value="dogecoin">Dogecoin</option>
          </select>
          
          <select
            value={newAlert.condition}
            onChange={(e) => setNewAlert(prev => ({ ...prev, condition: e.target.value as AlertCondition }))}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="above">Above</option>
            <option value="below">Below</option>
          </select>
          
          <input
            type="number"
            value={newAlert.targetPrice}
            onChange={(e) => setNewAlert(prev => ({ ...prev, targetPrice: e.target.value }))}
            placeholder="Target Price"
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          />
          
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Alert
          </button>
        </div>
      </form>
      
      {/* Alerts List */}
      <div className="space-y-3">
        {alerts.map((alert: PriceAlert) => (
          <div
            key={alert.id}
            className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow"
          >
            <div className="dark:text-white">
              <span className="font-semibold">{alert.coinId.toUpperCase()}</span>
              <span> {alert.condition} </span>
              <span>${alert.targetPrice.toLocaleString()}</span>
            </div>
            
            <div className="flex gap-2">
              <button
                onClick={() => dispatch(toggleAlert(alert.id))}
                className={`p-2 rounded-full ${
                  alert.isActive ? 'bg-green-100 dark:bg-green-900' : 'bg-gray-100 dark:bg-gray-700'
                }`}
              >
                {alert.isActive ? 
                  <Bell className="h-5 w-5 text-green-600 dark:text-green-400" /> : 
                  <BellOff className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                }
              </button>
              <button
                onClick={() => dispatch(removeAlert(alert.id))}
                className="p-2 rounded-full bg-red-100 dark:bg-red-900"
              >
                <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PriceAlerts;