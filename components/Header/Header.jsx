import React from 'react'

import Menu from '../Menu/Menu'

import styles from './styles/Header.css'
import logo from '../App/images/logo.svg'
import avatar from '../App/images/avatar.png'

export default React.createClass({
  getInitialState () {
    return {
      showMenu: false
    }
  },

  getDefaultProps () {
    return {
      links: ['Dashboard', 'Support']
    }
  },

  toggle () {
    this.setState({ showMenu: !this.state.showMenu })
  },

  render() {
    let navLinks = this.props.links.map((link,id) => {
      return (
        <li key={id} className={styles.item}>
          <a className={styles.link}>{link}</a>
        </li>
      )
    })

    return (
      <header className={styles.header}>
        <a href="#">
          <img className={styles.logo} src={logo}/>
        </a>
        <nav role="navigation" className={styles.nav}>
          <ul className={styles.list}>
            {navLinks}
          </ul>
        </nav>
        <div onClick={this.toggle} className={styles.avatar}>
          <img src={avatar}/>
        </div>

        <Menu showMenu={this.state.showMenu} />

      </header>
    )
  }
})
