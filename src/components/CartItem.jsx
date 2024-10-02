import { MdDeleteForever } from "react-icons/md";
import { useDispatch } from "react-redux";
import { remove } from "../redux/Slices/CartSlice";
import { toast } from "react-hot-toast";

const CartItem = ({ item, itemIndex }) => {
  const dispatch = useDispatch();

  const removeFromCart = () => {
    dispatch(remove(item.id)); 
    toast.error("Item Removed");
  }

  return (
    <div className="flex items-center border-b py-4 dark:border-gray-700">
      <img src={item.image} alt={item.title} className="h-20 w-20 object-cover rounded-md" />
      <div className="flex-grow ml-4">
        <h1 className="text-lg font-semibold text-gray-800 dark:text-white">{item.title}</h1>
        <p className="text-sm text-gray-700 dark:text-gray-300">{item.description}</p>
        <p className="font-bold">${item.price}</p>
      </div>
      <button onClick={removeFromCart} className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300">
        <MdDeleteForever size={24} />
      </button>
    </div>
  );
};

export default CartItem;
