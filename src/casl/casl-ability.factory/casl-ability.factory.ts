import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { AccountForToken } from 'src/auth/dto/AccountForToken';
import { Role } from 'src/decorator/role.enum';
import { PostForResponse } from 'src/post/dto/PostForResponse';
import { UserForResponse } from 'src/user/dto/UserForResponse';

export enum Action {
  Manage = 'manage',
  Create = 'create',
  Read = 'read',
  Update = 'update',
  Delete = 'delete',
}
export type Subjects =
  | InferSubjects<
    typeof AccountForToken | typeof PostForResponse | typeof UserForResponse
  >
  | 'all';
export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  defineAbility(account: AccountForToken) {
    // define detail rule
    const { can, build } = new AbilityBuilder(
      Ability as AbilityClass<AppAbility>,
    );
    if (account?.roles.includes(Role.Admin)) {
      //IF ADMIN, you can do anything;
      can(Action.Manage, 'all');
    } else {
      //This is USER PERMISION
      can(Action.Read, 'all');
      can(Action.Update, PostForResponse, {
        accountId: account.id,
      });
      can(Action.Delete, PostForResponse, {
        accountId: account.id,
      });

      can(Action.Read, UserForResponse);
      can(Action.Update, UserForResponse, {
        id: account.id,
      });
    }
    return build({
      detectSubjectType: (subject) =>
        subject.constructor as ExtractSubjectType<Subjects>,
    });
  }
}
