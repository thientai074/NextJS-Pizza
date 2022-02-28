import styles from '../styles/Login.module.css'
import Link from 'next/link'

const Login = () => {
  return (
        <div className={styles.container}>
            <span className={styles.title}>Login</span>
            <form className={styles.form} >
                <label className={styles.label} >Username</label>
                <input 
                    type="text" 
                    placeholder='Enter your username'
                    className={styles.input}
                    name='username'
                />          
                
                <label className={styles.label}>Password</label>
                <input 
                    type="password" 
                    placeholder='Enter your password'
                    className={styles.input}
                    name='password'
                />
                <button type='submit' className={styles.loginButton}>Login</button>
            </form>
        <p >Don't have an account ?
        <Link href='/register' passHref >
            <button className={styles.registerButton}>Register</button>
        </Link>
        </p>    
        </div>
  )
};

export default Login;
