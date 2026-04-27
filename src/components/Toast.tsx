import { CheckCircle, AlertCircle, AlertTriangle, Info, X } from 'lucide-preact';
import './Toast.css';

const TYPE_ICONS = {
  success: CheckCircle,
  error:   AlertCircle,
  warning: AlertTriangle,
  info:    Info,
};

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  onClose?: () => void;
  // kept for backwards-compat but no longer displayed separately
  title?: string;
  icon?: any;
}

export const Toast = ({
  message,
  type = 'info',
  onClose,
}: ToastProps) => {
  const Icon = TYPE_ICONS[type];

  return (
    <div className={`spz-toast ${type}`}>
      <span className="toast-icon">
        <Icon size={16} strokeWidth={2.5} />
      </span>
      <span className="toast-message">{message}</span>
      {onClose && (
        <button className="toast-close" onClick={onClose} aria-label="Dismiss">
          <X size={14} />
        </button>
      )}
    </div>
  );
};
