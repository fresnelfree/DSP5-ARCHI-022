import {Client, expect} from '@loopback/testlab';
import {App} from '../..';
import {setupApplication} from './test-helper';

describe('PingController', () => {
  let app: App;
  let client: Client;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  // it('invokes POST /users/register', async () => {
  //   const data ={
  //     "nom": "Teboukeu",
  //     "prenom": "fresnel",
  //     "tel": "0751508321",
  //     "email": "test@gmail.com",
  //     "adresse": "bezons",
  //     "role": "Client",
  //     "pwd": "string"
  //   }
  //   const res = await client.post('/users/register').send(data).expect(200);
  //   expect(res.body).to.have.property("mail","test@gmail.com");
  // });

  it('invokes POST /users/login', async () => {
    const data ={
      "mail": "test@gmail.com",
      "pwd": "string"
    }
    const res = await client.post('/users/login').send(data).expect(200);
    expect(res.body).to.have.property("token");
  });
});
