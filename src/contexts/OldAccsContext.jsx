import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { APIContext } from './APIContext'

export const OldAccsContext = createContext(undefined)

const OldAccsContextProvider = (props) => {

    const [oldAccs, setOldAccs] = useState([])

    const { oldAccURL, zenderAXIOS } = useContext(APIContext)

    useEffect(() => {
        zenderAXIOS.get(oldAccURL).then((response) => {
            setOldAccs(response.data);
        });
        // eslint-disable-next-line
    }, [])

    const addOldAcc = (data) => {
        zenderAXIOS.post(oldAccURL, data).then((response) => {
            setOldAccs([response.data, ...oldAccs])
        }).catch(err => {
            console.log(err)
            alert("داواکاریەکەت سەرنەکەوت");
        })

    }

    const updateOldAcc = (id, updatedData) => {
        zenderAXIOS.patch(`${oldAccURL}${id}/`, updatedData).then((response) => {
            setOldAccs(oldAccs.map((oldAcc) => oldAcc.id === id ? response.data : oldAcc))
            alert("داواکاریەکەت سەرکەوتوو بوو پەڕەکە رفريش بکەوە");
        }).catch(err => {
            alert("داواکاریەکەت سەرنەکەوت");
        })
    }

    const value = { oldAccs, addOldAcc, updateOldAcc }
    return (
        <OldAccsContext.Provider value={value}>
            {props.children}
        </OldAccsContext.Provider>
    )
}

export default OldAccsContextProvider
