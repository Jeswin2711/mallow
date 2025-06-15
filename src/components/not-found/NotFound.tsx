import React from 'react'
import notFound from '@/assets/404.gif'

const NotFound = () => {
  return (
    <div className='not-found'>
        <img src={notFound} width={250}/>
        <h2>404</h2>
        <p>Page Not Found</p>
    </div>
  )
}

export default NotFound