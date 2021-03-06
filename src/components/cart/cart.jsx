import React, { useState, useEffect } from "react";
import {useCart} from "../cart/cartContext";
import "../products/products.css";
import "../cart/cart.css";
// import { useRouter } from 'next/router'


export default function Cart (){
    const [show, setShow] = useState(false);
    // const router = useRouter()
    
    const handleClose = () => {
      setShow(false)
    };
    const handleShow = () => {
      console.log("Showtime")
      setShow(true)
    };
 
    
  const [subTotal, setSubTotal] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const {itemsInCart,setItemsInCart} = useCart()

  const getSubTotal = () => {
    let subTotal = 0
    let quantity = 0

    itemsInCart.map((item)=>{
      const itemPrice = (item.qty * item.price);
      quantity = quantity + item.qty;
      subTotal = subTotal + itemPrice;
    })
    return [subTotal, quantity]
  }

  useEffect(()=>{
    const [subTotalValue, totalQuantity] = getSubTotal();
    // const subTotalString   = `(${totalQuantity} Quantity) : Rs. ${subTotalValue} `;
    setSubTotal(subTotalValue)
    setQuantity(totalQuantity)
  },[itemsInCart])


  function alterQuantity(alterType,product){
    switch (alterType) {
      
      case "INCREASE":{
        const newArr= itemsInCart.map((item)=>{
          if(item.id === product.id){
            const newItem = {...item,qty:item.qty+1}
            return newItem
          }return item
        })
        setItemsInCart((newArr))
        break;
      }
      case "DECREASE":{
        const newArr= itemsInCart.map((item)=>{
          if(item.id === product.id){
            if(item.qty > 1){
              const newItem = {...item,qty:item.qty-1}
              return newItem
            }return item              
          }return item
        })
        setItemsInCart((newArr))
        break;
      }
    }      
  }

    function removeItemFromCart(product){
      const filteredProductsArray = itemsInCart.filter((item) => item.id !== product.id);
      setItemsInCart((filteredProductsArray))
    }
  function calculateTotal(){
    const total = subTotal + ((subTotal * 18)/100)
    return total
  }
  return (
      <div className="cart-body">
        {show && 
              <div className="modal">
                <div className="modal_content">
                    <span className="close" onClick={()=>handleClose()}>
                        &times;
                    </span>
                  <div className="checkout-grid">
                  <div className="checkout-details">
                    <h4>Total Items : {quantity}</h4>
                    <h4>Items Price : Rs. {subTotal}</h4>
                    <h4>GST : 18%</h4>
                    <h4>Total : Rs. {calculateTotal()}</h4>
                  </div>
                  <div className="checkout-form">
                  <form>
                    <label for="fname">First Name</label>
                      <input type="text" id="fname" name="firstname" placeholder="Your name..">
                      </input>
                    <label for="fname">Last Name</label>
                      <input type="text" id="lname" name="lastname" placeholder="Your name..">
                      </input>
                    <label for="fname">Address</label>
                      <input type="text" id="address" name="address" placeholder="Address">
                      </input>
                    <input type="submit" value="Submit"></input>
                  </form>
                  </div>
                  </div>
                </div>
              </div>
              }
        <div className='cart-header'>
            <h1>Cart</h1>
            <div className="cart-sub-total">
              <h3>Sub Total ({quantity} Quantity) : Rs. {subTotal} </h3>
              <span>
              <div style={{marginTop:"-70px"}}>
              <button className="modal-button" onClick={()=>handleShow()}>Check Out</button>
              </div>
              </span>
            </div>
        </div>
        <div className="card-cart" style={{ display: "flex", flexWrap: "wrap" }}>
      {itemsInCart.map(
        (item) => (
            <div key={item.id} className={"card-box wishlist"}>
              <div className={"badge-div"}>
                  <img src={item.image} className={"card-img-lg"} alt={item.productName}/>
              </div>
              <div className={"card-box-container"}>
                  <h3 className={"card-details"}> {item.name} </h3>
                  <div className={"card-details"}>Price : Rs. {item.price}</div>
                  <div className={"quantity-details"} >
                    <h3>Quantity</h3>
                    <button onClick={()=> alterQuantity("DECREASE",item)}
                    className={"box-btn"} disabled={item.qty===1 ? true : false}>-</button>
                    <span>{item.qty}</span>
                    <span>
                    <button onClick={()=> alterQuantity("INCREASE",item)} 
                    className={"box-btn"}>+</button>
                    </span>
                  </div>
                  </div>
                  <div className={"card-details"}>
                  <button onClick={()=> removeItemFromCart(item)}
                    className={"primary-btn"}>Remove Item</button>
                  </div>
              
          </div>
        )
      )}
    </div>
  </div>
  )
}
