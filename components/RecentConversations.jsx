import { Eye, MoreVertical } from "lucide-react";
import { useState } from "react";
import styles from "../styles/Dashboard.module.scss";

export default function RecentConversations({ messages, onView, onUpdate }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState({ status: "", sentiment: "" });

  const openEditModal = (index) => {
    const msg = messages[index];
    setSelectedIndex(index);
    setEditData({ status: msg.status, sentiment: msg.sentiment });
    setModalOpen(true);
  };

  const handleSave = () => {
    const updatedMsg = {
      ...messages[selectedIndex],
      ...editData,
    };
    onUpdate(selectedIndex, updatedMsg);
    setModalOpen(false);
  };

  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>Recent Conversations</h2>

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
            {messages.slice(0, 5).map((msg, index) => {
              const sentimentColor =
                msg.sentiment === "Positive"
                  ? "#10b981"
                  : msg.sentiment === "Neutral"
                  ? "#3b82f6"
                  : msg.sentiment === "Negative"
                  ? "#ef4444"
                  : "#999";

              const statusColor =
                msg.status === "Resolved"
                  ? "#10b981"
                  : msg.status === "Pending"
                  ? "#f59e0b"
                  : "#ef4444";

              const userMessages = messages.filter(
                (m) => m.username === msg.username
              );
              const times = userMessages.map((m) =>
                new Date(m.timestamp).getTime()
              );
              const minTime = Math.min(...times);
              const maxTime = Math.max(...times);
              const durationMs = maxTime - minTime;
              const minutes = Math.floor(durationMs / 60000);
              const seconds = Math.floor((durationMs % 60000) / 1000);
              const durationStr =
                minutes === 0 && seconds === 0
                  ? "—"
                  : `${minutes}m ${seconds}s`;

              return (
                <tr key={index}>
                  <td className={styles.link}>#{msg.id || index + 1}</td>
                  <td>{formatDateTime(msg.timestamp)}</td>
                  <td>{durationStr}</td>
                  <td>{msg.messages || 1}</td>
                  <td>
                    <span
                      className={styles.badge}
                      style={{ backgroundColor: statusColor }}
                    >
                      {msg.status}
                    </span>
                  </td>
                  <td>
                    <span
                      className={styles.dot}
                      style={{ backgroundColor: sentimentColor }}
                    ></span>
                    {msg.sentiment || "—"}
                  </td>
                  <td className={styles.actions}>
                    <button
                      className={styles.iconButton}
                      onClick={() => onView(msg)}
                      title="View"
                    >
                      <Eye size={16} />
                    </button>

                    <button
                      className={styles.iconButton}
                      title="Edit"
                      onClick={() => openEditModal(index)}
                    >
                      <MoreVertical size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h3>Edit Conversation</h3>
            <label>Status:</label>
            <select
              value={editData.status}
              onChange={(e) =>
                setEditData({ ...editData, status: e.target.value })
              }
            >
              <option>Resolved</option>
              <option>Pending</option>
              <option>Failed</option>
            </select>

            <label>Sentiment:</label>
            <select
              value={editData.sentiment}
              onChange={(e) =>
                setEditData({ ...editData, sentiment: e.target.value })
              }
            >
              <option>Positive</option>
              <option>Neutral</option>
              <option>Negative</option>
            </select>

            <div className={styles.modalActions}>
              <button onClick={handleSave} className={styles.saveButton}>
                Save
              </button>
              <button onClick={() => setModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatDateTime(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
