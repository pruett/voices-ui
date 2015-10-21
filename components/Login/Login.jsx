import React from 'react'
import styles from './styles/Login.css'
import logo from './images/logoLogin.svg'

export default class Login extends React.Component {
  render () {
    return (
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} />
        <h1 className={styles.login}>Account Login</h1>

        <form className={styles.form} onSubmit={this.handleLogin}>
          <input type='email' placeholder='Email address' />
          <input type='password' placeholder='Password' />
          <input type='submit' value='Login' />
        </form>
      </div>
    )
  }
}
