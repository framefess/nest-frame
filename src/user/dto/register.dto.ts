export class RegisterDTO {
    readonly id?: string;
    readonly email: string;
    readonly password: string;
    readonly name: string;
    readonly tel: string;
    readonly isActive?: boolean;
}
