import React from 'react';
import { Link, useLocation  } from 'react-router-dom';

const Navbar = () => {
    const { pathname } = useLocation();
    console.log(pathname);
    return (
        <div className="sidebar" data-color="purple" data-background-color="white" data-image="../assets/img/sidebar-1.jpg">
            <div className="logo">
                <a href="/" className="simple-text logo-normal">
                    Creative Tim
            </a>
            </div>
            <div className="sidebar-wrapper">
                <ul className="nav">
                    <li className={`${pathname === "/" ? "nav-item active" : "nav-item"}`}>
                        <Link className="nav-link" to={"/"}>
                            <i className="material-icons">dashboard</i>
                            <p>Dashboard</p>
                        </Link>
                    </li>
                    <li className={`${pathname === "/products/list" || pathname === "/products/add" ? "nav-item active" : "nav-item"}`}>
                        <Link className="nav-link" to={"/products/list"}>
                            <i className="material-icons">backup_table</i>
                            <p>Products</p>
                        </Link>
                    </li>
                    <li className={`${pathname === "/invoices/list" ? "nav-item active" : "nav-item"}`}>
                        <Link className="nav-link" to={"/invoices/list"}>
                            <i className="material-icons">library_books</i>
                            <p>Invoices</p>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;