import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice';
import DeleteItem from './DeleteItem';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  const dispatch = useDispatch();

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <div className="flex items-center gap-4">
          <Button
            onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
            type="round"
          >
            -
          </Button>

          <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>

          <Button
            onClick={() => dispatch(increaseItemQuantity(pizzaId))}
            type="round"
          >
            +
          </Button>
        </div>
        <DeleteItem id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;