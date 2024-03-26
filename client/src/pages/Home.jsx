import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { signInStart ,signInSuccess ,signInFailure } from '../redux/user/userSlice'

// import { Welcome } from './Signin'

function Home() {
  const {currentUser}=useSelector(state=>state.user)
  // const dispatch=useDispatch()
  console.log(currentUser);
  return (
    <div>
    <span>Welcome to the Web's Blog {currentUser && <>{currentUser.username}</>}</span>
      
    </div>
  )
}

export default Home