import React, { useState, useEffect } from 'react';
import { Globe, Radio, CheckCircle, XCircle, Clock } from 'lucide-react';
import { fetchSyntheticCheck } from '../services/apiService';

export default function SyntheticMapGrid({ selectedApiId }) {
  const [syntheticData, setSyntheticData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadSynthetic = async () => {
    setLoading(true);
    const data = await fetchSyntheticCheck(selectedApiId || 1);
    setSyntheticData(data);
    setLoading(false);
  };

  useEffect(() => {
    loadSynthetic();
  }, [selectedApiId]);

  if (!syntheticData) return null;

  const regions = Object.keys(syntheticData.regionalStatus || {});

  return (
    <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe color="#00f2fe" size={20} /> Multi-Region Synthetic Ping Probe
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Simulated global edge node synthetic checks across 4 datacenters
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-secondary" onClick={loadSynthetic} disabled={loading} style={{ fontSize: '0.78rem' }}>
            <Radio size={14} color="#00f2fe" /> {loading ? 'Probing...' : 'Re-run Synthetic Edge Probes'}
          </button>
          <span className="badge-cyan">
            Edge Simulation Active
          </span>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        {regions.map((regionKey) => {
          const status = syntheticData.regionalStatus[regionKey];
          const latency = syntheticData.regionalLatencyMs[regionKey];

          const isHealthy = status === 'HEALTHY';
          const isFail = status.includes('FAIL') || status.includes('UNREACHABLE');

          return (
            <div 
              key={regionKey}
              style={{
                background: isHealthy ? 'rgba(16, 185, 129, 0.06)' : isFail ? 'rgba(239, 68, 68, 0.08)' : 'rgba(245, 158, 11, 0.08)',
                border: `1px solid ${isHealthy ? 'rgba(16, 185, 129, 0.25)' : isFail ? 'rgba(239, 68, 68, 0.3)' : 'rgba(245, 158, 11, 0.3)'}`,
                borderRadius: '12px',
                padding: '16px'
              }}
            >
              <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '6px' }}>
                {regionKey}
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
                {isHealthy ? (
                  <span className="badge-green">ONLINE</span>
                ) : isFail ? (
                  <span className="badge-red">UNREACHABLE</span>
                ) : (
                  <span className="badge-yellow">DEGRADED</span>
                )}
              </div>

              <div style={{ fontSize: '0.8rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                {latency > 0 ? `${latency} ms` : 'TIMEOUT'}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
