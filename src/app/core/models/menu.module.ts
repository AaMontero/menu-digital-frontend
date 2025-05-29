export interface Menu {
  label: string;
  icon?: string;
  route?: string;
  children?: Menu[];
  disabled?: boolean;
}