import React from "react";
import { Col, Card } from "react-bootstrap";
import board from "../../assets/board.png";

const CreditReport = () => {
  return (
    <>
      <Col md={4} className="mnww">
        <Card className="mortgage-section">
          <Card.Header className="mortgage-header">Equity Finance</Card.Header>
          <Card.Body className="mortgage-body">
            <p>Sed lorem turpis tellus, nisl, vel</p>
            <p>quis rhoncus purus quis.</p>
            <span className="mortgage-btn">Coming soon</span>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mnww">
        <Card className="mortgage-section">
          <Card.Header className="mortgage-header">
            Housing Micro Finance
          </Card.Header>
          <Card.Body className="mortgage-body">
            <p>Sed lorem turpis tellus, nisl, vel</p>
            <p>quis rhoncus purus quis.</p>
            <span className="mortgage-btn">Apply</span>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4} className="mnww">
        <Card className="mortgage-section">
          <Card.Header className="mortgage-header">Personal Loan</Card.Header>
          <Card.Body className="dets-body">
            <p className="text-center">
              Amount Loanable
              <br />
              Basic Salary
            </p>
            <div>
              <span className="mortgage-btn">View More</span>
            </div>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};
export default CreditReport;
