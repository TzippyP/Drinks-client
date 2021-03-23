import React from 'react'
import {
    Link
} from 'react-router-dom'
import '../App.css'
export default function Nav(props) {
    const {backToDrinkList}=props
    return (
        <>
            <div className='nav'>
                <ul>
                    <li className='px-2' onClick={backToDrinkList}>
                        <Link to='/drinksList' >Drinks List</Link>
                    </li>
                    <li className='px-2'>
                        <Link to='/searchHistory'>Search History</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
