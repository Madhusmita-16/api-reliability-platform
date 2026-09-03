import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import KpiOverview from './components/KpiOverview';
import HealthScoreTable from './components/HealthScoreTable';
import AnomalyDetector from './components/AnomalyDetector';
import DependencyGraph from './components/DependencyGraph';
import FailurePrediction from './components/FailurePrediction';
import CircuitBreakerConsole from './components/CircuitBreakerConsole';
import ContractDriftViewer from './components/ContractDriftViewer';
import SyntheticMapGrid from './components/SyntheticMapGrid';
import IncidentManagerModal from './components/IncidentManagerModal';
import RegisterApiModal from './components/RegisterApiModal';

import {
  fetchApis,
  fetchHealthScores,
  fetchAnomalies,
  fetchIncidents,
  triggerCheckNow
} from './services/apiService';

export default function App() {
  const [apis, setApis] = useState([]);
  const [healthScores, setHealthScores] = useState([]);
  const [anomalies, setAnomalies] = useState([]);
  const [incidents, setIncidents] = useState([]);
  const [selectedApiId, setSelectedApiId] = useState(4); // Inventory Service default

  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isIncidentsOpen, setIsIncidentsOpen] = useState(false);

  const loadAllData = async () => {
    const [a, h, an, inc] = await Promise.all([
      fetchApis(),
      fetchHealthScores(),
      fetchAnomalies(),
      fetchIncidents()
    ]);
    setApis(a);
    setHealthScores(h);
    setAnomalies(an);
    setIncidents(inc);
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleRefresh = async () => {
    await triggerCheckNow();
    await loadAllData();
  };

  const handleApiRegistered = (newApi) => {
    setApis(prev => [...prev, newApi]);
    setHealthScores(prev => [
      ...prev,
      { apiId: newApi.id, apiName: newApi.name, overallScore: 100.0, availabilityScore: 100.0, latencyScore: 100.0, errorScore: 100.0, dependencyScore: 100.0, trafficScore: 100.0, statusBadge: 'HEALTHY_GREEN' }
    ]);
  };

  const activeIncidents = incidents.filter(i => i.status !== 'RESOLVED');

  return (
    <div style={{ paddingBottom: '60px' }}>
      
      {/* Header Navbar */}
      <Navbar 
        onRefresh={handleRefresh}
        onOpenRegister={() => setIsRegisterOpen(true)}
        onOpenIncidents={() => setIsIncidentsOpen(true)}
        activeIncidentCount={activeIncidents.length}
      />

      {/* Main Container */}
      <main style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* KPI Overview Row */}
        <KpiOverview 
          apis={apis}
          healthScores={healthScores}
          anomalies={anomalies}
          incidents={incidents}
        />

        {/* API Health Score Matrix */}
        <HealthScoreTable 
          healthScores={healthScores}
          apis={apis}
          onSelectApi={(id) => setSelectedApiId(id)}
          selectedApiId={selectedApiId}
        />

        {/* 2-Column Grid: Anomaly Detection + Dependency Intelligence */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
          <AnomalyDetector anomalies={anomalies} />
          <DependencyGraph />
        </div>

        {/* 2-Column Grid: Failure Prediction + Resilience4j Circuit Breaker */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
          <FailurePrediction selectedApiId={selectedApiId} />
          <CircuitBreakerConsole apis={apis} onRefresh={loadAllData} />
        </div>

        {/* 2-Column Grid: Contract Schema Drift + Multi-Region Synthetic Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(450px, 1fr))', gap: '24px' }}>
          <ContractDriftViewer selectedApiId={selectedApiId} />
          <SyntheticMapGrid selectedApiId={selectedApiId} />
        </div>

      </main>

      {/* Modals */}
      <IncidentManagerModal 
        isOpen={isIncidentsOpen}
        onClose={() => setIsIncidentsOpen(false)}
        incidents={incidents}
      />

      <RegisterApiModal 
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onApiRegistered={handleApiRegistered}
      />

    </div>
  );
}
