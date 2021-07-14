'use strict';

const express = require(`express`);
const SequelizeStore = require(`connect-session-sequelize`)(session.Store);

const articlesRoutes = require(`./routes/articles-routes`);
const myRoutes = require(`./routes/my-routes`);
const mainRoutes = require(`./routes/main-routes`);

const DEFAULT_PORT = 8080;

const app = express();

const path = require(`path`);

const sequelize = require(`../service/lib/sequelize`);

const { SESSION_SECRET } = process.env;
if (!SESSION_SECRET) {
    throw new Error(`SESSION_SECRET environment variable is not defined`);
}

const mySessionStore = new SequelizeStore({
    db: sequelize,
    expiration: 180000,
    checkExpirationInterval: 60000
});

sequelize.sync({ force: false });

app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: SESSION_SECRET,
    store: mySessionStore,
    resave: false,
    proxy: true,
    saveUninitialized: false,
  }));

const PUBLIC_DIR = `public`;
app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set(`views`, path.resolve(__dirname, `templates`));
app.set(`view engine`, `pug`);

app.use(`/articles`, articlesRoutes);
app.use(`/my`, myRoutes);
app.use(`/`, mainRoutes);

app.listen(DEFAULT_PORT);