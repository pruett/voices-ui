import React from 'react'

import styles from './Header.css'
import logo from '../../images/logo.svg'

export default React.createClass({
  render() {
    return (
      <header className={styles.header}>
        <a href="#">
          <img className={styles.logo} src={logo}/>
        </a>
        <nav className={styles.navigation}>
          <ul className={styles.navList}>
            <li className={styles.navItems}>
              <a className={styles.navLink}>Dashboard</a>
            </li>
            <li className={styles.navItems}>
              <a className={styles.navLink}>Support</a>
            </li>
          </ul>
        </nav>
      </header>
    )
  }
})
