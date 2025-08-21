import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Layout.css'


export default function Layout({children}){
return (
<>
<nav className='nav'>
<div className='container nav-inner'>
<Link to='/' className='brand'>Bricks<span>y</span></Link>
<div className='links'>
<NavLink to='/' end>Home</NavLink>
<NavLink to='/property'>Property</NavLink>
<NavLink to='/favorites'>Favorites</NavLink>
<NavLink to='/compare'>Compare</NavLink>
<NavLink to='/messages'>Messages</NavLink>
<NavLink to='/'>Login</NavLink>
<NavLink to='/'>Signup</NavLink>
</div>
</div>
</nav>
<main className='main'>
{children}
</main>
<footer className='footer'>
<div className='container'>© {new Date().getFullYear()} Bricks y — Demo UI</div>
</footer>
</>
)
}