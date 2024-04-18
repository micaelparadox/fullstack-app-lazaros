export interface UserProfile {
    id: number;
    description: string;
  }
  
  export interface User {
    profileDescriptions: string;
    id?: number;
    name: string;
    profiles: UserProfile[];
  }
  