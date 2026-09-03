import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, Zap, Server, ChevronRight } from 'lucide-react';

export default function HealthScoreTable({ healthScores, apis, onSelectApi, selectedApiId }) {
  
  const getBadgeClass = (score) => {
    if (score >= 90) return 'badge-green';
    if (score >= 70) return 'badge-yellow';
    return 'badge-red';
  };

  const getBadgeIcon = (score) => {
    if (score >= 90) return '🟢';
    if (score >= 70) return '🟡';
    return '🔴';
  };

  return (
    <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity color="#00f2fe" size={20} /> Registered API Health Scores
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Multi-tier weighted algorithm evaluating Availability (40%), Latency (25%), Errors (20%), Dependencies (10%), Traffic (5%)
          </p>
        </div>
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.88rem' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid var(--border-glass)', color: 'var(--text-muted)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              <th style={{ padding: '12px 16px' }}>Service Name</th>
              <th style={{ padding: '12px 16px' }}>Environment</th>
              <th style={{ padding: '12px 16px' }}>Circuit State</th>
              <th style={{ padding: '12px 16px' }}>Reliability Score</th>
              <th style={{ padding: '12px 16px' }}>Avail. (40%)</th>
              <th style={{ padding: '12px 16px' }}>Latency (25%)</th>
              <th style={{ padding: '12px 16px' }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {healthScores.map((item) => {
              const apiObj = apis.find(a => a.id === item.apiId) || {};
              const isSelected = selectedApiId === item.apiId;

              return (
                <tr 
                  key={item.apiId}
                  onClick={() => onSelectApi(item.apiId)}
                  style={{
                    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
                    cursor: 'pointer',
                    background: isSelected ? 'rgba(0, 242, 254, 0.06)' : 'transparent',
                    transition: 'background 0.15s ease'
                  }}
                  onMouseEnter={(e) => { if (!isSelected) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)'; }}
                  onMouseLeave={(e) => { if (!isSelected) e.currentTarget.style.background = 'transparent'; }}
                >
                  {/* Service Name */}
                  <td style={{ padding: '14px 16px', fontWeight: 600 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-glass)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}>
                        <Server size={16} color="#38bdf8" />
                      </div>
                      <div>
                        <div>{item.apiName}</div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-dim)', fontFamily: 'var(--font-mono)' }}>
                          {apiObj.baseUrl || 'https://api.internal'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Environment */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    <span className="badge-cyan">{apiObj.environment || 'Production'}</span>
                  </td>

                  {/* Circuit State */}
                  <td style={{ padding: '14px 16px' }}>
                    {apiObj.circuitState === 'OPEN' ? (
                      <span className="badge-red">OPEN 🔴</span>
                    ) : apiObj.circuitState === 'HALF_OPEN' ? (
                      <span className="badge-yellow">HALF_OPEN 🟡</span>
                    ) : (
                      <span className="badge-green">CLOSED 🟢</span>
                    )}
                  </td>

                  {/* Reliability Score */}
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={getBadgeClass(item.overallScore)} style={{ fontSize: '0.85rem' }}>
                        {getBadgeIcon(item.overallScore)} {item.overallScore}%
                      </span>
                      {/* Score Bar */}
                      <div style={{ width: '80px', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                        <div style={{
                          width: `${item.overallScore}%`,
                          height: '100%',
                          background: item.overallScore >= 90 ? '#34d399' : item.overallScore >= 70 ? '#fbbf24' : '#f87171'
                        }} />
                      </div>
                    </div>
                  </td>

                  {/* Avail */}
                  <td style={{ padding: '14px 16px', color: '#34d399', fontWeight: 600 }}>
                    {item.availabilityScore}%
                  </td>

                  {/* Latency Score */}
                  <td style={{ padding: '14px 16px', color: 'var(--text-muted)' }}>
                    {item.latencyScore}%
                  </td>

                  {/* Action */}
                  <td style={{ padding: '14px 16px' }}>
                    <button 
                      className={isSelected ? "btn-primary" : "btn-secondary"} 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectApi(item.apiId);
                      }}
                      style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                    >
                      {isSelected ? 'Analyzing Target' : 'Analyze'} <ChevronRight size={14} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
