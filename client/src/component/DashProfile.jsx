import React from 'react'
import {useSelector} from 'react-redux'
import { TextInput, Button } from 'flowbite-react'

function DashProfile() {
  const {currentUser} = useSelector((state)=>state.user)
  return (
    <div className='max-w-lg mx-auto p-3 w-full '>    
     <h1 className='text-4xl text-center my-7 font-semibold '>Profile</h1>
     <form className='flex flex-col gap-4'>
      <div className='w-32 h-32 self-center cursor-pointer'>
      <img src={currentUser.profilePicture} alt='user' 
      className='rounded-full w-full h-full border-4 border-gray-500'/>
      </div>
      <TextInput
        type='text'
        id='username'
        placeholder='username'
        defaultValue={currentUser.username}
      
      />
      <TextInput
        type='text'
        id='email'
        placeholder='email'
        defaultValue={currentUser.email}
        
      />
      <TextInput
        type='text'
        id='password'
        placeholder='password'
      />
      <Button 
       gradientDuoTone='purpleToPink' outline type='submit' className='p-1'>Update
       </Button>
     </form>
     <div className='flex justify-between'>
      <span className='cursor-pointer'>Delete Account</span>
      <span className='cursor-pointer'>Sign Out</span>
     </div>
    </div>

  )
}

export default DashProfile