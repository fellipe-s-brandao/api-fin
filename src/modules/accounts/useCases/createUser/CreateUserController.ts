import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { name, username, email, password, birth_date, gender, phone} = request.body;

        const createUserUseCase = container.resolve(CreateUserUseCase)

        await createUserUseCase.execute({ name, username, email, password, birth_date, gender, phone});

        return response.status(201).send();
    }
}

export { CreateUserController };