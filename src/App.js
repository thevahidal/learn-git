import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Link, Route, useLocation } from 'react-router-dom'
import axios from 'axios'

import './App.css';

const tabs = [
  {
    path: '/console/users',
    title: 'Users'
  },
  {
    path: '/console/inventories',
    title: 'Inventories'
  },
  {
    path: '/console/withdrawals',
    title: 'Withdrawals'
  },
  {
    path: '/console/home',
    title: 'Home'
  },
]

const Sidebar = (props) => {
  const location = useLocation()

  return(
    <div className='sidebar' style={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      {
        tabs.map(t => (
          <Link className={`tab ${location.pathname === t.path ? 'active' : ''}`} to={t.path}>
            {t.title}
            </Link>
        ))
      }
    </div>
  )
}

const Navbar = (props) => {

  return(
    <div className='navbar'>
      Navbar
    </div>
  )
}

const Layout = (props) => {


  return (
    <div>
      <Sidebar />
      {/* <Navbar /> */}
      {props.children}
    </div>
  )
}

const PAGE_SIZE = 10

const Login = (props) => {
  const [instruments, setInstruments] = useState([])
  const [instrumentsCount, setInstrumentsCount] = useState(0)
  const [searchQuery, setSearchQuery] = useState('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    axios.get(`https://api.pabla.ir/api/v1/instruments/?search=${searchQuery}&limit=${PAGE_SIZE}&offset=${(page - 1) * PAGE_SIZE}`).then(res => {
      setInstruments(res.data.results)
      setInstrumentsCount(res.data.count)
    })
  }, [searchQuery, page])

  console.log(page)

  return (
    <div style={{
      marginTop: 20,
    }}>
      <input 
        placeholder='Search instrument name...'
        style={{
          padding: '10px 15px',
          fontSize: 17,
          borderRadius: 10,
          border: '1px solid #999',
        }}
        onChange={e => setSearchQuery(e.target.value)}
      />
      <h3>Searching for: {searchQuery}</h3>
      
      <div style={{
        width: '100vw',
        minHeight: '100vh',
        padding: 20,
        backgroundColor: 'powderblue',
        marginTop: 20,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        {
          instruments.map(i => (
            <div style={{
              padding: 10,
              border: '1px solid #222',
              width: 100,
              marginBottom: 10,
            }}>
              <h4>{i.name} . {i.name_fa}</h4>
              <img src={i.icon} style={{
                width: 100,
                height: 100,
              }} />
            </div>
          ))
        }
      </div>
      <div>
        {
          Array(Math.ceil(instrumentsCount / PAGE_SIZE)).fill(null).map((item, index) => (
            <button
              onClick={() => setPage(index + 1)}
              style={{
                backgroundColor: (page === index + 1) ? 'orange' : 'white',
                border: '1px solid #999',
                margin: 5,
                borderRadius: 5,
                padding: 10,
              }}
            >{index + 1}</button>
          ))
        }
      </div>
    </div>
  )
}

const Users = (props) => {
  const location = useLocation()

  useEffect(() => {
    console.log(location)

  }, [])

  return (
    <div>
      This is dashboard users tab
    </div>
  )
}

 
function App() {
  const [show, setShow] = useState(true)

  const handleShow = () => {
    setShow(!show)
  } 

  return (
    <div className="App">
      <Router>
        <Link to='/login'>Login</Link>

        <Switch>
          <Route exact={true} path='/login'>
            <Login />
          </Route>
          <Route exact={true} path='/console/users'>
            <Layout>
              <Users />
            </Layout>          
          </Route>
          <Route exact={true} path='/console/inventories'>
            <Layout>
              This is dashboard inventories
            </Layout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
