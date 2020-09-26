import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import BuyShares from './BuyShares.js';
import SellShares from './SellShares.js';
import Portfolio from './Portfolio';
import Table from './Table';
import Summary from './Summary';

function App(props) {

  useEffect(() => {
    fetch_sp("SPY");
    fetch_iwm("IWM");

    get_updated_prices();
    fetch_dow("DIA");
  },[]);


  const [portfolio, setPortfolio] = useState(
    JSON.parse(localStorage.getItem('savePortfolio')) || []
  );

  useEffect(() => {
    localStorage.setItem('savePortfolio', JSON.stringify(portfolio));
  }, [portfolio]);



  function update_prices() {
    return(portfolio.map((share) => {
        const url = urlForIEX(share.symbol)
        // console.log(share.symbol)
        fetch(url).then((r) => r.json()).then((data) => {
          share.latestPrice = data.latestPrice
          share.value = share.latestPrice * share.numShares
          // console.log(share)
          return(share)
          });
        }
      )
    )
  }

  function get_updated_prices() {
    let shares_state = update_prices()
    // console.log(shares_state)
  }
    


  const [dow, setDow] = useState([]);
  const [spy, setSpy] = useState([]);
  const [russell, setRussell] = useState([]);

  function fetch_dow(stock) {
    const url = urlForIEX(stock)

    fetch(url).then((r) => r.json()).then((data) => {
      // console.log(data)
      setDow(data.changePercent)
    });
  }

  function fetch_sp(stock) {
    const url = urlForIEX(stock)

    fetch(url).then((r) => r.json()).then((data) => {
      // console.log(data)
      setSpy(data.changePercent)
    });
  }

  function fetch_iwm(stock) {
    const url = urlForIEX(stock)

    fetch(url).then((r) => r.json()).then((data) => {
      // console.log(data)
      setRussell(data.changePercent)
    });
  }

  function handleNewBuy(stock,number_shares) {
    try {
      stock = stock.toUpperCase()
      // console.log(stock)
      const url = urlForIEX(stock)

      if (number_shares < 0) {
        window.alert("Number of shares must be a positive number")
      } else {
        fetch(url)
        .then((r) => r.json())
        .then((data) => {
          setPortfolio(oldArray => [...oldArray, {symbol : data.symbol, 
                                                  latestPrice: data.latestPrice, 
                                                  numShares: Number(number_shares),
                                                  value: data.latestPrice * Number(number_shares)}])
                                                })
        .catch((error) => {window.alert("That stock symbol might be incorrect. Please try another one!")}) 

      }
       
    }
    catch(err) {
      window.alert("Something went wrong - please try again.")
    }
                                              

  }
  function handleAlreadyExists(stock,number_shares) {
    try{
      stock = stock.toUpperCase()
      // console.log(stock)
      if (number_shares < 0) {
        window.alert("Number of shares must be a positive number")
      } else {
        
        get_updated_prices();
        const state = portfolio.map((share) => {
        if (share.symbol === stock) {
          share.numShares = Number(share.numShares) + Number(number_shares)
          share.value = share.latestPrice * share.numShares
        }
      return(share)
      })
      setPortfolio(state)
      }
    }
    catch(err){
      window.alert("Something went wrong - please try again.")
    }
    
  }

  function handleSell(stock,number_shares) {
    try {
      stock = stock.toUpperCase()
      // console.log(stock)
      if (number_shares <0) {
        window.alert("Number of shares must be a positive number")
      } else {
          get_updated_prices();
          const state = portfolio.filter((share) => {
          if (share.symbol === stock) {
            if (number_shares < share.numShares) {
              share.numShares = Number(share.numShares) - Number(number_shares)
              share.value = share.latestPrice * share.numShares
              // result.push(share)
              return true
            } else if (number_shares === share.numShares) {
              return false
            }
          } else {
            return true
          }
        }).map((share) => {return share})
        // console.log(state)
        setPortfolio(state)
      }
    }
    catch(err){
      window.alert("Something went wrong - please try again.")
    }
  }
    

  function handleSort(sortKey, direction) {
    let data_sorted;

    function sort_by_key(array, key)
        {
        return array.sort(function(a, b)
        {
          var x = a[key]; var y = b[key];
          return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
        }
    function sort_by_key_reverse(array, key)
        {
        return array.sort(function(a, b)
        {
          var x = a[key]; var y = b[key];
          return ((x < y) ? 1 : ((x > y) ? -1 : 0));
        });
        }

    // e.preventDefault()
    const data = [...portfolio]
    if (direction === "down") {
      data_sorted = sort_by_key_reverse(data, sortKey)
      // console.log(data_sorted)

    } else if (direction === "up") {
      data_sorted = sort_by_key(data, sortKey)
      // console.log(data_sorted)
    }
    setPortfolio(data_sorted)
  }

  function urlForIEX(stock) {
    const api_key = "YOUR_API_KEY"
    // const base_url = "https://sandbox.iexapis.com"
    const base_url = "https://cloud.iexapis.com/"
    const version = "stable"
    const end_point = `stock/${stock}/quote`
    let api_url = null
    let chart_api_url = null
    api_url = `${base_url}/${version}/${end_point}?${api_key}`
    return(api_url)
    // https://sandbox.iexapis.com/v1/stock/market/batch?types=chart,splits,news&symbols=aapl,goog,fb&range=5y &token=YOUR_TEST_TOKEN_HERE
  }

  const shares = portfolio.map((share) => {
    return <Portfolio key={share.symbol} stock={share}/>
  })


  return (
    <div className="container mt-5 shadow-sm p-4 pl-10 mb-5 bg-light rounded">
      <div className="row mb-5">
        <div className="col-sm-5" >
            <h2 className='text-info'> How was the market today? </h2>
        </div>  
        <div className = "col-sm-7 my-auto">
              <h3 > Dow: {Math.round(dow *10000.00)/100.00}%</h3> 
              <h3 > S&P 500: {Math.round(spy *10000.00)/100.00}%</h3>
              <h3 > Russell: {Math.round(russell *10000.00)/100.00}%</h3> 
        </div>
      </div>
      <div className="row">
        <div className="col-sm-6">
          <h2 className='text-info text-center'> Your Portfolio</h2>
          <hr/>
          <Summary data = {shares}/>
          <Table data = {shares} submitHandleSort={handleSort}/>

        </div>
        <div className="col-sm-6">
          <h2 className='text-info text-center'> Available Actions </h2>
          <hr/>
          <BuyShares submitAlreadyExists = {handleAlreadyExists} submitNewBuy = {handleNewBuy} portfolio = {portfolio}/> 
          <SellShares submitHandler = {handleSell}/> 
        </div>
      </div>
    </div>
  );
}

export default App;

// References
// https://stackoverflow.com/questions/58248621/react-hooks-component-not-updating-when-object-is-sorted
// https://stackoverflow.com/questions/44375407/how-to-make-a-table-in-reactjs-sortable
// https://www.florin-pop.com/blog/2019/07/sort-table-data-with-react/
// https://stackoverflow.com/questions/17015931/sum-values-in-json-array-response

