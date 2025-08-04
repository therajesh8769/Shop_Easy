import {Link,useLocation} from 'react-router-dom';

const Sidebar = () => {
    const location = useLocation();

    const links=[
        {path: '/admin/dashboard', label: 'Dashboard'},
        {path: '/admin/orders', label: 'Orders'},
        {path: '/admin/users', label: 'Users'},
        {path: '/admin/Addproduct', label: 'Add Products'},
        {path: '/admin/products', label: 'Products'}
    ];
    
    return (
        <div className=" h-screen flex shadow-lg flex-col bg-gray-800 text-white w-64 h-full p-4">
            <h1 className="text-2xl font-bold mb-6 text-center">Admin Panel</h1>
            <nav className="flex flex-col gap-4">
        {links.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`px-3 py-2 rounded transition-all ${
              location.pathname === link.path
                ? "bg-white text-gray-900 font-semibold"
                : "hover:bg-gray-800"
            }`}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;