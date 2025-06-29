import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export function exportToExcel(data, fileName = 'chat_data.xlsx') {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const formatted = data.map(({ id, question, answer, sentiment, timestamp, status }) => ({
    ID: id,
    Question: question,
    Answer: answer,
    Sentiment: sentiment,
    Timestamp: timestamp,
    Status: status
  }));

  const worksheet = XLSX.utils.json_to_sheet(formatted);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Chats');

  const buffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  const blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(blob, fileName);
}
