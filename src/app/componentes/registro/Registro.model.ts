export interface Registro {
    new?: boolean;
    id?: number;
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    rut?: string;
    registroForm:any;
}

export interface RegistroResponse {
    new?: boolean;
    id?: number;
    name?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    rut?: string;

}