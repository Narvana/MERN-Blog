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
      Welcome to the Web's Blog {currentUser && <div>{currentUser.rest.username}</div>}
    </div>
  )
}

export default Home