import { PriceAlert } from '../features/alertsSlice';
import { CryptoPriceData } from '../features/cryptoSlice';

export interface AlertCheck {
  alert: PriceAlert;
  triggered: boolean;
  currentPrice: number;
}

export const checkAlerts = (
  alerts: PriceAlert[],
  prices: Record<string, CryptoPriceData>
): AlertCheck[] => {
  return alerts
    .filter(alert => alert.isActive)
    .map(alert => {
      const currentPrice = prices[alert.coinId]?.usd;
      if (!currentPrice) return { alert, triggered: false, currentPrice: 0 };

      const triggered = alert.condition === 'above'
        ? currentPrice >= alert.targetPrice
        : currentPrice <= alert.targetPrice;

      return { alert, triggered, currentPrice };
    });
};