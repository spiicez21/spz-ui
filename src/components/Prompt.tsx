import './Prompt.css';

interface KeycapProps {
  keys: string[];
  className?: string;
}

export const Keycap = ({ keys, className = '' }: KeycapProps) => {
  return (
    <div className={`spz-keycap-group ${className}`}>
      {keys.map((key, i) => (
        <span key={i} className="spz-keycap">{key}</span>
      ))}
    </div>
  );
};

interface PromptProps {
  label: string;
  keys?: string[];
  button?: 'A' | 'B' | 'X' | 'Y' | 'RT' | 'LT' | 'RB' | 'LB' | 'DPAD_UP' | 'DPAD_DOWN' | 'DPAD_LEFT' | 'DPAD_RIGHT' | 'START' | 'SELECT';
  className?: string;
}

export const Prompt = ({ label, keys, button, className = '' }: PromptProps) => {
  return (
    <div className={`spz-prompt ${className}`}>
      <div className="prompt-trigger">
        {keys && <Keycap keys={keys} />}
        {button && <div className={`spz-controller-btn ${button}`}>{button}</div>}
      </div>
      <span className="prompt-label">{label}</span>
    </div>
  );
};
