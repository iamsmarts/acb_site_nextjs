import React from 'react'

function Footer() {
  return (
    <div className="row footer justify-content-between">

      <div className="col-6 col-md-4">
        <p>Angel City Brigade - 501 C 7</p>
      </div>

      <div className="col-6 col-md-4">
        <div className="row justify-content-between">
          <div className="col sm-icons">
            <a href="https://twitter.com/ACBrigade" target="_blank">
              <i aria-hidden className="fab fa-twitter"></i>
            </a>
          </div>
          <div className="col sm-icons">
            <a href="https://www.instagram.com/angelcitybrigade/" target="_blank">
              <i aria-hidden className="fab fa-instagram"></i>
            </a>
          </div>
          <div className="col sm-icons">
            <a href="https://www.facebook.com/angelcitybrigade" target="_blank">
              <i aria-hidden className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default Footer
