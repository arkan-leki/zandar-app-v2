import { Col, Row, Table } from "react-bootstrap";
import React, { useContext } from "react";
import { TransportDetailsContext } from "../../contexts/TransportDetailsContext";
import Currency from "../../helper/Currency";
import TransportSale from "./TransportSale";

const TransportDetail = (props) => {
  const { transportz } = useContext(TransportDetailsContext);

  return (
    <section className="pt-5 px-2">
      <div className="table-title">
        <Row>
          <Col md={10}>
            <h2>{transportz.id} <b>باری</b></h2>
          </Col>
        </Row>

      </div>
      {transportz.request && <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th className="d-print-none" scope="col"> وەسڵ</th>
            <th className="d-print-none" scope="col"> فرۆشیار</th>
            <th scope="col">ژمارەی وەسڵ</th>
            <th scope="col">کڕیار</th>
            <th>بار</th>
            <th>کێش</th>
            <th scope="col">ناونیشان</th>
            <th scope="col">کۆی وەسل</th>
            <th scope="col">کۆی داشکان</th>
            <th scope="col">کۆتا</th>
            <th scope="col">کۆی گەڕاوە</th>
            <th scope="col">بەروار</th>
            <th className="d-print-none">حاڵەت</th>
            <th className="d-print-none">رێکەوت</th>
          </tr>
        </thead>
        <tbody>
          {transportz.request?.map((sale) => (
            <tr>
                <TransportSale sale={sale}/>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th>{Object.values(transportz.request).reduce((r) => r + 1, 0)}</th>
            <th />
            <th />
            <th />
            <th>{Object.values(transportz.request).reduce((r, { totallBar }) => r + parseFloat(totallBar), 0)}</th>
            <th>{Object.values(transportz.request).reduce((r, { sell_detail }) => r + parseInt(Object.values(sell_detail).reduce((r, { allwight }) => r + parseFloat(allwight), 0).toFixed(0)), 0)} کگم</th>
            <th>{Currency(Object.values(transportz.request).reduce((r, { totall }) => r + parseFloat(totall), 0))}</th>
          </tr>
        </tfoot>
      </Table>}


    </section >
  )
};

export default TransportDetail;
