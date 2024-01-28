import React, { useState} from 'react';
import Brand from './components/Brand';
import Inventory from './components/Inventory';
import Orders from './components/Orders';
import Settings from './components/Settings';
import Page404 from './components/Page404';
import Model from './components/Model';
import Parts from './components/Parts';
import Sidebar from './components/Sidebar';
import Navigation from './components/Navigation';
import Login from './components/Login';
import {Navigate,BrowserRouter, Routes, Route, Link, NavLink} from 'react-router-dom'

function App() {
 
  const [loggedIn,setLoggedIn] = useState(false)
  const [user,setUser] = useState(false)
  const [userID,setUserID] = useState(false)
  // TODO: above 2 states we supposed to be part of single object, 
  // but was unable to update state of object
  const setStatus = (value) => {
    setLoggedIn(value)
  }
  const setName = (value) => {
    setUser(value)
  }
  const setID = (value) => {
    setUserID(value)
  }

  return (
    <div className='flex '>
      <BrowserRouter>
      <Routes>
      {loggedIn?<></>:<Route path="*" element={<Navigate to="/login" replace={true}/>}/>}
      {loggedIn?<></>:<Route path="/login" element={<Login status={setStatus} 
        user={setName} userID={setUserID}/>}/>}
      
      </Routes>
      {loggedIn?<Navigation user={user}/>:<></>}
      {loggedIn?<main>
        <Routes>
          <Route path="/" element={<Navigate to="/Marketplace" replace={true}/>}/>
          <Route path="login" element={<Navigate to="/Marketplace" replace={false}/>}/>
          <Route path="Marketplace" element={<Brand/>}>
            <Route path=":BrandId" element={<Model/>}>
                <Route path=":ModelId" element={<Parts user={user} userID={userID}/>}/>
            </Route>
          </Route>
          <Route path="Inventory" element={<Inventory/>}/>
          <Route path="Orders" element={<Orders userID={userID} />}/>
          <Route path="Settings" element={<Settings/>}/>
          <Route path="*" element={<Page404/>}/>
        </Routes>
      </main>:<></>}
    </BrowserRouter>
    </div>
    // <BrowserRouter>
    //   <main>
    //     <Routes>
    //       <Route path="/" element={<Brand/>}/>
    //     </Routes>
    //   </main>
    // </BrowserRouter>

  );
}

export default App;

