import React, { useState } from 'react';

function SellShares(props) {

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
    props.submitHandler(term,numShares)
  }

  return (
    <div>
        {/* <button onClick={handleSubmit} className="btn btn-primary" href="#">Sell Shares</button>
        <form onSubmit={handleSubmit}>
        <input onChange={handleStockChange} value={term} className="p-1 ml-5" placeholder="Search by stock symbol (e.g. IBM, AAPL)... "></input>
        <input onChange={handleNumChange} value={numShares} className="p-1 ml-5" placeholder="Number Shares"></input>
        </form> */}
      <h5> Sell Shares</h5>
      <form onSubmit={handleSubmit}>
        <input size="35" onChange={handleStockChange} value={term} className="p-1 mb-1 mr-2" placeholder="Search stock symbol (e.g. IBM, AAPL)"></input>
        <input size="2" type = "number" min={0} pattern="\d+" onChange={handleNumChange} value={numShares} className="p-1" placeholder="Number Shares"></input>
        <button onClick={handleSubmit} className="btn btn-info mb-2 mt-1 ml-3" href="#">Sell</button>
        <br/>
        {/* <input type="submit"/> */}
      </form>

    </div>
  )
}


export default SellShares