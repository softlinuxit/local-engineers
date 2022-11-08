import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getEngineerServiceAction } from '../redux/engineer/engineerActions';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { postcodeValidator } from 'postcode-validator';
const countryCode = 'UK';

const Home = (props) => {

    const [serviceType, setServiceType] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [services, setServices] = useState([]);
    const [serviceId, setServiceId] = useState('');

    const { getEngineerService, userInfo } = props;

    useEffect(() => {
        getAllServices();
    }, []);

    const options = services.map((service, index) => {
        const { id, label } = service;
        return (<option value={id} key={`option_${index}`}>{label}</option>)
    })

    const getAllServices = async () => {
        const servicesResponse = await getEngineerService();
        if (servicesResponse.status === 200) {
            setServices(servicesResponse.data);
        }
    }

    const setSelectedService = (e) => {
        let service = services.filter(s => s.id === e.target.value)[0];
        if (service) {
            console.log(service);
            setServiceType(service.codes);
            setServiceId(service.id);
        }
    }

    const redirectToQuestions = () => {
        if (serviceType === "") {
            toast.warning("Please select a service type", { autoClose: 4000 })
            return;
        }
        
        if (postalCode === "") {
            toast.warning("Please enter pincode.", { autoClose: 4000 })
            return;
        }
        const isValidated = postcodeValidator(postalCode, countryCode);
        console.log(isValidated);
        if (!isValidated) {
            toast.warning("Please enter valid pincode.", { autoClose: 4000 })
            return;
        }
        props.history.push(`/service/${serviceType}${postalCode ? "/" + postalCode : ""}/${serviceId}`)
    }

    return (
        <div className="home">
            <div className="jumbotron jumbotron-fluid greyBg">
                <div className="container homeBanner">
                    <div className="row">
                        <div className="col-md-6">
                            <h1 className="bold">UK’s top Security Engineers all in one place -</h1>
                            <p className="lead">we make it easy for you to connect with a security specialist in the UK.</p>
                            <div className="row">
                                <div className="col-md-6">
                                    {/* <input type="text" className="form-control" placeholder="What do you need done?  (eg. alarm system)" /> */}
                                    <select class="form-control" onChange={e => setSelectedService(e)} id="sel1">
                                        <option value="-1">What do you need done?</option>
                                        {
                                            options
                                        }
                                        {/* <option value={`cctv`}>Security Camera</option>
                                        <option value={`security_alarm`}>Security Alarm System</option>
                                        <option value={`entry_system`}>Access Control System</option>
                                        <option value={`locks`}>Locks</option>
                                        <option value={`roller_shutter`}>Roller Shutters</option>
                                        <option value={`gate`}>Security Gate/Fence</option>
                                        <option value={`lights`}>Security Lights</option>
                                        <option value={`grille`}>Security Window Grille</option>
                                        <option value={`smoke_alarm`}>Smoke Alarms</option>
                                    <option value={`other`}>Other</option> */}
                                    </select>
                                </div>
                                <div className="col-md-3">
                                    <input type="text" onChange={e => setPostalCode(e.target.value)} value={postalCode} className="form-control" placeholder="Postcode" />
                                </div>
                                <div className="col-md-3">
                                    <input type="button" onClick={() => redirectToQuestions()} className="btn btn-primary" value="Let’s go" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <h1 className="bold text-center seperatorSection">
                        vetted. qualified. simplified.
                        </h1>
                </div>
            </div>
            <div className="row greySection greyBg">
                <div className="col-md-12">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="cardSection">
                                    <img src={`/images/section1.png`} className="sectionImg" />
                                    <h5 style={{ fontWeight: 'bold' }} className="sectionTitle">
                                        1. Tell us what needs doing
                                        </h5>
                                    <span className="sectionDesc">
                                        We’ll ask you a few questions about what needs doing
                                        </span>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="cardSection">
                                    <img src={`/images/section2.png`} className="sectionImg" />
                                    <h5 style={{ fontWeight: 'bold' }} className="sectionTitle">
                                        2. Get a quote
                                        </h5>
                                    <span className="sectionDesc">
                                        Get a connected a local specialist and receive a competitive quote
                                        </span>
                                </div>
                            </div>
                            <div className="col-md-4 col-sm-4 col-xs-12">
                                <div className="cardSection">
                                    <img src={`/images/section3.png`} className="sectionImg" />
                                    <h5 style={{ fontWeight: 'bold' }} className="sectionTitle">
                                        3. Enjoy better security
                                        </h5>
                                    <span className="sectionDesc">
                                        Job complete!<br />Leave feedback for your engineer and enjoy better security
                                        </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <div className="text-center">
                        Empty Section
                        </div>
                </div>
            </div>
            {
                userInfo.email
                    ?
                    ""
                    :
                    <div className="row greyBg">
                        <div className="col-md-12">
                            <div className="container isQualSection">
                                <h1 className="bold qualText">Are you a qualified security engineer?</h1>
                                <Link className="btn btn-primary signUpBtn" to="/engineerSignUp">Sign up today!</Link>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.common.userInfo
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getEngineerService: () => dispatch(getEngineerServiceAction()),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);