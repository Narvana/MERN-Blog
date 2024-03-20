import React from 'react'
import { Footer } from 'flowbite-react'
import { Link } from 'react-router-dom'

function footer() {
  return (
    <Footer container className='border border-t-8 border-teal-800'>
      <div className=''>
        <div className=''>
          <div className=''>
          <Link to='/' className='self-center whitespace-nowrap text-xl font-semibold dark:text-white'>
          <span className='px-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>Web's</span>
          Blog
          </Link>
          </div>
          <div className='grid lg:grid-cols-3 gap-3 sm:mt-4 md:grid-cols-2 '>
            <div>
              <Footer.Title title='About'/>
               <Footer.LinkGroup col>
                <Footer.Link 
                href="https://www.100jsprojects.com"
                target='_blank'
                rel='noopener noreferrer'
                >
                  100 JS Projects
                </Footer.Link>
                <Footer.Link 
                href="/about"
                target='_blank'
                rel='noopener noreferrer'
                >
                  Web's Blog
                </Footer.Link>
               </Footer.LinkGroup>  
            </div>
            <div>
              <Footer.Title title='FOLLOW US'/>
               <Footer.LinkGroup col>
                <Footer.Link 
                href="#"
                target='_blank'
                rel='noopener noreferrer'
                >
                  Github
                </Footer.Link>
                <Footer.Link 
                href="#"
                target='_blank'
                rel='noopener noreferrer'
                >
                  Discord
                </Footer.Link>
               </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title='LEGAL'/>
               <Footer.LinkGroup col>
                <Footer.Link 
                href="#"
                target='_blank'
                rel='noopener noreferrer'
                >
                Privacy Policy
                </Footer.Link>
                <Footer.Link 
                href="#"
                target='_blank'
                rel='noopener noreferrer'
                >
                Terms & Conditions
                </Footer.Link>
               </Footer.LinkGroup>
            </div>
          </div>
        </div>
      </div>
    </Footer>
  )
}

export default footer