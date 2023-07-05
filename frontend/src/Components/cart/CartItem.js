import React from "react";
import { Card, Button,Row,Col } from "react-bootstrap";

function CartItem(props) {
  return (
    <div>
      <Card style={{margin:'10px'}}>
        <Row>
          <Col lg={4}>
            <Card.Img
              style={{ width: "100%", height: "100%" }}
              variant="left"
              src={props.img}
            />
          </Col>
          <Col lg={8}>
            <Card.Body>
              <Card.Title>{props.name}</Card.Title>
              <Card.Title>{props.price}</Card.Title>

              <Button onClick={()=>props.removeItem(props.id)} variant="danger">Remove</Button>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default CartItem;
