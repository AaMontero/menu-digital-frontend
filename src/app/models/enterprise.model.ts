export interface Enterprise {
  id: string;
  name: string;
  url: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  logo_url?: string;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date | null;
}

  
