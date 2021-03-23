import React from 'react'
import { setEmail, setPassword, setName, setToken } from '../redux/action/userAction'
import { connect } from 'react-redux'
import wines from '../wines.jpeg'
import { withRouter } from 'react-router-dom'



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
        setToken: (token) => dispatch(setToken(token))
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(function Register(props) {
    const { history } = props
    const { user, setEmail, setPassword, setName, setToken } = props
    function register() {
        console.log('register');
        fetch('http://localhost:3001/newUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        })
            .then(response => response.json() )
            .then(data => {
                setToken(data.token)
                history.push('/drinksList')
            })
            .catch(err => {
                console.log(err.message);
            })
    }
    return (
        <>
            <img src={wines} className='imgLogin' />

            <div className='d-flex justify-content-center register '>
                <form className='form-group'>
                    <input type='text' placeholder='name' className='form-control' onChange={e => setName(e.target.value)} />
                    <br />
                    <input type='text' placeholder='email' className='form-control' onChange={e => setEmail(e.target.value)} />
                    <br />
                    <input type='password' placeholder='password' className='form-control' onChange={e => setPassword(e.target.value)} />
                    <br />
                    <button className='btn' type='button' onClick={register}>Register</button>
                </form>
            </div>
        </>
    )
}))