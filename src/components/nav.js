import React from 'react'
import { Link, useNavigate } from 'react-router-dom';


const Nav = () => {
    const auth = localStorage.getItem("user")
    const navigate = useNavigate();
    const logout = () => {
        localStorage.clear();
        navigate("/signup")
    }
    return (
        <div>
            <img 
            alt='logo'
            className='logo'
            src='https://img.freepik.com/free-vector/bird-colorful-gradient-design-vector_343694-2506.jpg?size=338&ext=jpg&ga=GA1.1.1224184972.1711843200&semt=ais'></img>
            { auth ? <ul className='nav-ul'>
                <li> <Link to='/home'> Home</Link></li>
                <li> <Link to='/product'> Products</Link></li>
                <li> <Link to='/delete'> Delete product</Link></li>
                <li> <Link to='/get'> Get product</Link></li>
                <li> <Link  onClick={logout} to='/signup'>Logout</Link></li>

            </ul> :
              <ul className='nav-ul nav-right'>
                <li> <Link to='/signup'>Sign Up</Link></li>
                <li> <Link to='/login'> login</Link></li>
              </ul>
            }
        
        </div>
    )
}

export default Nav;