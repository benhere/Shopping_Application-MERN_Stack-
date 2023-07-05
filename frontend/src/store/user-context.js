// to create a context which is available to all users
import { createContext, useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from 'react-router-dom';

// we can create context within this method which is available to all users
const UserContext = createContext();

// we keep two things within this context which
//(1). whether user is currently logged in or log out
//(2). to set the user
export function UserContextProvider(props) {

  const [isLoggedIn, setIsLoggedIn] = useState(undefined);

  // add to cart is also available in current context
  // intially cart is empty
  const [cart, setCart] = useState([]);

  const history = useHistory();



  async function getLoggedIn() {
    //send request to backend and check whether user is logged in or not
    const res = await axios.get("/loggedIn");
    setIsLoggedIn(res.data);
  }

  // function to get the cart
  async function getCart() {
    // this method make request to backend and get the getCart
    const res = await axios.get("/user/cart");
    console.log(res);
    // then update the cart with the new product item
    setCart(res.data);
  }

  async function addToCart(product) {

    try {
      // add product into cart using setCart method
      // here setCart() method will take previous/intial state of cart as an argument
      // since the state is not updated instantly, so we will pass callback method inside setCart method
      setCart((prevCart) => {
        // this will return the updated cart array
        return prevCart.concat(product);
      });
      // update the cart inside current state or our state
      // and then make request to backend to update it and save into database
      await axios.post("/user/cart/add", { productid: product.id });
      console.log("Product added successfully in the cart");
    } 
    catch (e) {
      console.log(e.message);
      history.push('/products');
    }
  }

   // function to remove item from Cart
   async function removeFromCart(productid){

      console.log('Item Removed from cart successfully');
     
      setCart((prevCart)=>{
          return prevCart.filter((product)=>product._id!==productid);
      })
     // we will made request to the backend as well
     await axios.post('/user/cart/remove',{ productid });
  }

  // once the application is started, we will check whether the user is logged in or not
  //for this we will use useEffect() hook
  useEffect(() => {
    // as the application is started, this useEffect() method is called and
    //it further check whether the user is logged in or not
    getLoggedIn();

    // if user is logged in then getCart() method will be called
    if (isLoggedIn === true) {
      getCart();
    }
    // eslint-disable-next-line
  }, [isLoggedIn]);

  // create a context object
  // so getLoggedIn() method run and update the state in line 17 with the help of context object
  const context = {
    isLoggedIn: isLoggedIn,
    getLoggedIn: getLoggedIn,
    cart: cart,
    addToCart: addToCart,
    cartLength:cart.length,
    removeFromCart: removeFromCart,
  };

  // now we will pass this state to each required components
  // from this context, we will return two things:
  // (1). the current context which we have created and which
  //(2). the whole UserContextProvider functional component

  return (
    // we will wrap whole application within UserContext.Provider
    // Provider is a method offered by context API
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;

//export function UserContextProvider will export whole function and current user context is exported
//  with the help of default export
