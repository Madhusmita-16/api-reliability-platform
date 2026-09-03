import React from 'react';
import { AlertOctagon, TrendingUp, Cpu, Gauge } from 'lucide-react';

export default function AnomalyDetector({ anomalies }) {
  return (
    <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertOctagon color="#f59e0b" size={20} /> Intelligent Anomaly Detection Engine
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Sliding window Moving Average & Standard Deviation Z-Score Outlier Analysis
          </p>
        </div>
        <span className="badge-yellow">
          <Gauge size={14} /> Threshold: Z-Score &gt; 2.0σ
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
        
        {/* Anomaly Stream */}
        <div>
          <h3 style={{ fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px' }}>
            Live Anomaly Feed ({anomalies.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {anomalies.map((anom) => (
              <div 
                key={anom.id}
                style={{
                  background: 'rgba(245, 158, 11, 0.06)',
                  border: '1px solid rgba(245, 158, 11, 0.2)',
                  borderRadius: '12px',
                  padding: '14px 16px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: '#fbbf24' }}>
                    {anom.apiName}
                  </span>
                  <span className="badge-red" style={{ fontSize: '0.7rem' }}>
                    Z-Score: +{anom.zScore ? anom.zScore.toFixed(2) : '3.85'}σ
                  </span>
                </div>

                <p style={{ fontSize: '0.82rem', color: 'var(--text-main)', marginBottom: '8px', lineHeight: 1.4 }}>
                  {anom.description}
                </p>

                <div style={{ display: 'flex', gap: '16px', fontSize: '0.75rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                  <span>Observed: <strong style={{ color: '#f87171' }}>{anom.currentMetricValue} ms</strong></span>
                  <span>Baseline Avg: <strong style={{ color: '#34d399' }}>{anom.expectedBaseline} ms</strong></span>
                </div>
              </div>
            ))}

            {anomalies.length === 0 && (
              <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-dim)', fontSize: '0.85rem' }}>
                No active statistical anomalies detected across registered APIs.
              </div>
            )}
          </div>
        </div>

        {/* Visual Latency Spike Graph Simulation */}
        <div style={{ background: 'rgba(11, 15, 25, 0.6)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '18px' }}>
          <h3 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingUp size={16} color="#00f2fe" /> Latency Deviation Graph (Inventory Service)
          </h3>

          {/* SVG Waveform Graph */}
          <div style={{ width: '100%', height: '140px', position: 'relative', marginTop: '10px' }}>
            <svg width="100%" height="100%" viewBox="0 0 400 120" preserveAspectRatio="none">
              <defs>
                <linearGradient id="latencyGlow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4"/>
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0.0"/>
                </linearGradient>
              </defs>

              {/* Baseline band */}
              <line x1="0" y1="80" x2="400" y2="80" stroke="rgba(16, 185, 129, 0.3)" strokeWidth="1" strokeDasharray="4 4" />
              <text x="5" y="75" fill="#34d399" fontSize="9">Moving Avg Baseline (180ms)</text>

              {/* +2 StdDev threshold */}
              <line x1="0" y1="50" x2="400" y2="50" stroke="rgba(245, 158, 11, 0.4)" strokeWidth="1" strokeDasharray="2 2" />
              <text x="5" y="45" fill="#fbbf24" fontSize="9">+2σ Threshold (320ms)</text>

              {/* Latency line */}
              <path 
                d="M 0 85 Q 40 82, 80 84 T 160 81 T 220 78 T 260 45 T 320 20 T 380 15 L 400 12"
                fill="none"
                stroke="#ef4444"
                strokeWidth="3"
              />

              {/* Area fill */}
              <path 
                d="M 0 85 Q 40 82, 80 84 T 160 81 T 220 78 T 260 45 T 320 20 T 380 15 L 400 12 L 400 120 L 0 120 Z"
                fill="url(#latencyGlow)"
              />

              {/* Spike Point Dot */}
              <circle cx="380" cy="15" r="5" fill="#ef4444" stroke="#fff" strokeWidth="2" />
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            <span>T-15m</span>
            <span>T-10m</span>
            <span>T-5m</span>
            <span style={{ color: '#ef4444', fontWeight: 700 }}>Current: 780ms (ANOMALY)</span>
          </div>
        </div>

      </div>
    </div>
  );
}
