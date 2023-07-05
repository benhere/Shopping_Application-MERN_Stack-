import React, { Component } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import axios from 'axios';

class New extends Component {

    constructor(props){
        super(props);
        this.state = {
            name:'',
            img:'',
            price:'',
            desc:''
        }
    }

    //whenever any event occur then event object is passed into handler method 
    changeHandler = (e)=>{
        // console.log(e.target.name);
        // so e.target.name gives the name which are changed due to some event
        // e.target.value give the respective value
        this.setState({[e.target.name]:e.target.value});
        // so whatever input we give in form that will be synchronise with this method

    }

    formSubmitHandler = async(e)=>{
      e.preventDefault();
      //console.log(this.state);
      // we will send current state in request body
      await axios.post('/products',this.state);
      console.log('New Product Created');

      // for automatically redirecting to products page form new product form
      this.props.history.push('/products');
    }



  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}}>New Product Form</h1>
        <Row>
          <Col lg={3}></Col>
          <Col lg={6}>
            <Form onSubmit={this.formSubmitHandler}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Product Name" name='name' onChange={this.changeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Image Url</Form.Label>
                <Form.Control type="text" placeholder="Enter Image Url" name='img' onChange={this.changeHandler}/>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control type="text" placeholder="Enter Price" name='price' onChange={this.changeHandler} />
              </Form.Group>

              <Form.Group
                className="mb-3"
              >
                <Form.Label>Product Description</Form.Label>
                <Form.Control as="textarea" rows={3} name='desc' onChange={this.changeHandler}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
          <Col lg={3}></Col>
        </Row>
      </div>
    );
  }
}

export default New;
