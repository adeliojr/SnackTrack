import { OrderItem, MenuItem, CategoryId } from '../types/trailer';

/**
 * Checks whether an item is a drink/beverage delivered at the Cashier counter
 * (not prepared in the kitchen chapa).
 */
export const isDrinkItem = (item: OrderItem, menu?: MenuItem[]): boolean => {
  if (item.category) {
    return item.category === 'bebidas' || item.category === 'cervejas' || item.category === 'sucos';
  }
  if (menu && menu.length > 0) {
    const mi = menu.find((m) => m.id === item.menuItemId);
    if (mi) {
      return mi.category === 'bebidas' || mi.category === 'cervejas' || mi.category === 'sucos';
    }
  }
  if (item.drinkOptions && item.drinkOptions.length > 0) {
    return true;
  }
  const text = (item.name + ' ' + (item.kitchenName || '')).toLowerCase();
  return (
    text.includes('refrigerante') ||
    text.includes('coca-cola') ||
    text.includes('coca cola') ||
    text.includes('coca ') ||
    text.includes('suco') ||
    text.includes('cerveja') ||
    text.includes('água') ||
    text.includes('agua') ||
    text.includes('guaraná') ||
    text.includes('guarana') ||
    text.includes('fanta') ||
    text.includes('sprite') ||
    text.includes('schweppes') ||
    text.includes('heineken') ||
    text.includes('budweiser') ||
    text.includes('stella') ||
    text.includes('skol') ||
    text.includes('brahma') ||
    text.includes('red bull') ||
    text.includes('monster') ||
    text.includes('tônica') ||
    text.includes('tonica') ||
    text.includes('h2oh') ||
    text.includes('del valle')
  );
};

/**
 * Checks whether an item is prepared in the kitchen (sandwiches, hot dogs, portions).
 */
export const isKitchenItem = (item: OrderItem, menu?: MenuItem[]): boolean => {
  return !isDrinkItem(item, menu);
};

/**
 * Returns only kitchen items from an item list.
 */
export const getKitchenItems = (items: OrderItem[], menu?: MenuItem[]): OrderItem[] => {
  return items.filter((it) => isKitchenItem(it, menu));
};

/**
 * Returns only drink items to be handed over by the cashier at the counter.
 */
export const getDrinkItems = (items: OrderItem[], menu?: MenuItem[]): OrderItem[] => {
  return items.filter((it) => isDrinkItem(it, menu));
};

/**
 * Recalculates order subtotal and total after item modifications.
 */
export const recalculateTotals = (
  items: OrderItem[],
  discount: number = 0,
  deliveryFee: number = 0,
  serviceFee: number = 0
) => {
  const subtotal = items.reduce((sum, item) => sum + (item.totalPrice || item.unitPrice * item.quantity), 0);
  const total = Math.max(0, subtotal - (discount || 0) + (deliveryFee || 0) + (serviceFee || 0));
  return { subtotal, total };
};
