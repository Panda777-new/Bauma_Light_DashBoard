import styles from '../styles/Dashboard.module.scss';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

const getTrend = () => Math.floor(Math.random() * 10 + 1); // simulate trend %

const Card = ({ label, value, trend, color, chartColor }) => (
  <div className={styles.metricCard}>
    <div className={styles.cardHeader}>
      <div className={styles.metricLabel}><strong>{label}</strong></div>
      <div className={styles.metricTrend} style={{ color }}>
        {trend >= 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />} {Math.abs(trend)}%
      </div>
    </div>

    <div className={styles.metricValue}>{value}</div>

    <div className={styles.chartBars}>
      {[...Array(10)].map((_, i) => (
        <span
          key={i}
          style={{
            height: `${Math.random() * 30 + 10}px`,
            backgroundColor: chartColor,
          }}
        />
      ))}
    </div>
  </div>
);

export default function MetricsCards({ messages }) {
  const totalConversations = messages.length;
  const avgDuration = '4m 38s'; // TODO: Compute from messages
  const resolutionRate = '86.5%'; // TODO: Compute from messages
  const satisfaction = '4.7/5.0'; // TODO: Compute from messages

  return (
    <div className={styles.metricsGrid}>
      <Card
        label="Total Conversations"
        value={totalConversations}
        trend={getTrend()}
        color="#10b981"
        chartColor="#3b82f6"
      />
      <Card
        label="Average Duration"
        value={avgDuration}
        trend={getTrend()}
        color="#f59e0b"
        chartColor="#06b6d4"
      />
      <Card
        label="Resolution Rate"
        value={resolutionRate}
        trend={getTrend()}
        color="#10b981"
        chartColor="#22c55e"
      />
      <Card
        label="User Satisfaction"
        value={satisfaction}
        trend={-getTrend()}
        color="#ef4444"
        chartColor="#f59e0b"
      />
    </div>
  );
}
