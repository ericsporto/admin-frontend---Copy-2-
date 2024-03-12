interface SpanErrorProps {
  message?: string;
}

const SpanError: React.FC<SpanErrorProps> = ({ message }) => {
  return <span className="font-bold text-xs text-red-500">{message}</span>;
};

export default SpanError;
