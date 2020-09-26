import React, { useState } from 'react';

function Portfolio(props) {
    function NumberCommaSeparator(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    }

    let stock = "You currently have no shares"
    let value = "no value"
    // console.log(props.stock.symbol)
    if (props.stock.symbol) {
        stock = props.stock.symbol
        value = props.stock.latestPrice * Number(props.stock.numShares)
        value = NumberCommaSeparator(value.toFixed(2))
        // console.log(value)
    }

    // console.log(props.stock)

    // console.log(props.stock)
  return (
    <tr key={props.stock.symbol}><td>{stock}</td><td>${props.stock.latestPrice}</td><td>{props.stock.numShares}</td><td>${value}</td></tr>
  )
}


export default Portfolio