import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import './auth.css'
import { Redirect } from 'react-router-dom'

// redux actions
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

const Login = ({ login, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })

    const {
        email,
        password
    } = formData

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        login({ email, password })
    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    return (
        <Fragment>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <h2>welcome back</h2>
                <div className="form-group">
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        value={email}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="password"
                        minLength="6"
                        name="password"
                        value={password}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
                <input
                    type="submit"
                    className="btn"
                    value="log in"
                />
            </form>
        </Fragment>
    )
}

Login.propTypes = {
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { login }
)(Login)
