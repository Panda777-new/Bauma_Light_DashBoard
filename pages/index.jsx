import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Dashboard.module.scss";
import ChatMessage from "../components/ChatMessage";
import MetricsCards from "../components/MetricsCards";
import RecentConversations from "../components/RecentConversations";
import AnalyticsSidebar from "../components/AnalyticsSidebar";
import ChatDetailModal from "../components/ChatDetailModal";
import { exportToExcel } from "../utils/exportToCSV";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [filteredMessages, setFilteredMessages] = useState([]);
  const [search, setSearch] = useState("");
  const [sentiment, setSentiment] = useState("All");
  const [selectedDays, setSelectedDays] = useState(7);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const router = useRouter();

  // ⏳ Auth check
  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = localStorage.getItem("auth");
      if (auth !== "true") {
        router.replace("/login");
      } else {
        setLoading(false);
      }
    }
  }, []);

  // 🔄 Load and Merge messages
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/conversation_history.json");
        const data = await res.json();

        const local = localStorage.getItem("updatedMessages");
        const updated = local ? JSON.parse(local) : [];

        const merged = data.map((msg) => {
          const match = updated.find((u) => u.id === msg.id);
          return match || msg;
        });

        setMessages(merged);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);
    return () => clearInterval(interval);
  }, []);

  // 🔍 Filtering
  useEffect(() => {
    let result = [...messages];

    if (search) {
      result = result.filter((msg) =>
        msg.question?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sentiment !== "All") {
      result = result.filter((msg) => msg.sentiment === sentiment);
    }

    if (filterStatus === "Resolved") {
      result = result.filter((msg) => msg.status === "Resolved");
    } else if (filterStatus === "Unresolved") {
      result = result.filter((msg) => msg.status !== "Resolved");
    }

    setFilteredMessages(result);
  }, [messages, search, sentiment, filterStatus]);

  const openModal = (message) => {
    setSelectedMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedMessage(null);
    setModalOpen(false);
  };

  // ✅ Update status/sentiment and store in localStorage
  const handleUpdate = (index, updatedMsg) => {
    const globalIndex = messages.findIndex(
      (msg) => msg.id === filteredMessages[index].id
    );
    if (globalIndex === -1) return;

    const updatedMessages = [...messages];
    updatedMessages[globalIndex] = updatedMsg;

    // Persist in localStorage
    const existingUpdates = JSON.parse(localStorage.getItem("updatedMessages") || "[]");
    const newUpdates = existingUpdates.filter((u) => u.id !== updatedMsg.id);
    newUpdates.push(updatedMsg);
    localStorage.setItem("updatedMessages", JSON.stringify(newUpdates));

    setMessages(updatedMessages);
  };

  if (loading) return null;

  return (
    <div className={styles.Dashboard}>
      <header className={styles.header}>
        Chatbot Analytics Dashboard
        <div>
          <button
            className={styles.exportBtn}
            onClick={() => exportToExcel(filteredMessages)}
          >
            Export to Excel
          </button>
          <button
            className={styles.logoutBtn}
            onClick={() => {
              localStorage.removeItem("auth");
              router.push("/login");
            }}
          >
            Logout
          </button>
        </div>
      </header>

      <div className={styles.mainLayout}>
        <main>
          <div className={styles.controls}>
            <input
              className={styles.searchInput}
              placeholder="Search by question..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select
              className={styles.dropdown}
              value={sentiment}
              onChange={(e) => setSentiment(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Positive">Positive</option>
              <option value="Neutral">Neutral</option>
              <option value="Negative">Negative</option>
            </select>
            <select
              className={styles.dropdown}
              value={selectedDays}
              onChange={(e) => setSelectedDays(Number(e.target.value))}
            >
              <option value={7}>Last 7 Days</option>
              <option value={14}>Last 14 Days</option>
              <option value={30}>Last 30 Days</option>
            </select>
          </div>

          <MetricsCards messages={filteredMessages} dateRange={selectedDays} />

          <div className={styles.dashboardRow}>
            <div className={styles.analyticsPanel}>
              <AnalyticsSidebar
                messages={filteredMessages}
                onFilter={setFilterStatus}
              />
            </div>

            <div className={styles.rightPanel}>
              <RecentConversations
                messages={filteredMessages}
                onView={openModal}
                onUpdate={handleUpdate}
              />
              <div className={styles.chatList}>
                {filteredMessages.map((msg, index) => (
                  <div key={index} onClick={() => openModal(msg)}>
                    <ChatMessage message={msg} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <ChatDetailModal
        isOpen={modalOpen}
        message={selectedMessage}
        onClose={closeModal}
      />
    </div>
  );
}
