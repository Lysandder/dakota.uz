import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="w-full py-8 md:py-10">
      <div className="luxury-container">
        <Link to="/" className="block text-center">
          <h1 className="brand-name text-foreground">Dakota</h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
