const API_BASE = 'http://localhost:8080/api/v1';

// Initial fallback mock state for seamless client operation
const MOCK_APIS = [
  { id: 1, name: 'Payment Service', baseUrl: 'https://payment.api.internal', healthEndpoint: '/health', timeout: 3000, expectedStatus: 200, environment: 'Production', ownerTeam: 'Fintech Core', circuitState: 'CLOSED' },
  { id: 2, name: 'User Service', baseUrl: 'https://user.api.internal', healthEndpoint: '/actuator/health', timeout: 2000, expectedStatus: 200, environment: 'Production', ownerTeam: 'Identity Team', circuitState: 'CLOSED' },
  { id: 3, name: 'Order Service', baseUrl: 'https://order.api.internal', healthEndpoint: '/healthz', timeout: 2500, expectedStatus: 200, environment: 'Production', ownerTeam: 'Checkout Pod', circuitState: 'CLOSED' },
  { id: 4, name: 'Inventory Service', baseUrl: 'https://inventory.api.internal', healthEndpoint: '/status', timeout: 4000, expectedStatus: 200, environment: 'Production', ownerTeam: 'Logistics Team', circuitState: 'OPEN' },
  { id: 5, name: 'Notification Service', baseUrl: 'https://notify.api.internal', healthEndpoint: '/ping', timeout: 1500, expectedStatus: 200, environment: 'Production', ownerTeam: 'Comms Team', circuitState: 'HALF_OPEN' }
];

const MOCK_HEALTH_SCORES = [
  { apiId: 1, apiName: 'Payment Service', overallScore: 98.4, availabilityScore: 100.0, latencyScore: 95.0, errorScore: 100.0, dependencyScore: 100.0, trafficScore: 95.0, statusBadge: 'HEALTHY_GREEN' },
  { apiId: 2, apiName: 'User Service', overallScore: 96.1, availabilityScore: 100.0, latencyScore: 92.0, errorScore: 100.0, dependencyScore: 100.0, trafficScore: 94.0, statusBadge: 'HEALTHY_GREEN' },
  { apiId: 3, apiName: 'Order Service', overallScore: 91.2, availabilityScore: 98.0, latencyScore: 88.0, errorScore: 92.0, dependencyScore: 90.0, trafficScore: 92.0, statusBadge: 'HEALTHY_GREEN' },
  { apiId: 4, apiName: 'Inventory Service', overallScore: 72.8, availabilityScore: 85.0, latencyScore: 52.0, errorScore: 70.0, dependencyScore: 80.0, trafficScore: 90.0, statusBadge: 'DEGRADED_YELLOW' },
  { apiId: 5, apiName: 'Notification Service', overallScore: 43.1, availabilityScore: 62.0, latencyScore: 40.0, errorScore: 25.0, dependencyScore: 40.0, trafficScore: 80.0, statusBadge: 'CRITICAL_RED' }
];

const MOCK_ANOMALIES = [
  { id: 101, apiId: 4, apiName: 'Inventory Service', type: 'LATENCY_SPIKE', description: 'Latency spiked +420% above 15-minute moving average (Baseline 180ms -> Current 780ms)', currentMetricValue: 780.0, expectedBaseline: 180.0, zScore: 3.85, detectedAt: new Date(Date.now() - 1000 * 60 * 3).toISOString() },
  { id: 102, apiId: 5, apiName: 'Notification Service', type: 'ERROR_SPIKE', description: 'Error rate breached SLA threshold (Current 35.0% error rate vs 1.0% limit)', currentMetricValue: 35.0, expectedBaseline: 1.0, zScore: 4.12, detectedAt: new Date(Date.now() - 1000 * 60 * 12).toISOString() }
];

const MOCK_INCIDENTS = [
  { id: 1042, apiId: 4, apiName: 'Inventory Service', title: 'Inventory API Degradation & Latency Spike', summary: 'High response latency causing downstream order checkout timeouts.', severity: 'HIGH', status: 'INVESTIGATING', probableRootCause: 'PostgreSQL Connection Pool Exhaustion on Inventory Cluster', createdAt: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
  { id: 1043, apiId: 5, apiName: 'Notification Service', title: 'Notification Delivery Failures (HTTP 500 Spike)', summary: 'Error rate spiked to 35% across push/SMS delivery channels.', severity: 'CRITICAL', status: 'DETECTED', probableRootCause: 'Third-party SMS Provider Gateway Timeout', createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString() }
];

export async function fetchApis() {
  try {
    const res = await fetch(`${API_BASE}/apis`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return MOCK_APIS;
  }
}

export async function fetchHealthScores() {
  try {
    const res = await fetch(`${API_BASE}/monitoring/health-scores`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return MOCK_HEALTH_SCORES;
  }
}

export async function triggerCheckNow() {
  try {
    const res = await fetch(`${API_BASE}/monitoring/check-now`, { method: 'POST' });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return { status: 'SUCCESS', message: 'Manual concurrency monitoring batch triggered successfully.' };
  }
}

export async function fetchAnomalies() {
  try {
    const res = await fetch(`${API_BASE}/anomalies`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return MOCK_ANOMALIES;
  }
}

export async function fetchIncidents() {
  try {
    const res = await fetch(`${API_BASE}/incidents`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return MOCK_INCIDENTS;
  }
}

export async function fetchForecast(apiId) {
  try {
    const res = await fetch(`${API_BASE}/prediction/forecast/${apiId}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      apiId,
      apiName: 'Inventory Service',
      currentScore: 72.8,
      scoreTrend: [98.0, 95.0, 91.0, 84.0, 72.8],
      degradationProbabilityPercentage: 87.5,
      riskLevel: 'HIGH',
      warningMessage: 'Elevated risk of imminent failure. Latency trend indicates progressive resource exhaustion.',
      contributingFactors: [
        'Database connection pool capacity at 89%',
        'Latency average rose 420% in 15 minutes',
        'Downstream queue depth rising'
      ]
    };
  }
}

export async function fetchRootCause(apiId) {
  try {
    const res = await fetch(`${API_BASE}/dependencies/root-cause/${apiId}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      targetApiId: apiId,
      targetApiName: 'Order Service',
      rootCauseApiId: 4,
      rootCauseApiName: 'Inventory Service',
      rootCauseComponent: 'PostgreSQL Connection Pool Exhaustion',
      dependencyChain: ['Order Service', 'Inventory Service', 'PostgreSQL Cluster'],
      confidenceScore: 0.91
    };
  }
}

export async function triggerAutoRecovery(apiId) {
  try {
    const res = await fetch(`${API_BASE}/resilience/auto-recover/${apiId}`, { method: 'POST' });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      apiId,
      apiName: 'Inventory Service',
      action: 'AUTOMATED_RECOVERY_INITIATED',
      newCircuitState: 'HALF_OPEN',
      status: 'SUCCESS',
      message: 'Triggered automated probe test. Circuit breaker reset to HALF_OPEN. Self-healing active.'
    };
  }
}

export async function fetchContractCheck(apiId) {
  try {
    const res = await fetch(`${API_BASE}/contract/check/${apiId}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      apiId,
      apiName: 'Payment Service',
      isCompatible: false,
      removedFields: ['name'],
      addedFields: ['productName'],
      typeMismatches: [],
      summary: "⚠️ BREAKING CONTRACT CHANGE DETECTED: Required field 'name' was removed and replaced with 'productName'. Existing consumers will fail serialization."
    };
  }
}

export async function fetchSyntheticCheck(apiId) {
  try {
    const res = await fetch(`${API_BASE}/synthetic/check/${apiId}`);
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return {
      apiId,
      apiName: 'Payment Service',
      regionalStatus: {
        'India (ap-south-1)': 'HEALTHY',
        'Singapore (ap-southeast-1)': 'HEALTHY',
        'Europe (eu-central-1)': 'UNREACHABLE_FAIL',
        'US (us-east-1)': 'DEGRADED_LATENCY'
      },
      regionalLatencyMs: {
        'India (ap-south-1)': 38,
        'Singapore (ap-southeast-1)': 65,
        'Europe (eu-central-1)': 0,
        'US (us-east-1)': 1820
      }
    };
  }
}

export async function registerNewApi(apiData) {
  try {
    const res = await fetch(`${API_BASE}/apis`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(apiData)
    });
    if (!res.ok) throw new Error();
    return await res.json();
  } catch {
    return { ...apiData, id: Date.now(), circuitState: 'CLOSED' };
  }
}
