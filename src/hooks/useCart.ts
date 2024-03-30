import { useState,useEffect } from "react"
import { db } from '../data/db'
import type { Guitar,CartItem } from "../types/types"

function useCart(){

    const initialCart = () : CartItem[] => {
        const localStorageCart = localStorage.getItem('cart')
        return localStorageCart ? JSON.parse(localStorageCart) : []
    }
    
    const [data]=useState(db)
    const[cart, setCart]=useState(initialCart)
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    }, [cart])

 

    function addToCart(item : Guitar){

        const itemsExist = cart.findIndex((guitar)=> guitar.id === item.id)
        if(itemsExist >=0 ){
            if(cart[itemsExist].quantity >= 5) return
            const updatedCart = [...cart]
            updatedCart[itemsExist].quantity++
            setCart(updatedCart)
        }else{
            const newItem : CartItem = {...item, quantity:1}
            setCart([...cart,newItem])
        }
            

        
    }

    function removeCart(id: Guitar['id']){
        setCart(prevCart => prevCart.filter(guitar =>guitar.id !== id))
    }

    function increase(id : Guitar['id']){
        const updatedCart = cart.map(item => {
            if(item.id === id && item.quantity < 5){
                return{
                    ...item,
                    quantity: item.quantity +1
                }
            }
            return item
        })
        setCart(updatedCart)
       
    }
    function decreasing(id : Guitar['id']){
        const updatedCart = cart.map(item=>{
            if(item.id === id && item.quantity > 1){
                return{
                    ...item,
                    quantity: item.quantity-1
                }
            }
            return item
        })
        setCart(updatedCart)
       
    }

    function clearCart(){
        setCart([])
    }

     //State derivado 
     const isEmpty = () => cart.length===0
     const carthTotal = () => cart.reduce((total, item)=> total + (item.quantity * item.price),0)
     
 
    

    return{
        data,
        cart,
        addToCart,
        clearCart,
        decreasing,
        increase,
        removeCart,
        isEmpty,
        carthTotal
    }

}
export default useCart