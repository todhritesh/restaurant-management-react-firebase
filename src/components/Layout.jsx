import React, { useEffect } from 'react'
import Navbar from './Navbar'
import MainPage from './main-page/MainPage';
import AdminPage from './admin-page/AdminPage';
import {useState} from 'react';
import LoginPage from './LoginPage';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { doc , getDoc } from 'firebase/firestore';
import { auth } from '../firebase-config';
import { db } from '../firebase-config';
import findRole from '../findRole';
import RegisterPage from './Register';

function Layout() {
 const [user , setUser] = useState({})
 const [role,setRole] = useState("");
const navigate = useNavigate()

 onAuthStateChanged(auth,(currentUser)=>{
   setUser(currentUser);
 })

 useEffect(()=>{
  const res = async () => {
    if(user?.uid){
      const userRole = await findRole(user.uid,setRole)
      if(userRole==="admin"){
        navigate("/admin-page");
      }
      if(userRole==="staff"){
        navigate("/main-page");
      }
    }
  }
  res()
 },[user])

  return (
      <div style={{width:"100%",height:"100vh"}}>
        <Navbar user={user} setUser={setUser} role={role} setRole={setRole} />
        <Routes>
        {<Route path="/register" exact element={<RegisterPage role={role} setRole={setRole} setUser={setUser} user={user} role={role} />}/>}
          {role==="staff" &&  <Route path="main-page" exact element={<MainPage/>} />}
          {role==="admin" &&  <Route path="admin-page" exact element={<AdminPage/>} />}
          {<Route path="/" exact element={<LoginPage role={role} setRole={setRole} setUser={setUser} user={user} role={role} />}/>}
        </Routes>
      </div>
  )
}

export default Layout