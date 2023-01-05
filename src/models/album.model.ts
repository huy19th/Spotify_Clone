import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne} from 'typeorm';
import Song from './song.model';
import Artist from './artist.model';

@Entity()
class Album {
    @PrimaryGeneratedColumn({type: 'int'})
    readonly id: number;
    @Column({type: 'nvarchar', length: 100, nullable: false})
    name: string;
    @ManyToOne(() => Artist, (artist) => artist.albums)
    artist: Artist;
    @Column({type: Date})
    released: Date;
    @OneToMany(() => Song, (song) => song.album)
    songs: Song[]
}

export default Album