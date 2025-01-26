import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearHistory } from '../features/alertsSlice';
import type { RootState } from '../store';
import { History, Trash2, ChevronLeft, ChevronRight } from 'lucide-react';
import { format } from 'date-fns';

const AlertHistory = () => {
  const dispatch = useDispatch();
  const history = useSelector((state: RootState) => state.alerts.history);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(history.length / itemsPerPage);

  const paginatedHistory = history.slice(
    (currentPage - 1) * itemsPerPage, 
    currentPage * itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (history.length === 0) {
    return (
      <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <History className="mx-auto h-8 w-8 text-gray-400 dark:text-gray-600 mb-2" />
        <p className="text-gray-500 dark:text-gray-400">No alert history yet</p>
      </div>
    );
  }



export default AlertHistory;