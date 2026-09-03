import React, { useState, useEffect } from 'react';
import { FileCode, AlertTriangle, CheckCircle, RefreshCw } from 'lucide-react';
import { fetchContractCheck } from '../services/apiService';

export default function ContractDriftViewer({ selectedApiId }) {
  const [contract, setContract] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadContract = async () => {
    setLoading(true);
    const data = await fetchContractCheck(selectedApiId || 1);
    setContract(data);
    setLoading(false);
  };

  useEffect(() => {
    loadContract();
  }, [selectedApiId]);

  if (!contract) return null;

  return (
    <div className="glass-card" style={{ padding: '24px', marginBottom: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h2 style={{ fontSize: '1.2rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileCode color="#38bdf8" size={20} /> API Contract &amp; Schema Drift Monitor
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '2px' }}>
            Detect breaking API response payload changes before consumer clients crash
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button className="btn-secondary" onClick={loadContract} disabled={loading} style={{ fontSize: '0.78rem' }}>
            <RefreshCw size={14} /> {loading ? 'Evaluating...' : 'Re-check Schema Contract'}
          </button>
          <span className={contract.isCompatible ? 'badge-green' : 'badge-red'}>
            {contract.isCompatible ? '✅ Schema Fully Compatible' : '⚠️ BREAKING SCHEMA DRIFT'}
          </span>
        </div>
      </div>

      {/* Side-by-Side Schema Comparison */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
        
        {/* Box 1: Registered Schema */}
        <div style={{
          background: 'rgba(11, 15, 25, 0.7)',
          border: '1px solid var(--border-glass)',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem'
        }}>
          <div style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>
            Expected Contract Specification
          </div>
          <pre style={{ color: '#38bdf8', whiteSpace: 'pre-wrap' }}>
{`{
  "id": 101,
  "name": "Laptop",
  "price": 50000
}`}
          </pre>
        </div>

        {/* Box 2: Observed Payload Schema */}
        <div style={{
          background: 'rgba(11, 15, 25, 0.7)',
          border: contract.isCompatible ? '1px solid var(--border-glass)' : '1px solid rgba(239, 68, 68, 0.4)',
          borderRadius: '12px',
          padding: '16px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem'
        }}>
          <div style={{ color: 'var(--text-muted)', fontWeight: 600, marginBottom: '8px' }}>
            Observed Production Payload Response
          </div>
          <pre style={{ color: contract.isCompatible ? '#34d399' : '#f87171', whiteSpace: 'pre-wrap' }}>
{`{
  "id": 101,
  "productName": "Laptop",
  "price": 50000
}`}
          </pre>
        </div>

      </div>

      {/* Summary Box */}
      <div style={{
        marginTop: '16px',
        background: contract.isCompatible ? 'rgba(16, 185, 129, 0.08)' : 'rgba(239, 68, 68, 0.08)',
        border: `1px solid ${contract.isCompatible ? 'rgba(16, 185, 129, 0.3)' : 'rgba(239, 68, 68, 0.3)'}`,
        borderRadius: '10px',
        padding: '14px 16px',
        fontSize: '0.85rem'
      }}>
        {contract.summary}
      </div>
    </div>
  );
}
