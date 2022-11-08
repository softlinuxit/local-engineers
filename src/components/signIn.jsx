import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { SignInAction } from '../redux/user/userActions';
import Select from 'react-select'
import { engineerSignInAction } from '../redux/engineer/engineerActions';
import { setLoading, storeLoggedInUserInfoAction } from '../redux/common/commonActions';

const SignIn = (props) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRemember, setIsRemember] = useState(false);
    const [loginType, setLoginType] = useState(0);
    const [isPassword, setIsPassword] = useState(true)

    const { userSignIn, engineerSignIn, storeLoginUserData, setLoading } = props;
    const login = async () => {
        const param = {
            "password": password,
            "email": email.toLowerCase()
        }
        setLoading(true);
        let signUpResponse = null;
        if (loginType === 1) {
            signUpResponse = await userSignIn(param);
        }
        else {
            signUpResponse = await engineerSignIn(param);
        }
        setLoading(false);
        if (signUpResponse && signUpResponse.status === 200) {
            console.log(signUpResponse.data.data);
            const loginData = signUpResponse.data.data;
            if (loginType === 1) {
                loginData["role"] = "user";
            }
            else {
                loginData["role"] = "engineer";
            }
            storeLoginUserData(loginData);
            
            props.history.push("/");
        }
    }

    const onChangeServiceSelection = (val) => {
        setLoginType(val.value);
    }

    const options = [{ value: 1, label: "User" }, { value: 2, label: "Engineer" }]

    return (
        <div className="greyBg">
            <div className="jumbotron jumbotron-fluid greyBg">
                <img src={`/images/cctv.png`} className="fullBanner" />
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-md-3 col-sm-1"></div>
                    <div className="col-md-6 col-sm-10">
                        <div className="signin">
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
                                    <label for="password">Password</label>
                                    <div class="input-group mb-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text" id="basic-addon1">
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
                                    <label for="password">Login as:</label>
                                    <div class="input-group mb-3">
                                        <Select
                                            placeholder="Services"
                                            options={options}
                                            className="basic-multi-select"
                                            classNamePrefix="select"
                                            onChange={val => onChangeServiceSelection(val)}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row thirdRow">
                                <div className="col-md-6">
                                    {/* <label class="container remember" htmlFor="remember">I agree to <Link>terms & conditions</Link>
                                        <input type="checkbox" id="remember" checked={isRemember} onChange={e => setIsRemember(!isRemember)} />
                                        <span class="checkmark"></span>
                                    </label> */}
                                </div>
                                <div className="col-md-6">
                                    <span className="forgot">
                                        <Link to="/forgotPassword">
                                            Forgot your password?
                                        </Link>
                                    </span>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                <button className="btn btn-primary action" disabled={!email || !password || loginType === 0} onClick={() => login()}>Login</button>
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
        userSignIn: (data) => dispatch(SignInAction(data)),
        engineerSignIn: (data) => dispatch(engineerSignInAction(data)),
        storeLoginUserData: (data) => dispatch(storeLoggedInUserInfoAction(data)),
        setLoading: (data) => dispatch(setLoading(data))
    }
}

export default connect(null, mapDispatchToProps)(SignIn);