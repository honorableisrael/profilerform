import React from 'react';
import {Card} from 'react-bootstrap';
import board from "../../assets/board.png";

const Mortgagecards = ()=>{
    return(
        <>
        <Card className="creditreport-section">
        <Card.Header className="creditreport-header ">
            <p>Credit Report</p>
        </Card.Header>
        <Card.Body className="creditrprt-body">
            <img src={board} className="crrpimg" />
            <p>No Credit Report Available</p>
        </Card.Body>
      </Card>
        </>
    )
}
export default  Mortgagecards;