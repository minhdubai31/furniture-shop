import { useState, createContext } from "react";

const ProductVisitedContext = createContext();

export const ProductVisitedProvider = ({ children }) => {
   const [visitedProducts, setVisitedProducts] = useState([]);

   return (
      <ProductVisitedContext.Provider value={{ visitedProducts, setVisitedProducts }}>
         {children}
      </ProductVisitedContext.Provider>
   );
}

export default ProductVisitedContext;