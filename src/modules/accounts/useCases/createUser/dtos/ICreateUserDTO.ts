interface ICreateUserDTO {
    name: string;
    username: string;
    email: string;
    phone: string;
    password: string;
    birth_date: Date;
    gender: number;
    custom_gender?: string;
    avatar?: string;
};

export { ICreateUserDTO };