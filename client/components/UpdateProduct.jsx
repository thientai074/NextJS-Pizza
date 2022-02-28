import styles from '../styles/UpdateProduct.module.css'
import {useState} from 'react'
import axios from 'axios';
import {useRouter} from 'next/router'



const UpdateProduct = ({setCloseUpdateModal, productItem}) => {
  const [img, setImg] = useState(productItem.img)
  const [title, setTitle] = useState(productItem.title)
  const [desc, setDesc] = useState(productItem.desc)
  const [prices, setPrices] = useState(productItem.prices)
  const [extraOptions, setExtraOptions] = useState(productItem.extraOptions)
  const [extra, setExtra] = useState(null)  

  const router = useRouter()

  const handleExtraInput = e => {
    setExtra({...extra, [e.target.name]: e.target.value})
  }

  const handleExtra = e => {
    setExtraOptions(prev=> [...prev, extra])
  }

  const changePrice = (e, index) => {
    const currentPrices = prices
    currentPrices[index] = e.target.value
    setPrices(currentPrices)

  }   

  const updatedPizza = {
    title,
    desc,
    img,
    prices,
    extraOptions
  } 

  const handleCreate = async () => {    
    try {
      await axios.put(`http://localhost:5000/api/products/${productItem._id}`, updatedPizza)
      setCloseUpdateModal(true)
      router.reload()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setCloseUpdateModal(true)} className={styles.close}>X</span>
        <h1>Update Product</h1>
        <div className={styles.item}>
          <label className={styles.label}>New Pizza Image Link</label>
          <input type="text" className={styles.input} placeholder={img} onChange={e => setImg(e.target.value)} />          
        </div>
        <div className={styles.item}>
          <label className={styles.label}>New Pizza Name</label>
          <input type="text" className={styles.input} placeholder={title} onChange={e=> setTitle(e.target.value)} />          
        </div>
        <div className={styles.item}>
          <label className={styles.label}>New Desc</label>
          <textarea type="text" rows={4} placeholder={desc} onChange={e=> setDesc(e.target.value)} ></textarea>        
        </div>
        <div className={styles.item}>
          <label className={styles.label}>New Prices</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder={`Small: ${prices[0]}`}
              onChange={e => changePrice(e, 0)}        
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder={`Medium: ${prices[1]}`}
              onChange={e => changePrice(e, 1)}          
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder={`Large: ${prices[2]}`}
              onChange={e => changePrice(e, 2)}                
            />
          </div>     
        </div>
        <div className={styles.item}>
          <label className={styles.label}>New Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              // placeholder={`Item: ${extraOptions}`}
              name="text"
              onChange={handleExtraInput}              
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Price"
              name="price"
              onChange={handleExtraInput}                 
            />
             <button className={styles.extraButton} onClick={handleExtra} >
              Add
            </button>
          </div> 
            <div className={styles.extraItems}>
              {extraOptions.map((option) => (
                <span key={option.text} className={styles.extraItem}>
                  {option.text}
                </span>
              ))}
            </div>
        </div>
            <button className={styles.addButton} onClick={() => handleCreate()} >
              Change
            </button>
      </div>
    </div>
  )
};

export default UpdateProduct;
