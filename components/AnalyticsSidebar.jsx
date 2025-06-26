import styles from "../styles/Dashboard.module.scss";

export default function AnalyticsSidebar({ messages }) {
  const sentimentStats = {
    Positive: messages.filter(msg => msg.sentiment === "Positive").length,
    Neutral: messages.filter(msg => msg.sentiment === "Neutral").length,
    Negative: messages.filter(msg => msg.sentiment === "Negative").length,
  };

  const total = Object.values(sentimentStats).reduce((a, b) => a + b, 0) || 1;
  const positiveArc = (sentimentStats.Positive / total) * 100;
  const neutralArc = (sentimentStats.Neutral / total) * 100;
  const negativeArc = (sentimentStats.Negative / total) * 100;

  const TOPICS = [
    { name: "Subscription", width: Math.random() * 100 },
    { name: "Features", width: Math.random() * 100 },
    { name: "Billing", width: Math.random() * 100 },
    { name: "Account", width: Math.random() * 100 },
    { name: "Technical", width: Math.random() * 100 },
  ];

  return (
    <div className={styles.sidebar}>
      <h2>Analytics</h2>

      <div className={styles.analyticsLayout}>
        <div>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>
            Sentiment Analysis
          </h3>
          <div className={styles.donutWrapper}>
            <svg viewBox="0 0 36 36" className={styles.donut}>
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#333" strokeWidth="3" />
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#10b981" strokeWidth="3"
                strokeDasharray={`${positiveArc} ${100 - positiveArc}`}
                strokeDashoffset="0" />
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#3b82f6" strokeWidth="3"
                strokeDasharray={`${neutralArc} ${100 - neutralArc}`}
                strokeDashoffset={`-${positiveArc}`} />
              <circle cx="18" cy="18" r="15.915" fill="transparent" stroke="#ef4444" strokeWidth="3"
                strokeDasharray={`${negativeArc} ${100 - negativeArc}`}
                strokeDashoffset={`-${positiveArc + neutralArc}`} />
            </svg>
          </div>

          <div className={styles.legend}>
            <div><span style={{ backgroundColor: "#10b981" }}></span> Positive</div>
            <div><span style={{ backgroundColor: "#3b82f6" }}></span> Neutral</div>
            <div><span style={{ backgroundColor: "#ef4444" }}></span> Negative</div>
          </div>
        </div>

        <div className={styles.topTopics}>
          <h3 style={{ fontSize: "1rem", marginBottom: "0.5rem" }}>Top Topics</h3>
          <div className={styles.topicsBarChart}>
            {TOPICS.map((topic, idx) => (
              <div key={idx} className={styles.topicRow}>
                <span>{topic.name}</span>
                <div className={styles.barWrapper}>
                  <div className={styles.bar} style={{ width: `${topic.width}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}