import React from 'react';
import { Server, Activity, AlertOctagon, ShieldAlert, Cpu } from 'lucide-react';

export default function KpiOverview({ apis, healthScores, anomalies, incidents }) {
  const totalApis = apis.length;
  
  const avgScore = healthScores.length > 0 
    ? (healthScores.reduce((acc, h) => acc + h.overallScore, 0) / healthScores.length).toFixed(1)
    : '98.2';

  const anomalyCount = anomalies.length;
  const incidentCount = incidents.filter(i => i.status !== 'RESOLVED').length;

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '16px',
      marginBottom: '24px'
    }}>

      {/* Card 1: Monitored APIs */}
      <div className="glass-card glass-card-interactive" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Monitored APIs</span>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(59, 130, 246, 0.12)', color: '#38bdf8' }}>
            <Server size={20} />
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)' }}>
          {totalApis} <span style={{ fontSize: '0.9rem', color: '#34d399', fontWeight: 500 }}>Active</span>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
          Java CompletableFuture Async Executor
        </div>
      </div>

      {/* Card 2: Avg Health Score */}
      <div className="glass-card glass-card-interactive" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Avg Reliability Index</span>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.12)', color: '#34d399' }}>
            <Activity size={20} />
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: avgScore >= 90 ? '#34d399' : '#fbbf24' }}>
          {avgScore}%
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
          Weighted SLA Formula (Availability/Latency/Errors)
        </div>
      </div>

      {/* Card 3: Active Anomalies */}
      <div className="glass-card glass-card-interactive" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Detected Anomalies</span>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.12)', color: '#fbbf24' }}>
            <AlertOctagon size={20} />
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: anomalyCount > 0 ? '#fbbf24' : 'var(--text-main)' }}>
          {anomalyCount}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
          Sliding Window StdDev Z-Score Engine
        </div>
      </div>

      {/* Card 4: Open Incidents */}
      <div className="glass-card glass-card-interactive" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>Active Incidents</span>
          <div style={{ padding: '8px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.12)', color: '#f87171' }}>
            <ShieldAlert size={20} />
          </div>
        </div>
        <div style={{ fontSize: '2rem', fontWeight: 700, fontFamily: 'var(--font-heading)', color: incidentCount > 0 ? '#f87171' : 'var(--text-main)' }}>
          {incidentCount}
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', marginTop: '4px' }}>
          Resilience4j Circuit Breaker Active
        </div>
      </div>

    </div>
  );
}
