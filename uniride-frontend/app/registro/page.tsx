'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createUser, createConductor } from '../lib/api';
import { useUser } from '../context/UserContext';

export default function RegistroPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [esConductor, setEsConductor] = useState(false);

  const [form, setForm] = useState({
    id: '', name: '', email: '', age: '', telefono: '', password: '', licencia: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userPayload = {
        id: Number(form.id),
        name: form.name,
        email: form.email,
        age: Number(form.age),
        telefono: form.telefono,
        password: form.password,
      };
      await createUser(userPayload);
      if (esConductor) {
        await createConductor({
          id: Number(form.id),
          name: form.name,
          telefono: form.telefono,
          licencia: form.licencia,
        });
      }
      setUser({ ...userPayload, esConductor });
      router.push('/inicio');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al registrarse.');
    } finally {
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
                cursor: 'pointer', background: 'transparent', color: '#6B7280',
              }}>Iniciar sesión</button>
            </Link>
            <Link href="/registro" style={{ flex: 1, textDecoration: 'none' }}>
              <button style={{
                width: '100%', padding: '10px', borderRadius: 10, border: 'none',
                fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 700,
                cursor: 'pointer', background: 'white', color: '#111',
              }}>Crear cuenta</button>
            </Link>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label>ID / Cédula</label>
                <input type="number" placeholder="1234567890"
                  value={form.id}
                  onChange={e => setForm({ ...form, id: e.target.value })}
                  required />
              </div>
              <div className="form-group">
                <label>Edad</label>
                <input type="number" placeholder="21"
                  value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })}
                  required min={16} max={80} />
              </div>
              <div className="form-group full">
                <label>Nombre completo</label>
                <input type="text" placeholder="Santiago Parra Ortiz"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  required />
              </div>
              <div className="form-group full">
                <label>Correo institucional</label>
                <input type="email" placeholder="tu@universidad.edu.co"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  required />
              </div>
              <div className="form-group full">
                <label>Teléfono</label>
                <input type="tel" placeholder="+57 300 000 0000"
                  value={form.telefono}
                  onChange={e => setForm({ ...form, telefono: e.target.value })}
                  required />
              </div>
              <div className="form-group full">
                <label>Contraseña</label>
                <input type="password" placeholder="Mínimo 6 caracteres"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  required minLength={6} />
              </div>
            </div>

            <label className="checkbox-row" style={{ marginTop: 16 }}>
              <input type="checkbox" checked={esConductor}
                onChange={e => setEsConductor(e.target.checked)} />
              🚗 También quiero registrarme como conductor
            </label>

            {esConductor && (
              <label className="checkbox-row" style={{ marginTop: 10, background: '#ECFDF5', color: '#059669' }}>
                <input type="checkbox" checked={form.licencia}
                  onChange={e => setForm({ ...form, licencia: e.target.checked })} />
                ✅ Tengo licencia de conducción vigente
              </label>
            )}

            {error && (
              <p style={{ color: '#EF4444', fontSize: 13, fontWeight: 600, marginTop: 14 }}>
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary" style={{ marginTop: 20 }} disabled={loading}>
              {loading ? 'Registrando...' : 'Crear cuenta →'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}