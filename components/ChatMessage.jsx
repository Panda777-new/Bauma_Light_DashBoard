import styles from '../styles/Dashboard.module.scss';

const ChatMessage = ({ message }) => {
  const { timestamp, question, answer } = message;
  const formattedTime = new Date(timestamp).toLocaleString();

  return (
    <div className={styles.chatCard}>
      <div className={styles.meta}>
        <span>User</span>
        <span>{formattedTime}</span>
      </div>
      <div className={styles.question}>Q: {question}</div>
      <div
        className={styles.answer}
        dangerouslySetInnerHTML={{ __html: answer }}
      />
    </div>
  );
};

export default ChatMessage;
