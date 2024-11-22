import React from 'react';
import { Link } from 'react-router-dom';
import useEcomStore from '../store/ecom-store';
import { ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function MainNav() {

  const navigate = useNavigate()
  const user = useEcomStore((state) => state.user)

  const carts = useEcomStore((state) => state.carts);
  console.log(carts.length);

  return (
    <nav className="bg-green-500 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Left section (Logo & Links) */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-2xl font-bold text-white hover:text-gray-200 transition-colors">
              FDS
            </Link>
            <Link to="/" className="text-white font-bold hover:text-gray-200 transition-colors">
              Home
            </Link>
            <Link to="/shop" className="text-white font-bold hover:text-gray-200 transition-colors">
              Shop
            </Link>

            {/* Shopping Cart Badge */}
            <Link to="/cart" className="relative text-white hover:text-gray-200 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {carts.length > 0 && (
                <span className="absolute -top-1 -right-3 bg-red-500 text-white text-xs font-bold rounded-full px-2 py-0.5">
                  {carts.length}
                </span>
              )}
            </Link>
          </div>

          {/* Right section (Auth Links) */}
          <div>
            {((user?.role) == 'admin' ) && (<p
                onClick={() => navigate('/admin')}
                className='font-bold text-white text-2xl cursor-pointer hover:text-gray-200'>ADMIN</p>)
              }
          </div>
          <div>
            {
              user 
              ? <p
              onClick={() => navigate('/user')}
              className='font-bold text-white text-2xl cursor-pointer hover:text-gray-200'>Profile</p>
            :
            <div className="flex items-center gap-4">
              <Link to="/register" className="text-white font-bold hover:text-gray-200 transition-colors">
                Register
              </Link>
              <Link to="/login" className="text-white font-bold hover:text-gray-200 transition-colors">
                Login
              </Link>
            </div>
            }


          </div>





        </div>
      </div>
    </nav>
  );
}

export default MainNav;
