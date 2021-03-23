import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import SelectDrinks from './selectDrinks';
import {setDrinks} from '../redux/action/userAction'
import Nav from './nav';
import '../App.css'

function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setUsersDrinks: (drink) => dispatch(setDrinks(drink)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(function DrinkList(props) {
    const { user,setUsersDrinks } = props
    const [drinks, setDrinks] = useState([])
    const [filterDrink, setFilterDrink] = useState([])

    useEffect(() => {
        fetch(`${localStorage.getItem('url')}/getAllDrinks`, {
            method: 'GET',
            headers: {
                'Authorization': user.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setDrinks(data.drinks)
                setFilterDrink(data.drinks)
            })
            .catch(err => {
                console.log(err.message);
            })
    }, [])

    function backToDrinkList() {
        setFilterDrink(drinks);
    }

    function selectedValue(name) {
        fetch(`${localStorage.getItem('url')}/getDrinkByName/${name}`, {
            method: 'GET',
            headers: {
                'Authorization': user.token
            }
        }).then(response => response.json())
            .then(data => {
                setFilterDrink([data])
                setUsersDrinks(data)
            })
            .catch(err => {
                console.log(err.message);
            })
    }


    return (
        <>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='container'>
                        {drinks ?
                            <>
                                <div className='row d-flex justify-content-between pt-5 '>
                                    <Nav className='col' backToDrinkList={backToDrinkList}/>
                                    <SelectDrinks className='col' drinks={drinks} selectedValue={selectedValue} />
                                </div>

                                <ul className='list-group container pt-5' style={({ width: '100%' })}>
                                    <div className='row d-flex justify-content-center aling-items-center' >
                                        {filterDrink.length === 1 ?
                                            <>
                                                {/* /* אם נבחר פריט, הפריט מוצג עם כל הפרטים */}

                                                <li className='list-group-item d-flex' >
                                                    <img src={filterDrink[0].strDrinkThumb} className='col-4' />
                                                    <div className='col-5'>
                                                        <h3>{filterDrink[0].strDrink}</h3>
                                                        <p><h6>Instractions:</h6> {filterDrink[0].strInstructions}</p>
                                                        <p><h6>Category: </h6>{filterDrink[0].strCategory}</p>
                                                        <p><h6>Glass: </h6>{filterDrink[0].strGlass}</p>
                                                    </div>
                                                </li>
                                                <div className='d-flex justify-content-end m-5 row divGlyphicon ' >
                                                    <i class="glyphicon glyphicon-share-alt col-1 " onClick={backToDrinkList}></i>
                                                </div>
                                            </> :
                                            filterDrink.map(d =>
                                                <li key={d.idDrink} className='list-group-item col-4' onClick={e => selectedValue(d.strDrink)}>
                                                    <p>{d.strDrink}</p>
                                                    <img src={d.strDrinkThumb} />
                                                </li>
                                            )
                                        }
                                    </div>
                                </ul>

                            </> : null
                        }
                    </div>
                </div>
            </div>
        </>
    )
})