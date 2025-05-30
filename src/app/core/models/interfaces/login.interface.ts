export interface UserLogin {
  username: string; 
  password: string; 
}

export interface UserEncryptedInfo
{
    token?: string;   
    username: string; 
    encrypted: string; 
}