import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAlert,
  addHistoryEntry,
  removeAlert,
  toggleAlert,
} from "../features/alertsSlice";
import { fetchCryptoPrices } from "../features/cryptoSlice";
import { checkAlerts } from "../utils/alertChecker";
import { Bell, BellOff, Trash2 } from "lucide-react";
import type { RootState, AppDispatch } from "../store";
import type { PriceAlert } from "../features/alertsSlice";
import { AlertCheck } from "../utils/alertChecker";
import { SoundNotification } from "../utils/soundNotification";
import AlertHistory from "./AlertHistory";
import {
  Box,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  IconButton,
  Tooltip,
  Paper,
} from "@mui/material";

type AlertCondition = "above" | "below";
type AlertFrequency = "onetime" | "daily" | "weekly";

interface NewAlertState {
  coinId: string;
  targetPrice: string;
  condition: AlertCondition;
  frequency: AlertFrequency;
}

const PriceAlerts = () => {
  const dispatch = useDispatch<AppDispatch>();
  const alerts = useSelector((state: RootState) => state.alerts.alerts);
  const prices = useSelector((state: RootState) => state.crypto.prices);
  const [triggeredAlerts, setTriggeredAlerts] = useState<AlertCheck[]>([]);
  const [isSoundEnabled, setIsSoundEnabled] = useState(() => {
    const savedSoundPreference = localStorage.getItem(
      "soundNotificationEnabled"
    );
    return savedSoundPreference === null
      ? true
      : savedSoundPreference === "true";
  });
  const [soundNotification] = useState(new SoundNotification());

  const [newAlert, setNewAlert] = useState<NewAlertState>({
    coinId: "bitcoin",
    targetPrice: "",
    condition: "above",
    frequency: "onetime",
  });

  // Fetch prices periodically
  useEffect(() => {
    const fetchPricesForAlerts = () => {
      const uniqueCoins = [...new Set(alerts.map((alert) => alert.coinId))];
      if (uniqueCoins.length > 0) {
        dispatch(fetchCryptoPrices(uniqueCoins.join(",")));
      }
    };

    fetchPricesForAlerts();
    const interval = setInterval(fetchPricesForAlerts, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [alerts, dispatch]);

  // Check alerts when prices update
  useEffect(() => {
    if (Object.keys(prices).length > 0) {
      const checkedAlerts = checkAlerts(alerts, prices);
      const newTriggeredAlerts = checkedAlerts.filter(
        (check) => check.triggered
      );

      // Record history and show notifications for newly triggered alerts
      newTriggeredAlerts.forEach(({ alert, currentPrice }) => {
        if (isSoundEnabled) {
          soundNotification.play();
        }

        dispatch(
          addHistoryEntry({
            alertId: alert.id,
            coinId: alert.coinId,
            targetPrice: alert.targetPrice,
            condition: alert.condition,
            price: currentPrice,
            triggeredAt: new Date().toISOString(),
          })
        );

        if ("Notification" in window && Notification.permission === "granted") {
          new Notification("Price Alert Triggered!", {
            body: `${alert.coinId.toUpperCase()} is now ${alert.condition} $${
              alert.targetPrice
            } (Current: $${currentPrice.toFixed(2)})`,
          });
        }
      });

      setTriggeredAlerts(checkedAlerts);
    }
  }, [prices, alerts, dispatch, soundNotification, isSoundEnabled]);

  // Toggle sound notification
  const toggleSoundNotification = () => {
    const newSoundState = !isSoundEnabled;
    setIsSoundEnabled(newSoundState);
    localStorage.setItem("soundNotificationEnabled", newSoundState.toString());
  };

  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlert.targetPrice) return;

    dispatch(
      addAlert({
        coinId: newAlert.coinId,
        targetPrice: Number(newAlert.targetPrice),
        condition: newAlert.condition,
        frequency: newAlert.frequency,
        isActive: true,
      })
    );

    setNewAlert((prev) => ({ ...prev, targetPrice: "" }));
  };

  const getAlertStatus = (alert: PriceAlert) => {
    const checkResult = triggeredAlerts.find(
      (check) => check.alert.id === alert.id
    );
    if (!checkResult) return null;

    return {
      triggered: checkResult.triggered,
      currentPrice: checkResult.currentPrice,
    };
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Title */}
      <Typography variant="h4" gutterBottom textAlign="center">
        Price Alerts
      </Typography>

      {/* Add New Alert Form */}
      <Paper
        elevation={3}
        sx={{
          p: 3,
          mt: 2,
          borderRadius: 2,
          backgroundColor: (theme) =>
            theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
        }}
      >
        <form onSubmit={handleSubmit}>
          <Box display="flex" gap={2} flexWrap="wrap">
            {/* Coin Selector */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Cryptocurrency</InputLabel>
              <Select
                value={newAlert.coinId}
                onChange={(e) =>
                  setNewAlert((prev) => ({ ...prev, coinId: e.target.value }))
                }
                label="Cryptocurrency"
              >
                <MenuItem value="bitcoin">Bitcoin</MenuItem>
                <MenuItem value="ethereum">Ethereum</MenuItem>
                <MenuItem value="dogecoin">Dogecoin</MenuItem>
              </Select>
            </FormControl>

            {/* Condition Selector */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Condition</InputLabel>
              <Select
                value={newAlert.condition}
                onChange={(e) =>
                  setNewAlert((prev) => ({
                    ...prev,
                    condition: e.target.value as AlertCondition,
                  }))
                }
                label="Condition"
              >
                <MenuItem value="above">Above</MenuItem>
                <MenuItem value="below">Below</MenuItem>
              </Select>
            </FormControl>

            {/* Frequency Selector */}
            <FormControl fullWidth variant="outlined" size="small">
              <InputLabel>Frequency</InputLabel>
              <Select
                value={newAlert.frequency}
                onChange={(e) =>
                  setNewAlert((prev) => ({
                    ...prev,
                    frequency: e.target.value as AlertFrequency,
                  }))
                }
                label="Frequency"
              >
                <MenuItem value="onetime">One-Time</MenuItem>
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
              </Select>
            </FormControl>

            {/* Target Price Input */}
            <TextField
              type="number"
              value={newAlert.targetPrice}
              onChange={(e) =>
                setNewAlert((prev) => ({
                  ...prev,
                  targetPrice: e.target.value,
                }))
              }
              label="Target Price"
              variant="outlined"
              size="small"
              fullWidth
            />

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                px: 5,
                py: 2,
                height: "100%",
                "&:hover": {
                  backgroundColor: (theme) => theme.palette.primary.dark,
                },
              }}
            >
              Add Alert
            </Button>
          </Box>
        </form>
      </Paper>

      {/* Alerts List */}
      <Box mt={4}>
        {alerts.length === 0 ? (
          <Typography variant="subtitle1" textAlign="center">
            No alerts set yet.
          </Typography>
        ) : (
          alerts.map((alert) => {
            const status = getAlertStatus(alert);
            return (
              <Paper
                key={alert.id}
                elevation={3}
                sx={{
                  p: 3,
                  mt: 2,
                  borderRadius: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  backgroundColor: (theme) =>
                    theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              >
                {/* Alert Details */}
                <Box>
                  <Typography variant="h6">
                    {alert.coinId.toUpperCase()} {alert.condition} $
                    {alert.targetPrice.toLocaleString()}
                  </Typography>
                  {status && (
                    <Typography variant="body2" color="textSecondary">
                      Current: $
                      {status.currentPrice.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </Typography>
                  )}
                </Box>

                {/* Actions */}
                <Box display="flex" gap={2}>
                  {/* Toggle Active State */}
                  <Tooltip
                    title={alert.isActive ? "Disable Alert" : "Enable Alert"}
                  >
                    <IconButton
                      onClick={() => dispatch(toggleAlert(alert.id))}
                      sx={{
                        backgroundColor: alert.isActive
                          ? "success.light"
                          : "grey.300",
                        "&:hover": {
                          backgroundColor: alert.isActive
                            ? "success.main"
                            : "grey.400",
                        },
                      }}
                    >
                      {alert.isActive ? (
                        <Bell color="success" />
                      ) : (
                        <BellOff color="disabled" />
                      )}
                    </IconButton>
                  </Tooltip>

                  {/* Remove Alert */}
                  <Tooltip title="Remove Alert">
                    <IconButton
                      onClick={() => dispatch(removeAlert(alert.id))}
                      sx={{
                        backgroundColor: "error.light",
                        "&:hover": {
                          backgroundColor: "error.main",
                        },
                      }}
                    >
                      <Trash2 color="error" />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Paper>
            );
          })
        )}
      </Box>

      {/* Alert History */}
      <Box mt={4}>
        <AlertHistory />
      </Box>

      {/* Sound Notifications Toggle */}
      <Box mt={4} display="flex" justifyContent="center">
        <Tooltip title="Toggle Sound Notifications">
          <label
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <input
              type="checkbox"
              checked={isSoundEnabled}
              onChange={toggleSoundNotification}
              style={{ display: "none" }}
            />
            <Box
              sx={{
                width: 40,
                height: 20,
                borderRadius: 20,
                backgroundColor: isSoundEnabled ? "primary.main" : "grey.300",
                position: "relative",
                transition: "background-color 0.3s",
                "&:hover": {
                  backgroundColor: isSoundEnabled ? "primary.dark" : "grey.400",
                },
              }}
            >
              <Box
                sx={{
                  width: 16,
                  height: 16,
                  borderRadius: "50%",
                  backgroundColor: "#fff",
                  position: "absolute",
                  top: 2,
                  left: isSoundEnabled ? 20 : 2,
                  transition: "left 0.3s",
                }}
              ></Box>
            </Box>
            <Typography variant="body1" ml={2}>
              Sound Notifications
            </Typography>
          </label>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default PriceAlerts;
