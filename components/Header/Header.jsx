import React from 'react'
import Menu from '../Menu/Menu'
import styles from './styles/Header.css'
import logo from '../App/images/logo.svg'
import avatar from '../App/images/avatar.png'

export default class Header extends React.Component {
  constructor () {
    super()
    this.state = { showMenu: false }
  }

  toggle = () => { // eslint-disable-line
    this.setState(({ showMenu }) => ({ showMenu: !this.state.showMenu }))
  }

  render () {
    let navLinks = this.props.links.map((link, id) => (
      <li key={id} className={styles.item}>
        <a className={styles.link}>{link}</a>
      </li>
    ))

    return (
      <header className={styles.header}>
        <a href='#'>
          <img className={styles.logo} src={logo}/>
        </a>
        <nav role='navigation' className={styles.nav}>
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
}

Header.propTypes = {
  links: React.PropTypes.array.isRequired
}

Header.defaultProps = { links: ['Dashboard', 'Support'] }
