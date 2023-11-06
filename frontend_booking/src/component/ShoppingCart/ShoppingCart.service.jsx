const KEY = "shoppingNTPOINT";
export const ShoppingCartService = () => {
  //public handlers ls

  const addElement = (data) => {
    let elements = getShoppingCart();

    elements = [...elements, data];

    clearShoppingCart();
    setShoppingCart(elements);

    return elements;
  };

  const removeElement = (id) => {
    let elements = getShoppingCart();
    if (elements == null || elements.length < 0) return;

    elements = elements.filter((e) => e._id != id);
    clearShoppingCart();

    setShoppingCart(elements);
  };

  const getElements = () => {
    return getShoppingCart();
  };

  const service = {
    addElement,
    removeElement,
    getElements,
    clearShoppingCart,
  };

  return service;
};

//shopping cart handlers for localstorage
const setShoppingCart = (data) =>
  localStorage.setItem(KEY, JSON.stringify(data));
const getShoppingCart = () => JSON.parse(localStorage.getItem(KEY)) || [];
const clearShoppingCart = () => localStorage.removeItem(KEY);
