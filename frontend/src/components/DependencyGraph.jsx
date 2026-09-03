import React, { useState } from 'react';
import { GitMerge, Database, Server, AlertCircle, ArrowRight } from 'lucide-react';
import { fetchRootCause } from '../services/apiService';

export default function DependencyGraph() {
  const [rootCauseResult, setRootCauseResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleRunAnalysis = async () => {
    setLoading(true);
    const data = await fetchRootCause(3); // Order Service (id: 3)
    setRootCauseResult(data);
    setLoading(false);
  };

  return (
    <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <GitMerge color="#38bdf8" size={20} /> Dependency Intelligence & Root Cause Engine
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Topological microservice dependency tree with cascading failure propagation analysis
          </p>
        </div>

        <button className="btn-primary" onClick={handleRunAnalysis} disabled={loading}>
          <AlertCircle size={16} /> {loading ? 'Analyzing Graph...' : 'Trace Probable Root Cause'}
        </button>
      </div>

      {/* SVG Interactive Topology Canvas */}
      <div style={{
        background: 'rgba(11, 15, 25, 0.7)',
        border: '1px solid var(--border-glass)',
        borderRadius: '16px',
        padding: '30px',
        position: 'relative',
        minHeight: '260px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', maxWidth: '850px', position: 'relative', flexWrap: 'wrap', gap: '24px' }}>
          
          {/* Node 1: Order Service */}
          <div style={{
            background: 'rgba(59, 130, 246, 0.12)',
            border: '2px solid #38bdf8',
            borderRadius: '14px',
            padding: '16px 20px',
            textAlign: 'center',
            minWidth: '160px',
            boxShadow: '0 0 20px rgba(56, 189, 248, 0.2)'
          }}>
            <Server color="#38bdf8" size={24} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Order Service</div>
            <span className="badge-green" style={{ marginTop: '6px', fontSize: '0.7rem' }}>SLA Degraded 🟡</span>
          </div>

          <ArrowRight color="var(--text-dim)" size={28} />

          {/* Node 2: Inventory Service (DEGRADED ROOT) */}
          <div style={{
            background: 'rgba(239, 68, 68, 0.15)',
            border: '2px solid #ef4444',
            borderRadius: '14px',
            padding: '16px 20px',
            textAlign: 'center',
            minWidth: '170px',
            boxShadow: '0 0 25px rgba(239, 68, 68, 0.35)',
            animation: 'pulse 2s infinite'
          }}>
            <Server color="#ef4444" size={24} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#f87171' }}>Inventory Service</div>
            <span className="badge-red" style={{ marginTop: '6px', fontSize: '0.7rem' }}>ROOT FAULT 🔴</span>
          </div>

          <ArrowRight color="var(--text-dim)" size={28} />

          {/* Node 3: PostgreSQL Database */}
          <div style={{
            background: 'rgba(245, 158, 11, 0.12)',
            border: '2px solid #f59e0b',
            borderRadius: '14px',
            padding: '16px 20px',
            textAlign: 'center',
            minWidth: '160px',
            boxShadow: '0 0 20px rgba(245, 158, 11, 0.2)'
          }}>
            <Database color="#fbbf24" size={24} style={{ margin: '0 auto 8px' }} />
            <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>PostgreSQL Cluster</div>
            <span className="badge-yellow" style={{ marginTop: '6px', fontSize: '0.7rem' }}>Pool Exhausted ⚠️</span>
          </div>

        </div>

      </div>

      {/* Root Cause Tracing Result Banner */}
      {rootCauseResult && (
        <div style={{
          marginTop: '20px',
          background: 'rgba(239, 68, 68, 0.08)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          padding: '16px 20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
            <AlertCircle color="#f87171" size={20} />
            <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#f87171' }}>
              Root Cause Verdict ({Math.round(rootCauseResult.confidenceScore * 100)}% Confidence)
            </h3>
          </div>

          <p style={{ fontSize: '0.88rem', color: 'var(--text-main)', marginBottom: '8px' }}>
            Downstream failure detected at <strong>{rootCauseResult.rootCauseApiName}</strong>: <span style={{ color: '#fbbf24' }}>{rootCauseResult.rootCauseComponent}</span>.
          </p>

          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
            Dependency Propagation Path: {rootCauseResult.dependencyChain.join(' ➔ ')}
          </div>
        </div>
      )}
    </div>
  );
}
