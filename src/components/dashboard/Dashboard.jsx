import Navbar from './Navbar.jsx'
import Maps from './Map.jsx'
import HeaderCard from './HeaderCard.jsx'
import PieChart from './PieChart.jsx'
import Table from './Table.jsx'
import Toast from './Toast.jsx'

function Dashboard () {
  return (
    <div className='min-h-screen w-full overflow-x-hidden'>
      <Navbar />
      <main className='flex-1 p-6'>
        <HeaderCard />
        <div className='flex flex-col lg:flex-row gap-8 lg:gap-4 my-5 mt-9'>
          <div className='flex-1 bg-white rounded-sm shadow-md'>
            <PieChart />
          </div>
          <div className='flex-1 bg-white rounded-sm shadow-md min-h-[300px]'>
            <Maps />
          </div>
        </div>
        <Table />
        <Toast />
      </main>
    </div>
  )
}

export default Dashboard
