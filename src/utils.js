/**
 * Функции для корзины
 */

/**
 * Возвращает первый элемент объекта
 *
 * @param {Object} obj
 * @returns
 */
export const getFirstItem = obj => {
  if (Object.keys(obj).length >= 1) {
    const firstItemId = Object.keys(obj)[0];
    const firstItem = obj[firstItemId];

    return firstItem;
  } else return undefined;
};

/**
 * Возвращает общую цену заказа,
 * проходя по всем ключам корзины
 *
 * @param {Object} cart
 */
export const getCartTotalPrice = cart => {
  let result = 0;

  const itemKeys = Object.keys(cart);
  for (let i = 0; i < itemKeys.length; i++) {
    const item = cart[itemKeys[i]];
    if (item != undefined) {
      const { price } = item.plate;
      const { count } = item;
      if (price != undefined) if (count != undefined) result += price * count;
    }
  }

  return result;
};

/**
 * Возвращает количество блюд заказа,
 * проходя по всем ключам корзины
 *
 * @param {Object} cart
 */
export const getCartTotalCount = cart => {
  let result = 0;

  const itemKeys = Object.keys(cart);
  for (let i = 0; i < itemKeys.length; i++) {
    const item = cart[itemKeys[i]];
    const { count } = item;
    if (count != undefined) result += count;
  }

  return result;
};

/**
 * Возвращает количество определенных блюд заказа,
 * проходя по всем ключам корзины
 *
 * @param {Object} cart
 */
export const getCartItemCount = (cart, { id }) => {
  const itemKeys = Object.keys(cart);
  for (let i = 0; i < itemKeys.length; i++) {
    const item = cart[itemKeys[i]];
    const { count } = item;
    if (itemKeys[i].toString() === id.toString()) return count;
  }

  return 0;
};
