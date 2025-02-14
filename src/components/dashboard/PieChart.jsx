import React, { useEffect, useRef } from 'react'
import { useWasteData } from '../../hooks/useWasteData'

function PieChart () {
  const chartRef = useRef(null)
  const chartInstance = useRef(null)
  const previousData = useRef(null)
  const isInitialLoad = useRef(true)
  const { pieChartData, isLoading } = useWasteData()

  // Add waste type color mapping
  const wasteTypeColors = {
    'Paper': '#2DCE89',
    'Plastic': '#68D7FE',
    'Other': '#F4777C'
  }

  const hasDataChanged = () => {
    if (!previousData.current) return true
    return JSON.stringify(previousData.current) !== JSON.stringify(pieChartData)
  }

  useEffect(() => {
    if (window.Chart && !isLoading) {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }

      // Get unique waste types from data
      const uniqueWasteTypes = [...new Set(pieChartData.wasteTypes || [])]

      const dataPie = {
        labels: uniqueWasteTypes, // Dynamic labels based on actual waste types
        datasets: [
          {
            data: pieChartData.values,
            backgroundColor: uniqueWasteTypes.map(type => wasteTypeColors[type] || '#F4777C'), // Map colors to waste types
            hoverOffset: 4
          }
        ]
      }

      const configPie = {
        type: 'pie',
        data: dataPie,
        options: {
          responsive: true,
          maintainAspectRatio: true,
          animation: {
            duration: isInitialLoad.current || hasDataChanged() ? 750 : 0
          }
        }
      }

      chartInstance.current = new window.Chart(chartRef.current, configPie)
      previousData.current = pieChartData
      isInitialLoad.current = false
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [pieChartData, isLoading])
  //hello
  return (
    <div className='flex flex-col bg-white rounded-sm h-full'>
      <div className='py-6 px-5 text-xl font-normal text-black'>
        Waste Categories
      </div>
      <hr className='h-px bg-gray-100 border-0 dark:bg-gray-200' />
      <div className='flex-1 flex items-center justify-center min-h-[400px]'>
        <canvas ref={chartRef} className='w-full max-w-md h-auto mx-auto p-4' />
      </div>
    </div>
  )
}

export default PieChart
