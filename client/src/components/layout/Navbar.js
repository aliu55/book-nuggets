import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import './Navbar.css'

// redux
import { connect } from 'react-redux'
import { logout } from '../../actions/auth'

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const privateNavbar = (
    <ul>
      <li className="menu-link">
        <Link to="/dashboard">dashboard</Link>
      </li>
      <li className="menu-link">
        <Link to="/community" className="underline">
          community
        </Link>
      </li>
      {/* // eslint-disable-next-line  */}
      <li className="menu-link">
        <a href="" onClick={logout}>
          logout
        </a>
      </li>
    </ul>
  )

  const publicNavbar = (
    <ul>
      <li className="menu-link">
        <Link to="/community">community</Link>
      </li>
      <li className="menu-link">
        <Link to="/register" className="underline">
          sign up
        </Link>
      </li>
      <li className="menu-link">
        <Link to="/login">sign in</Link>
      </li>
    </ul>
  )

  return (
    <nav className="navbar bg-green">
      <h1>
        <Link to="/">book nuggets</Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? privateNavbar : publicNavbar}</Fragment>
      )}
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps, { logout })(Navbar)
