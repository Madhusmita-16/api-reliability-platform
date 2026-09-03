import React, { useState, useEffect } from 'react';
import { ShieldAlert, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import { fetchForecast } from '../services/apiService';

export default function FailurePrediction({ selectedApiId }) {
  const [forecast, setForecast] = useState(null);

  useEffect(() => {
    async function loadForecast() {
      const data = await fetchForecast(selectedApiId || 4);
      setForecast(data);
    }
    loadForecast();
  }, [selectedApiId]);

  if (!forecast) return null;

  const isHighRisk = forecast.riskLevel === 'HIGH' || forecast.riskLevel === 'CRITICAL';

  return (
    <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert color={isHighRisk ? '#f87171' : '#34d399'} size={20} /> Failure Prediction &amp; Degradation Forecasting
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Multi-sample regression trend model estimating failure probability prior to SLA breach
          </p>
        </div>

        <span className={isHighRisk ? 'badge-red' : 'badge-green'}>
          Risk Level: {forecast.riskLevel}
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
        
        {/* Risk Probability Gauge Card */}
        <div style={{
          background: 'rgba(11, 15, 25, 0.6)',
          border: '1px solid var(--border-glass)',
          borderRadius: '14px',
          padding: '20px',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 600 }}>
            DEGRADATION PROBABILITY
          </div>
          <div style={{
            fontSize: '3rem',
            fontWeight: 800,
            fontFamily: 'var(--font-heading)',
            color: isHighRisk ? '#f87171' : '#34d399',
            lineHeight: 1
          }}>
            {forecast.degradationProbabilityPercentage}%
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-dim)', marginTop: '8px' }}>
            Target: {forecast.apiName}
          </div>
        </div>

        {/* Velocity Score Trend Sparkline */}
        <div style={{
          background: 'rgba(11, 15, 25, 0.6)',
          border: '1px solid var(--border-glass)',
          borderRadius: '14px',
          padding: '20px'
        }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <TrendingDown size={16} color="#f87171" /> Score Velocity Trajectory
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', marginTop: '16px' }}>
            {forecast.scoreTrend.map((score, idx) => (
              <div key={idx} style={{ textAlign: 'center', flex: 1 }}>
                <div style={{
                  height: `${score * 0.8}px`,
                  maxHeight: '70px',
                  background: idx === forecast.scoreTrend.length - 1 ? '#f87171' : '#38bdf8',
                  borderRadius: '4px',
                  margin: '0 auto 6px',
                  width: '12px'
                }} />
                <div style={{ fontSize: '0.72rem', fontWeight: 600, color: 'var(--text-main)' }}>
                  {score.toFixed(0)}%
                </div>
              </div>
            ))}
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-dim)', textAlign: 'center', marginTop: '12px' }}>
            Historical 5-sample score degradation curve
          </div>
        </div>

      </div>

      {/* Advisory Alert Box */}
      <div style={{
        marginTop: '20px',
        background: isHighRisk ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
        border: `1px solid ${isHighRisk ? 'rgba(239, 68, 68, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`,
        borderRadius: '12px',
        padding: '16px 20px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          {isHighRisk ? <AlertTriangle color="#f87171" size={20} /> : <CheckCircle color="#34d399" size={20} />}
          <h4 style={{ fontWeight: 700, fontSize: '0.95rem', color: isHighRisk ? '#f87171' : '#34d399' }}>
            Predictive Warning Advisory
          </h4>
        </div>
        <p style={{ fontSize: '0.85rem', color: 'var(--text-main)', marginBottom: '10px' }}>
          {forecast.warningMessage}
        </p>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <strong>Contributing Root Factors:</strong>
          <ul style={{ paddingLeft: '20px', marginTop: '4px' }}>
            {forecast.contributingFactors.map((factor, i) => (
              <li key={i}>{factor}</li>
            ))}
          </ul>
        </div>
      </div>

    </div>
  );
}
