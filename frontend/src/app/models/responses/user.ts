export interface User {
    tpk_name: string;
    tpk_email: string;
    tpk_photoUrl?: string;
    tpk_firebaseid: string
  }

export interface UserDetails {
  user: User
}


export interface ParkerSinginResponse {
  parker_token: string,
  user: User
}