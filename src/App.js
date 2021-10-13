import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Link, Route, useLocation } from 'react-router-dom'

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

const Login = (props) => {

  return (
    <div>
      This is login screen
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
        <Link></Link>

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
