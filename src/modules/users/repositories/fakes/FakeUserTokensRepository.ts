import { v4 as uuid } from 'uuid';

import IUserTokensRepository from '@modules/users/repositories/IUserTokensRepository';
import UserToken from '../../infra/typeorm/entities/UserToken';

class FakeUserTokensRepository implements IUserTokensRepository {
  userTokens: UserToken[] = [];

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.userTokens.push(userToken);

    return userToken;
  }

  public async findByToken(token: string): Promise<UserToken | undefined> {
    const hasToken = this.userTokens.find(
      userToken => userToken.token === token,
    );

    return hasToken;
  }
}

export default FakeUserTokensRepository;