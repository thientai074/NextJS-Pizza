import styles from '../../styles/Admin.module.css'
import Image from 'next/image'
import axios from 'axios'
import {useState} from 'react'
import UpdateProduct from '../../components/UpdateProduct'


const index = ({products, orders}) => {
    const [pizzaList, setPizzaList] = useState(products)
    const [orderList, setOrderList] = useState(orders)
    const [productItem, setProductItem] = useState(null)
    const status = ['Perparing', 'On the way', 'Delivered']

    console.log(orders)
    console.log(products)    

    const [closeUpdateModal, setCloseUpdateModal] = useState(true)

    const updateProduct = (id) => {
        const pizzaProduct = products.find(pizza=> pizza._id === id)
        setCloseUpdateModal(false)
        setProductItem(pizzaProduct)
    }

    console.log(productItem)

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/products/${id}`)
            setPizzaList(pizzaList.filter(pizza => pizza._id !== id))

        } catch(error) {
            console.log(error)
        }
    }

    const handleStatus = async (id) => {
        const item = orderList.filter(order => order._id === id)[0]
        const currentStatus = item.status 
        console.log(item)
        if(item.status > 1) {
            currentStatus = 1
        }
        try {
            const res = await axios.put(`http://localhost:5000/api/orders/${id}`, {status: currentStatus + 1})
            setOrderList([
                res.data,
                ...orderList.filter(order=> order._id !== id)
            ])
        } catch (error) {
            console.log(error)
        }
    }
   

    const deleteOrder = async (id) => {
        try {
            const res = await axios.delete(`http://localhost:5000/api/orders/${id}`)
            setOrderList(orderList.filter(order => order._id !== id))
        } catch (error) {
            console.log(error)
        }
    }
  return (
      <div className={styles.container}>
          <div className={styles.item}>
              <h1 className={styles.title}>Products</h1>
              <table className={styles.table}>
              <thead>
                  <tr className={styles.trTitle}>
                      <th>Image</th>
                      <th>ID</th>
                      <th>Title</th>
                      <th>Price</th>
                      <th>Action</th>
                  </tr>
              </thead>
              {pizzaList.map(product => (
                <tbody key={product._id}>
                    <tr className={styles.trTitle}>
                        <td>
                            <img className={styles.img} src={product.img} alt='' width={50} height={50}  />
                        </td>
                        <td>{product._id}</td>
                        <td>{product.title}</td>
                        <td>{product.prices[0]}</td>  
                        <td>
                            <button className={styles.button} onClick={updateProduct.bind(this, product._id)}>Edit</button>
                            <button className={styles.button} onClick={() => handleDelete(product._id)}>Delete</button>
                        </td>                    
                    </tr>
                </tbody>
              ))}
              </table>
          </div>
          <div className={styles.item}>
              <h1 className={styles.title}>Orders</h1>
              <table className={styles.table}>
                  <thead>
                      <tr className={styles.trTitle}>
                          <th>ID</th>
                          <th>Customer</th>
                          <th>Total</th>
                          <th>Payment</th>
                          <th>Status</th>
                          <th>Action</th>
                      </tr>
                  </thead>
                  {orderList.map(order => (
                    <tbody key={order._id}>
                        <tr className={styles.trTitle}>
                            <td>{order._id}</td>
                            <td>{order.customer}</td>
                            <td>${order.total}</td>
                            <td>{order.method  === 0 ? <span>Cash</span> : <span>Paid</span>  }</td>
                            <td>{status[order.status]}</td>
                            <td>
                                <button className={styles.button} onClick={() => handleStatus(order._id)}>Next Stage</button>
                                <button className={styles.button} onClick={() => deleteOrder(order._id)}>Delete</button>
                            </td>
                        </tr>
                    </tbody>
                  ))}
              </table>
          </div>   
          {!closeUpdateModal && <UpdateProduct productItem={productItem} setCloseUpdateModal={setCloseUpdateModal} closeUpdateModal={closeUpdateModal} />}   

   
      </div>
     
  )
};

export const getServerSideProps = async () => {
    const productRes = await axios.get('http://localhost:5000/api/products')
    const orderRes = await axios.get('http://localhost:5000/api/orders')

    return {
        props: {
            products: productRes.data,
            orders: orderRes.data
        }
    }
}

export default index;
