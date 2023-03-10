import DataSource from "./src/configs/data-source";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import authRouter from "./src/routers/auth.router";
import songService from "./src/routers/admin/song.router"
import adminArtistRouter from "./src/routers/admin/artist.router";
import albumRouter from "./src/routers/admin/album.router";
import adminSubscriptionRouter from "./src/routers/admin/subscription.router";
import checkAuthentication from "./src/middlewares/checkAuthentication";
import checkAuthorization from "./src/middlewares/checkAuthorization";
import cookieParser from "cookie-parser";
import userRouter from "./src/routers/user/user.router";
import playlistRouter from "./src/routers/user/playlist.router";
import buyVipRouter from "./src/routers/user/buyvip.router";
import searchRouter from "./src/routers/user/search.router";
import songRouter from "./src/routers/user/song.router";
import aritstRouter from "./src/routers/user/artist.router";
import albumsRouter from "./src/routers/user/albums.router";

dotenv.config();
const app = express();
const PORT = process.env.APP_PORT;

app.use(cors({
    credentials: true,
    origin: "http://localhost:3000",
    methods: ['POST', 'PUT', 'GET', 'OPTIONS', 'HEAD'],
}));
app.use(cookieParser());
app.use('/api/auth', authRouter);
app.use('/api/song', songRouter);
app.use('/api/artist', aritstRouter);
app.use('/api/album',albumsRouter);
app.use('/api/search', searchRouter);
app.use(checkAuthentication);
app.use('/api/user', userRouter);
app.use('/api/playlist', playlistRouter);
app.use('/api/subscription', buyVipRouter);
app.use(checkAuthorization);
app.use('/api/admin/artist',adminArtistRouter)
app.use('/api/admin/album',albumRouter);
app.use('/api/admin/song', songService);
app.use('/api/admin/subscription', adminSubscriptionRouter);
app.use((err, req, res, next) => {
    console.log('error happened');
    next(err);
})

DataSource.initialize()
.then(() => {
    console.log("Data Source has been initialized!")
})
.catch((err) => {
    console.error("Error during Data Source initialization", err)
});

app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})

