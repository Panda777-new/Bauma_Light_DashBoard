import React, { useState } from 'react';
import styles from '../styles/Dashboard.module.scss';
import { Eye, MoreVertical } from 'lucide-react';
export default function RecentConversations({ messages, onView }) {
  const pageSize = 5;
  const [page, setPage] = useState(1);

  const paginated = messages
    .slice((page - 1) * pageSize, page * pageSize)
    .map((m, i) => ({
      ...m,
      id: `#${messages.length - ((page - 1) * pageSize + i)}`,
      time: new Date(m.timestamp).toLocaleString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      duration: '4m 12s',
      messages: 1,
      status: 'Resolved',
      sentiment: 'Positive',
    }));

  return (
    <div className={styles.recentConversations}>
      <div className={styles.recentHeader}>
        <h2>Recent Conversations</h2>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Start Time</th>
              <th>Duration</th>
              <th>Messages</th>
              <th>Status</th>
              <th>Sentiment</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((row, index) => (
              <tr key={index}>
                <td className={styles.link}>{row.id}</td>
                <td>{row.time}</td>
                <td>{row.duration}</td>
                <td>{row.messages}</td>
                <td>
                  <span
                    className={styles.badge}
                    style={{ backgroundColor: '#10b981' }}
                  >
                    {row.status}
                  </span>
                </td>
                <td>
                  <span className={styles.dot} style={{ backgroundColor: '#10b981' }}></span>
                  {row.sentiment}
                </td>
                <td className={styles.actions}>
                  <button className={styles.iconButton} onClick={() => onView(row)}>
                    <Eye size={16} />
                  </button>
                  <button className={styles.iconButton}>
                    <MoreVertical size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Previous</button>
        <span>Page {page}</span>
        <button onClick={() => setPage((p) => (p * pageSize < messages.length ? p + 1 : p))}>
          Next
        </button>
      </div>
    </div>
  );
}
