import 'mocha';
import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { connectMongoDB } from '../src/db';
import * as dotenv from 'dotenv';
import { resolve } from 'path';

dotenv.config({
    path: resolve(__dirname, '../.env'),
});

const server = require('../src/server').default;

chai.should();
chai.use(chaiHttp);
const expect = chai.expect;

after((done) => {
    process.exit(0);
});

describe('This is a first test', () => {
    it('Expect return ok', (done) => {
        const isTrue = true;
        expect(isTrue).to.be.a('boolean').and.equal(true);
        done();
    });

    it('Expect to get request from server', (done) => {
        chai.request(server)
            .get('/')
            .send({})
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.a('string');
                done();
            });
    });
});
