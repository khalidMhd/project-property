import react from 'react'
import { Chart } from "react-google-charts";


const RegulareChart = () => {

    return (
        <>
        <h4 className='text-center pt-2'>Rates Analytics </h4>
        <Chart
        
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={[
          ['Style', 'Fruit', 'Vagetible', 'Poultry'],
          ['Sun', 92, 96, 2],
          ['Mon', 86, 80, 32],
          ['Tue', 76, 70, 23],
          ['Wed', 56, 60, 34],
          ['Thu', 59, 50, 63],
          ['Fri', 72, 22, 60],
          ['Sat', 80, 17, 40],
        ]}
        options={{
          isStacked: false,
          height: 300,
          legend: { position: 'top', maxLines: 3 },
          vAxis: {
            minValue: 0,
          },
          hAxis: {
            title: 'Date'
          },
        }}
        rootProps={{ 'data-testid': '2' }}
      /> 
      </>      
    )
}

export default RegulareChart