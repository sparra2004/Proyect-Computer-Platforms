'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../context/UserContext';
import { getViajes } from '../lib/api';
import Navbar from '../components/Navbar';

export default function HistorialPage() {
  const { user } = useUser();
  const router = useRouter();
  const [viajes, setViajes] = useState<any[]>([]);
  const [tab, setTab] = useState<'pasajero' | 'conductor'>('pasajero');

  useEffect(() => {
    if (!user) { router.push('/'); return; }
    getViajes().then(r => setViajes(r.data)).catch(() => {});
  }, [user]);

  if (!user) return null;

  const comoP = viajes.filter(v => v.user_id === user.id && v.conductor_id !== user.id);
  const comoC = viajes.filter(v => v.conductor_id === user.id);
  const lista = tab === 'pasajero' ? comoP : comoC;

  return (
    <>
      <Navbar />
      <div className="page">
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 4 }}>Tu historial</h1>
            <p style={{ color: '#6B7280', fontSize: 14 }}>Todos tus viajes en un solo lugar.</p>
          </div>
          <Link href="/pedir-viaje">
            <button className="btn-outline">🔍 Elegir otro viaje</button>
          </Link>
        </div>

        <div className="tabs">
          <button
            className={`tab ${tab === 'pasajero' ? 'active' : ''}`}
            onClick={() => setTab('pasajero')}>
            Como pasajero
          </button>
          <button
            className={`tab ${tab === 'conductor' ? 'active' : ''}`}
            onClick={() => setTab('conductor')}>
            Como conductor
          </button>
        </div>

        {lista.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <span style={{ fontSize: 36, opacity: 0.3 }}>🕓</span>
              <p>Aún no tienes viajes en esta categoría.</p>
              <Link href="/pedir-viaje">
                <button className="btn-primary" style={{ width: 'auto', padding: '10px 24px' }}>
                  🔍 Buscar un viaje
                </button>
              </Link>
            </div>
          </div>
        ) : (
          lista.map((v: any) => (
            <div key={v.id} className="viaje-card">
              <div>
                <div className="viaje-ruta">📍 {v.inicio} → 🏁 {v.final}</div>
                <div className="viaje-meta">
                  {tab === 'pasajero'
                    ? `Conductor ID: ${v.conductor_id}`
                    : `Pasajero ID: ${v.user_id}`}
                </div>
              </div>
              <span style={{
                background: '#F5F3FF', color: '#7C3AED',
                padding: '4px 12px', borderRadius: 8,
                fontSize: 12, fontWeight: 700,
              }}>
                Completado
              </span>
            </div>
          ))
        )}
      </div>
    </>
  );
}