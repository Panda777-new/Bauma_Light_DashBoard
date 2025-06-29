export function groupByDay(messages, days) {
  const today = new Date();
  const oneDay = 1000 * 60 * 60 * 24;

  const current = Array.from({ length: days }, (_, i) => {
    const date = new Date(today.getTime() - i * oneDay);
    const dayStr = date.toISOString().slice(0, 10);
    return messages.filter(msg => msg.timestamp?.startsWith(dayStr));
  }).reverse();

  const previous = Array.from({ length: days }, (_, i) => {
    const date = new Date(today.getTime() - (i + days) * oneDay);
    const dayStr = date.toISOString().slice(0, 10);
    return messages.filter(msg => msg.timestamp?.startsWith(dayStr));
  }).reverse();

  return { current, previous };
}

export function calculateMetrics(period) {
  const all = period.flat();
  const total = all.length;
  const duration = all.reduce((sum, m) => sum + parseDuration(m.duration), 0);
  const avgDuration = total > 0 ? formatDuration(duration / total) : '0m 0s';
  const resolutionRate = total > 0
    ? Math.round((all.filter(m => m.status === 'Resolved').length / total) * 100)
    : 0;
  const satisfaction = total > 0
    ? (all.reduce((sum, m) => sum + (parseFloat(m.rating) || 0), 0) / total).toFixed(1)
    : '0.0';

  return { total, avgDuration, resolutionRate, satisfaction };
}

function parseDuration(duration) {
  if (!duration || typeof duration !== 'string') return 0;
  const parts = duration.split(' ');
  let minutes = 0, seconds = 0;
  parts.forEach(part => {
    if (part.includes('m')) minutes = parseInt(part);
    if (part.includes('s')) seconds = parseInt(part);
  });
  return (minutes * 60 + seconds) * 1000;
}

function formatDuration(ms) {
  const seconds = Math.floor(ms / 1000);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}m ${s}s`;
}
