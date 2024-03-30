import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'
import { useSelector, useDispatch } from 'react-redux'
import { signoutSuccess } from '../redux/user/userSlice'
import { useNavigate } from 'react-router-dom'

function DashSidebar() {
    const {currentUser,error}=useSelector((state)=>state.user)
    const navigate =useNavigate()
    const dispatch=useDispatch()

    const handleSignOut=async()=>{
        try {
          const res=await fetch('/api/user/signout',{
            method: 'POST',
          });
          const data= await res.json();
          if(!res.ok)
          {
            console.log(data.message);
          }
          else{
            dispatch(signoutSuccess());
            navigate('/signin')
          }
        } catch (error) {
          console.log(error.message);      
        }
      };
    
    
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items> 
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Sidebar.Item active icon={HiUser} label={'user'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer' onClick={handleSignOut}>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar