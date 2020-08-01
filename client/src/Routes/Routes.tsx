import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import MainPage from '../pages/MainPage';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Companies from '../pages/Companies';
import ForEmployers from '../pages/ForEmployers';
import Pricing from '../pages/Pricing';
import Clients from '../pages/Clients';
import Events from '../pages/Events';
import ResetPassword from '../pages/ResetPassword';

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/company" component={Companies} />
        <Route exact path="/employers" component={ForEmployers} />
        <Route exact path="/employers/pricing" component={Pricing} />
        <Route exact path="/employers/clients" component={Clients} />
        <Route exact path="/employers/events" component={Events} />
        <Route exact path="/jobs" component={MainPage} />
        <Route exact path="/reset" component={ResetPassword} />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
