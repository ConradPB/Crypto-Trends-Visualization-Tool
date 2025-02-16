import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import type { PriceAlert } from "../types/alerts";

const PriceAlerts: React.FC = () => {
  const { alerts, loading, error } = useSelector(
    (state: RootState) => state.alerts
  );
  const { prices } = useSelector((state: RootState) => state.crypto);

  const getActiveAlerts = (alerts: PriceAlert[]) => {
    if (!alerts || !Array.isArray(alerts)) return [];
    return alerts.filter((alert) => alert.isActive);
  };

  const activeAlerts = getActiveAlerts(alerts);

  if (loading) {
    return <div className="p-4">Loading alerts...</div>;
  }

  if (error) {
    return <div className="p-4 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Price Alerts</h2>
      {activeAlerts.length === 0 ? (
        <p className="text-gray-500">No active alerts</p>
      ) : (
        <ul className="space-y-4">
          {activeAlerts.map((alert) => (
            <li key={alert.id} className="border p-4 rounded-lg">
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium">{alert.coinId}</span>
                  <span className="ml-2 text-gray-600">
                    {alert.direction === "above" ? "↑" : "↓"} $
                    {alert.targetPrice}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  {new Date(alert.createdAt).toLocaleDateString()}
                </span>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PriceAlerts;
