import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import { NestRequestShapes, nestControllerContract } from '@ts-rest/nest';
import { UserRoute } from '@nx-starter-template/shared-dto-routers';

const c = nestControllerContract(UserRoute);
type RequestShape = NestRequestShapes<typeof c>;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  /**
   * Creates a new user.
   * @param createUserDto The data for creating a user.
   * @returns A promise that resolves to the created user.
   */
  create(createUserDto: RequestShape['createUser']['body']): Promise<User> {
    const user = new User();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;
    return this.userRepository.save(user);
  }

  /**
   * Retrieves all users from the database.
   * @returns A promise that resolves to an array of User objects.
   */
  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }
  /**
   * Finds a user by their ID.
   * @param id - The ID of the user to find.
   * @returns A promise that resolves to the found user or null if not found.
   */
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id: id });
  }

  /**
   * Removes a user by their ID.
   * @param id The ID of the user to remove.
   * @returns A Promise that resolves when the user is successfully removed.
   */
  async remove(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
