import React from 'react'

const Epmloyee = ({ theEmplo }) => {
  return (
    <>
      <td>{theEmplo.id}</td>
      <td>{theEmplo.name}</td>
      <td>{theEmplo.phone}</td>
      <td>{theEmplo.status}</td>
    </>
  )
}

export default Epmloyee