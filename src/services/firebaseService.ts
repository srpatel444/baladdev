import { 
  collection, 
  doc, 
  getDocs, 
  setDoc, 
  onSnapshot, 
  updateDoc, 
  deleteDoc,
  writeBatch
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, Order, Coupon, StoreProfileDetails, StorePaymentDetails } from '../types';
import { INITIAL_PRODUCTS, INITIAL_ORDERS, INITIAL_COUPONS } from '../data/mockData';

const PRODUCTS_COL = 'products';
const ORDERS_COL = 'orders';
const COUPONS_COL = 'coupons';
const SETTINGS_COL = 'store_settings';

// Seed initial data if Firestore collection is empty
export async function seedInitialFirestoreData(
  defaultProfile: StoreProfileDetails,
  defaultPayment: StorePaymentDetails
) {
  try {
    // 1. Seed Products if empty
    const prodSnap = await getDocs(collection(db, PRODUCTS_COL));
    if (prodSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_PRODUCTS.forEach((p) => {
        batch.set(doc(db, PRODUCTS_COL, p.id), p);
      });
      await batch.commit();
      console.log('Seeded initial products to Firestore');
    }

    // 2. Seed Coupons if empty
    const couponSnap = await getDocs(collection(db, COUPONS_COL));
    if (couponSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_COUPONS.forEach((c) => {
        batch.set(doc(db, COUPONS_COL, c.code), c);
      });
      await batch.commit();
      console.log('Seeded initial coupons to Firestore');
    }

    // 3. Seed Orders if empty
    const orderSnap = await getDocs(collection(db, ORDERS_COL));
    if (orderSnap.empty) {
      const batch = writeBatch(db);
      INITIAL_ORDERS.forEach((o) => {
        batch.set(doc(db, ORDERS_COL, o.id), o);
      });
      await batch.commit();
      console.log('Seeded initial orders to Firestore');
    }

    // 4. Seed Profile & Payment Settings if empty
    const settingsSnap = await getDocs(collection(db, SETTINGS_COL));
    if (settingsSnap.empty) {
      await setDoc(doc(db, SETTINGS_COL, 'profile'), defaultProfile);
      await setDoc(doc(db, SETTINGS_COL, 'payment'), defaultPayment);
      console.log('Seeded initial settings to Firestore');
    }
  } catch (err) {
    console.error('Error seeding Firestore data:', err);
  }
}

// Real-time Product listener
export function subscribeProducts(onData: (products: Product[]) => void) {
  return onSnapshot(collection(db, PRODUCTS_COL), (snapshot) => {
    if (!snapshot.empty) {
      const items: Product[] = [];
      snapshot.forEach((d) => items.push(d.data() as Product));
      onData(items);
    }
  }, (err) => console.warn('Firestore products listener error:', err));
}

export async function saveProductToFirestore(product: Product) {
  try {
    await setDoc(doc(db, PRODUCTS_COL, product.id), product);
  } catch (err) {
    console.error('Failed to save product to Firestore:', err);
  }
}

export async function deleteProductFromFirestore(id: string) {
  try {
    await deleteDoc(doc(db, PRODUCTS_COL, id));
  } catch (err) {
    console.error('Failed to delete product from Firestore:', err);
  }
}

// Real-time Orders listener
export function subscribeOrders(onData: (orders: Order[]) => void) {
  return onSnapshot(collection(db, ORDERS_COL), (snapshot) => {
    if (!snapshot.empty) {
      const items: Order[] = [];
      snapshot.forEach((d) => items.push(d.data() as Order));
      // Sort by newest date first
      items.sort((a, b) => new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime());
      onData(items);
    }
  }, (err) => console.warn('Firestore orders listener error:', err));
}

export async function saveOrderToFirestore(order: Order) {
  try {
    await setDoc(doc(db, ORDERS_COL, order.id), order);
  } catch (err) {
    console.error('Failed to save order to Firestore:', err);
  }
}

export async function updateOrderStatusInFirestore(orderId: string, status: Order['orderStatus']) {
  try {
    await updateDoc(doc(db, ORDERS_COL, orderId), { orderStatus: status });
  } catch (err) {
    console.error('Failed to update order status in Firestore:', err);
  }
}

// Real-time Coupons listener
export function subscribeCoupons(onData: (coupons: Coupon[]) => void) {
  return onSnapshot(collection(db, COUPONS_COL), (snapshot) => {
    if (!snapshot.empty) {
      const items: Coupon[] = [];
      snapshot.forEach((d) => items.push(d.data() as Coupon));
      onData(items);
    }
  }, (err) => console.warn('Firestore coupons listener error:', err));
}

export async function saveCouponToFirestore(coupon: Coupon) {
  try {
    await setDoc(doc(db, COUPONS_COL, coupon.code), coupon);
  } catch (err) {
    console.error('Failed to save coupon to Firestore:', err);
  }
}

// Real-time Store Settings listener
export function subscribeStoreSettings(
  onProfile: (p: StoreProfileDetails) => void,
  onPayment: (pay: StorePaymentDetails) => void
) {
  return onSnapshot(collection(db, SETTINGS_COL), (snapshot) => {
    snapshot.forEach((docSnap) => {
      if (docSnap.id === 'profile') {
        onProfile(docSnap.data() as StoreProfileDetails);
      } else if (docSnap.id === 'payment') {
        onPayment(docSnap.data() as StorePaymentDetails);
      }
    });
  }, (err) => console.warn('Firestore settings listener error:', err));
}

export async function saveStoreProfileToFirestore(profile: StoreProfileDetails) {
  try {
    await setDoc(doc(db, SETTINGS_COL, 'profile'), profile);
  } catch (err) {
    console.error('Failed to save profile to Firestore:', err);
  }
}

export async function saveStorePaymentDetailsToFirestore(payment: StorePaymentDetails) {
  try {
    await setDoc(doc(db, SETTINGS_COL, 'payment'), payment);
  } catch (err) {
    console.error('Failed to save payment details to Firestore:', err);
  }
}
