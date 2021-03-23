import React, { useState } from 'react'
import { setEmail, setPassword, setToken, setName, setDrinks } from '../redux/action/userAction'
import { connect } from 'react-redux'
import { withRouter, Link, useHistory } from 'react-router-dom'
import wines from '../wines.jpeg'


function mapStateToProps(state) {
    return {
        user: state.userReducer.user
    }
}
function mapDispatchToProps(dispatch) {
    return {
        setName: (name) => dispatch(setName(name)),
        setPassword: (password) => dispatch(setPassword(password)),
        setEmail: (email) => dispatch(setEmail(email)),
        setToken: (token) => dispatch(setToken(token)),
        setDrinks: (drinks) => dispatch(setDrinks(drinks))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
    const { user, setEmail, setPassword, setName, setToken, setDrinks } = props
    const history = useHistory();
    const [msg, setMsg] = useState('')
    function login(e) {
        e.preventDefault()
        fetch('http://localhost:3001/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "email": user.email, "password": user.password }),
        }).then(response => response.json())
            .then(data => {
                if (data.msg) 
                    setMsg(`User was not found!!!\            press "register" button to register`)
                else {
                    setToken(data.token)
                    setEmail(data.email)
                    setName(data.name)
                    setPassword(data.password)
                    data.drinks.forEach(element => {
                        setDrinks(element)
                    });
                    history.push('/drinksList')
                }
            })
            .catch(err => {

                console.log(err.message);
            })
    }

    return (
        <>
            <img src={wines} className='imgLogin' />
            <div className='d-flex justify-content-center login'>
                <form className='form-group'>
                    <input type='text' placeholder='email' className='form-control' onChange={e => setEmail(e.target.value)} />
                    <br />
                    <input type='password' placeholder='password' className='form-control' onChange={e => setPassword(e.target.value)} />
                    <br />
                    {msg ? <div className='alert alert-danger'>{msg}</div> : null}
                    <button className='btn' type='button' onClick={e => login(e)} >login</button>
                    <br />
                    <Link to='/register'><button className='btn mt-4 regiterBtn' type='button' >register</button></Link>
                </form>
            </div>
        </>
    )
}))