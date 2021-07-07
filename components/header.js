import React, { Component } from 'react'
import Link from 'next/link'
import HamburgerMenu from 'react-hamburger-menu'


class HeaderClass extends Component {
  state = {open:false}
  handleClick = ()=> {
    this.setState({
      open:!this.state.open
    })

  }

  render() {
    return (
      <div className="container header-wrap">
        <div className="row header">
          <div className="col-6 121 align-self-start align-items-center logo">
            <Link href="/">
              <img src="https://data.angelcitybrigade.net/wp-content/uploads/2021/04/logo.png" alt=""/>
            </Link>
          </div>
          <div className="col-6 align-self-end nav">
            <HamburgerMenu
                isOpen={this.state.open}
                menuClicked={this.handleClick.bind(this)}
                width={18}
                height={15}
                strokeWidth={1}
                rotate={0}
                color='white'
                borderRadius={0}
                animationDuration={0.5}
            />
          </div>
        </div>
        <div className={`menu ${this.state.open ? 'menu-opened' : 'menu-closed'}`}>
          <div className=" nav-item">
            <Link href='/'> Home</Link></div>
          <div className=" nav-item"><Link href="https://shop.angelcitybrigade.net" rel="noreferrer" target="_blank"> Shop </Link></div>
          <div className=" nav-item"> <Link href="/chants"> Chants</Link></div>
          <div className="-md-auto nav-item"> <Link href="/viewing-parties"> Viewing Parties</Link></div>
          <div className=" nav-item"><Link href="/about"> About Us</Link></div>
          <div className=" nav-item"><Link href="/faq">FAQ</Link></div>
        </div>
    </div>
    )
  }
}

export default HeaderClass
