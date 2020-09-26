import React, { useState } from 'react';
// import { FaAngleUp } from 'react-icons/fa';
// import { FaAngleDown } from 'react-icons/fa';
// import { FaArrowUp } from 'react-icons/fa';
// import { FaAsterisk } from 'react-icons/fa';
// import { FaArrowsV } from 'react-icons/fa';
// get our fontawesome imports
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



function Table(props) {

    // const sortTypes = {
    //     up: {
    //         class: 'AngleUp',
    //     },
    //     down: {
    //         class: 'AngleDown',
    //     },
    //     default: {
    //         class: 'ArrowsV',
    //         fn: (a, b) => a
    //     }
    // };

    const [state, setState] = useState({currentSort: 'default'})
    // console.log(state)
    const [icon, setIcon] = useState(<i className="glyphicon glyphicon-minus"/>)

    // function handleSort(e, sortKey) {
    //     e.preventDefault()
    //     const data = [...portfolio]
    //     console.log(portfolio)
    //     data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
    //     setPortfolio(data)
    //     console.log(data)
    //   }
    

    function onSort(e, sortKey) {
        e.preventDefault()
        const { currentSort } = state;
        let nextSort;
        let ic;
        console.log(sortKey)
        // const data = [...props.data]
        if (currentSort === 'down') {
            nextSort = 'up'
            ic = <i className="glyphicon glyphicon-chevron-up"/>           
            // data.sort((a,b) => a[sortKey].localeCompare(b[sortKey]))
            // setPortfolio(data)
            props.submitHandleSort(sortKey, "up")
        } else if (currentSort === 'up') {
            nextSort = 'down'
            ic = <i className="glyphicon glyphicon-chevron-down"/>
            props.submitHandleSort(sortKey, "down")
            
        } else if (currentSort === 'default') {
            nextSort = 'up'
            ic = <i className="glyphicon glyphicon-chevron-up"/>
            props.submitHandleSort(sortKey,"up")
        }

		setState({
			currentSort: nextSort
        });
        
        setIcon(ic)
    }

    // const {currentSort} = state;
    // console.log(sortTypes[currentSort].class)
  return (
    <div>
    <table className="table border">
    <thead>
        <tr>
            {/* <th onClick={e => handleSort(e,'symbol')} colSpan="1">Symbol</th> */}
            <th className='text-center' colSpan="1">Symbol
                <button className="btn"  onClick={e => onSort(e,'symbol')}>
                {icon}
                </button>
            </th>
            <th className='text-center' colSpan="1">Current Price
                <button className="btn" onClick={e => onSort(e,'latestPrice')}>
                {icon}
                </button>
            </th>
            <th className='text-center' colSpan="1">Number of Shares
                <button className="btn" onClick={e => onSort(e,'numShares')}>
                {icon}
                </button>
            </th>
            <th className='text-center' colSpan="1">Total Value
                <button className="btn" onClick={e => onSort(e,'value')}>
                {icon}
                </button>
            </th>
        </tr>       
    </thead>
    <tbody className='text-center' id = "table1_body">
      {props.data}
    </tbody>
    </table>
    </div>
  )
}


export default Table