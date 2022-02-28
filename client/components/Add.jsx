import styles from '../styles/Add.module.css'
import {useState} from 'react'
import axios from 'axios';
import {useRouter} from 'next/router'

const Add = ({setClose}) => {
  const [img, setImg] = useState(null)
  const [title, setTitle] = useState(null)
  const [desc, setDesc] = useState(null)
  const [prices, setPrices] = useState([])
  const [extraOptions, setExtraOptions] = useState([])
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

  const newProduct = {
    title,
    desc,
    img,
    prices,
    extraOptions
  }

  console.log(newProduct)

  const handleCreate = async () => {    
    try {
      await axios.post('http://localhost:5000/api/products', newProduct)
      setClose(true)
      router.reload()
     
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <span onClick={() => setClose(true)} className={styles.close}>X</span>
        <h1>Add a new Pizza</h1>
        <div className={styles.item}>
          <label className={styles.label}>Pizza Image Link</label>
          <input type="text" placeholder='Required' className={styles.input} onChange={e => setImg(e.target.value)} />          
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Pizza Name</label>
          <input type="text" placeholder='Required' className={styles.input} onChange={e=> setTitle(e.target.value)} />          
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Desc</label>
          <textarea type="text" placeholder='Required' rows={4} onChange={e=> setDesc(e.target.value)} ></textarea>        
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Prices (Required)</label>
          <div className={styles.priceContainer}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Small"
              onChange={e => changePrice(e, 0)}        
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Medium"
              onChange={e => changePrice(e, 1)}          
            />
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="number"
              placeholder="Large"
              onChange={e => changePrice(e, 2)}                
            />
          </div>     
        </div>
        <div className={styles.item}>
          <label className={styles.label}>Extra</label>
          <div className={styles.extra}>
            <input
              className={`${styles.input} ${styles.inputSm}`}
              type="text"
              placeholder="Item"
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
            <button className={styles.addButton} onClick={handleCreate} >
              Create
            </button>
      </div>
    </div>
  )
};

export default Add;
