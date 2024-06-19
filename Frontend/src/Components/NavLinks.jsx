import { useState } from "react";
import { Link } from "react-router-dom";
import { ImEarth } from "react-icons/im";
import "./Navlinks.css";

const NavLinks = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const [openSubMenu, setOpenSubMenu] = useState(null);

  const links = [
    {
      name: "Events",
      submenu: true,
      sublinks: [
        {
          Head: "",
          sublinks: [
            {
              name: "Konzerte",
              link: "/konzerte",
              submenu: true,
              sublinks: [
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
              ],
            },
            { name: "Kultur", link: "/kultur",submenu: true,
            sublinks: [
              { name: "Übersicht Kultur", link: "/übersicht-kultur" },
              { name: "Theater", link: "/theater" },
              { name: "Klassisch Konzerte", link: "/klassische-konzerte" },
              { name: "Tanz", link: "/tanz" },
            ], },
            { name: "Musical & Show", link: "/musial-show",submenu: true,
            sublinks: [
              { name: "Übersicht Musical & Show", link: "/übersicht-musical-show" },
              { name: "Musical", link: "/musical" },
              { name: "Show", link: "/show" },
              { name: "Podcast", link: "/podcast" },
            ], },
            { name: "Humor", link: "/humor",submenu: true,
            sublinks: [
              { name: "Übersicht Humor", link: "/übersicht-humor" },
              { name: "Comedy", link: "/comedy" },
              { name: "Kabarett", link: "/kabarett" },
            ], },
            { name: "Sport", link: "/sport",submenu: true,
            sublinks: [
              { name: "Übersicht Sport", link: "/übersicht-sport" },
              { name: "Fußball", link: "/fußball" },
              { name: "Handball", link: "/handbal" },
              { name: "Motorsport", link: "/motorsport" },
            ], },
            { name: "Freizeit", link: "/freizeit",submenu: true,
            sublinks: [
              { name: "Übersicht Freizeit", link: "/übersicht-freizeit" },
              { name: "Ausstellungen", link: "/ausstellungen" },
              { name: "Kinder", link: "/kinder" },
              { name: "Aktivitäten", link: "/aktivitäten" },
            ], },
            { name: "Ticket-Gutschein", link: "/ticket-gutschein",submenu: true,
            sublinks: [
              { name: "Übersicht Ticket-Gutschein", link: "/übersicht-ticket-gutschein" },
              
            ], },
            { name: "VIP & Extras", link: "/vip-extras",submenu: true,
            sublinks: [
              { name: "Übersicht VIP & Extras", link: "/übersicht-vip-extras" },
             
            ], },
            { name: "Alle Events", link: "/alle-events",submenu: true,
            sublinks: [
              { name: "Übersicht Alle Events", link: "/übersicht-alle-events" },
              
            ], },
          ],
        },
      ],
    },
    {
      name: "Alle Orte",
      submenu: true,
      sublinks: [
        {
          Head: "",
          sublinks: [
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
          ],
        },
      ],
    },
    {
      name: "Sprachen",
      link: "/Sprachen",
      submenu: false,
      sublinks: [
        { name: "Deutsch", link: "/deutsch" },
        { name: "Englisch", link: "/englisch" },
        { name: "Türkisch", link: "/türkisch" },
        { name: "Russisch", link: "/russisch" },
        { name: "Polnisch", link: "/polnisch" },
        { name: "Alle Sprachen", link: "/alle-sprachen" },
      ],
      icon: <ImEarth />,
    },
  ];
  const renderSublinks = (sublinks) => {
    return sublinks.map((sublink, index) => (
      <div key={index}>
        <Link
          to={sublink.link}
          className="nav-link"
          onClick={(e) => {
            e.stopPropagation();
            if (sublink.submenu) {
              setOpenSubMenu(sublink.name);
            } else {
              // Setzt den Zustand von openSubMenu zurück, wenn auf einen Link ohne Untermenü geklickt wird
              setOpenSubMenu(null);
              // Setzt den Zustand von openMenu zurück, wenn auf einen Link ohne Untermenü geklickt wird
              setOpenMenu(null);
            }
          }}
        >
          {sublink.name}
        </Link>
        {sublink.submenu && openSubMenu === sublink.name && (
          <div
            className={
              openSubMenu === sublink.name
                ? "dropdown-content-show"
                : "dropdown-content"
            }
          >
            {renderSublinks(sublink.sublinks)}
          </div>
        )}
      </div>
    ));
  };

  return (
    <>
      {links.map((link, index) => (
        <div key={index} className={"dropdown" + (link.name === 'Sprachen' ? ' languages' : '')}>
          <h1 className={link.name === 'Sprachen' ? 'sprachen' : ''} onClick={() => {
            setOpenMenu(openMenu === link.name ? null : link.name);
            if (!link.submenu) {
              setOpenSubMenu(null); // Setzt den Zustand von openSubMenu zurück, wenn auf einen Link ohne Untermenü geklickt wird
            }
          }}>{link.name}</h1>
          {link.submenu && link.sublinks.map((sublink, index) => (
            <div key={index} className={openMenu === link.name ? "dropdown-content-show" : "dropdown-content"}>
              <h2 onClick={() => setOpenSubMenu(openSubMenu === sublink.name ? null : sublink.name)}>{sublink.Head}</h2>
              {renderSublinks(sublink.sublinks)}
            </div>
          ))}
          {!link.submenu && (
            <div onClick={() => setOpenMenu(openMenu === link.name ? null : link.name)} className="py-7 px-3 text-3xl inline-block">
              {link.icon}
              <div className={openMenu === link.name ? "dropdown-content-show" : "dropdown-content"}>
                {link.sublinks.map((sublink, index) => (
                  <div key={index}>
                    <Link to={sublink.link} className="nav-link" onClick={(e) => e.stopPropagation()}>{sublink.name}</Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default NavLinks;
