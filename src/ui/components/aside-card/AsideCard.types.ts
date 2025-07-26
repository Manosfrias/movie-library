export interface AsideCardProps {
  title: string;
  items: string[];
  onItemClick?: (item: string) => void;
  selectedItem?: string;
}
