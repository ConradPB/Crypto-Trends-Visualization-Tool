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

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold dark:text-white">Alert History</h3>
        <button
          onClick={() => dispatch(clearHistory())}
          className="flex items-center gap-2 px-3 py-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200 dark:bg-red-900 dark:text-red-400 dark:hover:bg-red-800"
        >
          <Trash2 className="h-4 w-4" />
          Clear History
        </button>
      </div>
      <div className="space-y-2">
        {paginatedHistory.map((entry) => (
          <div
            key={entry.id}
            className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="font-medium text-gray-900 dark:text-white">
                  {entry.coinId.toUpperCase()}
                </span>
                <span className="ml-2 text-gray-600 dark:text-gray-400">
                  went {entry.condition} ${entry.targetPrice.toLocaleString()}
                </span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {format(new Date(entry.triggeredAt), 'MMM d, yyyy HH:mm:ss')}
              </span>
            </div>
            <div className="mt-1 text-sm text-gray-600 dark:text-gray-400">
              Price at trigger: ${entry.price.toLocaleString()}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-md disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
        >
          <ChevronLeft className="h-4 w-4" />
          Previous
        </button>
        <span className="text-sm text-gray-600 dark:text-gray-300">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="flex items-center gap-2 px-3 py-2 bg-gray-100 text-gray-600 rounded-md disabled:opacity-50 dark:bg-gray-700 dark:text-gray-300"
        >
          Next
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default AlertHistory;