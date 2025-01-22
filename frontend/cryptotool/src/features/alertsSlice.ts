import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PriceAlert {
  id: string;
  coinId: string;
  targetPrice: number;
  condition: 'above' | 'below';
  isActive: boolean;
}

interface AlertsState {
  alerts: PriceAlert[];
}

// Load initial state from localStorage
const loadAlertsFromStorage = (): AlertsState => {
  try {
    const savedAlerts = localStorage.getItem('cryptoAlerts');
    if (savedAlerts) {
      return JSON.parse(savedAlerts);
    }
  } catch (error) {
    console.error('Error loading alerts from localStorage:', error);
  }
  return { alerts: [] };
};

const initialState: AlertsState = loadAlertsFromStorage();

const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    addAlert: (state, action: PayloadAction<Omit<PriceAlert, 'id'>>) => {
      const newAlert = {
        ...action.payload,
        id: Date.now().toString(),
      };
      state.alerts.push(newAlert);
      // Save to localStorage
      localStorage.setItem('cryptoAlerts', JSON.stringify(state));
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
      // Save to localStorage
      localStorage.setItem('cryptoAlerts', JSON.stringify(state));
    },
    toggleAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(alert => alert.id === action.payload);
      if (alert) {
        alert.isActive = !alert.isActive;
        // Save to localStorage
        localStorage.setItem('cryptoAlerts', JSON.stringify(state));
      }
    },
    clearAllAlerts: (state) => {
      state.alerts = [];
      // Save to localStorage
      localStorage.setItem('cryptoAlerts', JSON.stringify(state));
    }
  },
});

export const { addAlert, removeAlert, toggleAlert, clearAllAlerts } = alertsSlice.actions;
export default alertsSlice.reducer;