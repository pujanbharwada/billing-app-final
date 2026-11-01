import { useState } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import { useToast } from '../components/Toast';

import { Button, TextField } from '../components/UI';

import { APP_NAME, TRIAL_DAYS } from '../config/constants';

import { STORE_TYPE_LIST, type StoreType } from '../config/storeTypes';

import { rememberPendingStoreType } from '../context/SettingsContext';

import { AuthShell } from './AuthShell';

export function SignupPage() {

  const { signUp, signInWithGoogle } = useAuth();

  const { toast } = useToast();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [confirm, setConfirm] = useState('');

  const [storeType, setStoreType] = useState<StoreType>('grocery');

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !password) {
      setError('Please enter an email and password.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    if (password !== confirm) {
      setError('Passwords do not match.');
      return;
    }
    setLoading(true);
    setError(null);

    const res = await signUp(email, password);
    setLoading(false);
    if (res.error) {
      setError(res.error);
      return;
    }
    rememberPendingStoreType(storeType);
    toast('Account created 🎉 You can now log in.', 'success');
    navigate('/login');
  }

  async function handleGoogleSignup() {
    setGoogleLoading(true);
    setError(null);
    rememberPendingStoreType(storeType);
    const res = await signInWithGoogle();
    if (res.error) {
      setError(res.error);
      setGoogleLoading(false);
    }
  }

  return (
    <AuthShell
      title={`Create your ${APP_NAME}`}
      subtitle={`${TRIAL_DAYS} days free — no card needed`}
    >
      <button
        type="button"
        onClick={handleGoogleSignup}
        disabled={googleLoading || loading}
        className="btn btn-block"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 10,
          background: 'var(--surface)',
          color: 'var(--text)',
          border: '1px solid var(--border)',
          fontWeight: 600,
          padding: '11px 16px',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-sm)',
          cursor: 'pointer',
        }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24">
          <path
            fill="#4285F4"
            d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
          />
          <path
            fill="#34A853"
            d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
          />
          <path
            fill="#FBBC05"
            d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 10.03 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
          />
          <path
            fill="#EA4335"
            d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
          />
        </svg>
        {googleLoading ? 'Connecting to Google...' : 'Sign up with Google'}
      </button>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          margin: '18px 0',
          color: 'var(--text-muted)',
          fontSize: 12,
          fontWeight: 600,
          letterSpacing: '0.05em',
        }}
      >
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
        <span>OR</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border)' }} />
      </div>

      <form onSubmit={handleSignup}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="you@example.com"
          autoComplete="email"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="At least 6 characters"
          autoComplete="new-password"
        />
        <TextField
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={e => setConfirm(e.target.value)}
          placeholder="Re-type your password"
          autoComplete="new-password"
        />
        <div className="field">
          <label className="field-label">What kind of store do you run?</label>
          <select
            className="input"
            value={storeType}
            onChange={e => setStoreType(e.target.value as StoreType)}
          >
            {STORE_TYPE_LIST.map(s => (
              <option key={s.key} value={s.key}>
                {s.emoji}  {s.label}
              </option>
            ))}
          </select>
        </div>
        {error ? (
          <div className="field-error" style={{ textAlign: 'center', marginBottom: 10 }}>
            {error}
          </div>
        ) : null}
        <Button title="Create Account" type="submit" loading={loading} block />
      </form>
      <p className="muted" style={{ textAlign: 'center', marginTop: 18 }}>
        Already have an account?{' '}
        <Link to="/login" style={{ color: 'var(--primary)', fontWeight: 600 }}>
          Log in
        </Link>
      </p>
    </AuthShell>
  );
}
