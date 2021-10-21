// import './App.css';
import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import SalesContextProvider from './contexts/SalesContext'
import GroupsContextProvider from './contexts/GroupsContext'
import SalesList from './components/sale/SalesList'
import APIContextProvider from "./contexts/APIContext";
import VendorsContextProvider from "./contexts/VendorsContext";
import LocalsContextProvider from "./contexts/LocalsContext";
import TableLayout from "./layout/TableLayout";
import SaleDetailContextProvider from "./contexts/SaleDetailContext";
import SaleDetail from "./components/saleDetail/SaleDetail";
import ItemsContextProvider from "./contexts/ItemsContext";

function App() {
    return (
        <APIContextProvider>
            <Router>
                <TableLayout>
                    <Switch>
                        <Route exact path="/">
                            {/*<DataTabel />*/}
                        </Route>
                        <Route exact path="/sales/">
                            <GroupsContextProvider>
                                <VendorsContextProvider>
                                    <LocalsContextProvider>
                                        <SalesContextProvider>
                                                <SalesList />
                                        </SalesContextProvider>
                                    </LocalsContextProvider>
                                </VendorsContextProvider>
                            </GroupsContextProvider>
                        </Route>
                        <Route exact path="/saleDetail/:id">
                            <SaleDetailContextProvider>
                                <ItemsContextProvider>
                                    <SaleDetail />
                                </ItemsContextProvider>
                            </SaleDetailContextProvider>
                        </Route>
                        <Route exact path="/saleDetail/">
                            <SaleDetailContextProvider>
                                <SaleDetail />
                            </SaleDetailContextProvider>
                        </Route>
                    </Switch>
                </TableLayout>
            </Router>
        </APIContextProvider>
    );
}

export default App;
