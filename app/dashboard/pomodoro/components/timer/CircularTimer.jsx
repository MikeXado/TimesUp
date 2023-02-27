export default function CircularTimer({ progress }) {
  return (
    <svg width={200}>
      <circle
        cx="50%"
        cy="50%"
        r="40%"
        stroke="gray"
        strokeWidth="20%"
        fill="none"
      />
      <circle
        cx="50%"
        cy="50%"
        r="40%"
        stroke="green"
        strokeWidth="20%"
        fill="none"
        strokeDasharray={`${progress} ${100 - progress}`}
        transform="rotate(-90 50 50)"
      />
    </svg>
  );
}
