import AppDataSource from "../../configs/data-source";
import { Like, Not, Equal } from "typeorm";
import Song from "../../models/song.model";
import Listen from "../../models/listen.models";

const songRepo = AppDataSource.getRepository(Song);
const listenRepo = AppDataSource.getRepository(Listen);
class SongController {
    async getAllSongs(req, res) {
        let songs = await songRepo.find({
            relations: {
                artists: true,
                album: true
            },
            where: {
                active: 1
            },
            take : 5
        })
        res.status(200).json(songs);
    }
    async getSong(req, res, next) {
        try {
            let song = await songRepo.find({
                relations: {
                    artists: true,
                    album: true
                },
                where: {
                    id: req.params.id,
                    active: 1
                }
            })
            res.status(200).json(song);
        }
        catch (err) {
            next(err);
        }

    }
    async getSongsByTitle(req, res) {
        try {
            let songs = await songRepo.find({
                relations: {
                    album: true,
                    artists: true
                },
                where: {
                    title: Like(`%${req.query.title}%`),
                    active: 1
                }
            });
            res.status(200).json(songs);
        }
        catch (err) {
            res.status(500).json({ message: 'Invalid Query' });
        }
    }
    test(req, res) {
        console.log(req.files);
        res.end();
    }
    async getSongByCountry(req, res) {
        let songs = await songRepo.find({
            relations: {
                artists: true,
                album: true
            },
            order : {
              released : "DESC",
            },
            where : {
              country : {
                  name : req.params.name
              }
            },
            take : 5
        })
        res.status(200).json(songs);
    }
    async getSongNotFromCountry(req, res) {
        let songs = await songRepo.find({
            relations: {
                artists: true,
                album: true
            },
            order : {
                released : "DESC",
            },
            where : {
                country : {
                    name : Not(Equal(req.params.name))
                }
            },
            take : 5
        })
        res.status(200).json(songs);
    }
    async getTrendingSongs(req, res) {
        let listens = await listenRepo.find({
            relations: {
                song: {
                    album: true,
                    artists: true  }
            },
            order :{
                    year: "DESC",
                    month: "DESC",
                    count: "DESC"
            },
            take: 5
        })

        let songs = [];
        listens.forEach(listen => {
            let song = listen.song;
            song['listen'] = listen.count;
            songs.push(song);
        })
        res.status(200).json(songs);
    }
    async getAllSongsR(req, res) {
        let songs = await songRepo.find({
            relations: {
                artists: true,
                album: true
            },
            where: {
                active: 1
            },
        })
        res.status(200).json(songs);
    }
    async getTrendingSongsR(req, res) {
        let listens = await listenRepo.find({
            relations: {
                song: {
                    album: true,
                    artists: true  }
            },
            order :{
                year: "DESC",
                month: "DESC",
                count: "DESC"
            },
            take: 30
        })

        let songs = [];
        listens.forEach(listen => {
            let song = listen.song;
            song['listen'] = listen.count;
            songs.push(song);
        })
        res.status(200).json(songs);
    }
    async getSongByCountryR(req, res) {
        let songs = await songRepo.find({
            relations: {
                artists: true,
                album: true
            },
            order : {
                released : "DESC",
            },
            where : {
                country : {
                    name : req.params.name
                }
            },
        })
        res.status(200).json(songs);
    }

}

let songController = new SongController()

export default songController;
