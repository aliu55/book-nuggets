import React, { Fragment, useState } from 'react'
import PropTypes from 'prop-types'
import './auth.css'
import { Redirect } from 'react-router-dom'

// redux actions
import { connect } from 'react-redux'
import { register } from '../../actions/auth'

const Register = ({ register, isAuthenticated }) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    })

    const {
        name,
        email,
        password
    } = formData

    const onChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    const onSubmit = e => {
        e.preventDefault()
        register({ name, email, password })

    }

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }
    
    return (
        <Fragment>
            <form className="form" onSubmit={e => onSubmit(e)}>
                <h2>sign up</h2>
                <div className="form-group">
                    <input
                        type="text"
                        placeholder="full name"
                        name="name"
                        value={name}
                        onChange={e => onChange(e)}
                        required
                    />
                </div>
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
                    value="create"
                />
            </form>
        </Fragment>
    )
}

Register.propTypes = {
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { register }
)(Register)
