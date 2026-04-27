import './Toast.css';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  title?: string;
  icon?: any;
  onClose?: () => void;
}

export const Toast = ({
  message,
  type = 'info',
  title,
  icon: Icon,
  onClose
}: ToastProps) => {
  return (
    <div className={`spz-toast ${type}`}>
      <div className="toast-accent"></div>
      {Icon && <div className="toast-icon-wrapper"><Icon size={20} /></div>}
      <div className="toast-content">
        {title && <h4 className="toast-title">{title}</h4>}
        <p className="toast-msg">{message}</p>
      </div>
      {onClose && (
        <button className="toast-close" onClick={onClose}>×</button>
      )}
    </div>
  );
};
