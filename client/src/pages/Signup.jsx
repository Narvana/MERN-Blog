import React, { useState } from 'react'
import { Label, TextInput, Button, Alert, Spinner } from 'flowbite-react'
import { Link,useNavigate } from 'react-router-dom'

function Signup() {
  const [error,setError]=useState(null)
  const [formData,setFormData]=useState({})
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate()

  const handleChange=(e)=>{
    setFormData({...formData,[e.target.id] :e.target.value.trim()});
    // console.log(formData);
    // console.log(typeof formData);
  } 

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!formData.username || !formData.email || !formData.password){
      return setError('Please fill out all fields')
    }
    try{
      setLoading(true);
      setError(null)
      const res=await fetch('/api/auth/signup',{
        method:"POST",
        headers:{'Content-Type' : 'application/json'},
        body:JSON.stringify(formData),
      })
      const data=await res.json();

      data? setError(data.message || data) : setLoading(false) 

      if(res.ok) 
      {
        navigate('/signin')
      }
      // // if(data.success === false){
      //    setError(data.message)
      // }

    }catch(error){
      // setError(err)
      // console.log(err);
      setError(error)
      setLoading(false);
    } 
  }
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
        <form className='flex flex-col gap-2' onSubmit={handleSubmit}>
          <div className=''>
          <Label className='text-lg' value='Your Username'/>
            <TextInput type='text' placeholder='Username' id="username" onChange={handleChange}/>
          </div>
          <div className='pt-2'>
          <Label className='text-lg' value='Your Email'/>
            <TextInput type='email' placeholder='name@company.com' id="email" onChange={handleChange}/>          
            </div>
          <div className='pt-2'>
          <Label className='text-lg' value='Password'/>
            <TextInput type='password' placeholder='password' id="password" onChange={handleChange}/>
          </div>
          <Button  gradientDuoTone='purpleToPink' outline type='submit' disabled={loading}>
          {
           loading ? 
           <>
            <Spinner size='sm' />
            <span className='pl-3'>Loading...</span>
           </> : 
           ('Sign Up')
          }
          </Button>
        </form> 
        <div>
          <h3 className='pt-2'>Have an account?
          <Link to='/signin' className='text-blue-500 hover:text-blue-700 hover:font-semibold'> Sign In</Link></h3>
        </div>
         {
            error 
            &&   
            <Alert className='mt-5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white text-lg font-bold' color='faliure'>
            {error}
            
            </Alert>
            /* <h1 className='text-xl bg-orange-200 rounded-sm'>{error}</h1> */

         }
      </div>
    </div>
      
    </div>

  )
}

export default Signup