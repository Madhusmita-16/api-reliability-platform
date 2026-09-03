import React from 'react';
import { Activity, ShieldCheck, RefreshCw, PlusCircle, AlertTriangle } from 'lucide-react';

export default function Navbar({ onRefresh, onOpenRegister, onOpenIncidents, activeIncidentCount }) {
  return (
    <header className="glass-card" style={{ borderRadius: '0 0 16px 16px', padding: '16px 32px', marginBottom: '24px', borderTop: 'none' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
        
        {/* Left Branding */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'linear-gradient(135deg, rgba(0, 242, 254, 0.2) 0%, rgba(59, 130, 246, 0.2) 100%)',
            border: '1px solid rgba(0, 242, 254, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(0, 242, 254, 0.2)'
          }}>
            <Activity color="#00f2fe" size={24} />
          </div>
          <div>
            <h1 className="gradient-text" style={{ fontSize: '1.4rem', fontWeight: 700 }}>
              AETHER<span style={{ color: '#00f2fe' }}>RELIABILITY</span>
            </h1>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="pulse-dot green"></span> Intelligent API Reliability & Fault-Tolerant Engine (Java 17)
            </p>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <button 
            className="btn-secondary"
            onClick={onOpenIncidents}
            style={{ position: 'relative' }}
          >
            <AlertTriangle size={16} color={activeIncidentCount > 0 ? '#ef4444' : '#9ca3af'} />
            Incidents
            {activeIncidentCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-6px',
                right: '-6px',
                background: '#ef4444',
                color: '#fff',
                borderRadius: '50%',
                width: '18px',
                height: '18px',
                fontSize: '0.7rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {activeIncidentCount}
              </span>
            )}
          </button>

          <button className="btn-secondary" onClick={onRefresh}>
            <RefreshCw size={16} /> Check Now
          </button>

          <button className="btn-primary" onClick={onOpenRegister}>
            <PlusCircle size={18} /> Register API
          </button>
        </div>

      </div>
    </header>
  );
}
