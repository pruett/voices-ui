import React from 'react'
import styles from './Register.css'
import logo from '../../images/logoLogin.svg'

export default class Register extends React.Component {
  render () {
    return (
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} />
        <h1 className={styles.login}>
          Get started &mdash
          <span>Free</span>
        </h1>
        <form className={styles.form} onSubmit={this.handleLogin}>
          <input type='text' placeholder='Full Name' />
          <input type='email' placeholder='Email address' />
          <input type='password' placeholder='Password' />
          <input type='submit' value='Get Started' />
        </form>

      </div>
    )
  }
}
