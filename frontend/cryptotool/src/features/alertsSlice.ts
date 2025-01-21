import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PriceAlert {
  id: string;
  coinId: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
  createdAt: number;
}

interface AlertsState {
  alerts: PriceAlert[];
  lastCheck: number;
}

const loadAlertsFromStorage = (): PriceAlert[] => {
  try {
    const saved = localStorage.getItem('priceAlerts');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Failed to load alerts from storage:', error);
    return [];
  }
};

const initialState: AlertsState = {
  alerts: loadAlertsFromStorage(),
  lastCheck: Date.now()
};

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Omit<PriceAlert, 'id' | 'createdAt'>>) => {
      const newAlert: PriceAlert = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: Date.now(),
      };
      state.alerts.push(newAlert);
      localStorage.setItem('priceAlerts', JSON.stringify(state.alerts));
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
      localStorage.setItem('priceAlerts', JSON.stringify(state.alerts));
    },
    toggleAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(a => a.id === action.payload);
      if (alert) {
        alert.isActive = !alert.isActive;
        localStorage.setItem('priceAlerts', JSON.stringify(state.alerts));
      }
    },
    updateLastCheck: (state) => {
      state.lastCheck = Date.now();
    }
  }
});

export const { addAlert, removeAlert, toggleAlert, updateLastCheck } = alertsSlice.actions;
export default alertsSlice.reducer;