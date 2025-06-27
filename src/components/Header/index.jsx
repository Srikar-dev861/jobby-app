import {Link} from 'react-router'
import Cookies from 'js-cookie'
import {useNavigate} from 'react-router-dom'
import './index.css'

const Header = () => {
    const navigate = useNavigate()
    const onClickLogout = () => {
      Cookies.remove('jwt_token')
      navigate('/login', {replace: true})
    }

    return (
      <nav className = "nav-header">
        <div className="nav-content">
            <Link to="/">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo" 
              />
            </Link>
            <ul className='nav-menu'>
              <li className='nav-menu-item'>
                <Link to="/" className="nav-link">
                  Home
                </Link>
              </li>

              <li className='nav-menu-item'>
                <Link to="/jobs" className="nav-link">
                  Jobs
                </Link>
              </li>
            </ul>

            <button
              type="button"
              className="logout-btn"
              onClick={onClickLogout}
            >
              Logout
            </button>
          </div>
      </nav>
    )
}

export default Header