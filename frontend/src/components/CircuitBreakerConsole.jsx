import React, { useState } from 'react';
import { Shield, RefreshCw, Zap, AlertTriangle, CheckCircle } from 'lucide-react';
import { triggerAutoRecovery, updateCircuitState } from '../services/apiService';

export default function CircuitBreakerConsole({ apis, onRefresh }) {
  const [selectedApiId, setSelectedApiId] = useState(4); // Inventory Service default
  const [recoveryLog, setRecoveryLog] = useState(null);
  const [loading, setLoading] = useState(false);

  const selectedApi = apis.find(a => a.id === selectedApiId) || apis[0] || {};

  const handleStateChange = async (newState) => {
    setLoading(true);
    const updated = await updateCircuitState(selectedApiId, newState);
    setRecoveryLog({ message: `Circuit state for ${selectedApi.name || 'API'} manually updated to ${newState}` });
    setLoading(false);
    if (onRefresh) onRefresh();
  };

  const handleTriggerRecovery = async () => {
    setLoading(true);
    const result = await triggerAutoRecovery(selectedApiId);
    setRecoveryLog(result);
    setLoading(false);
    if (onRefresh) onRefresh();
  };

  return (
    <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield color="#a855f7" size={20} /> Resilience4j Circuit Breaker &amp; Self-Healing Engine
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Fault tolerance state machine (CLOSED / OPEN / HALF-OPEN) preventing cascading failures
          </p>
        </div>

        {/* API Selector */}
        <select
          value={selectedApiId}
          onChange={(e) => setSelectedApiId(Number(e.target.value))}
          style={{
            background: 'rgba(255, 255, 255, 0.08)',
            color: 'var(--text-main)',
            border: '1px solid var(--border-glass)',
            padding: '8px 14px',
            borderRadius: '10px',
            fontSize: '0.85rem'
          }}
        >
          {apis.map(a => (
            <option key={a.id} value={a.id} style={{ background: '#0b0f19' }}>
              {a.name} ({a.circuitState || 'CLOSED'})
            </option>
          ))}
        </select>
      </div>

      {/* State Machine Transition Diagram */}
      <div style={{
        background: 'rgba(11, 15, 25, 0.7)',
        border: '1px solid var(--border-glass)',
        borderRadius: '14px',
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        gap: '16px',
        marginBottom: '20px'
      }}>

        {/* State 1: CLOSED */}
        <div style={{
          background: selectedApi.circuitState === 'CLOSED' ? 'rgba(16, 185, 129, 0.2)' : 'rgba(255,255,255,0.03)',
          border: `2px solid ${selectedApi.circuitState === 'CLOSED' ? '#34d399' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '12px',
          padding: '14px 20px',
          textAlign: 'center',
          minWidth: '140px'
        }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#34d399' }}>CLOSED</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>Normal Traffic Flow</div>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>➔ Error Threshold Breached ➔</div>

        {/* State 2: OPEN */}
        <div style={{
          background: selectedApi.circuitState === 'OPEN' ? 'rgba(239, 68, 68, 0.2)' : 'rgba(255,255,255,0.03)',
          border: `2px solid ${selectedApi.circuitState === 'OPEN' ? '#f87171' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '12px',
          padding: '14px 20px',
          textAlign: 'center',
          minWidth: '140px'
        }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#f87171' }}>OPEN</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>Requests Short-Circuited</div>
        </div>

        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>➔ Cooldown Timer ➔</div>

        {/* State 3: HALF_OPEN */}
        <div style={{
          background: selectedApi.circuitState === 'HALF_OPEN' ? 'rgba(245, 158, 11, 0.2)' : 'rgba(255,255,255,0.03)',
          border: `2px solid ${selectedApi.circuitState === 'HALF_OPEN' ? '#fbbf24' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '12px',
          padding: '14px 20px',
          textAlign: 'center',
          minWidth: '140px'
        }}>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: '#fbbf24' }}>HALF OPEN</div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '4px' }}>Probe Test Active</div>
        </div>

      </div>

      {/* Self-Healing Trigger Button */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Active Circuit State for <strong>{selectedApi.name}</strong>: <span style={{ color: selectedApi.circuitState === 'OPEN' ? '#f87171' : selectedApi.circuitState === 'HALF_OPEN' ? '#fbbf24' : '#34d399', fontWeight: 700 }}>{selectedApi.circuitState || 'CLOSED'}</span>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <button 
            className="btn-secondary" 
            onClick={() => handleStateChange('CLOSED')} 
            disabled={loading}
            style={{ fontSize: '0.75rem', padding: '6px 12px', borderColor: 'rgba(52, 211, 153, 0.4)' }}
          >
            Set CLOSED 🟢
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => handleStateChange('OPEN')} 
            disabled={loading}
            style={{ fontSize: '0.75rem', padding: '6px 12px', borderColor: 'rgba(248, 113, 113, 0.4)' }}
          >
            Set OPEN 🔴
          </button>
          <button 
            className="btn-secondary" 
            onClick={() => handleStateChange('HALF_OPEN')} 
            disabled={loading}
            style={{ fontSize: '0.75rem', padding: '6px 12px', borderColor: 'rgba(251, 191, 36, 0.4)' }}
          >
            Set HALF_OPEN 🟡
          </button>

          <button className="btn-primary" onClick={handleTriggerRecovery} disabled={loading} style={{ fontSize: '0.8rem' }}>
            <Zap size={16} /> {loading ? 'Processing...' : 'Auto Self-Healing'}
          </button>
        </div>
      </div>

      {/* Recovery Log Output */}
      {recoveryLog && (
        <div style={{
          marginTop: '16px',
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: '10px',
          padding: '14px',
          fontSize: '0.85rem',
          fontFamily: 'var(--font-mono)'
        }}>
          <div style={{ color: '#34d399', fontWeight: 700, marginBottom: '4px' }}>
            [RECOVERY ACTION EXECUTED]
          </div>
          <div>{recoveryLog.message}</div>
        </div>
      )}
    </div>
  );
}
