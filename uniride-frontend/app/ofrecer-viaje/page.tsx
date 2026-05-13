'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '../context/UserContext';
import { createViaje, createVehiculo } from '../lib/api';
import Navbar from '../components/Navbar';

export default function OfrecerViajePage() {
  const { user } = useUser();
  const router = useRouter();
  const [toast, setToast] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [viaje, setViaje] = useState({ inicio: '', final: '', fecha: '', hora: '' });
  const [vehiculo, setVehiculo] = useState({
    placa: '', modelo: '', color: '', soat: false, tarjetaDePropiedad: false,
  });

  useEffect(() => {
    if (!user) { router.push('/'); return; }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await createVehiculo({
        placa: vehiculo.placa,
        modelo: vehiculo.modelo,
        color: vehiculo.color,
        soat: vehiculo.soat,
        tarjetaDePropiedad: vehiculo.tarjetaDePropiedad,
        conductor_id: user!.id,
      });

      await createViaje({
        inicio: viaje.inicio,
        final: viaje.final,
        user_id: user!.id,
        conductor_id: user!.id,
        vehiculo_id: vehiculo.placa,
        fecha: viaje.fecha,
        hora: viaje.hora,
      });

      showToast('¡Viaje publicado exitosamente!');
      setViaje({ inicio: '', final: '', fecha: '', hora: '' });
      setVehiculo({ placa: '', modelo: '', color: '', soat: false, tarjetaDePropiedad: false });
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al publicar el viaje.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  if (!user) return null;

  if (!user.esConductor) {
    return (
      <>
        <Navbar />
        <div className="page">
          <div className="card" style={{ textAlign: 'center', padding: '48px 24px' }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🚗</div>
            <h2 style={{ fontWeight: 800, marginBottom: 8 }}>No eres conductor</h2>
            <p style={{ color: '#6B7280', marginBottom: 24 }}>
              Para ofrecer viajes necesitas registrarte como conductor.
            </p>
            <button className="btn-primary" style={{ width: 'auto', padding: '10px 24px' }}
              onClick={() => router.push('/registro')}>
              Registrarme como conductor
            </button>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="page">
        <h1 style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Ofrecer un viaje</h1>
        <p style={{ color: '#6B7280', marginBottom: 28, fontSize: 15 }}>
          Comparte tu ruta con otros estudiantes.
        </p>

        {/* Info conductor */}
        <div className="card">
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 40, height: 40,
              background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
              borderRadius: 10, display: 'flex',
              alignItems: 'center', justifyContent: 'center', fontSize: 18,
            }}>🚗</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15 }}>{user.name}</div>
              <div style={{ color: '#6B7280', fontSize: 13 }}>Conductor · ID: {user.id}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Datos del vehículo */}
          <div className="card">
            <div className="section-title"><span>🚙</span> Datos del vehículo</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Placa</label>
                <input placeholder="Ej. ABC123"
                  value={vehiculo.placa}
                  onChange={e => setVehiculo({ ...vehiculo, placa: e.target.value.toUpperCase() })}
                  required />
              </div>
              <div className="form-group">
                <label>Modelo</label>
                <input placeholder="Ej. Mazda 3 2020"
                  value={vehiculo.modelo}
                  onChange={e => setVehiculo({ ...vehiculo, modelo: e.target.value })}
                  required />
              </div>
              <div className="form-group full">
                <label>Color</label>
                <input placeholder="Ej. Blanco"
                  value={vehiculo.color}
                  onChange={e => setVehiculo({ ...vehiculo, color: e.target.value })}
                  required />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 10, cursor: 'pointer',
                background: vehiculo.soat ? '#ECFDF5' : '#F9FAFB',
                border: `1.5px solid ${vehiculo.soat ? '#059669' : '#E5E7EB'}`,
                fontSize: 14, fontWeight: 700,
                color: vehiculo.soat ? '#059669' : '#6B7280',
              }}>
                <input type="checkbox" checked={vehiculo.soat}
                  onChange={e => setVehiculo({ ...vehiculo, soat: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: '#059669' }} />
                ✅ SOAT vigente
              </label>
              <label style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '10px 16px', borderRadius: 10, cursor: 'pointer',
                background: vehiculo.tarjetaDePropiedad ? '#ECFDF5' : '#F9FAFB',
                border: `1.5px solid ${vehiculo.tarjetaDePropiedad ? '#059669' : '#E5E7EB'}`,
                fontSize: 14, fontWeight: 700,
                color: vehiculo.tarjetaDePropiedad ? '#059669' : '#6B7280',
              }}>
                <input type="checkbox" checked={vehiculo.tarjetaDePropiedad}
                  onChange={e => setVehiculo({ ...vehiculo, tarjetaDePropiedad: e.target.checked })}
                  style={{ width: 16, height: 16, accentColor: '#059669' }} />
                📄 Tarjeta de propiedad
              </label>
            </div>
          </div>

          {/* Detalles del viaje */}
          <div className="card">
            <div className="section-title"><span>📍</span> Detalles del viaje</div>
            <div className="form-grid">
              <div className="form-group">
                <label>Desde</label>
                <input placeholder="Ej. Centro"
                  value={viaje.inicio}
                  onChange={e => setViaje({ ...viaje, inicio: e.target.value })}
                  required />
              </div>
              <div className="form-group">
                <label>Hasta</label>
                <input placeholder="Ej. Campus norte"
                  value={viaje.final}
                  onChange={e => setViaje({ ...viaje, final: e.target.value })}
                  required />
              </div>
              <div className="form-group">
                <label>Fecha</label>
                <input type="date"
                  value={viaje.fecha}
                  onChange={e => setViaje({ ...viaje, fecha: e.target.value })}
                  required />
              </div>
              <div className="form-group">
                <label>Hora de salida</label>
                <input type="time"
                  value={viaje.hora}
                  onChange={e => setViaje({ ...viaje, hora: e.target.value })}
                  required />
              </div>
            </div>

            {error && (
              <p style={{ color: '#EF4444', fontSize: 13, fontWeight: 600, marginBottom: 14, marginTop: 8 }}>
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary" style={{ marginTop: 20 }} disabled={loading}>
              {loading ? 'Publicando...' : '🚀 Publicar viaje'}
            </button>
          </div>
        </form>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}