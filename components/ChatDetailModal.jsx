import styles from '../styles/Dashboard.module.scss';

export default function ChatDetailModal({ isOpen, message, onClose }) {
  if (!isOpen || !message) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.modalClose} onClick={onClose}>×</button>
        <h2>Chat Details</h2>

        <div className={styles.modalSection}>
          <strong>Timestamp:</strong><br />
          {new Date(message.timestamp).toLocaleString()}
        </div>

        <div className={styles.modalSection}>
          <strong>Question:</strong><br />
          {message.question}
        </div>

        <div className={styles.modalSection}>
          <strong>Answer:</strong><br />
          <div dangerouslySetInnerHTML={{ __html: message.answer }} />
        </div>
      </div>
    </div>
  );
}
