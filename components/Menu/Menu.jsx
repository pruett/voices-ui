import React from 'react'

import styles from './Menu.css'
import avatar from '../App/images/avatar.png'

export default React.createClass({

  getDefaultProps () {
    return {
      links: [ 'User Profile', 'Billing Information', 'Subscription Plan' ],
      showMenu: false
    }
  },

  render() {
    let menuLinks = this.props.links.map((link, id) => {
      return (
        <li className={styles.item} key={id}>
          <a className={styles.link}>{link}</a>
        </li>
      )
    })

    return (
      <div className={this.props.showMenu ? styles.open : styles.closed}>
        <div className={styles.userInfo}>
          <h2 className={styles.userName}>Tam Cai</h2>
          <p className={styles.userEmail}>hi@tamcai.com</p>
        </div>

        <nav>
          <ul className={styles.list}>
            {menuLinks}
            <li className={styles.logout}>
              <a className={styles.link}>Logout</a>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
})
