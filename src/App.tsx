import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Search, Film, Music, Star, User, Play, Pause, Volume2, VolumeX,
  Filter, Bot, Sparkles, Activity, ShieldCheck, CheckCircle2, XCircle,
  Plus, Trash2, ExternalLink, Heart, Bookmark, BarChart3, SlidersHorizontal,
  RefreshCw, Sun, Moon, Layers, Info, AlertCircle, Check, ChevronRight,
  Clock, Globe, Calendar, Radio, Award, Terminal, Settings, X, Tag, ArrowUpRight, Key
} from 'lucide-react';

// ==========================================
// 1. DATA MODELS & SEED DATABASE
// ==========================================

const SEED_FILMS = [
  {
    id: 'film-1',
    wikidataId: 'Q25188',
    title: 'Inception',
    originalTitle: 'Inception',
    releaseYear: 2010,
    releaseDate: '2010-07-16',
    director: 'Christopher Nolan',
    directorId: 'Q4405',
    cast: ['Leonardo DiCaprio', 'Joseph Gordon-Levitt', 'Elliot Page', 'Tom Hardy', 'Ken Watanabe', 'Marion Cotillard'],
    genres: ['Science Fiction', 'Action', 'Thriller'],
    country: 'United States',
    language: 'English',
    runtime: 148,
    wikipediaSummary: 'Inception is a 2010 science fiction action film written and directed by Christopher Nolan. The film stars Leonardo DiCaprio as a professional thief who steals information by infiltrating the subconscious of his targets.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Inception',
    posterUrl: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/inception',
    ratingCount: 1840,
    totalScoreSum: 16560, // Avg 9.0
    ratingsDistribution: { unbearable: 12, horrible: 28, decent: 120, good: 480, masterpiece: 1200 },
  },
  {
    id: 'film-2',
    wikidataId: 'Q104123',
    title: 'Pulp Fiction',
    originalTitle: 'Pulp Fiction',
    releaseYear: 1994,
    releaseDate: '1994-10-14',
    director: 'Quentin Tarantino',
    directorId: 'Q3772',
    cast: ['John Travolta', 'Samuel L. Jackson', 'Uma Thurman', 'Bruce Willis', 'Ving Rhames', 'Harvey Keitel'],
    genres: ['Crime', 'Drama'],
    country: 'United States',
    language: 'English',
    runtime: 154,
    wikipediaSummary: 'Pulp Fiction is a 1994 American independent crime film written and directed by Quentin Tarantino. It tells several interconnected stories of Los Angeles crime.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Pulp_Fiction',
    posterUrl: 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/pulp-fiction',
    ratingCount: 2100,
    totalScoreSum: 19320, // Avg 9.2
    ratingsDistribution: { unbearable: 10, horrible: 30, decent: 110, good: 450, masterpiece: 1500 },
  },
  {
    id: 'film-3',
    wikidataId: 'Q13417189',
    title: 'Interstellar',
    originalTitle: 'Interstellar',
    releaseYear: 2014,
    releaseDate: '2014-11-07',
    director: 'Christopher Nolan',
    directorId: 'Q4405',
    cast: ['Matthew McConaughey', 'Anne Hathaway', 'Jessica Chastain', 'Michael Caine', 'Matt Damon'],
    genres: ['Science Fiction', 'Drama', 'Adventure'],
    country: 'United States',
    language: 'English',
    runtime: 169,
    wikipediaSummary: 'Interstellar is a 2014 epic science fiction film co-written, directed, and produced by Christopher Nolan. It follows a group of astronauts who travel through a wormhole in search of a new home for humanity.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Interstellar_(film)',
    posterUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/interstellar',
    ratingCount: 1950,
    totalScoreSum: 17745, // Avg 9.1
    ratingsDistribution: { unbearable: 15, horrible: 35, decent: 100, good: 500, masterpiece: 1300 },
  },
  {
    id: 'film-4',
    wikidataId: 'Q212086',
    title: 'La La Land',
    originalTitle: 'La La Land',
    releaseYear: 2016,
    releaseDate: '2016-12-09',
    director: 'Damien Chazelle',
    directorId: 'Q16208885',
    cast: ['Ryan Gosling', 'Emma Stone', 'John Legend', 'Rosemarie DeWitt', 'J.K. Simmons'],
    genres: ['Musical', 'Romance', 'Drama'],
    country: 'United States',
    language: 'English',
    runtime: 128,
    wikipediaSummary: 'La La Land is a 2016 American romantic musical drama film written and directed by Damien Chazelle. It stars Ryan Gosling as a jazz pianist and Emma Stone as an aspiring actress in Los Angeles.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/La_La_Land',
    posterUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/la-la-land',
    ratingCount: 1420,
    totalScoreSum: 12070, // Avg 8.5
    ratingsDistribution: { unbearable: 20, horrible: 50, decent: 150, good: 500, masterpiece: 700 },
  },
  {
    id: 'film-5',
    wikidataId: 'Q463380',
    title: 'Amélie',
    originalTitle: 'Le Fabuleux Destin d\'Amélie Poulain',
    releaseYear: 2001,
    releaseDate: '2001-04-25',
    director: 'Jean-Pierre Jeunet',
    directorId: 'Q208220',
    cast: ['Audrey Tautou', 'Mathieu Kassovitz', 'Rufus', 'Lorella Cravotta', 'Serge Merlin'],
    genres: ['Romance', 'Comedy'],
    country: 'France',
    language: 'French',
    runtime: 122,
    wikipediaSummary: 'Amélie is a 2001 French romantic comedy film directed by Jean-Pierre Jeunet. The film is a whimsical depiction of contemporary Parisian life, set in Montmartre.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Am%C3%A9lie',
    posterUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/amelie',
    ratingCount: 980,
    totalScoreSum: 8624, // Avg 8.8
    ratingsDistribution: { unbearable: 8, horrible: 22, decent: 70, good: 380, masterpiece: 500 },
  },
  {
    id: 'film-6',
    wikidataId: 'Q63348821',
    title: 'Dune: Part One',
    originalTitle: 'Dune',
    releaseYear: 2021,
    releaseDate: '2021-10-22',
    director: 'Denis Villeneuve',
    directorId: 'Q1187607',
    cast: ['Timothée Chalamet', 'Rebecca Ferguson', 'Oscar Isaac', 'Josh Brolin', 'Zendaya', 'Javier Bardem'],
    genres: ['Science Fiction', 'Adventure'],
    country: 'United States',
    language: 'English',
    runtime: 155,
    wikipediaSummary: 'Dune is a 2021 epic science fiction film directed by Denis Villeneuve. It follows Paul Atreides as his family is thrust into a war for the dangerous desert planet Arrakis.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Dune_(2021_film)',
    posterUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/dune-2021',
    ratingCount: 1650,
    totalScoreSum: 14190, // Avg 8.6
    ratingsDistribution: { unbearable: 15, horrible: 45, decent: 140, good: 650, masterpiece: 800 },
  },
  {
    id: 'film-7',
    wikidataId: 'Q47703',
    title: 'The Godfather',
    originalTitle: 'The Godfather',
    releaseYear: 1972,
    releaseDate: '1972-03-24',
    director: 'Francis Ford Coppola',
    directorId: 'Q56094',
    cast: ['Marlon Brando', 'Al Pacino', 'James Caan', 'Robert Duvall', 'Diane Keaton'],
    genres: ['Crime', 'Drama'],
    country: 'United States',
    language: 'English',
    runtime: 175,
    wikipediaSummary: 'The Godfather is a 1972 American crime film directed by Francis Ford Coppola. It is widely regarded as one of the greatest and most influential films ever made.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/The_Godfather',
    posterUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/the-godfather',
    ratingCount: 2450,
    totalScoreSum: 23765, // Avg 9.7
    ratingsDistribution: { unbearable: 5, horrible: 15, decent: 50, good: 380, masterpiece: 2000 },
  },
  {
    id: 'film-8',
    wikidataId: 'Q155653',
    title: 'Spirited Away',
    originalTitle: 'Sen to Chihiro no Kamikakushi',
    releaseYear: 2001,
    releaseDate: '2001-07-20',
    director: 'Hayao Miyazaki',
    directorId: 'Q55400',
    cast: ['Rumi Hiiragi', 'Miyu Irino', 'Mari Natsuki', 'Takeshi Naito'],
    genres: ['Animation', 'Fantasy', 'Adventure'],
    country: 'Japan',
    language: 'Japanese',
    runtime: 125,
    wikipediaSummary: 'Spirited Away is a 2001 Japanese animated fantasy film written and directed by Hayao Miyazaki. It tells the story of Chihiro, a 10-year-old girl who enters the world of spirits.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Spirited_Away',
    posterUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/spirited-away',
    ratingCount: 1780,
    totalScoreSum: 16910, // Avg 9.5
    ratingsDistribution: { unbearable: 8, horrible: 12, decent: 60, good: 400, masterpiece: 1300 },
  },
  {
    id: 'film-9',
    wikidataId: 'Q61080688',
    title: 'Parasite',
    originalTitle: 'Gisaengchung',
    releaseYear: 2019,
    releaseDate: '2019-05-30',
    director: 'Bong Joon-ho',
    directorId: 'Q494597',
    cast: ['Song Kang-ho', 'Lee Sun-kyun', 'Cho Yeo-jeong', 'Choi Woo-shik', 'Park So-dam'],
    genres: ['Thriller', 'Drama', 'Comedy'],
    country: 'South Korea',
    language: 'Korean',
    runtime: 132,
    wikipediaSummary: 'Parasite is a 2019 South Korean black comedy thriller film directed by Bong Joon-ho. It follows a poor family who scheme to become employed by a wealthy family.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Parasite_(2019_film)',
    posterUrl: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/parasite-2019',
    ratingCount: 1690,
    totalScoreSum: 15548, // Avg 9.2
    ratingsDistribution: { unbearable: 10, horrible: 30, decent: 100, good: 450, masterpiece: 1100 },
  },
  {
    id: 'film-10',
    wikidataId: 'Q108839994',
    title: 'Oppenheimer',
    originalTitle: 'Oppenheimer',
    releaseYear: 2023,
    releaseDate: '2023-07-21',
    director: 'Christopher Nolan',
    directorId: 'Q4405',
    cast: ['Cillian Murphy', 'Emily Blunt', 'Matt Damon', 'Robert Downey Jr.', 'Florence Pugh'],
    genres: ['Biography', 'Drama', 'History'],
    country: 'United States',
    language: 'English',
    runtime: 180,
    wikipediaSummary: 'Oppenheimer is a 2023 epic biographical thriller film written and directed by Christopher Nolan. It chronicles the career of theoretical physicist J. Robert Oppenheimer.',
    wikipediaUrl: 'https://en.wikipedia.org/wiki/Oppenheimer_(film)',
    posterUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=800&q=80',
    bannerUrl: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1600&q=80',
    externalWatchUrl: 'https://www.justwatch.com/us/movie/oppenheimer',
    ratingCount: 1890,
    totalScoreSum: 17577, // Avg 9.3
    ratingsDistribution: { unbearable: 8, horrible: 22, decent: 80, good: 480, masterpiece: 1300 },
  }
];

const SEED_ARTISTS = [
  {
    id: 'artist-1',
    mbid: 'e6a38710-0182-41b9-9730-18231f133496',
    name: 'Hans Zimmer',
    country: 'Germany',
    type: 'Person',
    bio: 'German film score composer and music producer. Winner of two Academy Awards and four Grammys, renowned for Inception, Interstellar, Dune, and The Dark Knight.',
    artworkUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    itunesArtistUrl: 'https://music.apple.com/us/artist/hans-zimmer/233083',
    ratingCount: 3100,
    followerCount: 1240,
  },
  {
    id: 'artist-2',
    mbid: '45d47e8e-d9e2-4113-a4c3-a3d8ee2845c2',
    name: 'Justin Hurwitz',
    country: 'United States',
    type: 'Person',
    bio: 'American film composer and writer, best known for his Academy Award-winning collaborations with director Damien Chazelle on La La Land and Whiplash.',
    artworkUrl: 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=600&q=80',
    itunesArtistUrl: 'https://music.apple.com/us/artist/justin-hurwitz/414574971',
    ratingCount: 1200,
    followerCount: 580,
  },
  {
    id: 'artist-3',
    mbid: '67c3b2dd-3081-420a-9d93-c918ee9108e4',
    name: 'Yann Tiersen',
    country: 'France',
    type: 'Person',
    bio: 'French musician and composer. Acclaimed worldwide for his minimalist acoustic score for Jean-Pierre Jeunet\'s 2001 romantic film Amélie.',
    artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    itunesArtistUrl: 'https://music.apple.com/us/artist/yann-tiersen/1594967',
    ratingCount: 890,
    followerCount: 410,
  },
  {
    id: 'artist-4',
    mbid: '4101e233-a3b0-4660-8459-24aa17961208',
    name: 'Ennio Morricone',
    country: 'Italy',
    type: 'Person',
    bio: 'Italian composer and conductor who composed music for over 400 film and television projects.',
    artworkUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=600&q=80',
    itunesArtistUrl: 'https://music.apple.com/us/artist/ennio-morricone/124158',
    ratingCount: 2800,
    followerCount: 1950,
  },
  {
    id: 'artist-5',
    mbid: '9211d137-f8e1-4c12-92a2-3f04b2a8f89e',
    name: 'Ludwig Göransson',
    country: 'Sweden',
    type: 'Person',
    bio: 'Academy and Grammy Award-winning Swedish composer known for Oppenheimer, Black Panther, and The Mandalorian.',
    artworkUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    itunesArtistUrl: 'https://music.apple.com/us/artist/ludwig-goransson/324108848',
    ratingCount: 1450,
    followerCount: 820,
  }
];

const SEED_ALBUMS = [
  {
    id: 'album-1',
    mbid: '8a5f36e3-df46-4cb2-8700-1c0b31b34a66',
    filmId: 'film-1',
    title: 'Inception (Music from the Motion Picture)',
    artistId: 'artist-1',
    artistName: 'Hans Zimmer',
    releaseYear: 2010,
    artworkUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80',
    itunesStoreUrl: 'https://music.apple.com/us/album/inception-music-from-the-motion-picture/380349902',
    mappingConfidence: 'VERIFIED',
    mappingSource: 'MusicBrainz Official Release Group',
  },
  {
    id: 'album-2',
    mbid: 'b7582b1d-8f25-4f7b-99f8-7d88bfed8d12',
    filmId: 'film-3',
    title: 'Interstellar (Original Motion Picture Soundtrack)',
    artistId: 'artist-1',
    artistName: 'Hans Zimmer',
    releaseYear: 2014,
    artworkUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80',
    itunesStoreUrl: 'https://music.apple.com/us/album/interstellar-original-motion-picture-soundtrack/937011283',
    mappingConfidence: 'VERIFIED',
    mappingSource: 'MusicBrainz Official Release Group',
  },
  {
    id: 'album-3',
    mbid: 'c2288002-392b-45e7-a72a-60586e9b4009',
    filmId: 'film-4',
    title: 'La La Land (Original Motion Picture Soundtrack)',
    artistId: 'artist-2',
    artistName: 'Justin Hurwitz',
    releaseYear: 2016,
    artworkUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80',
    itunesStoreUrl: 'https://music.apple.com/us/album/la-la-land-original-motion-picture-soundtrack/1173722234',
    mappingConfidence: 'VERIFIED',
    mappingSource: 'Apple iTunes Motion Picture Catalogue',
  },
  {
    id: 'album-4',
    mbid: 'e1d82129-9e8a-40a2-9d33-31f08e5e89d1',
    filmId: 'film-5',
    title: 'Amélie (Bande Originale du Film)',
    artistId: 'artist-3',
    artistName: 'Yann Tiersen',
    releaseYear: 2001,
    artworkUrl: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=600&q=80',
    itunesStoreUrl: 'https://music.apple.com/us/album/amelie-original-soundtrack/697193630',
    mappingConfidence: 'VERIFIED',
    mappingSource: 'MusicBrainz Official Soundtrack Release',
  },
  {
    id: 'album-5',
    mbid: 'f3918201-921d-4001-a128-410a8b9e1122',
    filmId: 'film-10',
    title: 'Oppenheimer (Original Motion Picture Soundtrack)',
    artistId: 'artist-5',
    artistName: 'Ludwig Göransson',
    releaseYear: 2023,
    artworkUrl: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=600&q=80',
    itunesStoreUrl: 'https://music.apple.com/us/album/oppenheimer-original-motion-picture-soundtrack/1697204918',
    mappingConfidence: 'VERIFIED',
    mappingSource: 'MusicBrainz Official Release Group',
  }
];

const SEED_TRACKS = [
  {
    id: 'track-1',
    mbid: '5f9b4c09-411a-4d2b-bc62-0e2f9d6c268f',
    albumId: 'album-1',
    filmId: 'film-1',
    title: 'Time',
    artistName: 'Hans Zimmer',
    trackNumber: 12,
    durationMs: 275000,
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/bf/16/e0/bf16e0f3-8b7c-ef92-75ca-c9a77ee8434a/mzaf_13506822830234479100.plus.aac.p.m4a',
    itunesTrackUrl: 'https://music.apple.com/us/album/time/380349902?i=380350109',
    ratingCount: 1400,
    totalScoreSum: 13440, // Avg 9.6
  },
  {
    id: 'track-2',
    mbid: '1c6d3283-3e11-4835-97e3-0d3f8221d600',
    albumId: 'album-1',
    filmId: 'film-1',
    title: 'Dream Is Collapsing',
    artistName: 'Hans Zimmer',
    trackNumber: 2,
    durationMs: 143000,
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ed/3e/20/ed3e2009-8d76-5636-ee29-79a0b1684c3f/mzaf_17208154988775496884.plus.aac.p.m4a',
    itunesTrackUrl: 'https://music.apple.com/us/album/dream-is-collapsing/380349902?i=380349908',
    ratingCount: 890,
    totalScoreSum: 8010, // Avg 9.0
  },
  {
    id: 'track-3',
    mbid: '7b80a18f-39d2-43bb-a33e-436fbfd148e2',
    albumId: 'album-2',
    filmId: 'film-3',
    title: 'Cornfield Chase',
    artistName: 'Hans Zimmer',
    trackNumber: 3,
    durationMs: 126000,
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/ca/8f/6f/ca8f6fdf-71d6-84fa-b4ed-2023023fb55c/mzaf_12402138541528646965.plus.aac.p.m4a',
    itunesTrackUrl: 'https://music.apple.com/us/album/cornfield-chase/937011283?i=937011293',
    ratingCount: 1620,
    totalScoreSum: 15714, // Avg 9.7
  },
  {
    id: 'track-4',
    mbid: '3d8a9e2f-5182-411a-8e2b-11c798b0f12a',
    albumId: 'album-3',
    filmId: 'film-4',
    title: 'City of Stars',
    artistName: 'Ryan Gosling & Emma Stone',
    trackNumber: 6,
    durationMs: 149000,
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview125/v4/91/92/83/919283e3-7bc0-2059-ff27-894762cf8369/mzaf_15082101344485501865.plus.aac.p.m4a',
    itunesTrackUrl: 'https://music.apple.com/us/album/city-of-stars/1173722234?i=1173722384',
    ratingCount: 1100,
    totalScoreSum: 9680, // Avg 8.8
  },
  {
    id: 'track-5',
    mbid: '01a2b3c4-d5e6-7f8a-9b0c-1d2e3f4a5b6c',
    albumId: 'album-4',
    filmId: 'film-5',
    title: 'Comptine d\'un autre été: L\'après-midi',
    artistName: 'Yann Tiersen',
    trackNumber: 4,
    durationMs: 140000,
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview115/v4/8d/62/7b/8d627b0c-4861-f093-6e79-519e912f2c81/mzaf_10672049187313083311.plus.aac.p.m4a',
    itunesTrackUrl: 'https://music.apple.com/us/album/comptine-dun-autre-ete-lapres-midi/697193630?i=697193798',
    ratingCount: 950,
    totalScoreSum: 9025, // Avg 9.5
  },
  {
    id: 'track-6',
    mbid: '9f8e7d6c-5b4a-3f2e-1d0c-9b8a7f6e5d4c',
    albumId: 'album-5',
    filmId: 'film-10',
    title: 'Can You Hear The Music',
    artistName: 'Ludwig Göransson',
    trackNumber: 2,
    durationMs: 110000,
    previewUrl: '',
    itunesTrackUrl: 'https://music.apple.com/us/album/can-you-hear-the-music/1697204918?i=1697204920',
    ratingCount: 1320,
    totalScoreSum: 12804, // Avg 9.7
  }
];

// ==========================================
// 2. RATING & POPULARITY MATH ENGINE
// ==========================================

export function getRatingCategory(score) {
  if (score <= 1.0) return { key: 'unbearable', label: 'Unbearable', color: '#EF4444' };
  if (score <= 5.0) return { key: 'horrible', label: 'Horrible', color: '#F97316' };
  if (score <= 6.0) return { key: 'decent', label: 'Decent', color: '#EAB308' };
  if (score <= 8.0) return { key: 'good', label: 'Good', color: '#3B82F6' };
  return { key: 'masterpiece', label: 'Masterpiece', color: '#8B5CF6' };
}

export function validateRatingValue(score) {
  if (typeof score !== 'number' || isNaN(score)) return false;
  if (score < 0.5 || score > 10.0) return false;
  const remainder = (score * 10) % 5;
  return remainder === 0;
}

export function calculatePopularityIndex(itemRatingCount, maxRatingCountForType) {
  if (!maxRatingCountForType || maxRatingCountForType <= 0 || !itemRatingCount) return 0;
  const index = (100 * itemRatingCount) / maxRatingCountForType;
  return Math.min(100, Math.round(index * 10) / 10);
}

export function calculateDerivedAlbumRating(albumTracks, trackRatingsMap) {
  let totalScore = 0;
  let ratedTracksCount = 0;

  albumTracks.forEach((track) => {
    const userRating = trackRatingsMap[track.id];
    if (userRating && userRating > 0) {
      totalScore += userRating;
      ratedTracksCount += 1;
    } else if (track.ratingCount > 0 && track.totalScoreSum > 0) {
      const avg = track.totalScoreSum / track.ratingCount;
      totalScore += avg;
      ratedTracksCount += 1;
    }
  });

  if (ratedTracksCount === 0) return { avgScore: 0, ratedTracksCount: 0 };
  const avgScore = Math.round((totalScore / ratedTracksCount) * 10) / 10;
  return { avgScore, ratedTracksCount };
}

// Web Audio API synthesizer fallback
let audioCtx = null;
let activeSynthNodes = [];

function stopSynthesizedPreview() {
  activeSynthNodes.forEach((node) => {
    try { node.stop(); } catch (e) {}
    try { node.disconnect(); } catch (e) {}
  });
  activeSynthNodes = [];
}

function playSynthesizedPreview(trackTitle, onEndCallback) {
  stopSynthesizedPreview();
  try {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return false;
    if (!audioCtx) audioCtx = new AudioContext();
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const baseFreq = 220 + (((trackTitle || '').length * 17) % 220);
    const chords = [baseFreq, baseFreq * 1.25, baseFreq * 1.5, baseFreq * 1.875];
    const now = audioCtx.currentTime;

    chords.forEach((freq, idx) => {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.01, now);
      gain.gain.exponentialRampToValueAtTime(0.12, now + 0.3 + idx * 0.2);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 5.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now + idx * 0.25);
      osc.stop(now + 5.5);

      activeSynthNodes.push(osc);
    });

    setTimeout(() => {
      onEndCallback?.();
    }, 5500);

    return true;
  } catch (err) {
    console.warn('Web Audio synthesis failed:', err);
    return false;
  }
}

// ==========================================
// 3. NO-API-KEY PROVIDER ADAPTERS
// ==========================================

const WikidataProvider = {
  async fetchFilmDetails(filmTitle) {
    const sparqlQuery = `
      SELECT ?film ?filmLabel ?directorLabel ?pubdate WHERE {
        ?film rdfs:label "${filmTitle}"@en.
        OPTIONAL { ?film wdt:P57 ?director. }
        OPTIONAL { ?film wdt:P577 ?pubdate. }
        SERVICE wikibase:label { bd:serviceParam wikibase:language "[AUTO_LANGUAGE],en". }
      } LIMIT 3
    `;
    const url = `https://query.wikidata.org/sparql?query=${encodeURIComponent(sparqlQuery)}&format=json`;
    const startTime = performance.now();
    try {
      const response = await fetch(url, { headers: { Accept: 'application/sparql-results+json' } });
      const latency = Math.round(performance.now() - startTime);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { status: 200, latency, resultsCount: data.results?.bindings?.length || 0, data };
    } catch (err) {
      return { status: 500, latency: Math.round(performance.now() - startTime), error: err.message };
    }
  }
};

const WikipediaProvider = {
  async fetchSummary(title) {
    const formattedTitle = encodeURIComponent(title.replace(/ /g, '_'));
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${formattedTitle}`;
    const startTime = performance.now();
    try {
      const response = await fetch(url);
      const latency = Math.round(performance.now() - startTime);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { status: 200, latency, title: data.title, extract: data.extract, thumbnail: data.thumbnail?.source };
    } catch (err) {
      return { status: 500, latency: Math.round(performance.now() - startTime), error: err.message };
    }
  }
};

const MusicBrainzProvider = {
  async searchArtist(artistName) {
    const url = `https://musicbrainz.org/ws/2/artist/?query=artist:${encodeURIComponent(artistName)}&fmt=json`;
    const startTime = performance.now();
    try {
      const response = await fetch(url, {
        headers: { 'User-Agent': 'ReelFind/1.0 (contact@reelfind.app)' }
      });
      const latency = Math.round(performance.now() - startTime);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { status: 200, latency, artists: data.artists || [] };
    } catch (err) {
      return { status: 500, latency: Math.round(performance.now() - startTime), error: err.message };
    }
  }
};

const AppleSearchProvider = {
  async searchTrack(query) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=5`;
    const startTime = performance.now();
    try {
      const response = await fetch(url);
      const latency = Math.round(performance.now() - startTime);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      return { status: 200, latency, results: data.results || [] };
    } catch (err) {
      return { status: 500, latency: Math.round(performance.now() - startTime), error: err.message };
    }
  }
};

const TMDB_GENRE_MAP = {
  28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime',
  99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
  27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance',
  878: 'Science Fiction', 10770: 'TV Movie', 53: 'Thriller', 10752: 'War', 37: 'Western'
};

const TmdbProvider = {
  normalizeMovie(item) {
    const year = item.release_date ? parseInt(item.release_date.substring(0, 4), 10) : new Date().getFullYear();
    const genres = item.genres 
      ? item.genres.map(g => g.name)
      : (item.genre_ids ? item.genre_ids.map(id => TMDB_GENRE_MAP[id]).filter(Boolean) : ['Drama']);
    
    const director = item.credits?.crew?.find(c => c.job === 'Director')?.name || 'TMDB Director';
    const cast = item.credits?.cast ? item.credits.cast.slice(0, 6).map(c => c.name) : ['TMDB Cast'];

    return {
      id: `tmdb-${item.id}`,
      tmdbId: item.id,
      wikidataId: `TMDB-${item.id}`,
      title: item.title || item.original_title,
      originalTitle: item.original_title || item.title,
      releaseYear: year,
      releaseDate: item.release_date || `${year}-01-01`,
      director: director,
      cast: cast,
      genres: genres.length > 0 ? genres : ['Drama'],
      country: item.origin_country?.[0] || 'United States',
      language: item.original_language ? item.original_language.toUpperCase() : 'English',
      runtime: item.runtime || 120,
      wikipediaSummary: item.overview || 'No overview available from TMDB.',
      wikipediaUrl: `https://www.themoviedb.org/movie/${item.id}`,
      posterUrl: item.poster_path ? `https://image.tmdb.org/t/p/w500${item.poster_path}` : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?auto=format&fit=crop&w=800&q=80',
      bannerUrl: item.backdrop_path ? `https://image.tmdb.org/t/p/w1280${item.backdrop_path}` : 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
      externalWatchUrl: `https://www.themoviedb.org/movie/${item.id}/watch`,
      ratingCount: Math.max(10, item.vote_count || 100),
      totalScoreSum: Math.round((item.vote_average || 7.5) * Math.max(10, item.vote_count || 100)),
      ratingsDistribution: { unbearable: 5, horrible: 15, decent: 80, good: 300, masterpiece: 600 }
    };
  },

  async fetchPopular(apiKey) {
    if (!apiKey) return { status: 401, error: 'No TMDB API key provided' };
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`;
    const startTime = performance.now();
    try {
      const response = await fetch(url);
      const latency = Math.round(performance.now() - startTime);
      if (!response.ok) throw new Error(`TMDB HTTP ${response.status}`);
      const data = await response.json();
      const movies = (data.results || []).map(m => this.normalizeMovie(m));
      return { status: 200, latency, movies };
    } catch (err) {
      return { status: 500, latency: Math.round(performance.now() - startTime), error: err.message };
    }
  }
};

// ==========================================
// 4. DETERMINISTIC NLP INTENT PARSER
// ==========================================

export function parseNaturalLanguageQuery(input) {
  if (!input || !input.trim()) return {};
  const query = input.trim().toLowerCase();
  const filters = {};

  const rangeMatch = query.match(/(?:between\s+)?(\d{4})\s*(?:and|-|to)\s*(\d{4})/);
  if (rangeMatch) {
    filters.yearMin = parseInt(rangeMatch[1], 10);
    filters.yearMax = parseInt(rangeMatch[2], 10);
  } else {
    const afterMatch = query.match(/(?:after|since|>)\s*(\d{4})/);
    if (afterMatch) filters.yearMin = parseInt(afterMatch[1], 10);

    const beforeMatch = query.match(/(?:before|prior to|<)\s*(\d{4})/);
    if (beforeMatch) filters.yearMax = parseInt(beforeMatch[1], 10);
  }

  const ratingMatch = query.match(/(?:rating|score)\s*(?:above|over|>=|>|at least)\s*(\d+(?:\.\d+)?)/);
  if (ratingMatch) {
    filters.minRating = parseFloat(ratingMatch[1]);
  } else if (query.includes('masterpiece')) {
    filters.minRating = 8.0;
  } else if (query.includes('good films')) {
    filters.minRating = 6.0;
  }

  const directorMatch = query.match(/(?:directed by|director)\s+([a-zA-Z\s]+?)(?:\s+with|\s+released|\s+in|\s*$)/);
  if (directorMatch) {
    filters.director = directorMatch[1].trim();
  }

  const genres = ['crime', 'science fiction', 'sci-fi', 'drama', 'romance', 'action', 'musical', 'comedy', 'thriller'];
  for (const g of genres) {
    if (query.includes(g)) {
      filters.genre = g === 'sci-fi' ? 'Science Fiction' : g.charAt(0).toUpperCase() + g.slice(1);
      break;
    }
  }

  filters.rawQuery = input;
  return filters;
}

// ==========================================
// 5. MAIN APPLICATION COMPONENT
// ==========================================

export default function App() {
  const [activeTab, setActiveTab] = useState('explore');
  const [theme, setTheme] = useState('dark');
  const [selectedFilm, setSelectedFilm] = useState(null);

  const [tmdbApiKey, setTmdbApiKey] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('reelfind_tmdb_key') || '';
    }
    return '';
  });
  const [showTmdbModal, setShowTmdbModal] = useState(false);
  const [tmdbInputKey, setTmdbInputKey] = useState('');
  const [isLoadingTmdb, setIsLoadingTmdb] = useState(false);

  const [currentPlayingTrack, setCurrentPlayingTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSynthPlaying, setIsSynthPlaying] = useState(false);
  const audioRef = useRef(null);

  const [films, setFilms] = useState(SEED_FILMS);
  const [artists, setArtists] = useState(SEED_ARTISTS);
  const [albums, setAlbums] = useState(SEED_ALBUMS);
  const [tracks, setTracks] = useState(SEED_TRACKS);

  const [user, setUser] = useState({ id: 'u-101', name: 'Alex Rivers', avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' });
  const [userFilmRatings, setUserFilmRatings] = useState({});
  const [userTrackRatings, setUserTrackRatings] = useState({});
  const [userWatchlist, setUserWatchlist] = useState(['film-1', 'film-3']);
  const [savedTracks, setSavedTracks] = useState(['track-1']);
  const [followedArtists, setFollowedArtists] = useState(['artist-1']);

  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState('ALL');
  const [filterYearMin, setFilterYearMin] = useState(1970);
  const [filterYearMax, setFilterYearMax] = useState(2026);
  const [filterMinRating, setFilterMinRating] = useState(0);
  const [filterSortBy, setFilterSortBy] = useState('popularity');

  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'bot',
      text: 'Hello! I am ReelFind AI. Tell me what kind of films or soundtracks you are looking for in plain language.',
      interpretedFilters: null
    }
  ]);

  const [toastMessage, setToastMessage] = useState(null);
  const [isFetchingArchive, setIsFetchingArchive] = useState(false);

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const maxFilmRatingsCount = useMemo(() => {
    return Math.max(...films.map((f) => f.ratingCount || 0), 1);
  }, [films]);

  const togglePlayTrack = (track) => {
    if (currentPlayingTrack?.id === track.id && (isPlaying || isSynthPlaying)) {
      if (audioRef.current) audioRef.current.pause();
      stopSynthesizedPreview();
      setIsPlaying(false);
      setIsSynthPlaying(false);
    } else {
      stopSynthesizedPreview();
      setCurrentPlayingTrack(track);
      setIsPlaying(true);
      setIsSynthPlaying(false);
      if (track.previewUrl && audioRef.current) {
        audioRef.current.src = track.previewUrl;
        audioRef.current.play().catch(() => {
          const ok = playSynthesizedPreview(track.title, () => {
            setIsPlaying(false);
            setIsSynthPlaying(false);
          });
          if (ok) setIsSynthPlaying(true);
          else setIsPlaying(false);
        });
      } else {
        const ok = playSynthesizedPreview(track.title, () => {
          setIsPlaying(false);
          setIsSynthPlaying(false);
        });
        if (ok) setIsSynthPlaying(true);
        else setIsPlaying(false);
      }
    }
  };

  const handleSaveTmdbKey = (key) => {
    const trimmed = key.trim();
    setTmdbApiKey(trimmed);
    if (typeof window !== 'undefined') {
      localStorage.setItem('reelfind_tmdb_key', trimmed);
    }
    setShowTmdbModal(false);
    if (trimmed) {
      showToast('TMDB API Key configured successfully!');
      fetchTmdbPopular(trimmed);
    } else {
      showToast('TMDB API Key cleared.');
    }
  };

  const fetchTmdbPopular = async (key) => {
    const apiKeyToUse = key || tmdbApiKey;
    if (!apiKeyToUse) {
      setShowTmdbModal(true);
      return;
    }
    setIsLoadingTmdb(true);
    showToast('Connecting to TMDB API & loading popular movies...');
    const res = await TmdbProvider.fetchPopular(apiKeyToUse);
    setIsLoadingTmdb(false);

    if (res.status === 200 && res.movies?.length > 0) {
      setFilms((prev) => {
        const existingIds = new Set(prev.map((f) => f.id));
        const newMovies = res.movies.filter((m) => !existingIds.has(m.id));
        return [...newMovies, ...prev];
      });
      showToast(`Successfully fetched ${res.movies.length} movies live from TMDB API!`);
    } else {
      showToast(`TMDB Fetch Error: ${res.error || 'Invalid API Key'}`);
    }
  };

  const handleFetchFromLiveArchive = async () => {
    if (!searchQuery.trim()) {
      showToast('Please enter a movie title in the search box to query Wikipedia/Wikidata.');
      return;
    }
    const query = searchQuery.trim();
    setIsFetchingArchive(true);
    showToast(`Querying public Wikidata & Wikipedia archive for "${query}"...`);

    try {
      const wikiRes = await WikipediaProvider.fetchSummary(query);
      if (wikiRes.status === 200 && wikiRes.extract) {
        const newFilm = {
          id: `film-imported-${Date.now()}`,
          wikidataId: `Q-WIKI-${Math.floor(Math.random() * 899999 + 100000)}`,
          title: wikiRes.title,
          originalTitle: wikiRes.title,
          releaseYear: new Date().getFullYear(),
          releaseDate: `${new Date().getFullYear()}-01-01`,
          director: 'Retrieved from Wikipedia',
          cast: ['Wikipedia Indexed Cast'],
          genres: ['Drama', 'Archive Import'],
          country: 'International',
          language: 'English',
          runtime: 120,
          wikipediaSummary: wikiRes.extract,
          wikipediaUrl: `https://en.wikipedia.org/wiki/${encodeURIComponent(wikiRes.title)}`,
          posterUrl: wikiRes.thumbnail || 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80',
          bannerUrl: wikiRes.thumbnail || 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1600&q=80',
          externalWatchUrl: `https://www.justwatch.com/us/search?q=${encodeURIComponent(wikiRes.title)}`,
          ratingCount: 1,
          totalScoreSum: 9,
          ratingsDistribution: { unbearable: 0, horrible: 0, decent: 0, good: 0, masterpiece: 1 },
        };

        setFilms((prev) => [newFilm, ...prev]);
        setSelectedFilm(newFilm);
        showToast(`Successfully imported "${wikiRes.title}" from Wikipedia/Wikidata archive!`);
      } else {
        showToast(`No exact match found in public Wikipedia archive for "${query}".`);
      }
    } catch (err) {
      showToast(`Archive fetch error: ${err.message}`);
    } finally {
      setIsFetchingArchive(false);
    }
  };

  const handleRateFilm = (filmId, newScore) => {
    if (!validateRatingValue(newScore)) {
      showToast('Invalid rating score. Must be between 0.5 and 10.0 in increments of 0.5.');
      return;
    }

    const previousRating = userFilmRatings[filmId];
    setUserFilmRatings((prev) => ({ ...prev, [filmId]: newScore }));

    setFilms((prevFilms) =>
      prevFilms.map((f) => {
        if (f.id !== filmId) return f;
        let newCount = f.ratingCount;
        let newSum = f.totalScoreSum;

        if (previousRating !== undefined) {
          newSum = f.totalScoreSum - previousRating + newScore;
        } else {
          newCount = f.ratingCount + 1;
          newSum = f.totalScoreSum + newScore;
        }

        const cat = getRatingCategory(newScore).key;
        const newDist = { ...f.ratingsDistribution, [cat]: (f.ratingsDistribution[cat] || 0) + (previousRating ? 0 : 1) };

        return { ...f, ratingCount: newCount, totalScoreSum: newSum, ratingsDistribution: newDist };
      })
    );

    showToast(`Rated film ${newScore} / 10!`);
  };

  const handleRateTrack = (trackId, newScore) => {
    if (!validateRatingValue(newScore)) {
      showToast('Invalid score.');
      return;
    }

    const previousRating = userTrackRatings[trackId];
    setUserTrackRatings((prev) => ({ ...prev, [trackId]: newScore }));

    setTracks((prevTracks) =>
      prevTracks.map((t) => {
        if (t.id !== trackId) return t;
        let newCount = t.ratingCount;
        let newSum = t.totalScoreSum;

        if (previousRating !== undefined) {
          newSum = t.totalScoreSum - previousRating + newScore;
        } else {
          newCount = t.ratingCount + 1;
          newSum = t.totalScoreSum + newScore;
        }
        return { ...t, ratingCount: newCount, totalScoreSum: newSum };
      })
    );

    showToast(`Rated track ${newScore} / 10! Derived album scores recalculated.`);
  };

  const filteredFilms = useMemo(() => {
    return films.filter((film) => {
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = film.title.toLowerCase().includes(q);
        const matchDirector = film.director.toLowerCase().includes(q);
        const matchCast = film.cast.some((c) => c.toLowerCase().includes(q));
        if (!matchTitle && !matchDirector && !matchCast) return false;
      }

      if (filterGenre !== 'ALL' && !film.genres.includes(filterGenre)) return false;
      if (film.releaseYear < filterYearMin || film.releaseYear > filterYearMax) return false;

      const avgScore = film.ratingCount > 0 ? film.totalScoreSum / film.ratingCount : 0;
      if (avgScore < filterMinRating) return false;

      return true;
    }).sort((a, b) => {
      if (filterSortBy === 'rating') {
        const scoreA = a.ratingCount > 0 ? a.totalScoreSum / a.ratingCount : 0;
        const scoreB = b.ratingCount > 0 ? b.totalScoreSum / b.ratingCount : 0;
        return scoreB - scoreA;
      }
      if (filterSortBy === 'date') return b.releaseYear - a.releaseYear;
      if (filterSortBy === 'title') return a.title.localeCompare(b.title);
      const popA = calculatePopularityIndex(a.ratingCount, maxFilmRatingsCount);
      const popB = calculatePopularityIndex(b.ratingCount, maxFilmRatingsCount);
      return popB - popA;
    });
  }, [films, searchQuery, filterGenre, filterYearMin, filterYearMax, filterMinRating, filterSortBy, maxFilmRatingsCount]);

  const handleSendChatMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChatInput('');

    const parsedFilters = parseNaturalLanguageQuery(userMsg);

    setChatMessages((prev) => [
      ...prev,
      { sender: 'user', text: userMsg },
      {
        sender: 'bot',
        text: `I've interpreted your request into structured search filters:`,
        interpretedFilters: parsedFilters
      }
    ]);
  };

  const applyNlpFiltersToSearch = (filters) => {
    if (filters.genre) setFilterGenre(filters.genre);
    if (filters.yearMin) setFilterYearMin(filters.yearMin);
    if (filters.yearMax) setFilterYearMax(filters.yearMax);
    if (filters.minRating) setFilterMinRating(filters.minRating);
    if (filters.director) setSearchQuery(filters.director);
    setActiveTab('films');
    showToast('Filters applied to Film Discovery page!');
  };

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-[#0B0B0E] text-slate-100' : 'bg-slate-50 text-slate-900'} font-sans antialiased transition-colors duration-200`}>
      <audio
        ref={audioRef}
        preload="none"
        onEnded={() => {
          setIsPlaying(false);
          setIsSynthPlaying(false);
        }}
        onError={() => {
          if (currentPlayingTrack && isPlaying) {
            const synthOk = playSynthesizedPreview(currentPlayingTrack.title, () => {
              setIsPlaying(false);
              setIsSynthPlaying(false);
            });
            if (synthOk) {
              setIsSynthPlaying(true);
              showToast(`Playing synthesized preview for "${currentPlayingTrack.title}"`);
            } else {
              setIsPlaying(false);
            }
          } else {
            setIsPlaying(false);
          }
        }}
      />

      {toastMessage && (
        <div className="fixed top-5 right-5 z-50 flex items-center gap-2 px-4 py-3 bg-[#715CD4] text-white rounded-lg shadow-xl text-sm font-medium animate-bounce">
          <Sparkles className="w-4 h-4" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER NAVBAR */}
      <header className={`sticky top-0 z-40 border-b ${theme === 'dark' ? 'bg-[#0B0B0E]/90 border-slate-800' : 'bg-white/90 border-slate-200'} backdrop-blur-md px-4 lg:px-8 py-3.5`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div 
            onClick={() => setActiveTab('explore')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-[#715CD4] to-[#A855F7] flex items-center justify-center shadow-lg shadow-[#715CD4]/20 group-hover:scale-105 transition-transform">
              <Film className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight bg-gradient-to-r from-white via-slate-200 to-[#A855F7] bg-clip-text text-transparent">
                Reel<span className="text-[#8B75F6]">Find</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest -mt-1">
                Film & Soundtrack DB
              </span>
            </div>
          </div>

          <div className="hidden md:flex flex-1 max-w-md relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search films, directors, tracks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-sm rounded-xl border ${
                theme === 'dark' 
                  ? 'bg-[#14141B] border-slate-800 text-slate-200 focus:border-[#715CD4]' 
                  : 'bg-slate-100 border-slate-200 text-slate-800 focus:border-[#715CD4]'
              } focus:outline-none transition-colors`}
            />
          </div>

          <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => setActiveTab('explore')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'explore' ? 'bg-[#715CD4] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Discover
            </button>
            <button
              onClick={() => setActiveTab('films')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'films' ? 'bg-[#715CD4] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Films
            </button>
            <button
              onClick={() => setActiveTab('soundtracks')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'soundtracks' ? 'bg-[#715CD4] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Soundtracks
            </button>
            <button
              onClick={() => setActiveTab('artists')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'artists' ? 'bg-[#715CD4] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Artists
            </button>
            <button
              onClick={() => setActiveTab('nlp')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                activeTab === 'nlp' ? 'bg-[#715CD4] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Bot className="w-4 h-4 text-[#A855F7]" />
              AI Search
            </button>
            <button
              onClick={() => setActiveTab('library')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'library' ? 'bg-[#715CD4] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              My Library
            </button>
            <button
              onClick={() => setActiveTab('debug')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'debug' ? 'bg-[#715CD4] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              API Debug
            </button>
            <button
              onClick={() => setActiveTab('tests')}
              className={`px-3 py-1.5 rounded-lg transition-colors ${
                activeTab === 'tests' ? 'bg-[#715CD4] text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Test Suite
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                setTmdbInputKey(tmdbApiKey);
                setShowTmdbModal(true);
              }}
              className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                tmdbApiKey
                  ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20'
                  : 'bg-[#715CD4]/20 border-[#715CD4]/50 text-[#8B75F6] hover:bg-[#715CD4]/30'
              }`}
            >
              <Key className="w-3.5 h-3.5" />
              <span>{tmdbApiKey ? 'TMDB Connected' : 'Configure TMDB API'}</span>
            </button>

            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-xl border ${
                theme === 'dark' ? 'bg-[#14141B] border-slate-800 text-slate-300' : 'bg-slate-100 border-slate-200 text-slate-700'
              } hover:border-[#715CD4] transition-colors`}
              title="Toggle Theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-8 h-8 rounded-full ring-2 ring-[#715CD4]/40 object-cover"
              />
              <span className="hidden sm:inline text-xs font-semibold text-slate-300">{user.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* MOBILE NAVIGATION BAR */}
      <div className={`lg:hidden flex items-center justify-around py-2.5 px-2 border-b text-xs ${
        theme === 'dark' ? 'bg-[#14141B] border-slate-800 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'
      }`}>
        <button onClick={() => setActiveTab('explore')} className={activeTab === 'explore' ? 'text-[#8B75F6] font-bold' : ''}>Discover</button>
        <button onClick={() => setActiveTab('films')} className={activeTab === 'films' ? 'text-[#8B75F6] font-bold' : ''}>Films</button>
        <button onClick={() => setActiveTab('soundtracks')} className={activeTab === 'soundtracks' ? 'text-[#8B75F6] font-bold' : ''}>Soundtracks</button>
        <button onClick={() => setActiveTab('nlp')} className={activeTab === 'nlp' ? 'text-[#8B75F6] font-bold' : ''}>AI Search</button>
        <button onClick={() => setActiveTab('library')} className={activeTab === 'library' ? 'text-[#8B75F6] font-bold' : ''}>Library</button>
      </div>

      {/* AUDIO PLAYER BAR */}
      {currentPlayingTrack && (
        <div className="fixed bottom-0 inset-x-0 z-50 bg-[#14141B] border-t border-[#715CD4]/30 px-4 py-3 shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-[#715CD4]/20 flex items-center justify-center flex-shrink-0 text-[#8B75F6]">
              <Music className="w-5 h-5 animate-pulse" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-white truncate">{currentPlayingTrack.title}</p>
              <p className="text-xs text-slate-400 truncate">{currentPlayingTrack.artistName}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => togglePlayTrack(currentPlayingTrack)}
              className="p-2.5 rounded-full bg-[#715CD4] text-white hover:bg-[#8B75F6] transition-colors"
            >
              {(isPlaying || isSynthPlaying) ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
            <a
              href={currentPlayingTrack.itunesTrackUrl}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center gap-1 px-3 py-1.5 text-xs rounded-lg border border-slate-700 text-slate-300 hover:text-white hover:border-[#715CD4]"
            >
              <span>iTunes Store</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto px-4 lg:px-8 py-8 pb-28">

        {/* TAB 1: DISCOVER / EXPLORE */}
        {activeTab === 'explore' && (
          <div className="space-y-10">
            <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-[#14141B] via-[#1A1A24] to-[#0B0B0E] border border-slate-800 p-8 lg:p-12">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#715CD4]/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 max-w-2xl space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-[#715CD4]/20 text-[#8B75F6] border border-[#715CD4]/30">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>No-API-Key Provider Architecture</span>
                </div>
                <h1 className="text-3xl lg:text-5xl font-black text-white tracking-tight leading-tight">
                  Discover Cinema Through Sound & Vision
                </h1>
                <p className="text-slate-400 text-sm lg:text-base leading-relaxed">
                  Explore verified Wikidata film metadata, MusicBrainz audio catalogs, and iTunes preview audio streams. Rate films, discover soundtracks, and follow world-class composers.
                </p>
                
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <button
                    onClick={() => setActiveTab('films')}
                    className="px-6 py-3 rounded-xl bg-[#715CD4] text-white font-semibold text-sm hover:bg-[#8B75F6] transition-all shadow-lg shadow-[#715CD4]/25 flex items-center gap-2"
                  >
                    <span>Browse Films</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setActiveTab('nlp')}
                    className="px-6 py-3 rounded-xl bg-[#14141B] text-slate-300 font-semibold text-sm hover:text-white border border-slate-700 hover:border-[#715CD4] transition-all flex items-center gap-2"
                  >
                    <Bot className="w-4 h-4 text-[#A855F7]" />
                    <span>Try Natural Language Assistant</span>
                  </button>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div>
                  <p className="text-2xl font-extrabold text-white">{films.length}</p>
                  <p className="text-xs text-slate-400">Indexed Films</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-white">{tracks.length}</p>
                  <p className="text-xs text-slate-400">Audio Preview Tracks</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#8B75F6]">{albums.length}</p>
                  <p className="text-xs text-slate-400">Verified Soundtracks</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-[#A855F7]">100% Free</p>
                  <p className="text-xs text-slate-400">No Key Required</p>
                </div>
              </div>
            </div>

            {/* Popular Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#8B75F6]" />
                    Popular on ReelFind
                  </h2>
                  <p className="text-xs text-slate-400">Ranked by actual community rating count & engagement index</p>
                </div>
                <button
                  onClick={() => setActiveTab('films')}
                  className="text-xs font-semibold text-[#8B75F6] hover:underline"
                >
                  View all films →
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {films.slice(0, 3).map((film) => {
                  const avgScore = film.ratingCount > 0 ? (film.totalScoreSum / film.ratingCount).toFixed(1) : 'N/A';
                  const popIndex = calculatePopularityIndex(film.ratingCount, maxFilmRatingsCount);
                  const cat = getRatingCategory(parseFloat(avgScore));

                  return (
                    <div
                      key={film.id}
                      onClick={() => setSelectedFilm(film)}
                      className="group cursor-pointer rounded-2xl bg-[#14141B] border border-slate-800 overflow-hidden hover:border-[#715CD4]/60 transition-all hover:-translate-y-1"
                    >
                      <div className="h-48 relative overflow-hidden">
                        <img
                          src={film.bannerUrl}
                          alt={film.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-transparent to-transparent" />
                        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-[#0B0B0E]/80 backdrop-blur-md text-[10px] font-bold text-white border border-slate-700">
                          Wikidata: {film.wikidataId}
                        </div>
                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B0B0E]/90 border border-slate-700 text-xs font-black text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{avgScore}</span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div>
                          <h3 className="text-lg font-bold text-white group-hover:text-[#8B75F6] transition-colors">
                            {film.title} ({film.releaseYear})
                          </h3>
                          <p className="text-xs text-slate-400">Dir. {film.director}</p>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-800/80">
                          <span className="px-2 py-0.5 rounded text-[11px] font-medium" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                            {cat.label}
                          </span>
                          <div className="text-slate-400 flex items-center gap-1">
                            <BarChart3 className="w-3.5 h-3.5 text-[#8B75F6]" />
                            <span>Pop. Index: {popIndex}/100</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Featured Tracks */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    <Music className="w-5 h-5 text-[#A855F7]" />
                    Featured Soundtracks & Audio Previews
                  </h2>
                  <p className="text-xs text-slate-400">Verified film associations with 30s audio previews via Apple iTunes API</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {tracks.slice(0, 4).map((track) => {
                  const album = albums.find((a) => a.id === track.albumId);
                  const film = films.find((f) => f.id === track.filmId);
                  const isCurrent = currentPlayingTrack?.id === track.id && (isPlaying || isSynthPlaying);
                  const avgTrackScore = track.ratingCount > 0 ? (track.totalScoreSum / track.ratingCount).toFixed(1) : 'N/A';

                  return (
                    <div
                      key={track.id}
                      className="p-4 rounded-2xl bg-[#14141B] border border-slate-800 flex items-center justify-between gap-4 hover:border-slate-700 transition-all"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          onClick={() => togglePlayTrack(track)}
                          className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                            isCurrent
                              ? 'bg-[#715CD4] text-white shadow-lg shadow-[#715CD4]/40'
                              : 'bg-slate-800 text-slate-200 hover:bg-[#715CD4] hover:text-white'
                          }`}
                        >
                          {isCurrent ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </button>
                        <div className="min-w-0">
                          <h4 className="text-sm font-bold text-white truncate">{track.title}</h4>
                          <p className="text-xs text-slate-400 truncate">{track.artistName} • {album?.title}</p>
                          {film && (
                            <span className="inline-block text-[10px] text-[#8B75F6] mt-0.5">
                              Film: {film.title}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <div className="flex items-center gap-1 text-xs font-bold text-amber-400">
                            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                            <span>{avgTrackScore}</span>
                          </div>
                          <span className="text-[10px] text-slate-500">{track.ratingCount} votes</span>
                        </div>
                        <button
                          onClick={() => {
                            if (savedTracks.includes(track.id)) {
                              setSavedTracks(savedTracks.filter((id) => id !== track.id));
                              showToast('Removed track from saved library.');
                            } else {
                              setSavedTracks([...savedTracks, track.id]);
                              showToast('Saved track to library!');
                            }
                          }}
                          className={`p-2 rounded-lg border ${
                            savedTracks.includes(track.id)
                              ? 'border-[#715CD4] text-[#8B75F6] bg-[#715CD4]/10'
                              : 'border-slate-800 text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: FILMS DISCOVERY */}
        {activeTab === 'films' && (
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h2 className="text-2xl font-bold text-white">Film Discovery Catalogue</h2>
                <p className="text-xs text-slate-400">Verified titles powered by Wikidata, Wikipedia REST, and TMDB APIs</p>
              </div>
            </div>

            {/* Advanced Filters Toolbar */}
            <div className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#8B75F6]" />
                  Advanced Combinable Filters
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => fetchTmdbPopular(tmdbApiKey)}
                    disabled={isLoadingTmdb}
                    className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-semibold hover:from-emerald-500 hover:to-teal-500 transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-900/20"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoadingTmdb ? 'animate-spin' : ''}`} />
                    <span>{isLoadingTmdb ? 'Loading TMDB...' : 'Fetch TMDB Movies'}</span>
                  </button>
                  <button
                    onClick={handleFetchFromLiveArchive}
                    disabled={isFetchingArchive}
                    className="px-3 py-1.5 rounded-xl bg-[#715CD4] text-white text-xs font-semibold hover:bg-[#8B75F6] transition-colors flex items-center gap-1.5 shadow-lg shadow-[#715CD4]/20"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isFetchingArchive ? 'animate-spin' : ''}`} />
                    <span>{isFetchingArchive ? 'Importing...' : 'Fetch Live Wikidata Archive'}</span>
                  </button>
                  <button
                    onClick={() => {
                      setFilterGenre('ALL');
                      setFilterYearMin(1970);
                      setFilterYearMax(2026);
                      setFilterMinRating(0);
                      setSearchQuery('');
                    }}
                    className="text-xs text-slate-400 hover:text-white underline"
                  >
                    Reset
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Genre</label>
                  <select
                    value={filterGenre}
                    onChange={(e) => setFilterGenre(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0B0B0E] border border-slate-800 text-white focus:border-[#715CD4] focus:outline-none"
                  >
                    <option value="ALL">All Genres</option>
                    <option value="Science Fiction">Science Fiction</option>
                    <option value="Crime">Crime</option>
                    <option value="Drama">Drama</option>
                    <option value="Romance">Romance</option>
                    <option value="Musical">Musical</option>
                    <option value="Animation">Animation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Min ReelFind Rating: {filterMinRating}+</label>
                  <input
                    type="range"
                    min="0"
                    max="9"
                    step="0.5"
                    value={filterMinRating}
                    onChange={(e) => setFilterMinRating(parseFloat(e.target.value))}
                    className="w-full accent-[#715CD4]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Sort Results By</label>
                  <select
                    value={filterSortBy}
                    onChange={(e) => setFilterSortBy(e.target.value)}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-[#0B0B0E] border border-slate-800 text-white focus:border-[#715CD4] focus:outline-none"
                  >
                    <option value="popularity">Popularity Index</option>
                    <option value="rating">Highest Community Score</option>
                    <option value="date">Release Date (Newest)</option>
                    <option value="title">Film Title A-Z</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFilms.map((film) => {
                const avgScore = film.ratingCount > 0 ? (film.totalScoreSum / film.ratingCount).toFixed(1) : 'N/A';
                const userVote = userFilmRatings[film.id];

                return (
                  <div
                    key={film.id}
                    className="rounded-2xl bg-[#14141B] border border-slate-800 overflow-hidden flex flex-col justify-between hover:border-[#715CD4]/60 transition-all"
                  >
                    <div>
                      <div className="h-52 relative overflow-hidden">
                        <img
                          src={film.posterUrl}
                          alt={film.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#14141B] via-transparent to-transparent" />
                        <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#0B0B0E]/90 border border-slate-700 text-xs font-black text-amber-400">
                          <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          <span>{avgScore}</span>
                        </div>
                      </div>

                      <div className="p-5 space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="text-lg font-bold text-white">{film.title}</h3>
                            <p className="text-xs text-slate-400">{film.releaseYear} • Dir. {film.director}</p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                          {film.wikipediaSummary}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {film.genres.map((g) => (
                            <span key={g} className="px-2 py-0.5 rounded-md bg-[#0B0B0E] border border-slate-800 text-[10px] font-medium text-slate-300">
                              {g}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-5 pt-0 space-y-3">
                      <div className="p-3 rounded-xl bg-[#0B0B0E] border border-slate-800/80 space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium">Your Vote:</span>
                          <span className="font-bold text-[#8B75F6]">
                            {userVote ? `${userVote} / 10` : 'Not Rated'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between gap-1">
                          {[2, 4, 6, 8, 10].map((stepScore) => (
                            <button
                              key={stepScore}
                              onClick={() => handleRateFilm(film.id, stepScore)}
                              className={`flex-1 py-1 text-[10px] font-bold rounded ${
                                userVote === stepScore
                                  ? 'bg-[#715CD4] text-white'
                                  : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-white'
                              }`}
                            >
                              {stepScore}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                        <button
                          onClick={() => setSelectedFilm(film)}
                          className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-[#715CD4] text-white text-xs font-semibold transition-colors flex items-center justify-center gap-1"
                        >
                          <Info className="w-3.5 h-3.5" />
                          <span>Details & Soundtracks</span>
                        </button>
                        <button
                          onClick={() => {
                            if (userWatchlist.includes(film.id)) {
                              setUserWatchlist(userWatchlist.filter((id) => id !== film.id));
                              showToast('Removed from Watchlist.');
                            } else {
                              setUserWatchlist([...userWatchlist, film.id]);
                              showToast('Added to Watchlist!');
                            }
                          }}
                          className={`p-2 rounded-xl border ${
                            userWatchlist.includes(film.id)
                              ? 'border-[#715CD4] text-[#8B75F6] bg-[#715CD4]/10'
                              : 'border-slate-800 text-slate-400 hover:text-white'
                          }`}
                        >
                          <Bookmark className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 3: SOUNDTRACKS CATALOG */}
        {activeTab === 'soundtracks' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Film Soundtracks Catalog</h2>
              <p className="text-xs text-slate-400">Derived album ratings calculated strictly from user ratings of contributing tracks</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {albums.map((album) => {
                const albumTracks = tracks.filter((t) => t.albumId === album.id);
                const film = films.find((f) => f.id === album.filmId);
                const derived = calculateDerivedAlbumRating(albumTracks, userTrackRatings);

                return (
                  <div key={album.id} className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-4">
                    <div className="flex items-start gap-4">
                      <img
                        src={album.artworkUrl}
                        alt={album.title}
                        className="w-20 h-20 rounded-xl object-cover border border-slate-700 flex-shrink-0"
                      />
                      <div className="min-w-0 space-y-1">
                        <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-[#715CD4]/20 text-[#8B75F6] border border-[#715CD4]/30">
                          {album.mappingConfidence} CONFIDENCE
                        </span>
                        <h3 className="text-base font-bold text-white truncate">{album.title}</h3>
                        <p className="text-xs text-slate-400">{album.artistName} ({album.releaseYear})</p>
                        {film && (
                          <p className="text-xs text-slate-400">Associated Film: <span className="text-white font-medium">{film.title}</span></p>
                        )}
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-[#0B0B0E] border border-slate-800/80 flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Derived Album Rating</p>
                        <p className="text-xs text-slate-500">Averaged across {derived.ratedTracksCount} rated tracks</p>
                      </div>
                      <div className="flex items-center gap-1 text-lg font-black text-amber-400">
                        <Star className="w-5 h-5 fill-amber-400 text-amber-400" />
                        <span>{derived.avgScore > 0 ? derived.avgScore : 'No votes'}</span>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-800">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Tracklist</p>
                      {albumTracks.map((tr) => {
                        const isCurrent = currentPlayingTrack?.id === tr.id && (isPlaying || isSynthPlaying);
                        const userScore = userTrackRatings[tr.id];

                        return (
                          <div
                            key={tr.id}
                            className="p-2.5 rounded-xl bg-[#0B0B0E]/60 border border-slate-800/50 flex items-center justify-between gap-3"
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <button
                                onClick={() => togglePlayTrack(tr)}
                                className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-xs ${
                                  isCurrent ? 'bg-[#715CD4] text-white' : 'bg-slate-800 text-slate-300 hover:bg-[#715CD4] hover:text-white'
                                }`}
                              >
                                {isCurrent ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 ml-0.5" />}
                              </button>
                              <div className="min-w-0">
                                <p className="text-xs font-semibold text-white truncate">{tr.trackNumber}. {tr.title}</p>
                                <p className="text-[10px] text-slate-500">MBID: {tr.mbid.slice(0, 8)}...</p>
                              </div>
                            </div>

                            <div className="flex items-center gap-2">
                              <select
                                value={userScore || ''}
                                onChange={(e) => handleRateTrack(tr.id, parseFloat(e.target.value))}
                                className="px-2 py-1 text-[10px] rounded-lg bg-[#14141B] border border-slate-700 text-slate-300 focus:outline-none"
                              >
                                <option value="">Rate</option>
                                <option value="6.0">6.0</option>
                                <option value="8.0">8.0</option>
                                <option value="9.0">9.0</option>
                                <option value="10.0">10.0</option>
                              </select>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 4: ARTISTS DISCOVERY */}
        {activeTab === 'artists' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Film Composers & Artists</h2>
              <p className="text-xs text-slate-400">Profiles powered by MusicBrainz metadata and Apple Music store integration</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {artists.map((artist) => {
                const isFollowed = followedArtists.includes(artist.id);

                return (
                  <div key={artist.id} className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-4 flex flex-col justify-between">
                    <div className="space-y-3">
                      <div className="flex items-center gap-4">
                        <img
                          src={artist.artworkUrl}
                          alt={artist.name}
                          className="w-16 h-16 rounded-full object-cover ring-2 ring-[#715CD4]/30"
                        />
                        <div>
                          <h3 className="text-lg font-bold text-white">{artist.name}</h3>
                          <p className="text-xs text-slate-400">{artist.type} • {artist.country}</p>
                          <span className="inline-block mt-1 text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                            MBID: {artist.mbid.slice(0, 8)}...
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-slate-400 leading-relaxed">
                        {artist.bio}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-xs text-slate-400">{artist.followerCount + (isFollowed ? 1 : 0)} followers</span>
                      <button
                        onClick={() => {
                          if (isFollowed) {
                            setFollowedArtists(followedArtists.filter((id) => id !== artist.id));
                            showToast(`Unfollowed ${artist.name}`);
                          } else {
                            setFollowedArtists([...followedArtists, artist.id]);
                            showToast(`Following ${artist.name}!`);
                          }
                        }}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold transition-colors ${
                          isFollowed
                            ? 'bg-slate-800 text-slate-300 hover:bg-rose-900/50 hover:text-rose-300'
                            : 'bg-[#715CD4] text-white hover:bg-[#8B75F6]'
                        }`}
                      >
                        {isFollowed ? 'Following' : 'Follow Artist'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* TAB 5: NATURAL LANGUAGE ASSISTANT */}
        {activeTab === 'nlp' && (
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="p-6 rounded-3xl bg-[#14141B] border border-slate-800 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#715CD4] to-[#A855F7] flex items-center justify-center text-white">
                  <Bot className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white">ReelFind AI Search Assistant</h2>
                  <p className="text-xs text-slate-400">Deterministic Intent Parser — converts plain language requests into structured queries</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  onClick={() => setChatInput('Find crime films released between 1995 and 2010')}
                  className="px-3 py-1.5 rounded-xl bg-[#0B0B0E] border border-slate-800 text-xs text-slate-300 hover:border-[#715CD4]"
                >
                  "Find crime films released between 1995 and 2010"
                </button>
                <button
                  onClick={() => setChatInput('Films directed by Christopher Nolan with rating above 7.5')}
                  className="px-3 py-1.5 rounded-xl bg-[#0B0B0E] border border-slate-800 text-xs text-slate-300 hover:border-[#715CD4]"
                >
                  "Films directed by Christopher Nolan with rating above 7.5"
                </button>
              </div>

              <div className="min-h-[300px] max-h-[450px] overflow-y-auto space-y-4 p-4 rounded-2xl bg-[#0B0B0E] border border-slate-800/80">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed space-y-2 ${
                        msg.sender === 'user'
                          ? 'bg-[#715CD4] text-white rounded-br-none'
                          : 'bg-[#14141B] border border-slate-800 text-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {msg.interpretedFilters && (
                        <div className="p-3 rounded-xl bg-[#0B0B0E] border border-slate-800 text-slate-300 space-y-2">
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#8B75F6]">
                            Parsed Query Parameters:
                          </p>
                          <pre className="text-[10px] font-mono bg-slate-900/80 p-2 rounded text-emerald-400 overflow-x-auto">
                            {JSON.stringify(msg.interpretedFilters, null, 2)}
                          </pre>
                          <button
                            onClick={() => applyNlpFiltersToSearch(msg.interpretedFilters)}
                            className="w-full py-1.5 rounded-lg bg-[#715CD4] text-white text-[11px] font-semibold hover:bg-[#8B75F6] transition-colors"
                          >
                            Apply Filters & Show Results
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask for films, directors, genres, or release years..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChatMessage()}
                  className="flex-1 px-4 py-2.5 text-xs rounded-xl bg-[#0B0B0E] border border-slate-800 text-white focus:border-[#715CD4] focus:outline-none"
                />
                <button
                  onClick={handleSendChatMessage}
                  className="px-5 py-2.5 rounded-xl bg-[#715CD4] text-white font-semibold text-xs hover:bg-[#8B75F6] transition-colors"
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: USER LIBRARY */}
        {activeTab === 'library' && (
          <div className="space-y-6">
            <div className="flex items-center gap-4 p-6 rounded-2xl bg-[#14141B] border border-slate-800">
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover ring-2 ring-[#715CD4]/40"
              />
              <div>
                <h2 className="text-xl font-bold text-white">{user.name}</h2>
                <p className="text-xs text-slate-400">Personal Watchlist, Saved Audio Tracks & Rated Items</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-[#8B75F6]" />
                  Film Watchlist ({userWatchlist.length})
                </h3>
                <div className="space-y-2">
                  {userWatchlist.map((filmId) => {
                    const film = films.find((f) => f.id === filmId);
                    if (!film) return null;
                    return (
                      <div key={filmId} className="p-3 rounded-xl bg-[#0B0B0E] border border-slate-800/80 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{film.title}</p>
                          <p className="text-[10px] text-slate-400">{film.releaseYear} • Dir. {film.director}</p>
                        </div>
                        <button
                          onClick={() => setUserWatchlist(userWatchlist.filter((id) => id !== filmId))}
                          className="text-slate-500 hover:text-rose-400 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-4">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Music className="w-4 h-4 text-[#A855F7]" />
                  Saved Audio Previews ({savedTracks.length})
                </h3>
                <div className="space-y-2">
                  {savedTracks.map((trackId) => {
                    const track = tracks.find((t) => t.id === trackId);
                    if (!track) return null;
                    return (
                      <div key={trackId} className="p-3 rounded-xl bg-[#0B0B0E] border border-slate-800/80 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-white">{track.title}</p>
                          <p className="text-[10px] text-slate-400">{track.artistName}</p>
                        </div>
                        <button
                          onClick={() => setSavedTracks(savedTracks.filter((id) => id !== trackId))}
                          className="text-slate-500 hover:text-rose-400 text-xs"
                        >
                          Remove
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 7: API DEBUG */}
        {activeTab === 'debug' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-white">API Health & Debug Dashboard</h2>
              <p className="text-xs text-slate-400">Live ping diagnostic suite for public and configured external providers</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">The Movie Database (TMDB) API</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                    tmdbApiKey ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  }`}>
                    {tmdbApiKey ? 'KEY CONFIGURED' : 'KEY REQUIRED'}
                  </span>
                </div>
                <p className="text-xs text-slate-400">Endpoint: api.themoviedb.org/3/movie/popular</p>
                <button
                  onClick={async () => {
                    if (!tmdbApiKey) {
                      setShowTmdbModal(true);
                      return;
                    }
                    showToast('Testing TMDB API endpoint...');
                    const res = await TmdbProvider.fetchPopular(tmdbApiKey);
                    if (res.status === 200) showToast(`TMDB ping success! Fetched ${res.movies.length} movies (${res.latency}ms)`);
                    else showToast(`TMDB error: ${res.error}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#715CD4] text-white text-xs font-semibold hover:bg-[#8B75F6]"
                >
                  Test Live TMDB Query
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Wikidata SPARQL API</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    PUBLIC / NO KEY
                  </span>
                </div>
                <p className="text-xs text-slate-400">Endpoint: query.wikidata.org/sparql</p>
                <button
                  onClick={async () => {
                    showToast('Testing Wikidata SPARQL endpoint...');
                    const res = await WikidataProvider.fetchFilmDetails('Inception');
                    if (res.status === 200) showToast(`Wikidata ping success! Latency: ${res.latency}ms`);
                    else showToast(`Wikidata error: ${res.error}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#715CD4] text-white text-xs font-semibold hover:bg-[#8B75F6]"
                >
                  Test Live SPARQL Query
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">Wikimedia REST API</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    PUBLIC / NO KEY
                  </span>
                </div>
                <p className="text-xs text-slate-400">Endpoint: en.wikipedia.org/api/rest_v1/</p>
                <button
                  onClick={async () => {
                    showToast('Testing Wikipedia REST endpoint...');
                    const res = await WikipediaProvider.fetchSummary('Inception');
                    if (res.status === 200) showToast(`Wikipedia ping success! Latency: ${res.latency}ms`);
                    else showToast(`Wikipedia error: ${res.error}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#715CD4] text-white text-xs font-semibold hover:bg-[#8B75F6]"
                >
                  Test Live Summary Fetch
                </button>
              </div>

              <div className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-white">MusicBrainz Web Service API</h3>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                    PUBLIC / NO KEY
                  </span>
                </div>
                <p className="text-xs text-slate-400">Endpoint: musicbrainz.org/ws/2/</p>
                <button
                  onClick={async () => {
                    showToast('Testing MusicBrainz API endpoint...');
                    const res = await MusicBrainzProvider.searchArtist('Hans Zimmer');
                    if (res.status === 200) showToast(`MusicBrainz ping success! Latency: ${res.latency}ms`);
                    else showToast(`MusicBrainz error: ${res.error}`);
                  }}
                  className="px-4 py-2 rounded-xl bg-[#715CD4] text-white text-xs font-semibold hover:bg-[#8B75F6]"
                >
                  Test Live Artist Search
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: TEST SUITE */}
        {activeTab === 'tests' && <TestRunnerSuite />}

      </main>

      {/* TMDB API KEY MODAL */}
      {showTmdbModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#14141B] border border-slate-800 rounded-3xl max-w-md w-full p-6 space-y-5 text-slate-200 relative">
            <button
              onClick={() => setShowTmdbModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-white">
                <Key className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white">Configure TMDB API Key</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Enter your free TMDB API Key (v3) below. Once provided, ReelFind will directly fetch live popular movies, high-res poster artwork, cast lists, and movie details.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">TMDB API Key (v3)</label>
                <input
                  type="password"
                  placeholder="e.g. 1a2b3c4d5e6f7g8h9i0j..."
                  value={tmdbInputKey}
                  onChange={(e) => setTmdbInputKey(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#0B0B0E] border border-slate-800 text-white focus:border-emerald-500 focus:outline-none"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <button
                  onClick={() => handleSaveTmdbKey(tmdbInputKey)}
                  className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs transition-all shadow-lg shadow-emerald-900/20"
                >
                  Save & Connect
                </button>
                {tmdbApiKey && (
                  <button
                    onClick={() => handleSaveTmdbKey('')}
                    className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-rose-900/40 text-slate-400 hover:text-rose-300 font-semibold text-xs transition-colors"
                  >
                    Clear Key
                  </button>
                )}
              </div>
            </div>

            <p className="text-[10px] text-slate-500 text-center">
              Your API key is stored locally in your browser's <code className="text-slate-400">localStorage</code> and never transmitted to any third-party server besides official TMDB endpoints.
            </p>
          </div>
        </div>
      )}

      {/* FILM DETAIL MODAL */}
      {selectedFilm && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-[#14141B] border border-slate-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto space-y-6 p-6 sm:p-8 relative text-slate-200">
            <button
              onClick={() => setSelectedFilm(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6">
              <img
                src={selectedFilm.posterUrl}
                alt={selectedFilm.title}
                className="w-full sm:w-48 h-72 object-cover rounded-2xl border border-slate-800 flex-shrink-0"
              />
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#715CD4]/20 text-[#8B75F6] border border-[#715CD4]/30">
                    Wikidata: {selectedFilm.wikidataId}
                  </span>
                  <span className="text-xs text-slate-400">{selectedFilm.releaseYear} • {selectedFilm.runtime} min</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedFilm.title}</h2>
                <p className="text-xs text-slate-400">Original Title: {selectedFilm.originalTitle}</p>
                <p className="text-xs font-semibold text-[#8B75F6]">Directed by {selectedFilm.director}</p>

                <p className="text-xs text-slate-300 leading-relaxed pt-2 border-t border-slate-800">
                  {selectedFilm.wikipediaSummary}
                </p>

                <div className="pt-2 flex flex-wrap gap-3 text-xs text-slate-400">
                  <a href={selectedFilm.wikipediaUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#8B75F6] hover:underline">
                    <span>Wikipedia Page</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <a href={selectedFilm.externalWatchUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-[#8B75F6] hover:underline">
                    <span>Watch Availability</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-800">
              <h3 className="text-sm font-bold text-white">Associated Film Soundtracks</h3>
              {albums.filter((a) => a.filmId === selectedFilm.id).map((album) => (
                <div key={album.id} className="p-3 rounded-xl bg-[#0B0B0E] border border-slate-800 flex items-center justify-between">
                  <div>
                    <p className="text-xs font-bold text-white">{album.title}</p>
                    <p className="text-[10px] text-slate-400">{album.artistName} • {album.mappingConfidence} Confidence</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedFilm(null);
                      setActiveTab('soundtracks');
                    }}
                    className="px-3 py-1.5 rounded-lg bg-[#715CD4] text-white text-xs font-semibold"
                  >
                    View Tracklist
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// 6. AUTOMATED TEST RUNNER SUB-COMPONENT
// ==========================================

function TestRunnerSuite() {
  const [testResults, setTestResults] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const runAllSystemTests = () => {
    setIsRunning(true);
    const results = [];

    try {
      const c1 = getRatingCategory(1.0);
      const c2 = getRatingCategory(5.0);
      const c3 = getRatingCategory(6.0);
      const c4 = getRatingCategory(8.0);
      const c5 = getRatingCategory(9.5);

      if (c1.key === 'unbearable' && c2.key === 'horrible' && c3.key === 'decent' && c4.key === 'good' && c5.key === 'masterpiece') {
        results.push({ id: 1, name: 'Rating Category Boundaries (0.5 to 10.0)', passed: true, details: 'Exact thresholds verified.' });
      } else {
        results.push({ id: 1, name: 'Rating Category Boundaries', passed: false, details: 'Category mismatch.' });
      }
    } catch (err) {
      results.push({ id: 1, name: 'Rating Category Boundaries', passed: false, details: err.message });
    }

    try {
      const v1 = validateRatingValue(7.5);
      const v2 = validateRatingValue(7.3);
      if (v1 === true && v2 === false) {
        results.push({ id: 2, name: '0.5 Step Increment Validation', passed: true, details: 'Correctly rejected invalid 7.3 step.' });
      } else {
        results.push({ id: 2, name: '0.5 Step Increment Validation', passed: false, details: 'Validation failed.' });
      }
    } catch (err) {
      results.push({ id: 2, name: '0.5 Step Increment Validation', passed: false, details: err.message });
    }

    try {
      const mockTracks = [
        { id: 't1', ratingCount: 1, totalScoreSum: 8 },
        { id: 't2', ratingCount: 1, totalScoreSum: 10 }
      ];
      const derived = calculateDerivedAlbumRating(mockTracks, {});
      if (derived.avgScore === 9.0 && derived.ratedTracksCount === 2) {
        results.push({ id: 3, name: 'Derived Album Rating Math', passed: true, details: 'Track averages correctly aggregated to 9.0.' });
      } else {
        results.push({ id: 3, name: 'Derived Album Rating Math', passed: false, details: `Got ${derived.avgScore}` });
      }
    } catch (err) {
      results.push({ id: 3, name: 'Derived Album Rating Math', passed: false, details: err.message });
    }

    try {
      const popIndex = calculatePopularityIndex(500, 1000);
      if (popIndex === 50) {
        results.push({ id: 4, name: 'Popularity Index Formula', passed: true, details: '100 * item_count / max_count = 50.0.' });
      } else {
        results.push({ id: 4, name: 'Popularity Index Formula', passed: false, details: `Got ${popIndex}` });
      }
    } catch (err) {
      results.push({ id: 4, name: 'Popularity Index Formula', passed: false, details: err.message });
    }

    try {
      const parsed = parseNaturalLanguageQuery('crime films released between 1995 and 2010');
      if (parsed.yearMin === 1995 && parsed.yearMax === 2010 && parsed.genre === 'Crime') {
        results.push({ id: 5, name: 'NLP Deterministic Intent Parser', passed: true, details: 'Successfully extracted Crime, 1995, 2010.' });
      } else {
        results.push({ id: 5, name: 'NLP Deterministic Intent Parser', passed: false, details: JSON.stringify(parsed) });
      }
    } catch (err) {
      results.push({ id: 5, name: 'NLP Deterministic Intent Parser', passed: false, details: err.message });
    }

    setTimeout(() => {
      setTestResults(results);
      setIsRunning(false);
    }, 500);
  };

  useEffect(() => {
    runAllSystemTests();
  }, []);

  return (
    <div className="p-6 rounded-2xl bg-[#14141B] border border-slate-800 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Terminal className="w-4 h-4 text-[#8B75F6]" />
          System Unit & Integration Assertions
        </h3>
        <button
          onClick={runAllSystemTests}
          disabled={isRunning}
          className="px-4 py-2 rounded-xl bg-[#715CD4] text-white text-xs font-semibold hover:bg-[#8B75F6] transition-colors"
        >
          {isRunning ? 'Running Assertions...' : 'Re-Run All Tests'}
        </button>
      </div>

      <div className="space-y-2">
        {testResults?.map((test) => (
          <div
            key={test.id}
            className={`p-3 rounded-xl border flex items-center justify-between ${
              test.passed ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300' : 'bg-rose-950/20 border-rose-800/40 text-rose-300'
            }`}
          >
            <div className="flex items-center gap-3">
              {test.passed ? <CheckCircle2 className="w-5 h-5 text-emerald-400" /> : <XCircle className="w-5 h-5 text-rose-400" />}
              <div>
                <p className="text-xs font-bold">{test.name}</p>
                <p className="text-[10px] opacity-80">{test.details}</p>
              </div>
            </div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-900/80">
              {test.passed ? 'PASSED' : 'FAILED'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
