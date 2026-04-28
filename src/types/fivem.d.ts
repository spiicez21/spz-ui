declare function GetParentResourceName(): string;

interface Window {
  LoadscreenConfig?: {
    mediaType?: string;
    youtube?: {
      muted?: boolean;
      volume?: number;
    };
  };
  lucide?: {
    createIcons: (opts?: object) => void;
    icons: Record<string, unknown>;
  };
}
