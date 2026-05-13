'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { getViajes } from '../lib/api';
import Navbar from '../components/Navbar';

export default function InicioPage() {
  const { user } = useUser();
  const router = useRouter();
  const [viajes, setViajes] = useState<any[]>([]);

  useEffect(() => {
    if (!user) { router.push('/'); return; }
    getViajes().then(r => setViajes(r.data)).catch(() => {});
  }, [user]);

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="page">
        {/* Hero */}
        <div className="hero-banner">
          <div>
            <div className="hero-badge">✦ Bienvenido</div>
            <h1 className="hero-title">Hola, {user.name.split(' ')[0]} 👋</h1>
            <p className="hero-sub">¿A dónde vas hoy?</p>
          </div>
          <Link href="/pedir-viaje">
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              background: 'white',
              color: '#7C3AED',
              border: 'none',
              borderRadius: 12,
              padding: '12px 24px',
              fontSize: 15,
              fontWeight: 800,
              cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
              transition: 'transform 0.15s',
            }}>
              🔍 Pedir un viaje
            </button>
          </Link>
        </div>

        {/* Viajes disponibles */}
        <div className="section-title">
          <span>📍</span> Viajes disponibles
        </div>

        {viajes.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <span style={{ fontSize: 36, opacity: 0.3 }}>🚗</span>
              <p>No hay viajes disponibles ahora. ¡Sé el primero en ofrecer uno!</p>
              <Link href="/ofrecer-viaje">
                <button className="btn-primary" style={{ width: 'auto', padding: '10px 24px' }}>
                  + Ofrecer un viaje
                </button>
              </Link>
            </div>
          </div>
        ) : (
          viajes.slice(0, 5).map((v: any) => (
            <div key={v.id} className="viaje-card">
              <div>
                <div className="viaje-ruta">📍 {v.inicio} → 🏁 {v.final}</div>
                <div className="viaje-meta">Conductor ID: {v.conductor_id}</div>
              </div>
              <Link href="/pedir-viaje">
                <button className="btn-outline">Ver</button>
              </Link>
            </div>
          ))
        )}
      </div>
    </>
  );
}