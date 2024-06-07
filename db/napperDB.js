
const cart = [];  // Detta agerar som vår varukorg

// Funktion för att lägga till en produkt i varukorgen
export const addToCart = (productId, quantity) => {
  const product = { productId, quantity };
  cart.push(product);
  return cart;
};