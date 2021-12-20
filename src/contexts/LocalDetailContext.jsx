import {createContext, useContext, useEffect, useState} from "react";
import {APIContext} from './APIContext'
import {useParams} from "react-router-dom/cjs/react-router-dom";

export const LocalDetailContext = createContext(undefined)

const LocalDetailContextProvider = (props) => {
    const [local, setLocal] = useState([])
    const [sales, setSales] = useState([])
    const [oldAcc, setOldAcc] = useState([])
    const [resell, setResell] = useState([])
    const [payment, setPayment] = useState([])

    const {reSellURL, salesURL, localsURL, oldAccURL, zenderAXIOS, paymentURL} = useContext(APIContext)
    const {id} = useParams();

    useEffect(() => {
        zenderAXIOS.get(`${localsURL}${id}/`).then((response) => {
            setLocal(response.data);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        zenderAXIOS.get(`${paymentURL}?local=${id}`).then((response) => {
            setPayment(response.data);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        zenderAXIOS.get(`${oldAccURL}?local=${id}`).then((response) => {
            setOldAcc(response.data);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        zenderAXIOS.get(`${salesURL}?local_id=${id}`).then((response) => {
            setSales(response.data);
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        zenderAXIOS.get(`${reSellURL}`).then((response) => {
            setResell(response.data.filter((val) => val.local === parseInt(id)));
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
        // eslint-disable-next-line
    }, [])




    const value = {local, sales , oldAcc, payment, resell}
    return (
        <LocalDetailContext.Provider value={value}>
            {props.children}
        </LocalDetailContext.Provider>
    )
}
export default LocalDetailContextProvider
