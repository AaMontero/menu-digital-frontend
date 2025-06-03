export interface Menu {
  label: string;
  icon?: string;
  route?: string;
  children?: Menu[];
  disabled?: boolean;
}
export interface MenuDto {
  id: string; 
  label: string; 
  icon?: string; 
  route?: string; 
}