'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import { getViajes } from '../lib/api';
import Navbar from '../components/Navbar';
import api from '../lib/api';

export default function MisViajesPage() {
  const { user } = useUser();
  const router = useRouter();
  const [viajes, setViajes] = useState<any[]>([]);
  const [toast, setToast] = useState('');

  useEffect(() => {
    if (!user) { router.push('/'); return; }
    cargarViajes();
  }, [user]);

  const cargarViajes = () => {
    getViajes().then(r => {
      const misViajes = r.data.filter((v: any) => v.conductor?.id === user!.id);
      setViajes(misViajes);
    }).catch(() => {});
  };

  const handleEliminar = async (id: number) => {
    try {
      await api.delete(`/viajes/${id}`);
      showToast('Viaje eliminado.');
      cargarViajes();
    } catch {
      showToast('Error al eliminar el viaje.');
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  if (!user) return null;

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Mis viajes publicados</h1>
        <p style={{ color: '#6B7280', marginBottom: 28, fontSize: 15 }}>
          Aquí puedes ver y eliminar los viajes que has publicado.
        </p>

        {viajes.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <span style={{ fontSize: 36, opacity: 0.3 }}>🚗</span>
              <p>No has publicado ningún viaje aún.</p>
              <button className="btn-primary" style={{ width: 'auto', padding: '10px 24px' }}
                onClick={() => router.push('/ofrecer-viaje')}>
                + Ofrecer un viaje
              </button>
            </div>
          </div>
        ) : (
          viajes.map((v: any) => (
            <div key={v.id} className="card" style={{ marginBottom: 16 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div className="viaje-ruta">📍 {v.inicio} → 🏁 {v.final}</div>
                  {v.fecha && (
                    <div className="viaje-meta" style={{ marginTop: 4 }}>
                      📅 {v.fecha} · ⏰ {v.hora}
                    </div>
                  )}
                  {v.vehiculo && (
                    <div className="viaje-meta" style={{ marginTop: 4 }}>
                      🚗 {v.vehiculo.modelo} · {v.vehiculo.placa} · {v.vehiculo.color}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => handleEliminar(v.id)}
                  style={{
                    padding: '8px 16px', borderRadius: 10,
                    border: '1.5px solid #EF4444', background: 'white',
                    color: '#EF4444', fontSize: 13, fontWeight: 700,
                    cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
                    flexShrink: 0,
                  }}>
                  🗑️ Eliminar
                </button>
              </div>
            </div>
          ))
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}