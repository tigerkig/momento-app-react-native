export interface UserModel{
    firstName: string;
    lastName: string;
    contactNumber: string;
    email: string,    
}
 
export interface UserState{
    uid: string;
    error: string | undefined;
}

