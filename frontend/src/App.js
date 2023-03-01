import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Auth from "./auth/Auth";
import Add from "./blogs/Add";
import Blogs from "./blogs/Blogs";
import BlogUpdate from "./blogs/BlogUpdate";
import Header from "./header/Header";
import Home from "./home/Home";
import Profile from "./profile/Profile";
import { authActions } from "./store";

function App() {
  const dispatch=useDispatch()
  const isLoggedIn=useSelector((state)=>state.isLoggedIn)
  console.log(isLoggedIn)

  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
  },[localStorage])
  return (
    <div style={{backgroundColor:"#e7e7e4"}}>
      <header>
        <Header/>
      </header>
      <section style={{backgroundColor:"#e7e7e4"}}>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/blogs" element={<Blogs/>}/>
          <Route path="/auth" element={<Auth/>}/>
          {isLoggedIn && <><Route path="/add" element={<Add/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/post/:id" element={<BlogUpdate/>}/></>}
        </Routes>
      </section>
    </div>
  );
}
export default App;
