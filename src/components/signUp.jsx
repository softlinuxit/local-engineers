import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { SignUpAction } from '../redux/user/userActions';
import MapAutocomplete from './gMaps/MapAutocomplete';
import { Button, Modal } from 'react-bootstrap';
import { setLoading, storeLoggedInUserInfoAction } from '../redux/common/commonActions';

const SignUp = (props) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const [address, setAddress] = useState('');
    const [address2, setAddress2] = useState('');
    const [pName, setPName] = useState('');
    const [isLocalNewsRequired, setIsLocalNewsRequired] = useState(false);
    // const [userBio, setUserBio] = useState('');
    const [isPassword, setIsPassword] = useState(true);
    const [location, setLocation] = useState({ lat: 54.343410, lng: -2.160091 });
    const [currentLocation, setCurrentLocation] = useState({});
    const [show, setShow] = useState(false);
    const [city, setCity] = useState('');
    const [postalCode, setPostalCode] = useState('');

    const { userSignUp, storeLoginUserData } = props;

    useEffect(() => {
        const userLocation = localStorage.getItem("userLocation");
        if (userLocation) {
            const _userLocation = JSON.parse(userLocation);
            setLocation(_userLocation);
        }
    }, [])

    useEffect(() => {
        console.log(currentLocation);
        setCity(currentLocation.city);
        setPostalCode(currentLocation.zip);
        setAddress2(currentLocation.area);
    }, [currentLocation]);

    useEffect(() => {
        let location = currentLocation;
        location["city"] = city;
        setCurrentLocation(location)
    }, [city])

    useEffect(() => {
        let location = currentLocation;
        location["zip"] = postalCode;
        setCurrentLocation(location)
    }, [postalCode])

    useEffect(() => {
        let location = currentLocation;
        location["area"] = address2;
        setCurrentLocation(location)
    }, [address2])

    useEffect(() => {
        let location = currentLocation;
        location["address"] = address;
        setCurrentLocation(location)
    }, [address])

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    const validateNumber = (number) => {
        const re = /^[0-9]*$/;
        if (number.match(re)) {
            return true;
        }
        else {
            return false;
        }
    }

    const signUpUser = async () => {

        if (!validateEmail(email)) {
            toast.warning("Enter a valid email address", { autoClose: 4000 });
            return;
        }
        else if (name.length < 3) {
            toast.warning("Minimum 3 characters are required in name", { autoClose: 4000 });
            return;
        }
        else if (phone.length < 10) {
            toast.warning("Minimum 10 digits are required", { autoClose: 4000 });
            return;
        }
        else if (!validateNumber(phone)) {
            toast.warning("Enter a valid phone number", { autoClose: 4000 });
            return;
        }
        else if (!currentLocation && !currentLocation.zip) {
            toast.warning("Enter a valid address", { autoClose: 4000 });
            return;
        }
        else if (!isAgreed) {
            toast.warning("Please accept license.", { autoClose: 4000 });
            return;
        }
        setLoading(true);
        const param = {
            "notifications": isLocalNewsRequired,
            // "bio": userBio,
            "address": address,
            "phone": phone,
            "email": email.toLowerCase(),
            "fullName": name,
            "password": password,
            "username": pName,
            "geoaddress": currentLocation,

        }

        const signUpResponse = await userSignUp(param);

        setLoading(false);
        if (signUpResponse?.status === 200) {
            const loginData = signUpResponse.data.data;
            loginData["role"] = "user";
            storeLoginUserData(loginData);
            props.history.push("/");
        }
    }

    const submitLocation = () => {
        if (!currentLocation.zip) {
            toast.warning("Please select valid area with valid postal code.", { autoClose: 4000 });
            return;
        }

        setAddress(currentLocation.address);
        handleClose();
    }

    const handleClose = () => {
        setShow(false);
    }

    const handleShow = () => {
        console.log("show called");
        setShow(true);
    }

    return (
        <div className="greyBg">
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title>Choose Location</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="mx-auto">
                        <MapAutocomplete
                            center={location}
                            height="300px"
                            zoom={16}
                            setCurrentLocation={setCurrentLocation}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => submitLocation()}>Save</Button>
                </Modal.Footer>
            </Modal>
            <div className="jumbotron jumbotron-fluid greyBg">
                <img src={`/images/cctv.png`} className="fullBanner" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-1"></div>
                    <div className="col-md-6 col-sm-10">
                        <div className="signin">
                            <div className="row reSignIn">
                                <div className="col-md-12">
                                    <div className="text-center">
                                        <h3>
                                            Already have an account
                                        </h3>
                                    </div>
                                    <Link to="/signIn" className="btn btn-primary action">Login</Link>
                                </div>
                            </div>
                            <div className="row newAccLbl">
                                <div className="col-md-12">
                                    <h3 style={{ fontWeight: 'bold' }} >Create a new account</h3>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="email">Email Address</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i className="fa fa-envelope" ></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Enter email" id="email" value={email} onChange={e => setEmail(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="name">Full Name</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i className="fa fa-user" ></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Full Name" id="name" value={name} onChange={e => setName(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="phone">Phone number</label>
                                    <label className="phoneLbl">We will not share your phone number with tradespeople you choose to talk to.</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i className="fa fa-phone" ></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Phone number" id="phone" value={phone} onChange={e => setPhone(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row" >
                                <div className="col-md-12" onClick={() => { handleShow() }}>
                                    <label for="address">Address</label>
                                    <div class="input-group mb-3" style={{
                                        background: 'white',
                                        border: '#0000002b',
                                        borderStyle: 'solid',
                                        borderWidth: '0.5px',
                                        borderRadius: '4px',
                                        alignItems: 'center'
                                    }}>
                                        <div class="input-group-prepend" >
                                            <span class="input-group-text" id="basic-addon1" style={{ borderWidth: '0px' }}>
                                                <i className="fa fa-map-marker" ></i>
                                            </span>
                                        </div>
                                        <span style={{ color: address ? '#000000' : '#808080' }}>
                                            {address ? address : 'Address'}
                                        </span>
                                    </div>
                                </div>
                            </div> */}
                            <div className="row py-3">
                                <div className="col-md-12">
                                    <label for="address">Address</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend" onClick={() => { handleShow() }}>
                                            <span class="input-group-text" id="basic-addon1">
                                                <i className="fa fa-map-marker" ></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Address" id="address" value={address} onChange={e => setAddress(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-md-12">
                                    <label for="address2">Address 2</label>
                                    <div class="mb-3">
                                        {/* <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i className="fa fa-map-marker" ></i>
                                            </span>
                                        </div> */}
                                        <input type="text" class="form-control" placeholder="Address" id="address2" value={address2} onChange={e => setAddress2(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row py-3">
                                <div className="col-md-6">
                                    <label for="address2">City</label>
                                    <div class="mb-3">
                                        {/* <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i className="fa fa-map-marker" ></i>
                                            </span>
                                        </div> */}
                                        <input type="text" class="form-control" placeholder="City" id="address2" value={city} onChange={e => setCity(e.target.value)} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <label for="address2">Postal Code</label>
                                    <div class="mb-3">
                                        {/* <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i className="fa fa-map-marker" ></i>
                                            </span>
                                        </div> */}
                                        <input type="text" class="form-control" placeholder="Postal Code" id="address2" value={postalCode} onChange={e => setPostalCode(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="password">Password</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1" style={{ paddingBottom: '8px' }}>
                                                <i className="fa fa-lock" ></i>
                                            </span>
                                        </div>
                                        <input type={isPassword ? "password" : "text"} class="form-control" placeholder="Password" id="password" value={password} onChange={e => setPassword(e.target.value)} />
                                        <div class="input-group-btn">
                                            <button class="btn btn-default" onClick={() => { setIsPassword(!isPassword) }}>
                                                <i className="fa fa-eye" ></i>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <label for="address">Public Username</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
                                                <i className="fa fa-user" ></i>
                                            </span>
                                        </div>
                                        <input type="text" class="form-control" placeholder="Public Username" id="address" value={pName} onChange={e => setPName(e.target.value)} />
                                    </div>
                                </div>
                            </div>
                            {/* <div className="row">
                                <div className="col-md-12">
                                    <label for="address">Bio</label>
                                    <div class="input-group mb-3">
                                        <textarea class="form-control p-3" placeholder="Describe Yourself" id="address" value={userBio} onChange={e => setUserBio(e.target.value)} />
                                    </div>
                                </div>
                            </div> */}
                            <div className="row">
                                <div className="col-md-12">
                                    <label class="container remember" htmlFor="updateReq">I'd like to receive Local Engineers News, Advice and Tips
                                        <input type="checkbox" id="updateReq" checked={isLocalNewsRequired} onChange={e => setIsLocalNewsRequired(!isLocalNewsRequired)} />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="row thirdRow">
                                <div className="col-md-12">
                                    <label class="container remember" htmlFor="acceptTerms">I agree to <Link>terms & conditions</Link>
                                        <input type="checkbox" id="acceptTerms" checked={isAgreed} onChange={e => setIsAgreed(!isAgreed)} />
                                        <span class="checkmark"></span>
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button className="btn btn-primary action" onClick={() => { signUpUser() }}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-3 col-sm-1"></div>
                </div>

            </div>
        </div>
    )
}


const mapDispatchToProps = dispatch => {
    return {
        userSignUp: (data) => dispatch(SignUpAction(data)),
        setLoading: (data) => dispatch(setLoading(data)),
        storeLoginUserData: (data) => dispatch(storeLoggedInUserInfoAction(data)),

    }
}

export default connect(null, mapDispatchToProps)(SignUp);