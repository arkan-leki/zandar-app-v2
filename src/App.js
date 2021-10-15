// import './App.css';
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route
} from "react-router-dom";
import SalesContextProvider from './contexts/SalesContext'
import GroupsContextProvider from './contexts/GroupsContext'
import SalesList from './components/sale/SalesList'
import APIContextProvider from "./contexts/APIContext";

function App() {
    return (
        <APIContextProvider>
            <Router>
                <Switch>
                    <Route exact path="/">
                        <GroupsContextProvider>
                            <SalesContextProvider>
                                <SalesList/>
                            </SalesContextProvider>
                        </GroupsContextProvider>
                    </Route>
                </Switch>
            </Router>
        </APIContextProvider>
    );
}

export default App;
