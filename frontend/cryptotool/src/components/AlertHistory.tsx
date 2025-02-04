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
};

export default AlertHistory;
