// import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SalesContextProvider from './contexts/SalesContext'
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
import BuyList from "./components/buy/BuyList";
import BuyContextProvider from "./contexts/BuyContext";
import BuyDetailContextProvider from "./contexts/BuyDetailContext";
import BuyDetail from "./components/buydetail/BuyDetail";
import TradersContextProvider from "./contexts/TradersContext";
import PaymentsList from "./components/payments/PaymentsList";
import GroupsContextProvider from './contexts/GroupsContext';
import Locals2ContextProvider from "./contexts/Locals2Context";
import ReSellContextProvider from "./contexts/ReSellContext";

function App() {
    return (
        <APIContextProvider>
            <Router>
                <TableLayout>
                    <Switch>
                        <GroupsContextProvider>
                            <Locals2ContextProvider>
                                <>
                                    <Route exact path="/">
                                        <PaymentsContextProvider>
                                            <Board />
                                        </PaymentsContextProvider>
                                    </Route>
                                    <Route exact path="/sales/">
                                        <>
                                            <VendorsContextProvider>
                                                <ReSellContextProvider>
                                                    <SalesContextProvider>
                                                        <SalesList />
                                                    </SalesContextProvider>
                                                </ReSellContextProvider>
                                            </VendorsContextProvider>
                                        </>
                                    </Route>
                                    <Route exact path="/saleDetail/:id">
                                        <SaleDetailContextProvider>
                                            <ItemsContextProvider>
                                                <SaleDetail />
                                            </ItemsContextProvider>
                                        </SaleDetailContextProvider>
                                    </Route>
                                    <Route exact path="/retail/">
                                        <>
                                            <SaleDetailContextProvider>
                                                <ItemsContextProvider>
                                                    <Retail />
                                                </ItemsContextProvider>
                                            </SaleDetailContextProvider>
                                        </>
                                    </Route>
                                    <Route exact path="/locals/">
                                        <>
                                            <RegionsContextProvider>
                                                <LocalsContextProvider>
                                                    <LocalList />
                                                </LocalsContextProvider>
                                            </RegionsContextProvider>
                                        </>
                                    </Route>
                                    <Route exact path="/localDetail/:id">
                                        <>
                                            <LocalDetailContextProvider>
                                                <PaymentsContextProvider>
                                                    <ReSellContextProvider>
                                                        <LocalDetail />
                                                    </ReSellContextProvider>
                                                </PaymentsContextProvider>
                                            </LocalDetailContextProvider>
                                        </>
                                    </Route>

                                    <ItemsContextProvider>
                                        <CatsContextProvider>
                                            <TradersContextProvider>
                                                <Route exact path="/items/">
                                                    <>
                                                        <ItemsList />
                                                    </>
                                                </Route>
                                                <Route exact path="/itemDetail/:id">
                                                    <ItemDetailContextProvider>
                                                        <>
                                                            <ItemDetal />
                                                        </>
                                                    </ItemDetailContextProvider>
                                                </Route>
                                            </TradersContextProvider>
                                        </CatsContextProvider>
                                    </ItemsContextProvider>

                                    <Route exact path="/SaleBack/">
                                        <ItemsContextProvider>
                                            <SalesContextProvider>
                                                <SaleBack />
                                            </SalesContextProvider>
                                        </ItemsContextProvider>
                                    </Route>
                                    <Route exact path="/buy/">
                                        <>
                                            <TradersContextProvider>
                                                <BuyContextProvider>
                                                    <BuyList />
                                                </BuyContextProvider>
                                            </TradersContextProvider>
                                        </>
                                    </Route>
                                    <Route exact path="/buyDetail/:id">
                                        <ItemsContextProvider>
                                            <BuyDetailContextProvider>
                                                <BuyDetail />
                                            </BuyDetailContextProvider>
                                        </ItemsContextProvider>
                                    </Route>
                                    <Route exact path="/payments/">
                                        <Locals2ContextProvider>
                                            <>
                                                <PaymentsContextProvider>
                                                    <PaymentsList />
                                                </PaymentsContextProvider>
                                            </>
                                        </Locals2ContextProvider>
                                    </Route>
                                </>
                            </Locals2ContextProvider>
                        </GroupsContextProvider>
                    </Switch>
                </TableLayout>
            </Router>
        </APIContextProvider>
    );
}

export default App;
