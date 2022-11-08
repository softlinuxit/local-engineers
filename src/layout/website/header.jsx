import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getNotificationsAsyncAction, storeLoggedInUserInfoAction } from '../../redux/common/commonActions';
import { getEngineerServiceAction } from '../../redux/engineer/engineerActions';
import CookieConsent, { Cookies } from "react-cookie-consent";
import { toast } from 'react-toastify';

const notificationEvents = [
    {
        _event: "Leads",
        url: "/leads"
    },
    {
        _event: "Appointments",
        url: "/appointment"
    },
    {
        _event: "Bookings",
        url: "/booking"
    }
]

const Header = (props) => {
    const [services, setServices] = useState([]);
    const [notifications, setNotifications] = useState([]);

    const { userInfo, storeLoginUserData, getEngineerService, getNotificationsAction } = props;

    const logout = async () => {
        await storeLoginUserData({});
        localStorage.removeItem("questionar")
        // localStorage.removeItem("jwtToken")
        // localStorage.removeItem("jwt")
        toast.warn("You are logged out.", { autoClose: 4000 });
        props.history.push("/");
    }

    useEffect(() => {
        getMyLocation();
        getAllServices();
        getAllNotifications();
    }, []);

    const options = services.map((service, index) => {
        const { id, label, codes } = service;
        return (
            <Link className="d-block" key={`link_${index}`} to={`/service/${codes}/${id}`}>{label}</Link>
        )
    })

    const getAllServices = async () => {
        const servicesResponse = await getEngineerService();
        if (servicesResponse.status === 200) {
            setServices(servicesResponse.data);
        }
    }

    const getAllNotifications = async () => {

        let data = {};
        if (userInfo.role === "user") {
            data["userId"] = userInfo._id;
        }
        else {
            data["engineerId"] = userInfo._id;
        }


        const notification = await getNotificationsAction(data, userInfo.role);
        console.log(notification);
        if (notification) {
            const { rows } = notification;
            setNotifications(rows);
        }
    }

    const getMyLocation = () => {
        const location = window.navigator && window.navigator.geolocation
        if (location) {
            location.getCurrentPosition((position) => {
                console.log(position);
                const loc = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                }
                localStorage.setItem("userLocation", JSON.stringify(loc));
            }, (error) => {
                // this.setState({ latitude: 28.7041, longitude: 77.1025 })
            })
        }
    }

    return (
        <>
            <CookieConsent
                allowDecline
                location="bottom"
                buttonText="Accept"
                cookieName="localEngineer"
                style={{ background: "#2B373B" }}
                buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                expires={150}
                declineButtonText="Decline"
                enableDeclineButton
            >
                <h5>This website uses cookies</h5>
                <span >We use cookies to personalise content and ads, to provide social media features and to analyse our traffic. We also share information about your use of our site with our social media, advertising and analytics partners who may combine it with other information that you’ve provided to them or that they’ve collected from your use of their services</span>
            </CookieConsent>
            <header className="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white shadow-sm">
                <p className="h5 my-0 me-md-auto fw-normal">
                    <Link to="/">
                        <img src={`/images/logo.png`} className="logo" alt={`localengineers.co.uk`} />
                    </Link>
                </p>
                <nav className="my-2 my-md-0 me-md-3">
                    {
                        userInfo.role === "user"
                            ?
                            <div className="dropdown">
                                <span className="p-2 text-dark">Browse Services</span>
                                <div className="dropdown-content">
                                    {
                                        options
                                    }
                                    {/* <Link className="d-block" to={`/service/cctv`}>Security Camera</Link>
                                    <Link className="d-block" to={`/service/security_alarm`}>Security Alarm System</Link>
                                    <Link className="d-block" to={`/service/entry_system`}>Access Control System</Link>
                                    <Link className="d-block" to={`/service/locks`}>Locks</Link>
                                    <Link className="d-block" to={`/service/roller_shutter`}>Roller Shutters</Link>
                                    <Link className="d-block" to={`/service/gate`}>Security Gate/Fence</Link>
                                    <Link className="d-block" to={`/service/lights`}>Security Lights</Link>
                                    <Link className="d-block" to={`/service/grille`}>Security Window Grille</Link>
                                    <Link className="d-block" to={`/service/smoke_alarm`}>Smoke Alarms</Link>
                                    <Link className="d-block" to={`/service/other`}>Other</Link> */}
                                </div>
                            </div>
                            :
                            ""
                    }
                    {/* <Link className="p-2 text-dark" to={`/service/Cctv`}>Browse Services</Link> */}
                    {
                        userInfo.email
                            ?
                            ""
                            :
                            <>
                                <Link className="p-2 text-dark" to={`/signUp`}>Register</Link>
                                <Link className="p-2 text-dark" to={`/signIn`}>Sign in</Link>
                            </>
                    }

                </nav>
                {
                    userInfo.email
                        ?
                        <>
                            <a className="p-2 text-dark" href="#">
                                <div className="dropdown">
                                    <img src={`/images/bell.png`} alt={`Notification`} />
                                    <div className="dropdown-content navNotification">
                                        <ul className="notify-list">
                                            {
                                                notifications.length > 0
                                                    ?
                                                    notifications.map((obj, index) => {
                                                        var redirectTo = notificationEvents.filter(x => x._event === obj.redirect_to)[0]
                                                        return (
                                                            <li key={`notification_${index}`}>
                                                                <div className="py-3">
                                                                    <p><Link to={`${redirectTo.url}`}>{obj.notification}</Link></p>
                                                                </div>
                                                            </li>
                                                        )
                                                    })
                                                    :
                                                    <li>
                                                        <div className="py-3">
                                                            <p className="h5">No Notification</p>
                                                        </div>
                                                    </li>
                                            }

                                        </ul>
                                    </div>
                                </div>
                            </a>
                            <Link to="/chat" className="p-2 text-dark">
                                <img src={`/images/message.png`} alt={`Messages`} />
                            </Link>
                            <Link className="p-2 text-dark" to="/settings">
                                <img src={`/images/user.png`} alt={`Profile`} />
                            </Link>
                            <Link className="p-2 text-dark" to="#" onClick={() => logout()}>
                                <img src={`/images/logout.png`} alt={`Logout`} />
                            </Link>
                        </>
                        :
                        ""
                }
            </header>
            {
                userInfo.email &&
                <div className="sub-header py-2 px-3">
                    <nav className="my-2 my-md-0 me-md-3">
                        {/* <Link className="p-2 text-dark" to={`/jobs`}>Jobs</Link> */}
                        {
                            userInfo.role === "engineer" ?
                                <Link className="p-2 text-dark" to={`/leads`}>Leads</Link>
                                :
                                <Link className="p-2 text-dark" to={`/engineers`}>Engineers</Link>
                        }
                        {/* <Link className="p-2 text-dark" to={`/engineers`}>Engineers</Link>
                        <Link className="p-2 text-dark" to={`/chat`}>Chat</Link> */}
                        <Link className="p-2 text-dark" to={`/appointment`}>Appointment</Link>
                        <Link className="p-2 text-dark" to={`/booking`}>Jobs</Link>
                        <Link className="p-2 text-dark" to={`/services`}>Services</Link>
                    </nav>
                </div>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.common.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        storeLoginUserData: (data) => dispatch(storeLoggedInUserInfoAction(data)),
        getNotificationsAction: (data, role) => dispatch(getNotificationsAsyncAction(data, role)),
        getEngineerService: () => dispatch(getEngineerServiceAction()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);