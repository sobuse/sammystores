import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar className="sticky top-0 z-50" />
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default Layout;