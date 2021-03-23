import React from 'react'
import { connect } from 'react-redux'
import Nav from './nav';

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

export default connect(mapStateToProps)(function SearchHistory(props) {
    const { user } = props

    return (
        <>
            <div className='pt-5'>
                <Nav />
            </div>
            <div className='container '>
                <ul className='list-group'>
                    {user.drinks.map(d =>
                        <li key={d.idDrink} className='list-group-item d-flex row'>
                            <img src={d.strDrinkThumb} className='col-3'/>
                            <div className='col-5 mt-5 mx-5'>
                                <h3>{d.strDrink}</h3>
                                <div style={{textAlign:'left'}}>
                                <h6>Instractions:</h6>
                                <p> {d.strInstructions}</p>
                                <h6>Category: </h6>
                                <p>{d.strCategory}</p>
                                <h6>Glass: </h6>
                                <p>{d.strGlass}</p>
                                </div>
                            </div>
                        </li>).reverse()}
                </ul>
            </div>
        </>
    )
})