'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { useUser } from '../../context/UserContext';
import { getViajes } from '../../lib/api';
import Navbar from '../../components/Navbar';

export default function DetalleViajePage() {
  const { user } = useUser();
  const router = useRouter();
  const params = useParams();
  const [viaje, setViaje] = useState<any>(null);

  useEffect(() => {
    if (!user) { router.push('/'); return; }
    const reservados = JSON.parse(localStorage.getItem('viajes_reservados') || '[]');
    const found = reservados.find((v: any) => String(v.id) === String(params.id));
    if (!found) { router.push('/inicio'); return; }

    // Verificar si el viaje sigue existiendo en el backend
    getViajes().then(r => {
      const existe = r.data.find((v: any) => String(v.id) === String(params.id));
      if (!existe) {
        const nuevos = reservados.filter((v: any) => String(v.id) !== String(params.id));
        localStorage.setItem('viajes_reservados', JSON.stringify(nuevos));
        router.push('/inicio');
        return;
      }
      setViaje(found);
    }).catch(() => setViaje(found));
  }, [user]);

  const handleEliminar = () => {
    const reservados = JSON.parse(localStorage.getItem('viajes_reservados') || '[]');
    const nuevos = reservados.filter((v: any) => String(v.id) !== String(params.id));
    localStorage.setItem('viajes_reservados', JSON.stringify(nuevos));
    router.push('/inicio');
  };

  if (!viaje) return null;

  const conductor = viaje.conductor;
  const vehiculo = viaje.vehiculo;

  return (
    <>
      <Navbar />
      <div className="page">
        <Link href="/inicio">
          <button style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#6B7280', fontSize: 14, fontWeight: 700,
            fontFamily: 'Nunito, sans-serif', marginBottom: 20,
            display: 'flex', alignItems: 'center', gap: 6,
          }}>← Volver al inicio</button>
        </Link>

        {/* Header viaje */}
        <div className="hero-banner" style={{ marginBottom: 20 }}>
          <div>
            <div className="hero-badge">🎫 Viaje reservado</div>
            <h1 className="hero-title" style={{ fontSize: 22 }}>
              {viaje.inicio} → {viaje.final}
            </h1>
            {viaje.fecha && (
              <p className="hero-sub">📅 {viaje.fecha} · ⏰ {viaje.hora}</p>
            )}
          </div>
        </div>

        {/* Datos del conductor */}
        {conductor && (
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-title">👤 Conductor</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%',
                background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontWeight: 800, fontSize: 20, flexShrink: 0,
              }}>
                {conductor.name?.[0]?.toUpperCase()}
              </div>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{conductor.name}</div>
                <div style={{ color: '#6B7280', fontSize: 13, marginTop: 4 }}>
                  📞 {conductor.telefono}
                </div>
                <div style={{ marginTop: 6 }}>
                  <span style={{
                    background: conductor.licencia ? '#ECFDF5' : '#FEF2F2',
                    color: conductor.licencia ? '#059669' : '#EF4444',
                    padding: '3px 10px', borderRadius: 8,
                    fontSize: 12, fontWeight: 700,
                  }}>
                    {conductor.licencia ? '✅ Licencia vigente' : '❌ Sin licencia'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Datos del vehículo */}
        {vehiculo && (
          <div className="card" style={{ marginBottom: 16 }}>
            <div className="section-title">🚗 Vehículo</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { label: 'Placa', value: vehiculo.placa },
                { label: 'Modelo', value: vehiculo.modelo },
                { label: 'Color', value: vehiculo.color },
                { label: 'SOAT', value: vehiculo.soat ? '✅ Vigente' : '❌ No' },
                { label: 'Tarjeta propiedad', value: vehiculo.tarjetaDePropiedad ? '✅ Sí' : '❌ No' },
              ].map(item => (
                <div key={item.label}>
                  <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, marginBottom: 2 }}>
                    {item.label}
                  </div>
                  <div style={{ fontSize: 15, fontWeight: 700 }}>{item.value || '—'}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Ruta */}
        <div className="card" style={{ marginBottom: 16 }}>
          <div className="section-title">📍 Ruta</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, marginBottom: 2 }}>ORIGEN</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{viaje.inicio}</div>
            </div>
            <div style={{ fontSize: 20 }}>→</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#6B7280', fontWeight: 700, marginBottom: 2 }}>DESTINO</div>
              <div style={{ fontSize: 15, fontWeight: 700 }}>{viaje.final}</div>
            </div>
          </div>
        </div>

        {/* Botón cancelar reserva */}
        <button
          onClick={handleEliminar}
          style={{
            width: '100%', padding: '13px', borderRadius: 10,
            border: '1.5px solid #EF4444', background: 'white',
            color: '#EF4444', fontSize: 15, fontWeight: 700,
            cursor: 'pointer', fontFamily: 'Nunito, sans-serif',
          }}>
          🗑️ Cancelar reserva
        </button>
      </div>
    </>
  );
}