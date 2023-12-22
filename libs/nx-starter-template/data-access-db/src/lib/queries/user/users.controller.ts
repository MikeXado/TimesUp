import { Controller } from '@nestjs/common';
import { UserRoute } from '@nx-starter-template/shared-dto-routers';
import {
  NestRequestShapes,
  TsRest,
  TsRestRequest,
  nestControllerContract,
} from '@ts-rest/nest';
import { UsersService } from './users.service';

const c = nestControllerContract(UserRoute);
type RequestShape = NestRequestShapes<typeof c>;
/**
 * Controller for handling user-related operations.
 */
@Controller()
export class UserController {
  constructor(private readonly UserService: UsersService) {}

  /**
   * Get all users.
   * @returns An object containing the status code and the list of users.
   */
  @TsRest(c.getUsers)
  async getUsers() {
    const users = await this.UserService.findAll();
    return {
      status: 200 as const,
      body: {
        users,
      },
    };
  }

  /**
   * Create a new user.
   * @param body - The user data.
   * @returns An object containing the status code and a success message.
   */
  @TsRest(c.createUser)
  async createUser(@TsRestRequest() { body }: RequestShape['createUser']) {
    await this.UserService.create(body);
    return {
      status: 200 as const,
      body: {
        message: 'User created',
      },
    };
  }

  /**
   * Get a user by ID.
   * @param id - The ID of the user.
   * @returns An object containing the status code and the user data.
   */
  @TsRest(c.getUser)
  async getUser(@TsRestRequest() { params: { id } }: RequestShape['getUser']) {
    const user = await this.UserService.findOne(Number(id));
    return {
      status: 200 as const,
      body: user,
    };
  }
}
