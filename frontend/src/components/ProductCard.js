import { useCart } from "@/context/CartContext";

const ProductCard = ({ product }) => {
  const { addProductToCart, cartItems } = useCart();
  
  // Check if product is already in cart
  const isInCart = cartItems.some(item => item._id === product._id);
  
  return (
    <div 
      className={`
        rounded-lg 
        overflow-hidden 
        group 
        transition-all 
        duration-300 
        transform
        hover:-translate-y-1
        ${isInCart 
          ? "bg-rose-50 shadow-md border-2 border-rose-200" 
          : "bg-rose-50/10 shadow-rose-100/50 shadow-md border-[2px] border-rose-100 hover:shadow-lg hover:shadow-rose-200/40 hover:border-rose-200/70"
        }
      `}
    > 
      <div className="relative h-64 overflow-hidden"> 
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
        /> 
        
        {/* Added to cart indicator */}
        {isInCart && (
          <div className="absolute top-3 right-3 bg-rose-400 text-white text-xs font-medium px-2 py-1 rounded-full shadow-sm">
            In Bag
          </div>
        )}
        
        {/* Quick add overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button 
            onClick={() => !isInCart && addProductToCart(product)} 
            disabled={isInCart} 
            className={`
              px-4 
              py-2 
              rounded-md 
              text-white 
              transform 
              translate-y-4 
              group-hover:translate-y-0 
              transition-all 
              duration-300 
              ${isInCart 
                ? "bg-rose-300 cursor-default" 
                : "bg-rose-500 hover:bg-rose-600"
              }
            `}
          >
            {isInCart ? "Added to Bag" : "Add to Bag"}
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-medium text-rose-900">{product.name}</h3>
        <div className="flex items-center justify-between mt-2">
          <p className="text-lg font-serif text-rose-600">${product.price}</p>
          {isInCart && (
            <div className="flex items-center text-rose-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">In Bag</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
