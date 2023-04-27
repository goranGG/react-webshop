const CartItem = ({ cartItem }) => {
  return (
    <div key={cartItem.id}>
      <h2>{cartItem.name}</h2>
      <span>{cartItem.quantity}</span>
    </div>
  );
};

export default CartItem;
