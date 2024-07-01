import {useState} from 'react';
import { ImEarth } from "react-icons/im";
import { BsPersonFill } from "react-icons/bs";
import { Link, Route, Routes } from 'react-router-dom';
import { IoMdMenu } from 'react-icons/io';
import { FaTimes } from 'react-icons/fa';
import UberArenaBerlin from './UberArenaBerlin.jsx';

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [dropdownPlaces, setDropdownPlaces] = useState(false);
  const [dropdownBerlin, setDropdownBerlin] = useState(false);
  const [dropdownEvents, setDropdownEvents] = useState({});
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdownPlaces = () => setDropdownPlaces(!dropdownPlaces);
  const toggleDropdownBerlin = () => setDropdownBerlin(!dropdownBerlin);
  const toggleDropdownEvents = (index) => setDropdownEvents(prevState => ({
    ...prevState,
    [index]: !prevState[index]
  }));
  const handleLogin = (event) => {
    event.preventDefault();
    const username = event.target.username.value;
    const password = event.target.password.value;
    // Führen Sie hier Ihre Login-Logik aus
    console.log(`Username: ${username}, Password: ${password}`);
  };
  const handleLoginClick = async() => {
    try {
      const response = await axios.post('/api/login', { username, password });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    
  };

  const handleRegisterClick = () => {
    // Fügen Sie hier Ihre Registrierungslogik ein
    console.log('Register button clicked');
  };
  

  const events = [
    {
      name: "Konzerte",link: "/konzerte",submenu: true, sublinks: [
        { name: "Übersicht Konzerte", link: "/übersicht-konzerte" },
        { name: "Rock & Pop", link: "/rock-pop" },
        { name: "Hip-Hop & R’n‘B", link: "/hip-hop-rnb" },
        { name: "Schlager & Volksmusik", link: "/schlager-volksmusik" },
        { name: "Hard & Heavy", link: "/hard-heavy" },
        { name: "Clubkonzerte", link: "/clubkonzerte" },
        { name: "Festivals", link: "/festivals" },
        { name: "Electronic & Dance", link: "/electronic-dance" },
        { name: "Jazz & Blues", link: "/jazz-blues" },
        { name: "Country & Folk", link: "/country-folk" },
        { name: "Weitere Konzerte", link: "/weitere-konzerte" },
      ]
    },
    {
      name: "Kultur",link: "/kultur",submenu: true, sublinks: [
        { name: "Übersicht Kultur", link: "/übersicht-kultur" },
        { name: "Theater", link: "/theater" },
        { name: "Klassisch Konzerte", link: "/klassische-konzerte" },
        { name: "Tanz", link: "/tanz" },
      ]
    },
    {
      name: "Musical & Show",link: "/musial-show",submenu: true, sublinks: [
        { name: "Übersicht Musical & Show", link: "/übersicht-musical-show" },
        { name: "Musical", link: "/musical" },
        { name: "Show", link: "/show" },
        { name: "Podcast", link: "/podcast" },
      ]
    },
    {
      name: "Humor",link: "/humor",submenu: true, sublinks: [
        { name: "Übersicht Humor", link: "/übersicht-humor" },
        { name: "Comedy", link: "/comedy" },
        { name: "Kabarett", link: "/kabarett" },
      ]
    },
    {
      name: "Sport",link: "/sport",submenu: true, sublinks: [
        { name: "Übersicht Sport", link: "/übersicht-sport" },
        { name: "Fußball", link: "/fußball" },
        { name: "Handball", link: "/handball" },
      ]
    },
    {
      name: "Freizeit",link: "/freizeit",submenu: true, sublinks: [
        { name: "Übersicht Freizeit", link: "/übersicht-freizeit" },
        { name: "Freizeitparks", link: "/freizeitparks" },
        { name: "Zoo & Tierparks", link: "/zoo-tierparks" },
        { name: "Schwimmbäder", link: "/schwimmbäder" },
      ]
    },
    {
      name: "Ticket-Gutschein",link: "/ticket-gutschein",submenu: true, sublinks: [
        { name: "Übersicht Ticket-Gutschein", link: "/übersicht-ticket-gutschein" },
      ]
    },
    { name: "VIP & Extras", link: "/vip-extras",submenu: true, sublinks: [
      { name: "Übersicht VIP & Extras", link: "/übersicht-vip-extras" },
      { name: "VIP-Tickets", link: "/vip-tickets" },
      { name: "VIP-Pakete", link: "/vip-pakete" },
      { name: "VIP-Extras", link: "/vip-extras" },
    ] },
    { name: "Alle Events", link: "/alle-events" ,submenu: true, sublinks: [
    { name: "Übersicht Alle Events", link: "/übersicht-alle-events" },]  
    },
  ]
    
  const places = [
    { name: "Berlin", link: "/berlin",submenu: true, sublinks: [
      { name: "Alle Events Berlin", link: "/alle-events-berlin" },
      { name: "Uber Arena Berlin", link: "/uber-arena-berlin" },
      { name: "Friedrichstadt-Palast", link: "/friedrichstadt-palast" },
      { name: "Waldbühne Berlin", link: "/waldbühne-berlin" },
      { name: "Humor", link: "/humor" },
      { name: "Sport", link: "/sport" },
      { name: "Freizeit", link: "/freizeit" },
      { name: "Ticket-Gutschein", link: "/ticket-gutschein" },
      { name: "VIP & Extras", link: "/vip-extras" },
      { name: "Alle Events", link: "/alle-events" },
      ]  
      },
    { name: "Hamburg", link: "/hamburg" },
    { name: "München", link: "/münchen" },
            { name: "Köln", link: "/köln" },
            { name: "Frankfurt", link: "/frankfurt" },
            { name: "Stuttgart", link: "/stuttgart" },
            { name: "Düsseldorf", link: "/düsseldorf" },
            { name: "Dortmund", link: "/dortmund" },
            { name: "Essen", link: "/essen" },
            { name: "Leipzig", link: "/leipzig" },
            { name: "Bremen", link: "/bremen" },
            { name: "Dresden", link: "/dresden" },
            { name: "Hannover", link: "/hannover" },
            { name: "Nürnberg", link: "/nürnberg" },
            { name: "Duisburg", link: "/duisburg" },
            { name: "Alle Orte", link: "/alle-orte" },
    // ... other links
  ];
  const content = <>
  <div className="lg:hidden z-50 block absolute top-36 w-full left-0 right-0">
     <ul className="text-center text-xl p-20">
        <li className='my-4 py-4 border-b border-pink-200 text-pink-200 hover:text-pink-950 transition-all duration-150 hover:bg-pink-200 hoer:rounded'>
          <details>
            <summary>Event</summary>
            <Link to='/konzerte'>Konzerte</Link>
            <Link to='/übersicht-konzerte'>Übersicht Konzerte</Link>
            {/* Add more event links as needed */}
          </details>
        </li>
        <li className='my-4 py-4 border-b border-pink-200 text-pink-200 hover:text-pink-950 transition-all duration-150 hover:bg-pink-200 hoer:rounded'>
          <details>
            <summary>Alle Orte</summary>
            <Link to='/place1'>Place 1</Link>
            <Link to='/place2'>Place 2</Link>
            {/* Add more place links as needed */}
          </details>
        </li>
        
  <Link to='/search'>
    <li className='my-4 py-4 border-b border-pink-200 text-pink-200 hover:text-pink-950 transition-all duration-150 hover:bg-pink-200 hoer:rounded'><input type="text" placeholder="Search" /></li>
    </Link>
  <Link to='/sprachen'>
    <li className='my-4 py-4 border-b border-pink-200 text-pink-200 hover:text-pink-950 transition-all duration-150 hover:bg-pink-200 hoer:rounded'><ImEarth /></li>
    </Link>
    <Link to='/login'>
    <li className='my-4 py-4 border-b border-pink-200 text-pink-200 hover:text-pink-950 transition-all duration-150 hover:bg-pink-200 hoer:rounded'><BsPersonFill /></li>
    </Link>
    </ul>
  </div>
</>
  return (
    <div>
    <nav style={{
      backgroundImage:
      "linear-gradient(90deg, rgb(73, 218, 205) 0%, rgba(0,0,0,1) 80%, rgba(6, 6, 6, 7) 100%)",
      }}
      className="z-50">
  <div className="h-10vh flex justify-between lg:py-5 px-20 py-20 border-b">
    <div className="flex items-center flex-1">
      <Link to='/home'><h2 className="text-4xl font-bold text-white -500">Eventhub</h2></Link>
       </div>
    <div className="lg:flex md-flex flex-1 justify-center items front-normal hidden">
      <ul className="flex gap-8 mr-20 text-[18px] text-white">
        
          {/* mega menu start */}
          <div className="group relative">
  <button onClick={() => toggleDropdownEvents('main')} className="text-white-400 hover:text-blue-400 transition hover:border-blue-400 cursor-pointer">Alle Events</button>
  {dropdownEvents['main'] && (
    <div className="absolute left-0 flex flex-col py-2 px-10 w-56 bg-white z-20 text-black duration-300 top-16 border rounded shadow items-start">
      {events.map((event, index) => (
        <div key={index} className="relative items-start">
          <button onClick={() => event.submenu ? toggleDropdownEvents(index) : null} className="hover:underline hover:text-pink-400">{event.name}</button>
          {dropdownEvents[index] && event.submenu && (
            <div className="absolute left-full top-0 ml-28 mt-[-10px] w-56 p-2 space-y-1 bg-white border rounded shadow z-30">
              {event.sublinks.map((sublink, subIndex) => (
                <Link key={subIndex} to={sublink.link} className="block hover:underline hover:text-pink-400">{sublink.name}</Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>

          <div className="group relative">
  <button onClick={toggleDropdownPlaces} className="text-white-400 hover:text-blue-400 transition hover:border-blue-400 cursor-pointer">Alle Orte</button>
  {dropdownPlaces && (
    <div className="absolute left-0 flex flex-col py-2 px-10 w-56 bg-white z-20 text-black duration-300 top-16 border rounded shadow items-start">
      {places.map((place, index) => (
        <div key={index} className="relative items-start">
          <button onClick={place.submenu ? toggleDropdownBerlin : null} className="hover:underline hover:text-pink-400">{place.name}</button>
          {dropdownBerlin && place.submenu && (
            <div className="absolute left-full top-0 ml-36 mt-[-10px] w-56 p-2 space-y-1 bg-white border rounded shadow z-30">
              {place.sublinks.map((sublink, subIndex) => (
                <Link key={subIndex} to={sublink.link} className="block hover:underline hover:text-pink-400">{sublink.name}</Link>
              ))}
              
            </div>
          )}
        </div>
      ))}
    </div>
  )}
</div>
          {/* mega menu end */}
           <Link to='/search'>
          <li className='hover:text-blue-400 transition hover:border-blue-400 cursor-pointer'><input type="text" placeholder="Search" /></li>
          </Link>
        <Link to='/sprachen'>
          <li className='hover:text-blue-400 transition hover:border-blue-400 cursor-pointer'><ImEarth /></li>
          </Link>
          <div style={{ position: 'relative', display: 'inline-block' }}>
  <button 
    className='hover:text-blue-400 transition hover:border-blue-400 cursor-pointer'
    onClick={() => setIsOpen(!isOpen)}
  >
    <BsPersonFill />
  </button>
  {isOpen && (
        <div style={{ position: 'absolute', top: '100%', right: 0, backgroundColor: 'white', padding: '10px', border: '1px solid black', width: '250px' }}>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" name="username" style={{ display: 'block', marginBottom: '10px', width: '100%' }} />
            <input type="password" placeholder="Password" name="password" style={{ display: 'block', marginBottom: '10px', width: '100%' }} />
            <button type="submit" onClick={handleLoginClick} style={{ display: 'block', marginTop: '10px', backgroundColor: 'blue', color: 'white', border: 'none', padding: '10px', width: '100%', cursor: 'pointer' }}>Login</button>
          </form>
          <hr style={{ margin: '10px 0' }} />
          <button type="button" onClick={handleRegisterClick} style={{ textDecoration: 'underline', width: '100%', color: 'black' }}>Register</button>
        </div>
      )}
</div>
      </ul>
    </div>
  
  <div>{click && content}</div>
 <button className="block sm:hidden transition-none text-white text-xl " onClick={handleClick}>
  {click ? <FaTimes classNametext-black /> : <IoMdMenu classNametext-black/>}
 </button>
 </div>
 
    </nav>
    
    <Routes>
      <Route path='/uber-arena-berlin' element={<UberArenaBerlin />} />
      
    </Routes>
    </div>
  )
}
export default Navbar;