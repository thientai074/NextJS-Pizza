import styles from '../styles/Register.module.css'
import Link from 'next/link'

const Register = () => {
  return (
    <div className={styles.container}>
    <span className={styles.title}>Register</span>
    <form className={styles.form} >
        <label className={styles.label} >Username</label>
        <input 
            type="text" 
            placeholder='Enter your username'
            className={styles.input}
            name='username'
        />          
           
        <label className={styles.label} >Password</label>
        <input 
            type="password" 
            placeholder='Enter your password'
            className={styles.input}
            name='password'
        />
        <button type='submit' className={styles.registerButton}>Register</button>
    </form>
   <p>Have an account already ?
   <Link href='/login' passHref >
       <button className={styles.loginButton}>Login</button>
   </Link>
   </p>    
</div>
  )
};

export default Register;
