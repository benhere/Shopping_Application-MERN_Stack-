import React, { useContext } from "react";
import UserContext from "../store/user-context";
import CartItem from "../Components/cart/CartItem";
import { Container, Row, Col, ListGroup, Button } from "react-bootstrap";

function Cart() {
  const currentUser = useContext(UserContext);

  const cart = currentUser.cart;

  let allItems = "<p>Your Cart is Empty</p>";
  let priceList = [];
  let totalPrice = 0;

  if (cart.length) {
    allItems = cart.map((item) => {
      priceList.push({ name: item.name, price: item.price });
      totalPrice += parseFloat(item.price);

      function removeItemHandler(productid){
          //console.log(productid);
          currentUser.removeFromCart(productid);

      }

      return (
        <Col lg={8} md={8} key={item._id}>
          <CartItem
            name={item.name}
            price={item.price}
            img={item.img}
            id={item._id}
            removeItem={removeItemHandler}
          />
        </Col>
      );
    });
  }

  return (
    <Container>
      <Row>
        <Col lg={8}>
          <Row>{allItems}</Row>
        </Col>
        <Col lg={4}>
          <ListGroup>
            {priceList.map((item) => (
              <ListGroup.Item key={item._id}>
                <strong>{item.name}</strong> - &#8377;{item.price}{" "}
              </ListGroup.Item>
            ))}
          </ListGroup>
          <h4>Total Amount is : &#8377;{totalPrice}</h4>
          <Button variant="success">Buy Now</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;
