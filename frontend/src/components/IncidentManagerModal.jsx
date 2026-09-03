import React from 'react';
import { X, ShieldAlert, CheckCircle, AlertTriangle } from 'lucide-react';

export default function IncidentManagerModal({ isOpen, onClose, incidents }) {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(7, 9, 14, 0.8)',
      backdropFilter: 'blur(12px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '750px', maxHeight: '85vh', overflowY: 'auto', padding: '28px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert color="#ef4444" size={22} /> Incident Management &amp; Triage Console
          </h2>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '6px 10px' }}>
            <X size={18} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {incidents.map((inc) => (
            <div 
              key={inc.id}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-glass)',
                borderRadius: '14px',
                padding: '18px'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px', flexWrap: 'wrap', gap: '8px' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: '#f87171' }}>
                  INCIDENT #{inc.id} — {inc.title}
                </span>
                <span className={inc.severity === 'CRITICAL' ? 'badge-red' : 'badge-yellow'}>
                  {inc.severity} SEVERITY
                </span>
              </div>

              <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '10px' }}>
                {inc.summary}
              </p>

              <div style={{
                background: 'rgba(0, 0, 0, 0.3)',
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                marginBottom: '12px'
              }}>
                <strong>Probable Root Cause:</strong> <span style={{ color: '#fbbf24' }}>{inc.probableRootCause}</span>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-dim)' }}>
                <span>Status: <strong style={{ color: '#38bdf8' }}>{inc.status}</strong></span>
                <span>Detected: {new Date(inc.createdAt).toLocaleTimeString()}</span>
              </div>
            </div>
          ))}

          {incidents.length === 0 && (
            <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-muted)' }}>
              No active incidents present. All systems operating nominally!
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
