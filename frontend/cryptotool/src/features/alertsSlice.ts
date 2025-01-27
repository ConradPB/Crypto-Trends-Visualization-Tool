import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PriceAlert {
  id: string;
  coinId: string;
  targetPrice: number;
  condition: 'above' | 'below';
  frequency: 'onetime' | 'daily' | 'weekly';
  isActive: boolean;
}

export interface AlertHistoryEntry {
  id: string;
  alertId: string;
  coinId: string;
  targetPrice: number;
  condition: 'above' | 'below';
  triggeredAt: string;
  price: number;
}

interface AlertsState {
  alerts: PriceAlert[];
  history: AlertHistoryEntry[];
}

// Load initial state from localStorage
const loadAlertsFromStorage = (): AlertsState => {
  try {
    const savedAlerts = localStorage.getItem('cryptoAlerts');
    const savedHistory = localStorage.getItem('alertHistory');
    return {
      alerts: savedAlerts ? JSON.parse(savedAlerts).alerts : [],
      history: savedHistory ? JSON.parse(savedHistory) : [],
    };
  } catch (error) {
    console.error('Error loading alerts from localStorage:', error);
    return { alerts: [], history: [] };
  }
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
      localStorage.setItem('cryptoAlerts', JSON.stringify({ alerts: state.alerts }));
    },
    removeAlert: (state, action: PayloadAction<string>) => {
      state.alerts = state.alerts.filter(alert => alert.id !== action.payload);
      localStorage.setItem('cryptoAlerts', JSON.stringify({ alerts: state.alerts }));
    },
    toggleAlert: (state, action: PayloadAction<string>) => {
      const alert = state.alerts.find(alert => alert.id === action.payload);
      if (alert) {
        alert.isActive = !alert.isActive;
        localStorage.setItem('cryptoAlerts', JSON.stringify({ alerts: state.alerts }));
      }
    },
    addHistoryEntry: (state, action: PayloadAction<Omit<AlertHistoryEntry, 'id'>>) => {
      const newEntry = {
        ...action.payload,
        id: Date.now().toString(),
        triggeredAt: new Date().toISOString(),
      };
      state.history.unshift(newEntry); // Add to start of array
      if (state.history.length > 100) { // Limit history to last 100 entries
        state.history = state.history.slice(0, 100);
      }
      localStorage.setItem('alertHistory', JSON.stringify(state.history));
    },
    clearHistory: (state) => {
      state.history = [];
      localStorage.setItem('alertHistory', JSON.stringify(state.history));
    },
    clearAllAlerts: (state) => {
      state.alerts = [];
      localStorage.setItem('cryptoAlerts', JSON.stringify({ alerts: state.alerts }));
    }
  },
});

export const { 
  addAlert, 
  removeAlert, 
  toggleAlert, 
  addHistoryEntry,
  clearHistory,
  clearAllAlerts 
} = alertsSlice.actions;

export default alertsSlice.reducer;