'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import { getViajes, createViaje } from '../lib/api';
import Navbar from '../components/Navbar';

export default function PedirViajePage() {
  const { user } = useUser();
  const router = useRouter();
  const [viajes, setViajes] = useState<any[]>([]);
  const [filtros, setFiltros] = useState({ desde: '', hasta: '' });
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) { router.push('/'); return; }
    getViajes().then(r => setViajes(r.data)).catch(() => {});
  }, [user]);

  const viajesFiltrados = viajes.filter(v => {
    const desde = filtros.desde.toLowerCase();
    const hasta = filtros.hasta.toLowerCase();
    return (
      (!desde || v.inicio?.toLowerCase().includes(desde)) &&
      (!hasta || v.final?.toLowerCase().includes(hasta))
    );
  });

  const handleReservar = async (v: any) => {
    if (!user) return;
    setLoading(true);
    try {
      await createViaje({
        inicio: v.inicio,
        final: v.final,
        user_id: user.id,
        conductor_id: v.conductor?.id,
        vehiculo_id: v.vehiculo?.placa,
        fecha: v.fecha,
        hora: v.hora,
      });
      showToast('¡Viaje reservado exitosamente!');
    } catch {
      showToast('Error al reservar el viaje.');
    } finally {
      setLoading(false);
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
        <div className="hero-banner">
          <div>
            <div className="hero-badge">🔍 Pedir viaje</div>
            <h1 className="hero-title">Encuentra tu próximo viaje</h1>
            <p className="hero-sub">Busca por zona y reserva tu asiento al instante.</p>
          </div>
        </div>

        {/* Filtros */}
        <div className="card">
          <div className="form-grid">
            <div className="form-group">
              <label>Desde (zona)</label>
              <input placeholder="Ej. Campus norte"
                value={filtros.desde}
                onChange={e => setFiltros({ ...filtros, desde: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Hasta (zona)</label>
              <input placeholder="Ej. Centro"
                value={filtros.hasta}
                onChange={e => setFiltros({ ...filtros, hasta: e.target.value })} />
            </div>
          </div>
        </div>

        <div className="section-title">
          <span>📍</span> {viajesFiltrados.length} viajes encontrados
        </div>

        {viajesFiltrados.length === 0 ? (
          <div className="card">
            <div className="empty-state">
              <span style={{ fontSize: 36, opacity: 0.3 }}>🗺️</span>
              <p>No se encontraron viajes con esos filtros.</p>
            </div>
          </div>
        ) : (
          viajesFiltrados.map((v: any) => {
            const conductor = v.conductor;
            const vehiculo = v.vehiculo;
            return (
              <div key={v.id} className="card" style={{ marginBottom: 16 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: conductor ? 16 : 0 }}>
                  <div>
                    <div className="viaje-ruta">📍 {v.inicio} → 🏁 {v.final}</div>
                    {v.fecha && (
                      <div className="viaje-meta" style={{ marginTop: 4 }}>
                        📅 {v.fecha} · ⏰ {v.hora}
                      </div>
                    )}
                    {vehiculo && (
                      <div className="viaje-meta" style={{ marginTop: 4 }}>
                        🚗 {vehiculo.modelo} · {vehiculo.placa} · {vehiculo.color}
                        {vehiculo.soat && ' · ✅ SOAT'}
                        {vehiculo.tarjetaDePropiedad && ' · 📄 Tarjeta'}
                      </div>
                    )}
                  </div>
                  <button className="btn-primary"
                    style={{ width: 'auto', padding: '10px 20px', flexShrink: 0 }}
                    onClick={() => handleReservar(v)}
                    disabled={loading}>
                    Reservar
                  </button>
                </div>

                {/* Datos del conductor */}
                {conductor && (
                  <div style={{
                    background: '#F5F3FF', borderRadius: 10,
                    padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 12,
                  }}>
                    <div style={{
                      width: 36, height: 36, borderRadius: '50%',
                      background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: 800, fontSize: 14, flexShrink: 0,
                    }}>
                      {conductor.name?.[0]?.toUpperCase()}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 14, color: '#111' }}>
                        {conductor.name}
                      </div>
                      <div style={{ fontSize: 12, color: '#6B7280' }}>
                        📞 {conductor.telefono} · {conductor.licencia ? '✅ Licencia vigente' : '❌ Sin licencia'}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}