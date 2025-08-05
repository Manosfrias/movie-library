export interface BadgeProps {
  type?: 'favorite' | 'featured';
  className?: string;
  active?: boolean;
  onClick?: () => void;
}
