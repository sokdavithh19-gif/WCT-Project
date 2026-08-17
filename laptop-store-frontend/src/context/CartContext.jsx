import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { fetchCart, addCartItem, updateCartItem, removeCartItem } from '../api/cart';
import { checkout as checkoutRequest } from '../api/orders';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { isAuthenticated } = useAuth();
  const [cart, setCart] = useState(null); // { cart: {...items...}, total }
  const [loading, setLoading] = useState(false);

  const refresh = useCallback(async () => {
    if (!isAuthenticated) {
      setCart(null);
      return;
    }
    setLoading(true);
    try {
      const res = await fetchCart();
      setCart(res.data);
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const items = cart?.cart?.items ?? [];
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const total = cart?.total ?? 0;

  const addItem = useCallback(
    async (laptopId, quantity = 1) => {
      await addCartItem(laptopId, quantity);
      await refresh();
    },
    [refresh]
  );

  const updateItem = useCallback(
    async (cartItemId, quantity) => {
      await updateCartItem(cartItemId, quantity);
      await refresh();
    },
    [refresh]
  );

  const removeItem = useCallback(
    async (cartItemId) => {
      await removeCartItem(cartItemId);
      await refresh();
    },
    [refresh]
  );

  const checkout = useCallback(async () => {
    const res = await checkoutRequest();
    await refresh();
    return res.data.order;
  }, [refresh]);

  const value = { items, itemCount, total, loading, addItem, updateItem, removeItem, checkout, refresh };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
