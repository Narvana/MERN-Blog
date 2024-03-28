import React from 'react'
import {Sidebar} from 'flowbite-react'
import {HiUser, HiArrowSmRight} from 'react-icons/hi'


function DashSidebar() {
  return (
    <Sidebar className='w-full md:w-56'>
        <Sidebar.Items> 
            <Sidebar.ItemGroup className='flex flex-col gap-1'>
                <Sidebar.Item active icon={HiUser} label={'User'} labelColor='dark' as='div'>
                    Profile
                </Sidebar.Item>
                <Sidebar.Item active icon={HiArrowSmRight} className='cursor-pointer'>
                    Sign Out
                </Sidebar.Item>
            </Sidebar.ItemGroup>
        </Sidebar.Items>
    </Sidebar>
  )
}

export default DashSidebar