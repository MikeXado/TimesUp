import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

const UserPostSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
});
const UserSchema = z.object({
  id: z.number(),
  firstName: z.string(),
  lastName: z.string(),
  isActive: z.boolean(),
});

/**
 * Represents the UserRoute object.
 */
export const UserRoute = c.router({
  /**
   * Retrieves a list of users.
   * @returns {Promise<{ users: UserSchema[] }>} The list of users.
   */
  getUsers: {
    method: 'GET',
    path: '/users/',
    responses: {
      200: z.object({
        users: UserSchema.array(),
      }),
    },
    summary: 'Users endpoint',
  },
  /**
   * Retrieves a user by their ID.
   * @param {string} id - The ID of the user.
   * @returns {Promise<UserSchema>} The user object.
   */
  getUser: {
    method: 'GET',
    path: '/users/:id',
    responses: {
      200: UserSchema,
    },
    summary: 'Get user by id',
  },
  /**
   * Creates a new user.
   * @param {UserPostSchema} body - The user data.
   * @returns {Promise<{ message: string }>} The success message.
   */
  createUser: {
    method: 'POST',
    path: '/users',
    responses: {
      200: z.object({
        message: z.string(),
      }),
    },
    body: UserPostSchema,
    summary: 'Create user',
  },
});
