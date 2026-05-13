'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '@/app/components/Navbar';
import { useUser } from '@/app/context/UserContext';
import { updateUser } from '@/app/lib/api';


export default function PerfilPage() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    telefono: '',
    age: '',
  });

  useEffect(() => {
    if (!user) { router.push('/'); return; }
    setForm({
      name: user.name,
      telefono: user.telefono,
      age: String(user.age),
    });
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await updateUser(user!.id, {
        name: form.name,
        telefono: form.telefono,
        age: Number(form.age),
      });
      setUser({ ...user!, name: form.name, telefono: form.telefono, age: Number(form.age) });
      showToast('¡Cambios guardados!');
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Error al guardar los cambios.');
    } finally {
      setLoading(false);
    }
  };

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 3000);
  };

  if (!user) return null;

  const initials = user.name.split(' ').map((n: string) => n[0]).slice(0, 2).join('').toUpperCase();

  return (
    <>
      <Navbar />
      <div className="page">

        {/* Header perfil */}
        <div className="card" style={{ marginBottom: 20 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div className="avatar" style={{ width: 64, height: 64, fontSize: 22 }}>
              {initials}
            </div>
            <div>
              <h2 style={{ fontSize: 20, fontWeight: 800 }}>{user.name}</h2>
              <p style={{ color: '#6B7280', fontSize: 14 }}>{user.email}</p>
              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <span style={{
                  background: '#FEF3C7', color: '#D97706',
                  padding: '3px 10px', borderRadius: 8,
                  fontSize: 12, fontWeight: 700,
                }}>⭐ 5.0</span>
                {user.esConductor && (
                  <span style={{
                    background: '#F5F3FF', color: '#7C3AED',
                    padding: '3px 10px', borderRadius: 8,
                    fontSize: 12, fontWeight: 700,
                  }}>🚗 Conductor</span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Formulario */}
        <div className="card">
          <div className="section-title">
            🎓 Información personal
          </div>
          <form onSubmit={handleSubmit}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label>Nombre completo</label>
              <input type="text"
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                required />
            </div>
            <div className="form-grid" style={{ marginBottom: 16 }}>
              <div className="form-group">
                <label>Teléfono</label>
                <input type="tel"
                  value={form.telefono}
                  onChange={e => setForm({ ...form, telefono: e.target.value })} />
              </div>
              <div className="form-group">
                <label>Edad</label>
                <input type="number"
                  value={form.age}
                  onChange={e => setForm({ ...form, age: e.target.value })}
                  min={16} max={80} />
              </div>
            </div>

            {error && (
              <p style={{ color: '#EF4444', fontSize: 13, fontWeight: 600, marginBottom: 14 }}>
                {error}
              </p>
            )}

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </form>
        </div>

        {toast && <div className="toast">{toast}</div>}
      </div>
    </>
  );
}