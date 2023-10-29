import { useDispatch, useSelector } from 'react-redux';
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom';
import store from '../../store';

import { createOrder } from '../../services/apiRestaurant';
import Button from '../../ui/Button';
import { clearCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const error = useActionData();

  const cart = useSelector((state) => state.cart.cart);
  const {
    username,
    address,
    position,
    status,
    error: addressError,
  } = useSelector((state) => state.user);

  const [withPriority, setWithPriority] = useState(false);

  const isLoadingAddress = status === 'loading';
  const isSubmitting = navigation.state === 'submitting';

  const totalPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? 5 : 0;
  const totalPriceWithPriority = totalPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-36">First Name</label>
          <input
            className="input grow"
            type="text"
            defaultValue={username}
            name="customer"
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-36">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {error?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-1.5 text-xs text-red-700">
                {error.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-36">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address || ''}
              disabled={isLoadingAddress}
              required
            />
            {addressError && (
              <p className="mt-2 rounded-md bg-red-100 p-1.5 text-xs text-red-700">
                {addressError}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitutde && (
            <Button
              className="mt1.5 absolute right-0 top-0 mr-1.5 mt-1"
              type="small"
              onClick={(e) => {
                e.preventDefault();
                dispatch(fetchAddress());
              }}
            >
              Get position
            </Button>
          )}
        </div>

        <div className="mb-12 flex items-center gap-4">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitutde
                ? `${position.latitude}, ${position.longitutde}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPriceWithPriority)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());
  console.log(data);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  console.log(order);
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please type a valid phone number. We might need it to call you about the order.';

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
