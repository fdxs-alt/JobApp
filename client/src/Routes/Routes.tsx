import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Login from '../pages/Auth/Login';
import Register from '../pages/Auth/Register';
import Companies from '../pages/Companies';
import ResetPassword from '../pages/Auth/ResetPassword';
import ForbbidenWhenLogged from './NotAccessableWhenLogged';
import Confirm from '../pages/Auth/Confirm';
import Reset from '../pages/Auth/Reset';
import OwnerRoutes from './OwnerRoutes';
import Dashboard from '../pages/OwnerPages/Dashboard';
import CompanyProfile from '../pages/OwnerPages/CompanyProfile';
import CreateCompany from '../pages/OwnerPages/CreateCompany';
import JobOffers from '../pages/OwnerPages/JobOffers';
import CreateJobOffer from '../pages/OwnerPages/CreateJobOffer';
import JobDetails from '../pages/OwnerPages/JobDetails';
import CompanyApplications from '../pages/OwnerPages/CompanyApplications';
import SpecificJobOffer from '../pages/SpecificJobOffer';
import SearchPage from '../pages/SearchPage';
import MoreSpecifiedJobOffers from '../pages/MoreSpecifiedJobOffers';
import PrivateRoutes from './PrivateRoutes';
import User from '../pages/User';
import SpecificCompany from '../pages/SpecificCompany';
import Layout from '../components/Layout';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <ForbbidenWhenLogged exact path="/login" component={Login} />
        <ForbbidenWhenLogged exact path="/register" component={Register} />
        <ForbbidenWhenLogged exact path="/reset" component={ResetPassword} />
        <Route>
          <Layout>
            <Switch>
              <ForbbidenWhenLogged
                exact
                path="/user/confirm"
                component={Confirm}
              />
              <ForbbidenWhenLogged
                path="/user/changePassword/"
                component={Reset}
                exact
              />

              <PrivateRoutes path="/user" component={User} />

              <Route exact path="/" component={MainPage} />
              <Route exact path="/companies" component={Companies} />
              <Route path="/searchjob" component={SearchPage} />
              <Route exact path="/jobs" component={MainPage} />
              <Route path="/specific" component={SpecificJobOffer} />
              <Route
                path="/specificjob/criteria"
                component={MoreSpecifiedJobOffers}
              />
              <Route path="/company" component={SpecificCompany} />
              <OwnerRoutes exact path="/dashboard" component={Dashboard} />
              <OwnerRoutes exact path="/profile" component={CompanyProfile} />
              <OwnerRoutes
                exact
                path="/createCompany"
                component={CreateCompany}
              />
              <OwnerRoutes exact path="/joboffers" component={JobOffers} />
              <OwnerRoutes
                exact
                path="/createJobOffer"
                component={CreateJobOffer}
              />
              <OwnerRoutes path="/job" component={JobDetails} />
              <OwnerRoutes
                path="/application"
                component={CompanyApplications}
              />
            </Switch>
          </Layout>
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
