import './Avatar.css';

interface AvatarProps {
  src?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  status?: 'online' | 'offline' | 'busy' | 'away';
  className?: string;
}

export const Avatar = ({
  src,
  name,
  size = 'md',
  status,
  className = ''
}: AvatarProps) => {
  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : '??';

  return (
    <div className={`spz-avatar ${size} ${className}`}>
      <div className="avatar-content">
        {src ? (
          <img src={src} alt={name} className="avatar-img" />
        ) : (
          <span className="avatar-initials">{initials}</span>
        )}
      </div>
      {status && <span className={`status-indicator ${status}`} />}
    </div>
  );
};
