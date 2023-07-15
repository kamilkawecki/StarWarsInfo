import logo from './../assets/logo.png';

function Header() {
  return (
    <header className='flex items-center justify-center pt-12 pb-20'>
      <img src={logo} alt="star wars" />
    </header>
  );
}

export default Header;
