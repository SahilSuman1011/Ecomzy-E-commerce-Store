import { toast } from "react-hot-toast";
import { add, remove } from "../redux/Slices/CartSlice"; 
import { useDispatch, useSelector } from "react-redux";

const Product = ({ post }) => {
  const { cart } = useSelector((state) => state); 
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(add(post));
    toast.success("Item added to Cart");
  };

  const removeFromCart = () => {
    dispatch(remove(post.id));
    toast.error("Item removed from Cart");
  };

  return (
    <div className="border border-gray-300 rounded-lg shadow-md p-4 m-2 transition duration-300 hover:shadow-xl dark:border-gray-600 dark:bg-gray-800">
      <img src={post.image} alt={post.title} className="h-48 w-full object-cover rounded-md" />
      <h2 className="text-lg font-semibold mt-2 text-gray-800 dark:text-white">{post.title}</h2>
      <p className="text-sm text-gray-700 dark:text-gray-300">{post.description}</p>
      <p className="font-bold mt-1">${post.price}</p>
      {
        cart && cart.some((p) => p.id === post.id) ? 
        (
          <button onClick={removeFromCart} className="mt-2 bg-red-600 text-white py-1 px-3 rounded hover:bg-red-700 transition duration-300">
            Remove Item
          </button>
        ) : (
          <button onClick={addToCart} className="mt-2 bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700 transition duration-300">
            Add to Cart
          </button>
        )
      }
    </div>
  );
};

export default Product;
