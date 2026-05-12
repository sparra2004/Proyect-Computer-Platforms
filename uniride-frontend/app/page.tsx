'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getUsers, createUser, createConductor } from './lib/api';
import { useUser } from './context/UserContext';

export default function AuthPage() {
  const router = useRouter();
  const { setUser } = useUser();
  const [tab, setTab] = useState<'login' | 'registro'>('login');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [esConductor, setEsConductor] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [regForm, setRegForm] = useState({
    id: '', name: '', email: '', age: '', telefono: '', licencia: false,
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const res = await getUsers();
      const found = res.data.find((u: any) => u.email === loginForm.email);
      if (!found) { setError('No existe un usuario con ese correo.'); return; }
      setUser({ ...found, esConductor: false });
      router.push('/inicio');
    } catch {
      setError('Error al conectar con el servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleRegistro = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const userPayload = {
        id: Number(regForm.id),
        name: regForm.name,
        email: regForm.email,
        age: Number(regForm.age),
        telefono: regForm.telefono,
      };
      await createUser(userPayload);
      if (esConductor) {
        await createConductor({
          id: Number(regForm.id),
          name: regForm.name,
          telefono: regForm.telefono,
          licencia: regForm.licencia,
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
      background: 'linear-gradient(135deg, #EDE9FE 0%, #F5F3FF 50%, #FAF5FF 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      <div style={{ width: '100%', maxWidth: 480 }}>

        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{
            width: 64, height: 64,
            background: 'linear-gradient(135deg, #6D28D9, #A855F7)',
            borderRadius: 18, display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontSize: 28, margin: '0 auto 12px',
          }}>🚗</div>
          <h1 style={{ fontSize: 26, fontWeight: 800 }}>
            <span style={{ color: '#111' }}>Uni</span>
            <span style={{ color: '#7C3AED' }}>Ride</span>
          </h1>
        </div>

        {/* Card */}
        <div style={{
          background: 'white', borderRadius: 20,
          padding: '32px', boxShadow: '0 4px 24px rgba(124,58,237,0.08)',
        }}>
          {/* Tabs */}
          <div style={{
            display: 'flex', background: '#F3F4F6',
            borderRadius: 12, padding: 4, marginBottom: 28,
          }}>
            {(['login', 'registro'] as const).map((t) => (
              <button key={t} onClick={() => { setTab(t); setError(''); }}
                style={{
                  flex: 1, padding: '10px', borderRadius: 10, border: 'none',
                  fontFamily: 'Nunito, sans-serif', fontSize: 14, fontWeight: 700,
                  cursor: 'pointer', transition: 'all 0.15s',
                  background: tab === t ? 'white' : 'transparent',
                  color: tab === t ? '#111' : '#6B7280',
                }}>
                {t === 'login' ? 'Iniciar sesión' : 'Crear cuenta'}
              </button>
            ))}
          </div>

          {/* Login form */}
          {tab === 'login' && (
            <form onSubmit={handleLogin}>
              <div className="form-group" style={{ marginBottom: 16 }}>
                <label>Correo institucional</label>
                <input type="email" placeholder="tu@universidad.edu"
                  value={loginForm.email}
                  onChange={e => setLoginForm({ ...loginForm, email: e.target.value })}
                  required />
              </div>
              <div className="form-group" style={{ marginBottom: 20 }}>
                <label>Contraseña</label>
                <input type="password" placeholder="••••••••"
                  value={loginForm.password}
                  onChange={e => setLoginForm({ ...loginForm, password: e.target.value })}
                  required />
              </div>
              {error && <p style={{ color: '#EF4444', fontSize: 13, fontWeight: 600, marginBottom: 14 }}>{error}</p>}
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
          )}

          {/* Registro form */}
          {tab === 'registro' && (
            <form onSubmit={handleRegistro}>
              <div className="form-grid">
                <div className="form-group">
                  <label>ID / Cédula</label>
                  <input type="number" placeholder="1234567890"
                    value={regForm.id}
                    onChange={e => setRegForm({ ...regForm, id: e.target.value })}
                    required />
                </div>
                <div className="form-group">
                  <label>Edad</label>
                  <input type="number" placeholder="21"
                    value={regForm.age}
                    onChange={e => setRegForm({ ...regForm, age: e.target.value })}
                    required min={16} max={80} />
                </div>
                <div className="form-group full">
                  <label>Nombre completo</label>
                  <input type="text" placeholder="Santiago Parra Ortiz"
                    value={regForm.name}
                    onChange={e => setRegForm({ ...regForm, name: e.target.value })}
                    required />
                </div>
                <div className="form-group full">
                  <label>Correo institucional</label>
                  <input type="email" placeholder="tu@universidad.edu.co"
                    value={regForm.email}
                    onChange={e => setRegForm({ ...regForm, email: e.target.value })}
                    required />
                </div>
                <div className="form-group full">
                  <label>Teléfono</label>
                  <input type="tel" placeholder="+57 300 000 0000"
                    value={regForm.telefono}
                    onChange={e => setRegForm({ ...regForm, telefono: e.target.value })}
                    required />
                </div>
              </div>

              <label className="checkbox-row" style={{ marginTop: 16 }}>
                <input type="checkbox" checked={esConductor}
                  onChange={e => setEsConductor(e.target.checked)} />
                🚗 También quiero registrarme como conductor
              </label>

              {esConductor && (
                <label className="checkbox-row" style={{ marginTop: 10, background: '#ECFDF5', color: '#059669' }}>
                  <input type="checkbox" checked={regForm.licencia}
                    onChange={e => setRegForm({ ...regForm, licencia: e.target.checked })} />
                  ✅ Tengo licencia de conducción vigente
                </label>
              )}

              {error && <p style={{ color: '#EF4444', fontSize: 13, fontWeight: 600, marginTop: 14 }}>{error}</p>}

              <button type="submit" className="btn-primary" style={{ marginTop: 20 }} disabled={loading}>
                {loading ? 'Registrando...' : 'Crear cuenta →'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}