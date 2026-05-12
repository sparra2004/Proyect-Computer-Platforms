'use client';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';

const links = [
  { href: '/inicio', label: 'Inicio', icon: '🏠' },
  { href: '/pedir-viaje', label: 'Pedir viaje', icon: '🔍' },
  { href: '/ofrecer-viaje', label: 'Ofrecer viaje', icon: '➕' },
  { href: '/historial', label: 'Historial', icon: '🕓' },
  { href: '/perfil', label: 'Perfil', icon: '👤' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { logout } = useUser();

  const handleSalir = () => {
    logout();
    router.push('/');
  };

  return (
    <nav className="navbar">
      <Link href="/inicio" className="nav-logo">
        <div className="nav-logo-icon">🚗</div>
        <span><b>Uni</b>Ride</span>
      </Link>
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className={`nav-link ${pathname === l.href ? 'active' : ''}`}
        >
          <span>{l.icon}</span>
          <span>{l.label}</span>
        </Link>
      ))}
      <div className="nav-spacer" />
      <button className="nav-salir" onClick={handleSalir}>
        <span>↩</span>
        <span>Salir</span>
      </button>
    </nav>
  );
}