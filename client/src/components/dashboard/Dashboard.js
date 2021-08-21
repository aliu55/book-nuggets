import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

// components
import Books from '../books/Books'

// redux
import { connect } from 'react-redux'

const Dashboard = ({ auth: { user } }) => {
  return (
    <Fragment>
      <h1 className="title left-align">Hi, {user && user.name}</h1>
      <Books />
    </Fragment>
  )
}

Dashboard.propTypes = {
  auth: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth,
})

export default connect(mapStateToProps)(Dashboard)
