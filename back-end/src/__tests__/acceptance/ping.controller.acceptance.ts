import {Client, expect} from '@loopback/testlab';
import {App} from '../..';
import {setupApplication} from './test-helper';
import { Compte } from '../../models';

describe('PingController', () => {
  let app: App;
  let client: Client;
  let compte: Compte;

  before('setupApplication', async () => {
    ({app, client} = await setupApplication());
  });

  after(async () => {
    await app.stop();
  });

  it('invokes POST /comptes and clients', async () => {
    const res = await client.get('/compteWithEmail/test@gmail.com').expect(200);
    console.log("res : ",res.body.client.id)
    if (res.body) {    
      const res3 = await client.delete('/clients/'+ res.body.client.id).expect(204)      
      const res2 = await client.delete('/comptes/'+ res.body.id).expect(204)
    } 
  });

  it('invokes POST /users/register', async () => {
    const data ={
      "nom": "Teboukeu",
      "prenom": "fresnel",
      "tel": "0751508321",
      "email": "test@gmail.com",
      "adresse": "bezons",
      "role": "Client",
      "pwd": "string"
    }
    const res = await client.post('/users/register').send(data).expect(200);
    expect(res.body).to.have.property("email","test@gmail.com");
  });

  it('invokes POST /users/login', async () => {
    const data ={
      "email": "test@gmail.com",
      "pwd": "string"
    }
    const res = await client.post('/users/login').send(data).expect(200);
    expect(res.body).to.have.property("token");
  });
});
