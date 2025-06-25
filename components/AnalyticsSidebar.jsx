import styles from "../styles/Dashboard.module.scss";

export default function AnalyticsSidebar({ messages }) {
  const sentimentStats = {
    Positive: messages.length,
    Neutral: 0, // Placeholder for future
    Negative: 0, // Placeholder for future
  };

  const total = Object.values(sentimentStats).reduce((a, b) => a + b, 0);
  const getPercent = (count) => (count / total) * 100;

  return (
    <div className={styles.sidebar}>
      <h2>Analytics</h2>

      <div className={styles.analyticsLayout}>
        {/* Left Side: Donut and Legend */}
        <div>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
            Sentiment Analysis
          </h3>
          <div className={styles.donutWrapper}>
            <svg viewBox="0 0 36 36" className={styles.donut}>
              <circle
                cx="18"
                cy="18"
                r="15.915"
                fill="transparent"
                stroke="#10b981"
                strokeWidth="3"
                strokeDasharray="100 0"
              />
            </svg>
          </div>

          {/* Sentiment Labels */}
          <div className={styles.legend}>
            <div>
              <span style={{ backgroundColor: "#10b981" }}></span> Positive
            </div>
            <div>
              <span style={{ backgroundColor: "#3b82f6" }}></span> Neutral
            </div>
            <div>
              <span style={{ backgroundColor: "#ef4444" }}></span> Negative
            </div>
          </div>
        </div>

        {/* Right Side: Top Topics */}
        <div className={styles.topTopics}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
            Top Topics
          </h3>
          <div>Subscription</div>
          <div>Features</div>
          <div>Billing</div>
          <div>Account</div>
          <div>Technical</div>
        </div>
      </div>

      {/* Centered Below: Quick Filters */}
      <div className={styles.middleFilters}>
        <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
          Quick Filters
        </h3>
        <div className={styles.quickFilters}>
          <span style={{ color: "#10b981" }}>●</span> Resolved Conversations
        </div>
      </div>
    </div>
  );
}
