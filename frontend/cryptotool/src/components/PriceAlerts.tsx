import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAlert, addHistoryEntry, removeAlert, toggleAlert } from '../features/alertsSlice';
import { fetchCryptoPrices } from '../features/cryptoSlice';
import { checkAlerts } from '../utils/alertChecker';
import { Bell, BellOff, Trash2 } from 'lucide-react';
import type { RootState, AppDispatch } from '../store';
import type { PriceAlert } from '../features/alertsSlice';
import { AlertCheck } from '../utils/alertChecker';
import { SoundNotification } from '../utils/soundNotification';
import AlertHistory from './AlertHistory';

type AlertCondition = 'above' | 'below';
type AlertFrequency = 'onetime' | 'daily' | 'weekly';

interface NewAlertState {
  coinId: string;
  targetPrice: string;
  condition: AlertCondition;
  frequency: AlertFrequency;
}

const PriceAlerts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alerts = useSelector((state: RootState) => state.alerts.alerts);
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const savedSoundPreference = localStorage.getItem('soundNotificationEnabled');
    return savedSoundPreference === null ? true : savedSoundPreference === 'true';
  });
  const [soundNotification] = useState(new SoundNotification());
  
  const [newAlert, setNewAlert] = useState<NewAlertState>({
    coinId: 'bitcoin',
    targetPrice: '',
    condition: 'above',
    frequency: 'onetime'
  });

  // Existing useEffects remain the same...

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.targetPrice) return;

    dispatch(addAlert({
      coinId: newAlert.coinId,
      targetPrice: Number(newAlert.targetPrice),
      condition: newAlert.condition,
      frequency: newAlert.frequency,
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

          <select
            value={newAlert.frequency}
            onChange={(e) => setNewAlert(prev => ({ ...prev, frequency: e.target.value as AlertFrequency }))}
            className="px-3 py-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          >
            <option value="onetime">One-time</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
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
        {alerts.map((alert: PriceAlert) => {
          const status = getAlertStatus(alert);
          return (
            <div
              key={alert.id}
              className={`flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow ${
                status?.triggered ? 'border-2 border-yellow-500' : ''
              }`}
            >
              <div className="dark:text-white">
                <span className="font-semibold">{alert.coinId.toUpperCase()}</span>
                <span> {alert.condition} </span>
                <span>${alert.targetPrice.toLocaleString()}</span>
                <span className="ml-2 text-sm text-gray-500">
                  ({alert.frequency === 'onetime' ? 'One-time' : 
                    alert.frequency === 'daily' ? 'Daily' : 'Weekly'})
                </span>
                {status && (
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    Current: ${status.currentPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                )}
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
          );
        })}
      </div>
      <AlertHistory />
      <div className="mt-4 flex items-center justify-center">
        <label className="flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isSoundEnabled}
            onChange={() => setIsSoundEnabled(!isSoundEnabled)}
            className="sr-only peer"
          />
          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            Sound Notifications
          </span>
        </label>
      </div>
    </div>
  );
};

export default PriceAlerts;