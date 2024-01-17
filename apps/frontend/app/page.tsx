import { UserRoute } from '@nx-starter-template/shared-dto-routers';
import { initClient } from '@ts-rest/core';

/**
 * Initializes the user client.
 * @param {typeof UserRoute} route - The user route.
 * @param {string} baseUrl - The base URL for the API.
 * @param {object} baseHeaders - The base headers for the API requests.
 * @returns {UserClient} The initialized user client.
 */
const userClient = initClient(UserRoute, {
  baseUrl: 'http://localhost:3000/api',
  baseHeaders: {},
});

export default async function Index() {
  const result = await userClient.getUsers();
  if (result.status !== 200) {
    return;
  }
  return (
    <div>
      {result.body.users.map((user) => {
        return (
          <div key={user.id}>
            <h1>{user.firstName}</h1>
            <p>{user.lastName}</p>
          </div>
        );
      })}
    </div>
  );
}
