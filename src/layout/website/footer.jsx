import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {

    return (
        <footer className="pt-4 pt-md-5 border-top">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md">

                        <img src={`/images/logo.png`} alt={`localengineers.co.uk`} />
                    </div>
                    <div className="col-6 col-md">
                        <h5><Link className="p-2 text-dark" to={`/services`}>Services</Link></h5>
                        <ul className="list-unstyled text-small">
                            <li><Link className="link-secondary" to={`/engineers`}>Browse Engineers</Link></li>
                            {/* <li><Link className="link-secondary" to="#">How It Works</Link></li> */}
                            <li><Link className="link-secondary" to="#">FAQ's</Link></li>
                            {/* <li><Link className="link-secondary" to="/contact">Contact Us</Link></li> */}
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <h5><Link className="link-secondary" to="/about">About us</Link></h5>
                        <ul className="list-unstyled text-small">
                            {/* <li><Link className="link-secondary" to="/about">About us</Link></li> */}
                            <li><a className="link-secondary" href="#">How it works</a></li>
                            <li><Link className="link-secondary" to="/terms">Term of use</Link></li>
                            <li><Link className="link-secondary" to="/privacy">Privacy Policy</Link></li>
                            <li><a className="link-secondary" href="#">Cookies</a></li>
                            <li><a className="link-secondary" href="/sitemap.xml">Sitemap</a></li>
                            <li><Link className="link-secondary" to="/contact">Contact us</Link></li>
                        </ul>
                    </div>
                    <div className="col-6 col-md">
                        <img src={`/images/1.png`} alt={`Google Play Store`} />
                        <img src={`/images/2.png`} alt={`Apple App Store`} />
                        <h5>Download our iOS and Android App</h5>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12 col-md text-center">
                        copyright Localengineer.co.uk. All Right are reserverd'
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;