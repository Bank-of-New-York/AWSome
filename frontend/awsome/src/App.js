import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import './App.css';

import Home from "./components/home/home";
import Header from "./components/header/header";
import Register from "./components/register/register";
import RiskAssessment from './components/riskAssessment/riskAssessment';
import RetirementForm from './components/retirementForm/retirementForm';
import Login from "./components/login/login";
import detailsForm from "./components/detailsForm/detailsForm";
import SignupLanding from './components/signupLanding/signupLanding';
import BondResult from './components/bondResult/bondResult';
import EquityResult from './components/equityResult/equityResult';
import Dashboard from './components/dashboard/dashboard';
import Logout from './components/logout/logout';
import RetirementDashboard from "./components/retirementDashboard/retirementDashboard";
import CompoundCalculator from "./components/compoundCalculator/compoundCalculator"
import EquityListing from "./components/equityListing/equityListing"
import { PrivateRoute } from './PrivateRoute';
import Screener from './components/screener/screener';
import EquitiesInfo from "./components/infopages/equitiesInfo"
import BondsInfo from "./components/infopages/bondsInfo"
import PortfolioInfo from "./components/infopages/portfolioInfo"
function App() {
  return (


    <div className="App">

        <header className="App-header">
          <Header></Header>
        </header>


        <Router>
          <Switch>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/signupLanding" component={SignupLanding}></Route>
            <Route exact path="/detailsForm" component={detailsForm}></Route>
            <Route exact path="/riskAssessment" component={RiskAssessment}></Route>
            <Route exact path="/retirementForm" component={RetirementForm}></Route>
            <Route exact path="/bondResult" component={BondResult}></Route>
            <Route exact path="/equityResult" component={EquityResult}></Route>
            <Route exact path="/compoundCalculator" component={CompoundCalculator}></Route>
            <Route exact path="/equityListing" component={EquityListing}></Route>
            <Route exact path="/equitiesInfo" component={EquitiesInfo}></Route>
            <Route exact path="/bondsInfo" component={BondsInfo}></Route>
            <Route exact path="/portfolioInfo" component={PortfolioInfo}></Route>

            <PrivateRoute exact path="/screener" component={Screener}></PrivateRoute>
            <PrivateRoute exact path="/dashboard" component={Dashboard}></PrivateRoute>
            <PrivateRoute exact path="/retirementDashboard" component={RetirementDashboard}></PrivateRoute>
            <PrivateRoute exact path="/logout" component={Logout}></PrivateRoute>

            <Route path="/" component={Home}></Route>
          </Switch>
        </Router>

    


    </div>

  );
}

export default App;
