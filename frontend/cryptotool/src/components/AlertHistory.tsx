import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearHistory } from "../features/alertsSlice";
import type { RootState } from "../store";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Tooltip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
} from "@mui/material";
import { Trash2, Filter, ArrowUpDown } from "lucide-react";
import { format } from "date-fns";

const AlertHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.alerts.history);

  // Pagination State
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Filtering and Sorting State
  const [filterCoin, setFilterCoin] = useState<string | null>(null);
  const [sortField, setSortField] = useState<"coinId" | "triggeredAt">(
    "triggeredAt"
  );
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  // Handle Pagination
  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when rows per page changes
  };

  // Apply Filters and Sorting
  const filteredHistory =
    filterCoin !== null
      ? history.filter((entry) => entry.coinId === filterCoin)
      : [...history];

  const sortedHistory = filteredHistory.sort((a, b) => {
    if (sortField === "coinId") {
      return sortOrder === "asc"
        ? a.coinId.localeCompare(b.coinId)
        : b.coinId.localeCompare(a.coinId);
    }
    if (sortField === "triggeredAt") {
      return sortOrder === "asc"
        ? new Date(a.triggeredAt).getTime() - new Date(b.triggeredAt).getTime()
        : new Date(b.triggeredAt).getTime() - new Date(a.triggeredAt).getTime();
    }
    return 0;
  });

  // Paginate Data
  const paginatedHistory = sortedHistory.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  // Toggle Sorting
  const handleSort = (field: "coinId" | "triggeredAt") => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      {/* Header */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h5" fontWeight="bold">
          Alert History
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<Trash2 />}
          onClick={() => dispatch(clearHistory())}
          sx={{
            "&:hover": {
              backgroundColor: "error.dark",
            },
          }}
        >
          Clear History
        </Button>
      </Box>

      {/* Filters */}
      <Box display="flex" gap={2} alignItems="center" mb={3}>
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel>Coin Filter</InputLabel>
          <Select
            value={filterCoin || ""}
            onChange={(e) => setFilterCoin(e.target.value || null)}
            label="Coin Filter"
          >
            <MenuItem value="">All Coins</MenuItem>
            {[...new Set(history.map((entry) => entry.coinId))].map((coin) => (
              <MenuItem key={coin} value={coin}>
                {coin.toUpperCase()}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Tooltip title="Sort by Coin">
          <IconButton onClick={() => handleSort("coinId")}>
            <ArrowUpDown />
          </IconButton>
        </Tooltip>

        <Tooltip title="Filter by Date">
          <IconButton onClick={() => handleSort("triggeredAt")}>
            <Filter />
          </IconButton>
        </Tooltip>
      </Box>

      
  );
};

export default AlertHistory;
