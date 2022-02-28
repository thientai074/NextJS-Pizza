import styles from "../styles/Cart.module.css";
import Image from "next/image";
import { useSelector, useDispatch} from 'react-redux'
import {getSession, useSession} from 'next-auth/client'
const Cart = ({session}) => {
  const dispatch = useDispatch()
  const cart = useSelector(state=> state.cart)
  console.log(cart)
  console.log(session);
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <thead>
            <tr className={styles.trTitle}>
              <th>Product</th>
              <th>Name</th>
              <th>Extras</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          {cart.products.map(product => (
            <tbody key={product._id}>
              <tr className={styles.tr}>
                <td className={styles.td} >
                  <div className={styles.imgContainer}>
                    <img
                      src={product.img}
                      className={styles.img}
                      alt=""
                    />
                  </div>
                </td>
                <td className={styles.td} >
                  <span className={styles.name}>{product.title}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.extras}>
                    {product.extras.map(extra => (
                      <span key={extra._id}>{extra.text}</span>
                    ))}
                  </span>
                </td>
                <td className={styles.td}>
                  <span className={styles.price}>${product.price}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.quantity}>{product.quantity}</span>
                </td>
                <td className={styles.td}>
                  <span className={styles.total}>${product.price * product.quantity}</span>
                </td>
              </tr>
              
            </tbody>
          ))}
         
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$79.60
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$79.60
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

export const getServerSideProps = async (context) => {
  const session = await getSession(context)

  if(!session) {
    return {
      redirect: {
        destination: `/api/auth/signin?callbackUrl=http://localhost:3000/cart`,
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }

}