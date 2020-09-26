import React, { useState } from 'react';

function BuyShares(props) {

  const [term, setTerm] = useState([])
  const [numShares, setNumShares] = useState([])

  function handleStockChange(e) {
    setTerm(e.target.value.toUpperCase());
  }

  function handleNumChange(e) {
    setNumShares(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault()
    setTerm([])
    setNumShares([])
    console.log(props.portfolio)
    if (props.portfolio[0]) {
        const symbols = props.portfolio.map((share) => {return(share.symbol)})
        if (symbols.includes(term)) {
            // console.log("submit exists")
            props.submitAlreadyExists(term,numShares)   
        } else {
            // console.log("new")
                props.submitNewBuy(term,numShares)
        }
        // console.log(symbols)
        // const state = props.portfolio.map((share) => {
        //     if (share.symbol === term) {
        //         console.log("submit exists")
        //         props.submitAlreadyExists(term,numShares)
        //     } else {
        //         console.log("new")
        //         props.submitNewBuy(term,numShares)
        //     }
        //   })
    } else {
        // console.log("original new")
        props.submitNewBuy(term,numShares)
    }
    

    // props.submitHandler(term,numShares)
  }

  return (
    <div>
        {/* <button onClick={handleSubmit} className="btn btn-primary" href="#">Buy Shares</button> */}
      <h5> Purchase Shares</h5>
      <form onSubmit={handleSubmit}>
        <input size="35" onChange={handleStockChange} value={term} className="p-1 mb-1 mr-2" placeholder="Search stock symbol (e.g. IBM, AAPL)"></input>
        <input size="2" type = "number" min={0} pattern="\d+" onChange={handleNumChange} value={numShares} className="p-1" placeholder="Number Shares"></input>
        <button onClick={handleSubmit} className="btn btn-info mb-2 mt-1 ml-3" href="#">Buy</button>
        <br/>
        {/* <input type="submit"/> */}
      </form>    
    </div>
  )
}


export default BuyShares

