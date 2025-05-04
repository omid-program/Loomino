import ChartComponent from '@/Components/DashboardTools/SalesReport/ChartComponent/ChartComponent'
import PagesTitle from '@/Components/PageTitle/PagesTitle'
import { TAllOrdData } from '@/types'
import axios from 'axios'
import React from 'react'

async function Dashboard () {
  const response = await fetch(`http://localhost:8000/ords`)
  const data= await response.json() as TAllOrdData[]
  console.log(data);
  
  return (
    <div>
      <PagesTitle title='داشبورد'/>
      <div>
        <ChartComponent  data={data}/>
        {/* {
          for(let i = 1 ; i++ ; i < 31){
            let selectData = 
          }
        } */}
      </div>
    </div>
  )
}

export default Dashboard
