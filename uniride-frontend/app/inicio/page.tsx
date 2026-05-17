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
  const [reservadosLocal, setReservadosLocal] = useState<any[]>([]);

  useEffect(() => {
    if (!user) { router.push('/'); return; }
    getViajes().then(r => setViajes(r.data)).catch(() => {});
    setReservadosLocal(JSON.parse(localStorage.getItem('viajes_reservados') || '[]'));
  }, [user]);

  if (!user) return null;

  const disponibles = viajes.filter(v => v.conductor?.id !== user.id);

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
              display: 'flex', alignItems: 'center', gap: 8,
              background: 'white', color: '#7C3AED', border: 'none',
              borderRadius: 12, padding: '12px 24px', fontSize: 15,
              fontWeight: 800, cursor: 'pointer',
              fontFamily: 'Nunito, sans-serif',
              boxShadow: '0 4px 14px rgba(0,0,0,0.1)',
            }}>
              🔍 Pedir un viaje
            </button>
          </Link>
        </div>

        {/* Viajes disponibles */}
        <div className="section-title">
          <span>📍</span> Viajes disponibles
        </div>

        {disponibles.length === 0 ? (
          <div className="card" style={{ marginBottom: 24 }}>
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
          disponibles.slice(0, 3).map((v: any) => (
            <div key={v.id} className="card" style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div className="viaje-ruta">📍 {v.inicio} → 🏁 {v.final}</div>
                  {v.fecha && (
                    <div className="viaje-meta" style={{ marginTop: 4 }}>
                      📅 {v.fecha} · ⏰ {v.hora}
                    </div>
                  )}
                  {v.conductor && (
                    <div className="viaje-meta" style={{ marginTop: 4 }}>
                      👤 {v.conductor.name} · 📞 {v.conductor.telefono}
                    </div>
                  )}
                  {v.vehiculo && (
                    <div className="viaje-meta" style={{ marginTop: 4 }}>
                      🚗 {v.vehiculo.modelo} · {v.vehiculo.placa}
                    </div>
                  )}
                </div>
                <Link href="/pedir-viaje">
                  <button className="btn-outline">Ver</button>
                </Link>
              </div>
            </div>
          ))
        )}

        {/* Mis viajes reservados */}
        <div className="section-title" style={{ marginTop: 8 }}>
          <span>🎫</span> Mis viajes reservados
        </div>

        {reservadosLocal.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <span style={{ fontSize: 36, opacity: 0.3 }}>🎫</span>
              <p>Aún no tienes viajes reservados.</p>
              <Link href="/pedir-viaje">
                <button className="btn-primary" style={{ width: 'auto', padding: '10px 24px' }}>
                  🔍 Buscar un viaje
                </button>
              </Link>
            </div>
          </div>
        ) : (
          reservadosLocal.map((v: any) => (
            <div key={v.id} className="card" style={{ marginBottom: 12, cursor: 'pointer' }}
              onClick={() => router.push(`/viaje/${v.id}`)}>
              <div className="viaje-ruta">📍 {v.inicio} → 🏁 {v.final}</div>
              {v.fecha && (
                <div className="viaje-meta" style={{ marginTop: 4 }}>
                  📅 {v.fecha} · ⏰ {v.hora}
                </div>
              )}
              {v.conductor && (
                <div style={{
                  background: '#F5F3FF', borderRadius: 10,
                  padding: '10px 14px', marginTop: 10,
                  display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <div style={{
                    width: 32, height: 32, borderRadius: '50%',
                    background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 800, fontSize: 13, flexShrink: 0,
                  }}>
                    {v.conductor.name?.[0]?.toUpperCase()}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 13 }}>{v.conductor.name}</div>
                    <div style={{ fontSize: 12, color: '#6B7280' }}>
                      📞 {v.conductor.telefono}
                    </div>
                  </div>
                </div>
              )}
              <div style={{ fontSize: 12, color: '#7C3AED', fontWeight: 700, marginTop: 10, textAlign: 'right' }}>
                Ver detalles →
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}