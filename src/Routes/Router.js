import React from 'react';
import { Switch } from 'react-router-dom';
import RouteWithLayout from '../layout/RouteWithLayout';

/*** Website Layout and design ***/
import WebsiteLayout from '../layout/website/websiteLayout';
import Home from '../components/home';
import ServiceSpec from '../components/services/serviceSpec';
import ServiceQues from '../components/services/serviceQue';
import SignIn from '../components/signIn';
import SignUp from '../components/signUp';
import EngineerSignUp from '../components/engineers/engineerSignup';
import ForgotPassword from '../components/forgotPassword';
import Processing from '../components/services/processing';
import SelectedEngineers from '../components/engineers/selectedEngineers';
import EngineerProfile from '../components/engineers/profile';
import EngineerBio from '../components/engineers/bio';
import Engineer from '../components/engineers/engineer';
import Chat from '../components/chats/chat';
import Settings from '../components/settings/settings';
import Jobs from '../components/jobs/jobs';
import Leads from '../components/leads/leads';
import Appointment from '../components/appointment/appointment';
import Booking from '../components/booking/booking';
import ServiceList from '../components/servicesList/servicesList';
import AboutUs from '../components/aboutPage/about';
import ContactUs from '../components/contactPage/contact';
import TermsOfUse from '../components/TermsOfUse/TermsOfUse';
import PrivacyPolicy from '../components/PrivacyPolicy/PrivacyPolicy';
/*** Website Layout and design ***/

function AppRouter() {
    return (
        <Switch>
            {/* Website Layout and design */}
            <RouteWithLayout component={Home} layout={WebsiteLayout} path="/" exact />
            <RouteWithLayout component={ServiceQues} layout={WebsiteLayout} path="/service/:service/:serviceId" exact />
            <RouteWithLayout component={ServiceQues} layout={WebsiteLayout} path="/service/:service/:postalCode/:serviceId" exact />
            <RouteWithLayout component={SignIn} layout={WebsiteLayout} path="/signIn/:referrer/:serviceId" exact />
            <RouteWithLayout component={SignUp} layout={WebsiteLayout} path="/signUp/:referrer/:serviceId" exact />
            {
                // <RouteWithLayout component={ServiceQues} layout={WebsiteLayout} path="/serviceque/:service" exact />
            }
            <RouteWithLayout component={SignIn} layout={WebsiteLayout} path="/signIn" />
            <RouteWithLayout component={SignUp} layout={WebsiteLayout} path="/signUp" />
            <RouteWithLayout component={EngineerSignUp} layout={WebsiteLayout} path="/engineerSignUp" />
            <RouteWithLayout component={ForgotPassword} layout={WebsiteLayout} path="/forgotPassword" />
            <RouteWithLayout component={Processing} layout={WebsiteLayout} path="/processing/:serviceId" />
            <RouteWithLayout component={SelectedEngineers} layout={WebsiteLayout} path="/selectedEngineers" />
            <RouteWithLayout component={EngineerProfile} layout={WebsiteLayout} path="/engineerProfile/:engineerId" />
            <RouteWithLayout component={EngineerProfile} layout={WebsiteLayout} path="/engineerProfileReq/:engineerId/:serviceId" />
            <RouteWithLayout component={EngineerBio} layout={WebsiteLayout} path="/userProfile/:userId" />
            <RouteWithLayout component={Engineer} layout={WebsiteLayout} path="/engineers/:serviceId" />
            <RouteWithLayout component={Engineer} layout={WebsiteLayout} path="/engineers" />
            <RouteWithLayout component={Chat} layout={WebsiteLayout} path="/chat/:userId/:engineerId" />
            <RouteWithLayout component={Chat} layout={WebsiteLayout} path="/chat" />
            <RouteWithLayout component={Settings} layout={WebsiteLayout} path="/settings" />
            <RouteWithLayout component={Jobs} layout={WebsiteLayout} path="/jobs" />
            <RouteWithLayout component={Leads} layout={WebsiteLayout} path="/leads" />
            <RouteWithLayout component={Appointment} layout={WebsiteLayout} path="/appointment" />
            <RouteWithLayout component={Booking} layout={WebsiteLayout} path="/booking" />
            <RouteWithLayout component={ServiceList} layout={WebsiteLayout} path="/services" />
            <RouteWithLayout component={AboutUs} layout={WebsiteLayout} path="/about" />
            <RouteWithLayout component={ContactUs} layout={WebsiteLayout} path="/contact" />
            <RouteWithLayout component={PrivacyPolicy} layout={WebsiteLayout} path="/privacy" />
            <RouteWithLayout component={TermsOfUse} layout={WebsiteLayout} path="/terms" />
            {/* Website Layout and design */}

        </Switch>
    )
}

export default AppRouter;
