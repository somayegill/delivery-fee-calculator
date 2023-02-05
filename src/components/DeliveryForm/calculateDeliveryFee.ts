const MAX_DELIVERY_FEE = 15;
const MINIMUM_CART_VALUE_FOR_FREE_DELIVERY = 100;
const RUSH_HOUR_START = 15;
const RUSH_HOUR_END = 19;
const MIN_ITEMS_FOR_BULK_CHARGE = 13;
const MIN_ITEMS_FOR_EXTRA_CHARGE = 5;
const MIN_DISTANCE_FOR_EXTRA_CHARGE = 1000;
const CART_VALUE_FOR_EXTRA_CHARGE = 10;

function isFriday(date: Date): boolean {
  return date.getDay() === 5;
}

export function calculateDeliveryFee(
  cartValue: number,
  deliveryDistance: number,
  itemCount: number,
  orderDate: Date = new Date()
): number {
  let deliveryFee = 0;

  if (cartValue >= MINIMUM_CART_VALUE_FOR_FREE_DELIVERY) {
    deliveryFee = 0;
  }

  if (cartValue < CART_VALUE_FOR_EXTRA_CHARGE) {
    deliveryFee += 10 - cartValue;
  }

  if (deliveryDistance <= MIN_DISTANCE_FOR_EXTRA_CHARGE) {
    deliveryFee += 2;
  } else {
    const additionalDistance = deliveryDistance - 1000;
    deliveryFee += 2 + Math.ceil(additionalDistance / 500);
  }

  if (itemCount >= MIN_ITEMS_FOR_EXTRA_CHARGE) {
    deliveryFee += (itemCount - 4) * 0.5;
  }

  if (itemCount >= MIN_ITEMS_FOR_BULK_CHARGE) {
    deliveryFee += 1.2;
  }

  if (
    isFriday(orderDate) &&
    orderDate.getUTCHours() >= RUSH_HOUR_START &&
    orderDate.getUTCHours() <= RUSH_HOUR_END
  ) {
    deliveryFee *= 1.2;
  }

  if (deliveryFee > MAX_DELIVERY_FEE) {
    deliveryFee = MAX_DELIVERY_FEE;
  }

  return deliveryFee;
}
