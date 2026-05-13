'use client';
import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#F5F3FF', fontFamily: 'Nunito, sans-serif' }}>

      {/* Navbar */}
      <nav style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 48px', height: 64, background: 'white',
        borderBottom: '1px solid #E5E7EB',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 36, height: 36, background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
            borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}>🚗</div>
          <span style={{ fontSize: 20, fontWeight: 800 }}>
            <span style={{ color: '#111' }}>Uni</span>
            <span style={{ color: '#7C3AED' }}>Ride</span>
          </span>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <Link href="/login">
            <button style={{
              padding: '9px 20px', borderRadius: 10, border: '1.5px solid #E5E7EB',
              background: 'white', fontFamily: 'Nunito, sans-serif', fontSize: 14,
              fontWeight: 700, cursor: 'pointer', color: '#111',
            }}>Iniciar sesión</button>
          </Link>
          <Link href="/registro">
            <button style={{
              padding: '9px 20px', borderRadius: 10, border: 'none',
              background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
              fontFamily: 'Nunito, sans-serif', fontSize: 14,
              fontWeight: 700, cursor: 'pointer', color: 'white',
            }}>Registrarme</button>
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        maxWidth: 1100, margin: '0 auto', padding: '80px 48px 60px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 48,
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: 'white', border: '1px solid #E5E7EB',
            borderRadius: 99, padding: '6px 16px', fontSize: 13,
            fontWeight: 700, color: '#7C3AED', marginBottom: 24,
          }}>
            ✦ Solo para universitarios
          </div>
          <h1 style={{
            fontSize: 52, fontWeight: 800, lineHeight: 1.1,
            marginBottom: 20, color: '#111',
          }}>
            Comparte viajes con tu{' '}
            <span style={{ color: '#7C3AED' }}>comunidad universitaria</span>
          </h1>
          <p style={{ fontSize: 17, color: '#6B7280', lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>
            UniRide conecta estudiantes verificados con correo institucional para que moverse al campus sea más barato, seguro y sostenible.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link href="/registro">
              <button style={{
                padding: '14px 32px', borderRadius: 12, border: 'none',
                background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
                fontFamily: 'Nunito, sans-serif', fontSize: 16,
                fontWeight: 700, cursor: 'pointer', color: 'white',
              }}>Comenzar gratis →</button>
            </Link>
            <Link href="/login">
              <button style={{
                padding: '14px 32px', borderRadius: 12,
                border: '1.5px solid #E5E7EB', background: 'white',
                fontFamily: 'Nunito, sans-serif', fontSize: 16,
                fontWeight: 700, cursor: 'pointer', color: '#111',
              }}>Iniciar sesión</button>
            </Link>
          </div>
          <div style={{ display: 'flex', gap: 24, marginTop: 32 }}>
            {['Solo correos .edu', '100% estudiantes'].map(t => (
              <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#6B7280', fontWeight: 600 }}>
                <span style={{ color: '#7C3AED' }}>✓</span> {t}
              </div>
            ))}
          </div>
        </div>

        {/* Imagen hero */}
        <div style={{
          flex: 1, borderRadius: 20, overflow: 'hidden',
          boxShadow: '0 20px 60px rgba(124,58,237,0.2)', maxWidth: 480,
        }}>
          <Image
            src="/hero-uniride.jpg"
            alt="UniRide hero"
            width={480}
            height={360}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>
      </section>

      {/* Features */}
      <section style={{
        maxWidth: 1100, margin: '0 auto', padding: '0 48px 80px',
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
      }}>
        {[
          { icon: '🚗', title: 'Conductor o pasajero', desc: 'Tú decides cada día. Activa el modo conductor cuando quieras compartir tu vehículo.' },
          { icon: '📍', title: 'Rutas al campus', desc: 'Encuentra viajes hacia tu universidad con estudiantes de tu propia institución.' },
          { icon: '🕓', title: 'Historial completo', desc: 'Consulta todos tus viajes pasados, conductores y vehículos en un solo lugar.' },
        ].map(f => (
          <div key={f.title} style={{
            background: 'white', border: '1px solid #E5E7EB',
            borderRadius: 16, padding: '28px 24px',
          }}>
            <div style={{
              width: 52, height: 52, background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
              borderRadius: 14, display: 'flex', alignItems: 'center',
              justifyContent: 'center', fontSize: 24, marginBottom: 16,
            }}>{f.icon}</div>
            <h3 style={{ fontSize: 17, fontWeight: 800, marginBottom: 8 }}>{f.title}</h3>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6 }}>{f.desc}</p>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        borderTop: '1px solid #E5E7EB', padding: '24px 48px',
        textAlign: 'center', color: '#9CA3AF', fontSize: 13, fontWeight: 600,
      }}>
        © 2026 UniRide · Hecho para estudiantes
      </footer>
    </div>
  );
}