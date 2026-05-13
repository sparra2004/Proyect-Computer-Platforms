'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { getUsers, getConductores } from '../lib/api';
import { useUser } from '../context/UserContext';

export default function LoginPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await getUsers();
      const found = res.data.find((u: any) => u.email === form.email);
      if (!found) {
        setError('No existe un usuario con ese correo.');
        setLoading(false);
        return;
      }
      if (found.password !== form.password) {
        setError('Contraseña incorrecta.');
        setLoading(false);
        return;
      }

      // Verificar si es conductor
      const resConductores = await getConductores();
      const esConductor = resConductores.data.some((c: any) => c.id === found.id);

      setUser({ ...found, esConductor });
      router.push('/inicio');
    } catch {
      setError('Error al conectar con el servidor.');
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#F5F3FF',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
      fontFamily: 'Nunito, sans-serif',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <Link href="/">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, cursor: 'pointer' }}>
              <div style={{
                width: 48, height: 48,
                background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
                borderRadius: 14, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: 22,
              }}>🚗</div>
              <span style={{ fontSize: 24, fontWeight: 800 }}>
                <span style={{ color: '#111' }}>Uni</span>
                <span style={{ color: '#7C3AED' }}>Ride</span>
              </span>
            </div>
          </Link>
        </div>

        {/* Card */}
        <div style={{
          background: 'white', borderRadius: 20,
          padding: '36px', boxShadow: '0 4px 24px rgba(124,58,237,0.08)',
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex', background: '#F3F4F6',
            borderRadius: 12, padding: 4, marginBottom: 28,
          }}>
            <Link href="/login" style={{ flex: 1, textDecoration: 'none' }}>
              <button style={{
                width: '100%', padding: '10px', borderRadius: 10, border: 'none',
                fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', background: 'white', color: '#111',
              }}>Iniciar sesión</button>
            </Link>
            <Link href="/registro" style={{ flex: 1, textDecoration: 'none' }}>
              <button style={{
                width: '100%', padding: '10px', borderRadius: 10, border: 'none',
                fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', background: 'transparent', color: '#6B7280',
              }}>Crear cuenta</button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Correo institucional</label>
              <input type="email" placeholder="tu@universidad.edu"
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                required />
            </div>
            <div className="form-group" style={{ marginBottom: 20 }}>
              <label>Contraseña</label>
              <input type="password" placeholder="••••••••"
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                required />
            </div>

            {error && (
              <p style={{ color: '#EF4444', fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <div style={{
              marginTop: 16, padding: '12px 16px',
              background: '#F5F3FF', borderRadius: 10,
              fontSize: 13, color: '#6B7280', display: 'flex', gap: 8,
            }}>
              <span>🛡️</span>
              <span>Solo aceptamos correos institucionales terminados en <b>.edu</b> (incluye .edu.mx, .edu.co, etc.).</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}