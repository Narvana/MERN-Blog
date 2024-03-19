import React from 'react'
import { Label, TextInput, Button } from 'flowbite-react'
import { Link } from 'react-router-dom'

function Signup() {
  return (
    <div className='min-h-screen mt-20'>
    <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center'>
      {/* left */}
      <div className='flex-1'>
      <Link to='/' className='self-center whitespace-nowrap text-3xl font-bold dark:text-white sm:items-center'>
        <span className='px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
        Web's
        </span>
        Blog
     </Link>
     <p className='py-3 text-lg font-semibold sm:w-30'>This is a demo Project. You can sign up with your email and password or with google</p>
      </div>
      {/* right */}
      <div className='flex-1'>
        <form className='flex flex-col gap-2'>
          <div className=''>
          <Label className='text-lg' value='Your Username'/>
            <TextInput/>
          </div>
          <div className='pt-2'>
          <Label className='text-lg' value='Your Email'/>
            <TextInput/>          
            </div>
          <div className='pt-2'>
          <Label className='text-lg' value='Password'/>
            <TextInput/>
          </div>
          <Button  gradientDuoTone='purpleToPink' outline type='submit'>Sign Up</Button>
        </form>
        <div>
          <h3 className='pt-2'>Have an account?
          <Link to='/signin' className='text-blue-500 hover:text-blue-700 hover:font-semibold'> Sign In</Link></h3>
        </div>
      </div>
    </div>
      
    </div>

  )
}

export default Signup