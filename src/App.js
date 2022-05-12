// import './App.css';
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import SalesContextProvider from './contexts/SalesContext'
import SalesList from './components/sale/SalesList'
import APIContextProvider from "./contexts/APIContext";
import VendorsContextProvider from "./contexts/VendorsContext";
import LocalsContextProvider from "./contexts/LocalsContext";
import SaleDetailContextProvider from "./contexts/SaleDetailContext";
import SaleDetail from "./components/saleDetail/SaleDetail";
import ItemsContextProvider from "./contexts/ItemsContext";
import LocalList from "./components/locals/LocalList";
import RegionsContextProvider from "./contexts/RegionsContext";
import Retail from "./components/retail";
import LocalDetail from "./components/localDetail/LocalDetail";
import LocalDetailContextProvider from "./contexts/LocalDetailContext";
import ItemsList from "./components/items/ItemsList";
import CatsContextProvider from "./contexts/CategoresContext";
import ItemDetailContextProvider from "./contexts/ItemDetailContext";
import ItemDetal from "./components/items/ItemDetal";
import PaymentsContextProvider from "./contexts/PaymentsContext";
import BuyList from "./components/buy/BuyList";
import BuyContextProvider from "./contexts/BuyContext";
import BuyDetailContextProvider from "./contexts/BuyDetailContext";
import BuyDetail from "./components/buydetail/BuyDetail";
import TradersContextProvider from "./contexts/TradersContext";
import PaymentsList from "./components/payments/PaymentsList";
import GroupsContextProvider from './contexts/GroupsContext';
import Locals2ContextProvider from "./contexts/Locals2Context";
import ReSellContextProvider from "./contexts/ReSellContext";
import RegionsList from "./components/region/RegionsList";
import VisitorsList from "./components/visitors/VisitorsList";
import OldAccsContextProvider from "./contexts/OldAccsContext";
import FeeList from "./components/fee/FeeList";
import FeesContextProvider from "./contexts/FeeContext";
import OrdersContextProvider from './contexts/OrdersContext';
import OrdersList from "./components/order/OrdersList";
import LocalList2 from "./components/locals/LocalList2";
import CompanyList from "./components/company/CompanyList";
import Transports from "./components/transports/Transports";
import TransportsContextProvider from "./contexts/TransportsContext";
import TransportDetail from "./components/transports/TransportDetail";
import TransportDetailsContextProvider from "./contexts/TransportDetailsContext";
import EmployesContextProvider from "./contexts/EmployesContext";
import EmployesList from "./components/emplyee/EmployesList";
import ResellItem from "./components/ResellItem";
import AdminPanel from "./layout/AdminPanel";
import DashBoard from "./layout/DashBoard";
import DataTabel from "./helper/makeData";

function App() {
    return (
        <APIContextProvider>
            <Router>
                <Switch>
                    <GroupsContextProvider>
                        <VendorsContextProvider>
                            <AdminPanel>
                                <ItemsContextProvider>
                                <Locals2ContextProvider>
                                    <Route exact path="/">
                                        <PaymentsContextProvider>
                                            <>
                                                {/* <Board /> */}
                                                <DashBoard />
                                            </>
                                        </PaymentsContextProvider>
                                    </Route>
                                    <Route exact path="/sales/">
                                        <RegionsContextProvider>
                                            <>
                                                <ReSellContextProvider>
                                                    <SalesContextProvider>
                                                        <SalesList />
                                                    </SalesContextProvider>
                                                </ReSellContextProvider>
                                            </>
                                        </RegionsContextProvider>
                                    </Route>
                                    <Route exact path="/saleDetail/:id">
                                        <SaleDetailContextProvider>
                                            <SaleDetail />
                                        </SaleDetailContextProvider>
                                    </Route>
                                    <Route exact path="/transports/">
                                        <TransportsContextProvider>
                                            <Transports />
                                        </TransportsContextProvider>
                                    </Route>
                                    <Route exact path="/transDetail/:id">
                                        <TransportDetailsContextProvider>
                                            <TransportDetail />
                                        </TransportDetailsContextProvider>
                                    </Route>
                                    <Route exact path="/retail/">
                                        <>
                                            {/* <SaleDetailContextProvider> */}
                                                <>
                                                    <Retail />
                                                </>
                                            {/* </SaleDetailContextProvider> */}
                                        </>
                                    </Route>
                                    <Route exact path="/resellitem/">
                                        <>
                                            {/* <SaleDetailContextProvider> */}
                                            <>
                                                <ResellItem />
                                            </>
                                            {/* </SaleDetailContextProvider> */}
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
                                                        <OldAccsContextProvider>
                                                            <LocalDetail />
                                                        </OldAccsContextProvider>
                                                    </ReSellContextProvider>
                                                </PaymentsContextProvider>
                                            </LocalDetailContextProvider>
                                        </>
                                    </Route>
                                    <>
                                        <Route exact path="/items/">
                                            <>
                                                <CatsContextProvider>
                                                    <TradersContextProvider>
                                                        <ItemsList />
                                                    </TradersContextProvider>
                                                </CatsContextProvider>
                                            </>
                                        </Route>
                                        <Route exact path="/itemDetail/:id">
                                            <ItemDetailContextProvider>
                                                <CatsContextProvider>
                                                    <ItemDetal />
                                                </CatsContextProvider>
                                            </ItemDetailContextProvider>
                                        </Route>
                                    </>
                                    <Route exact path="/groups/">
                                        <DataTabel />
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
                                        <BuyDetailContextProvider>
                                            <BuyDetail />
                                        </BuyDetailContextProvider>
                                    </Route>
                                    <Route exact path="/payments/">
                                        <>
                                            <PaymentsContextProvider>
                                                <PaymentsList />
                                            </PaymentsContextProvider>
                                        </>
                                    </Route>
                                    <Route exact path="/locals2/">
                                        <>
                                            <RegionsContextProvider>
                                                <LocalList2 />
                                            </RegionsContextProvider>
                                        </>
                                    </Route>
                                </Locals2ContextProvider>
                                </ItemsContextProvider>
                                
                                <Route exact path="/bank/">
                                    <>
                                        <FeesContextProvider>
                                            <FeeList />
                                        </FeesContextProvider>
                                    </>
                                </Route>
                                <Route exact path="/regions/">
                                    <RegionsContextProvider>
                                        <RegionsList />
                                    </RegionsContextProvider>
                                </Route>
                                <Route exact path="/visitors/">
                                    <>
                                        <VisitorsList />
                                    </>
                                </Route>
                                <Route exact path="/orders/">
                                    <OrdersContextProvider>
                                        <OrdersList />
                                    </OrdersContextProvider>
                                </Route>
                                <Route exact path="/company/">
                                    <TradersContextProvider>
                                        <CompanyList />
                                    </TradersContextProvider>
                                </Route>
                                <Route exact path="/employees/">
                                    <EmployesContextProvider>
                                        <EmployesList />
                                    </EmployesContextProvider>
                                </Route>
                            </AdminPanel>
                        </VendorsContextProvider>
                    </GroupsContextProvider>
                </Switch>
            </Router>
        </APIContextProvider>
    );
}

export default App;
