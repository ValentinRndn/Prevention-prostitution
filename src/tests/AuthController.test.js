import { expect } from 'chai';
import sinon from 'sinon';
import jwt from 'jsonwebtoken';
import { authentification } from '../../api/controllers/utilisateurController.js';
import User from '../../api/class/utilisateur.class.js'; // Assuming User model is defined in models/User.js
import db from '../../api/services/db.js'; // Assuming db is defined in db.js
import dotenv from 'dotenv';

// Charger les variables d'environnement
dotenv.config({ path: '.env.local' });

describe('Authentification Controller', () => {
    let req, res, dbInstance, user;

    beforeEach(() => {
        req = {
            body: {
                pseudonyme: 'testuser',
                mdp: 'password123'
            }
        };

        res = {
            status: sinon.stub().returnsThis(),
            json: sinon.stub()
        };

        user = {
            pseudonyme: 'testuser',
            mdp: 'password123'
        };

        sinon.stub(User, 'fromMap').returns(user);

        dbInstance = {
            query: sinon.stub()
        };

        sinon.stub(db, 'getInstance').returns(dbInstance);
    });

    afterEach(() => {
        sinon.restore();
    });

    it('should return 200 and a token for valid credentials', (done) => {
        const result = [{ id: 1, pseudonyme: 'testuser' }];
        dbInstance.query.yields(null, result);

        const tokenStub = sinon.stub(jwt, 'sign').callsFake((payload, secret, options, callback) => {
            callback(null, 'fakeToken');
        });

        authentification(req, res);

        process.nextTick(() => {
            console.log("res.status:", res.status.args);
            console.log("res.json:", res.json.args);
            expect(res.status.calledWith(200)).to.be.true;
            expect(res.json.calledWith(sinon.match.has('Token'))).to.be.true;
            tokenStub.restore();
            done();
        });
    });

    it('should return 401 for invalid credentials', (done) => {
        dbInstance.query.yields(null, []);

        authentification(req, res);

        process.nextTick(() => {
            expect(res.status.calledWith(401)).to.be.true;
            expect(res.json.calledWith({ message: "Authentification échouée" })).to.be.true;
            done();
        });
    });

    it('should return 500 for database errors', (done) => {
        dbInstance.query.yields(new Error('Database error'), null);

        authentification(req, res);

        process.nextTick(() => {
            expect(res.status.calledWith(500)).to.be.true;
            expect(res.json.calledWith({ error: "Erreur lors de l'authentification" })).to.be.true;
            done();
        });
    });
});