import React from 'react';
import { NavLink } from 'react-router-dom';
import { Gauge, ChartNoAxesGantt, ChartBarStacked, FolderKanban, ArrowBigLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SidebarAdmin = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-green-600 w-64 text-gray-200 flex flex-col h-screen">
      {/* Header */}
      <div className="h-24 bg-green-800 flex items-center justify-center text-2xl font-bold">
        Admin 
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-4 space-y-2">
        <NavLink
          to="/admin"
          end
          className={({ isActive }) =>
            isActive
              ? 'bg-green-400 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-green-950 hover:text-white rounded flex items-center'
          }
        >
          <Gauge className="mr-2" />
          Dashboard
        </NavLink>

        <NavLink
          to="/admin/manage"
          className={({ isActive }) =>
            isActive
              ? 'bg-green-400 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-green-950 hover:text-white rounded flex items-center'
          }
        >
          <ChartNoAxesGantt className="mr-2" />
          Manage
        </NavLink>

        <NavLink
          to="/admin/category"
          className={({ isActive }) =>
            isActive
              ? 'bg-green-400 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-green-950 hover:text-white rounded flex items-center'
          }
        >
          <ChartBarStacked className="mr-2" />
          Category
        </NavLink>

        <NavLink
          to="/admin/product"
          className={({ isActive }) =>
            isActive
              ? 'bg-green-400 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-green-950 hover:text-white rounded flex items-center'
          }
        >
          <FolderKanban className="mr-2" />
          Product
        </NavLink>
      </nav>

      {/* Back to Home button */}
      <div className="mt-auto px-4 py-2">
        <NavLink
          onClick={() => navigate('/home')}
          className={({ isActive }) =>
            isActive
              ? 'bg-green-400 rounded-md text-white px-4 py-2 flex items-center'
              : 'text-gray-300 px-4 py-2 hover:bg-green-950 hover:text-white rounded flex items-center'
          }
        >
          <ArrowBigLeft className="mr-2" />
          Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default SidebarAdmin;