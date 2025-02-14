import { useWasteData } from '../../hooks/useWasteData';
import { useState, useEffect } from 'react';
import '../../components/styles/index.css';

function Toast() {
  const { newHighFillBins } = useWasteData();
  const [visibleToasts, setVisibleToasts] = useState([]);

  useEffect(() => {
    if (newHighFillBins.length > 0) {
      setVisibleToasts(newHighFillBins);
    }
  }, [newHighFillBins]);

  const closeToast = (binId) => {
    setVisibleToasts(prev => prev.filter(toast => toast.binId !== binId));
  };

  if (visibleToasts.length === 0) return null;

  return (
    <div className="fixed bottom-3 sm:bottom-5 right-3 sm:right-5 flex flex-col gap-2 sm:gap-3 z-50">
      {visibleToasts.map((bin) => (
        <div 
          key={bin.binId} 
          className="animate-slide-up flex items-center w-[280px] sm:w-full max-w-xs p-2 sm:p-4 mb-1 text-gray-800 bg-white border-l-4 border-red-500 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 dark:bg-slate-800 dark:text-gray-200"
        >
          <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 sm:size-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
            </svg>
          </div>
          <div className="flex-1 ms-2 sm:ms-3 px-1 sm:px-0">
            <div className="text-xs sm:text-sm font-semibold text-red-800 dark:text-red-200">
              Alert: High Fill Level
            </div>
            <div className="mt-0.5 sm:mt-1 text-xs sm:text-sm font-normal">
              Bin <span className="font-semibold">{bin.binId}</span> is <span className="font-bold">{bin.fillLevel}</span> full!
            </div>
          </div>
          <button 
            onClick={() => closeToast(bin.binId)}
            className="flex-shrink-0 inline-flex items-center justify-center h-6 w-6 sm:h-8 sm:w-8 rounded-lg text-gray-400 hover:text-gray-900 hover:bg-gray-100 dark:hover:bg-slate-700 dark:hover:text-white focus:ring-2 focus:ring-gray-300 transition-colors duration-200"
          >
            <span className="sr-only">Close</span>
            <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
          </button>
        </div>
      ))}
    </div>
  );
}

export default Toast;
