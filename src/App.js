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
import LocalList from "./components/locals/LocalList";
import RegionsContextProvider from "./contexts/RegionlsContext";
import Retail from "./components/retail";
import LocalDetail from "./components/localDetail/LocalDetail";
import LocalDetailContextProvider from "./contexts/LocalDetailContext";
import ItemsList from "./components/items/ItemsList";
import CatsContextProvider from "./contexts/CategoresContext";
import ItemDetailContextProvider from "./contexts/ItemDetailContext";
import ItemDetal from "./components/items/ItemDetal";
import Board from "./components/dashboard/Board";
import PaymentsContextProvider from "./contexts/PaymentsContext";
import SaleBack from "./components/saleBack/saleBack";

function App() {
    return (
        <APIContextProvider>
            <Router>
                <TableLayout>
                    <Switch>
                        <Route exact path="/">
                            <PaymentsContextProvider>
                                <Board />
                            </PaymentsContextProvider>
                        </Route>
                        <Route exact path="/sales/">
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
                        <Route exact path="/saleDetail/:id">
                            <SaleDetailContextProvider>
                                <ItemsContextProvider>
                                    <SaleDetail/>
                                </ItemsContextProvider>
                            </SaleDetailContextProvider>
                        </Route>
                        <Route exact path="/retail/">
                            <GroupsContextProvider>
                                <SaleDetailContextProvider>
                                    <ItemsContextProvider>
                                        <Retail/>
                                    </ItemsContextProvider>
                                </SaleDetailContextProvider>
                            </GroupsContextProvider>
                        </Route>
                        <Route exact path="/locals/">
                            <GroupsContextProvider>
                                <RegionsContextProvider>
                                    <LocalsContextProvider>
                                        <LocalList/>
                                    </LocalsContextProvider>
                                </RegionsContextProvider>
                            </GroupsContextProvider>
                        </Route>
                        <Route exact path="/localDetail/:id">
                            <GroupsContextProvider>
                                <LocalDetailContextProvider>
                                    <LocalDetail/>
                                </LocalDetailContextProvider>
                            </GroupsContextProvider>
                        </Route>
                        <Route exact path="/items/">
                            <GroupsContextProvider>
                                <CatsContextProvider>
                                    <ItemsContextProvider>
                                        <ItemsList/>
                                    </ItemsContextProvider>
                                </CatsContextProvider>
                            </GroupsContextProvider>
                        </Route>
                        <Route exact path="/itemDetail/:id">
                            <ItemDetailContextProvider>
                                <CatsContextProvider>
                                    <ItemDetal/>
                                </CatsContextProvider>
                            </ItemDetailContextProvider>
                        </Route>
                        <Route exact path="/SaleBack/">
                            <ItemsContextProvider>
                                <SalesContextProvider>
                                    <SaleBack />
                                </SalesContextProvider>
                            </ItemsContextProvider>
                        </Route>
                    </Switch>
                </TableLayout>
            </Router>
        </APIContextProvider>
    );
}

export default App;
