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

  it('invokes POST /Compte', async () => {
    const data = {
      "mail": "string@gmal.com",
      "pwd": "string"
    }
    const res = await client.post('/users/register').send(data).expect(200);
    expect(res.body).to.have.property("mail","string@gmal.com");
  });
});
