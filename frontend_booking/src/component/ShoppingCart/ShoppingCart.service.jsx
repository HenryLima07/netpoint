const KEY_CANCHA = "shopppingFieldNTP";

//To book field
export const ShoppingCartFieldService = () => {
  //public handlers ls

  const addFieldElement = (data) => {
    let elements = getShoppingCartField();
    data.type = "field";
    elements = [...elements, data];

    clearFieldShoppingCartField();
    setShoppingCartField(elements);

    return elements;
  };

  const removeFieldElement = (id) => {
    let elements = getShoppingCartField();
    if (elements == null || elements.length < 0) return;

    elements = elements.filter((e) => e._id != id);
    clearFieldShoppingCartField();

    setShoppingCartField(elements);
  };

  const getFieldElements = () => {
    return getShoppingCartField();
  };

  const service = {
    addFieldElement,
    removeFieldElement,
    getFieldElements,
    clearFieldShoppingCartField,
  };

  return service;
};

//shopping cart handlers for localstorage field
const setShoppingCartField = (data) =>
  localStorage.setItem(KEY_CANCHA, JSON.stringify(data));
const getShoppingCartField = () =>
  JSON.parse(localStorage.getItem(KEY_CANCHA)) || [];
const clearFieldShoppingCartField = () => localStorage.removeItem(KEY_CANCHA);

//To book promo
const KEY_PROMO = "shopppingPromoNTP";

export const ShoppingCartPromoService = () => {
  const addPromoElement = (data) => {
    let elements = getShoppingCartPromo();
    data.type = "promo";
    data._id = crypto.randomUUID();
    elements = [...elements, data];

    clearFieldShoppingCartPromo();
    setShoppingCartPromo(elements);

    return elements;
  };

  const removePromoElement = (id) => {
    let elements = getShoppingCartPromo();
    if (elements == null || elements.length < 0) return;

    elements = elements.filter((e) => e._id != id);
    clearFieldShoppingCartPromo();

    setShoppingCartPromo(elements);
  };

  const getPromoElements = () => {
    return getShoppingCartPromo();
  };
  const services = {
    addPromoElement,
    removePromoElement,
    getPromoElements,
    clearFieldShoppingCartPromo,
  };
  return services;
};

//shopping cart handlers for localstorage promo

const setShoppingCartPromo = (data) =>
  localStorage.setItem(KEY_PROMO, JSON.stringify(data));
const getShoppingCartPromo = () =>
  JSON.parse(localStorage.getItem(KEY_PROMO)) || [];
const clearFieldShoppingCartPromo = () => localStorage.removeItem(KEY_PROMO);
