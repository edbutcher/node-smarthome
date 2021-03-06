import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/Navbar';
import {
    Devices,
    DeviceAdd,
    DeviceEdit,
    DeviceLog,
    Groups,
    GroupAdd,
    GroupEdit,
    GroupLog,
  } from './scenes';

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <div className="container">
                        <NavBar />
                    </div>

                    <Switch>
                        <Route path="/devices" exact component={Devices} />
                        <Route path="/devices/add" exact component={DeviceAdd} />
                        <Route path="/devices/edit/:id" component={DeviceEdit} />
                        <Route path="/devices/log/:id" component={DeviceLog} />
                        <Route path="/groups" exact component={Groups} />
                        <Route path="/groups/add" exact component={GroupAdd} />
                        <Route path="/groups/edit/:id" exact component={GroupEdit} />
                        <Route path="/groups/log/:id" exact component={GroupLog} />
                        <Redirect from="/" to="/devices" />
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;
