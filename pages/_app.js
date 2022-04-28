import '../styles/globals.css'
import { Modal, Pagenation, Nav, Table, Header, Footer} from '@/components'
import { wrapper } from '@/modules/store'
const App  = ({ Component, pageProps }) => {
  return <> 
  <Header/>
  <Nav/>
  <Component {...pageProps} />
  <Footer/>
  </>
}

export default wrapper.withRedux(App)