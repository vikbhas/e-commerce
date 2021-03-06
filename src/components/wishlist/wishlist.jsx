import React, { useReducer,useState, useEffect } from "react";
import {useWishList} from "../wishlist/wishlistContext";
import {useCart} from "../cart/cartContext";
import "../products/products.css";
import "../wishlist/wishlist.css";

export default function WishList (){
    const {itemsInCart,setItemsInCart} = useCart();
    const {itemsInWishList,setitemsInWishList} = useWishList();

    const addToWishlist = (product) => {
        if (itemsInWishList.length){
          let flag= true
          const newArr= itemsInWishList.map((item)=>{
            if(item.id === product.id){
              flag = false
              if (item.wishlisted){
                const newItem = {...item,wishlisted:false}
                return newItem
              }else{
                const newItem = {...item,wishlisted:true}
                return newItem
              } 
            }return item
          })
          if (!flag){
            setitemsInWishList((newArr))
          }
          if(flag){
            setitemsInWishList((itemsInWishList)=> [...itemsInWishList,{...product,wishlisted:true}])
          }
          
        }else{
          setitemsInWishList((itemsInWishList)=> [...itemsInWishList,{...product,wishlisted:true}])
        }
      };
    
    
      const cartHandler=(product)=>{
        if(itemsInCart.length){
          let flag= true
          const newArr= itemsInCart.map((item)=>{
            if(item.id === product.id){
              flag = false
              const newItem = {...item,qty:item.qty+1}
              return newItem
            }return item
          })
          if(!flag){
            setItemsInCart((newArr))
          }
          if(flag){
            setItemsInCart((itemsInCart)=> [...itemsInCart,{...product,qty:1}])
          }
        }else{
          setItemsInCart((itemsInCart)=> [...itemsInCart,{...product,qty:1}])
        }
      }

      const getWishListedData = (itemsInWishList) =>{
          return itemsInWishList.filter(({ wishlisted }) =>{
              return (wishlisted === true)
          }
        )
      }
      const filteredWishListData = getWishListedData(itemsInWishList);
       
      return (
        <div className="wishlist-body">
          <div className="card-wishlist" style={{ display: "flex", flexWrap: "wrap" }}>
            {filteredWishListData.map(
              (item) => (
                  <div key={item.id} className="card-box wishlist">
                    <div className={"badge-div"}>
                        <img src={item.image} className={"card-img-lg"} alt={item.productName}/>
                        <i onClick={() => addToWishlist(item)}
                          style={{color: item.wishlisted && item.wishlisted ? "red" :"white"}} className="fa fa-heart fa-2x fa-border-outer heart-badge"></i>
                    </div>
                    <div className={"card-box-container"}>
                        <h3 className={"card-details"}> {item.name} </h3>
                        <div className={"card-details"}>Rs. {item.price}</div>
                        <div className={"card-details"}>
                        {item.inStock ? "In Stock" : "Out of Stock"}
                        </div>
                        <div className={"card-details"}>{item.level}</div>
                        <div className={"card-details"}>
                        {item.fastDelivery ? (
                          <div> Fast Delivery </div>
                        ) : (
                          <div> 3 days minimum </div>
                        )}
                        </div>
                        </div>
                    <button
                      onClick={() => cartHandler(item)}
                      className="primary-btn"
                      disabled={!item.inStock}
                    >
                      {!item.inStock
                        ? "Out of Stock"
                        : itemsInCart.find((i) => i.id === item.id)
                        ? "Add more"
                        : "Add to cart"}
                </button>
                    
                </div>
              )
            )}
          </div>
        </div>
      );
    }
