import React from 'react';
import '../css/footer.css';

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div>
          <div className="row">

            <div className="col">
              <h5>Contact us:</h5>
              <div className="text-size">
                <p>5 Hanover Square</p>
                <p>Floor 11</p>
                <p>New York, NY 10004</p>
              </div>

            </div>

            <div className="icon">
              <h5>Social Media:</h5>

              <div>
                <div>
                  <a href="https://github.com/">
                    <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"></img>
                  </a>
                </div>
                <div>
                  <a href="https://www.youtube.com/">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSqXsRF7wzd8emX1UX2JGk82CC_4hxxAJ0NAA&usqp=CAU"></img>
                  </a>
                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="copyright">
          <p>Copyright &copy;{new Date().getFullYear()} | Radius</p>
        </div>
      </footer>
    </div>
  )
}

export default Footer;
