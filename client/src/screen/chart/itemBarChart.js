import react, { useState } from 'react'
import { Chart } from "react-google-charts";
import { useDispatch, useSelector } from 'react-redux'


const ItemBarChart = (props) => {
  const [chartSelect, setcChartSelect] = useState(1)

  const itemListData = useSelector(state => state.itemListData);
  const { itemList, loading: listItemLoading, error: listItemError } = itemListData;

  const getFruits = () => {
    var data = []
    data.push(['Item', "Max Price", "Min Price"])

    var fruitData = itemList.filter(function (item) {
      return item ?.category === 'fruit' || item ?.category === 'fruits' 
    })
    fruitData.map(item =>
      data.push([item.name, item ?.maxPrice, item ?.minPrice])
    )
    return data
  }

  const getVagetable = () => {
    var data = []
    data.push(['Item', "Max Price", "Min Price"])

    var vagetableData = itemList.filter(function (item) {
      return item ?.category === 'vegetable' || item ?.category === 'vegetables' ||  item ?.category === 'vagetable' || item ?.category === 'vagetables'
    })
    vagetableData.map(item =>
      data.push([item.name, item ?.maxPrice, item ?.minPrice])
    )
    return data
  }

  function chartData() {
    if (chartSelect === 1) {
      return getFruits()
    }
    if (chartSelect === 2) {
      return getVagetable()
    }
    else {
      return getFruits()
    }

  };

  return (
    <>
      <div className='d-flex justify-content-between'>
        <div className=''>
          <h3 className='text-center text-muted '>Rates Analytics</h3>
        </div>

        <div className="dropdown d-flex justify-content-end mt-2">

          <button className="btn btn-primary mx-1 mb-1" onClick={() => setcChartSelect(1)} >Fruits</button>
          <button className="btn btn-success mx-1 mb-1" onClick={() => setcChartSelect(2)}>Vegetables</button>
        </div>
      </div>
      <Chart
        // width={'500px'}
        // height={'300px'}

        chartType="ComboChart"
        loader={<div>Loading Chart</div>}
        data={
          chartData()
        }
        options={{
          // colors: ['#FB7A21'],
          // backgroundColor: '#2F4F4F',
          chart: {
            title: 'Company Performance',
            subtitle: 'Sales, Expenses, and Profit: 2014-2017',
          },
          legend: { position: 'none' },
          title: "weeklyTitle",
          titleTextStyle: { color: '#FFF' },
          // vAxis: { title: 'Percentage', titleTextStyle: { color: '#FFF' }, textStyle: { color: '#FFF' } },
          // hAxis: { title: 'Month', fontSize: 28, titleTextStyle: { color: '#FFF' }, textStyle: { color: '#FFF' } },
          seriesType: 'bars',
          series: { 5: { type: 'line' } },
        }}
        rootProps={{ 'data-testid': '1' }}
      />
    </>
  )
}

export default ItemBarChart