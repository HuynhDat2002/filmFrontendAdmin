export interface LoginProps{
   isOpen:boolean,
   onClose:any,
   openSignUp:()=>void,
   openForgot:()=>void
}
export interface LoginValueProps{
    email:string,
    password:string
}

export interface SignProps{
    isOpen:boolean,
   onClose:any,
   openLogin:any,
   openVerifySign:()=>void
}

export interface SignUpValueProps{
    name:string,
    email:string,
    password:string,
    confirmPassword:string
}
export interface ForgotProps{
    isOpen:boolean, onClose:()=>void, openLogin:()=>void,openVerify:()=>void
}
export interface ResetProps{
    isOpen:boolean, onClose:()=>void, openLogin:()=>void,openSuccess:()=>void
}
export interface VerifyProps{
    isOpen:boolean, onClose:()=>void, openLogin:()=>void,openReset:()=>void
}

export interface VerifySignProps{
    isOpen:boolean, onClose:()=>void, openLogin:()=>void,openSuccess:()=>void
}
export interface SuccessProps{
    isOpen:boolean, onClose:()=>void, openLogin:()=>void

}

export interface SuccessChangePasswordProps{
    isOpen:boolean, onClose:()=>void

}

export interface ChangePasswordProps{
    isOpen:boolean, onClose:()=>void,openSuccess:()=>void
}