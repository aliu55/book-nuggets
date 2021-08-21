import React from 'react'
import PropTypes from 'prop-types'
import './Home.css'
import { Link, Redirect } from 'react-router-dom'

// redux
import { connect } from 'react-redux'
import { login } from '../../actions/auth'

const Home = ({ isAuthenticated, login }) => {

    if (isAuthenticated) {
        return <Redirect to='/dashboard' />
    }

    const demoLogin = () => {
        const demoUser = { email: "demousernugget@gmail.com", 
            password: "booknugget"
        }
        console.log("hello")
        login(demoUser)
    }

    return (
        <section className="home">
            <div className="home-overlay">
                <div className="home-inner">
                    <h1 className="home-inner-title">book nuggets</h1>
                    <p className="home-inner-description">document and share your reading journey</p>
                    <span>
                        <Link to="/register" className="btn btn-green">get started</Link>
                        <small className="demo-login btn" onClick={demoLogin}>demo login</small>
                    </span>
                </div>
            </div>
        </section>
    )
}

Home.propTypes = {
    isAuthenticated: PropTypes.bool,
    login: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(
    mapStateToProps,
    { login }
)(Home)
