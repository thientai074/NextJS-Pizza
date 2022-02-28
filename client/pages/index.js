import Head from 'next/head'
import Image from 'next/image'
import Featured from '../components/Featured'
import PizzaList from '../components/PizzaList'
import styles from '../styles/Home.module.css'
import axios from 'axios'
import Add from '../components/Add'
import AddButton from '../components/AddButton'
import { useState } from "react"
import { useSession } from 'next-auth/client'

export default function Home({pizzaList}) {
  const [session, loading] = useSession()
  console.log({session, loading})

  const [close, setClose] = useState(true);
  return (
    <div className={styles.container}>
      <Head>
        <title>Pizza Restaurant in New York</title>
        <meta name="description" content="Best pizza shop in town" />
        <link rel="icon" href="/favicon.ico" />
        Homepage
      </Head>
      <Featured />
      {<AddButton setClose={setClose} />}
      <PizzaList pizzaList={pizzaList} />
      {!close && <Add setClose={setClose} />}
    </div>
  )
}

export const getServerSideProps = async () => {
  const res = await axios.get('http://localhost:5000/api/products')
  return {
    props: {
      pizzaList: res.data
    }
  }
}
