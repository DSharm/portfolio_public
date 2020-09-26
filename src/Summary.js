import React, { useEffect, useState } from 'react';

function Summary(props) {

  function NumberCommaSeparator(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  } 
    // const [totalValue, setTotalValue] = useState([])

    const [totalValue, setTotalValue] = useState(
        JSON.parse(localStorage.getItem('TotalPortfolio')) || []
    );
    // console.log(props.data)
    // console.log(totalValue)
    useEffect(() => {
        localStorage.setItem('TotalPortfolio', JSON.stringify(totalValue));
      }, [totalValue]);
    
    
    useEffect(() => {
        const vals = props.data.map((share) => {
            return share.props.stock.value
          })
        var result = vals.reduce(function(a,b){ return a + b}, 0);
        // console.log(typeof(result))
        // console.log(result.length)
        if (result>0) {
          // console.log(result)
          // totalValue = NumberCommaSeparator(totalValue.toFixed(2))
          setTotalValue(NumberCommaSeparator(result.toFixed(2)))
  
          // console.log(totalValue)
        } else {
          setTotalValue(result)
        }
        
      },[props.data]);

      // console.log(totalValue)
      
      // console.log(totalValue) 
  return (
    <div>
    <h4 className="text-light bg-dark text-center"> Your Total Portfolio Value Is: ${totalValue}</h4>
    {/* <h5 className="text-light bg-dark text-center"> Your Total Portfolio Value Is: ${totalValue}</h5> */}

    </div>
  )
}


export default Summary