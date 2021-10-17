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
import VendorsContextProvider from "./contexts/VendorsContext";
import LocalsContextProvider from "./contexts/LocalsContext";
import TableLayout from "./layout/TableLayout";

function App() {
    return (
        <TableLayout>
            <APIContextProvider>
                <Router>
                    <Switch>
                        <Route exact path="/">
                            <GroupsContextProvider>
                                <VendorsContextProvider>
                                    <LocalsContextProvider>
                                        <SalesContextProvider>
                                            <SalesList/>
                                        </SalesContextProvider>
                                    </LocalsContextProvider>
                                </VendorsContextProvider>
                            </GroupsContextProvider>
                        </Route>
                    </Switch>
                </Router>
            </APIContextProvider>
        </TableLayout>
    );
}

export default App;
