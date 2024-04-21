import { useState, createContext } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
   const [cartNumber, setCartNumber] = useState('');

   return (
      <CartContext.Provider value={{ cartNumber, setCartNumber }}>
         {children}
      </CartContext.Provider>
   );
}

export default CartContext;