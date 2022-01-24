import { createContext, useContext, useEffect, useState } from "react";
import { APIContext } from './APIContext'

export const FeesContext = createContext(undefined)

const FeesContextProvider = (props) => {
    const [feesTemp, setFeesTemp] = useState([])

    const [fees, setFees] = useState([])
    const [banks, setBanks] = useState([])

    const { feeURL , bankURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(feeURL).then((response) => {
            setFees(response.data);
            setFeesTemp(response.data);
        });
        zenderAXIOS.get(bankURL).then((response) => {
            setBanks(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const addFee = (pay, bank) => {
        zenderAXIOS.post(bankURL, bank).then((response) => {
            const bankID = response.data.id
            zenderAXIOS.post(feeURL, {
                "group": pay.group,
                "name": pay.name,
                "bank": bankID
            }).then((response) => {
                setFees([response.data, ...fees])
            }).catch(err => {
                console.log(err)
                alert("داواکاریەکەت سەرنەکەوت");
            })

        }).catch(err => {
            console.log(err)
            alert("داواکاریەکەت سەرنەکەوت");
        })

    }

    const updateFee = (id, updatedFee) => {
        zenderAXIOS.patch(`${feeURL}${id}/`, updatedFee).then((response) => {
            setFees(fees.map((fee) => fee.id === id ? response.data : fee))
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateBank = (id, updatedData) => {
        zenderAXIOS.patch(`${bankURL}${id}/`, updatedData).then((response) => {
            setFees(fees)
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const updateFeeDate = (dates, group) => {
        if (group) {
            setFees(feesTemp.filter((fee) => fee.group === group))
            setFees(fees.filter((fee) => (new Date(fee.date) - dates.startDate) >= 0 && (new Date(fee.date) - dates.endDate <= 0)));
            return
        }
        setFees(feesTemp.filter((fee) => (new Date(fee.date) - dates.startDate) >= 0 && (new Date(fee.date) - dates.endDate <= 0)));
    }

    const setFeeGroup = (data) => {
        setFees(feesTemp.filter((fee) => fee.group === data))
    }

    const value = { fees, banks, updateFeeDate, setFeeGroup, addFee, updateFee, updateBank }
    return (
        <FeesContext.Provider value={value}>
            {props.children}
        </FeesContext.Provider>
    )
}
export default FeesContextProvider