import { createContext, useContext, useEffect, useState } from "react";
import { APIContext } from "./APIContext";

export const EmployesContext = createContext(undefined)
const EmployesContextProvider = (props) => {
  const [employees, setEmployees] = useState([])
  const { employeesURL, zenderAXIOS } = useContext(APIContext)

  useEffect(() => {
    zenderAXIOS.get(employeesURL).then((response) => {
      setEmployees(response.data);
    });
    // eslint-disable-next-line
  }, [])

  const value = { employees }
  return (
    <EmployesContext.Provider value={value}>
      {props.children}
    </EmployesContext.Provider>
  )
}

export default EmployesContextProvider