import { InMemoryDbService } from 'angular-in-memory-web-api';
import { USERS } from './mock-user';


export class InMemoryDataService implements InMemoryDbService{
  createDb(){
      const users = USERS;
      return { users};
  }

}
