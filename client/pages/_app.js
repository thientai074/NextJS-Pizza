import Layout from '../components/Layout';
import '../styles/globals.css';
import { Provider} from 'react-redux'
import store from '../redux/store'
import { Provider as SessionProvider} from "next-auth/client"


function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
          <SessionProvider session={pageProps.session}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </SessionProvider>
    </Provider>
  )
}

export default MyApp
