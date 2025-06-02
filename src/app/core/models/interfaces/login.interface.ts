export interface UserLogin {
  username: string;
  password: string;
}

export interface UserEncryptedInfo {
  token?: string;
  username: string;
  encrypted: string;
}

export interface UserInfoRegister {
  username: string; 
  email: string; 
  password: string; 
  firstName: string; 
  lastName: string; 
  birthDate: Date; 
  gender: string; 
  address: string; 
  country: string; 
  phoneNumber: string; 
}
