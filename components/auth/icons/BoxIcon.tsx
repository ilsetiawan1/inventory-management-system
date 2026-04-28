// components/auth/icons/BoxIcon.tsx

interface BoxIconProps {
  color?: string;
  size?: number;
}

export function BoxIcon({ color = 'white', size = 20 }: BoxIconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <path
        d="M20 7L12 3L4 7M20 7L12 11M20 7V17L12 21M12 11L4 7M12 11V21M4 7V17L12 21"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}