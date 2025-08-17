interface media_type {
    adult: boolean,
    id: number,
    title?: string,
    name?:string
    original_title?: string,
    overview: string,
    backdrop_path:string,
    poster_path: string,
    media_type: string,
    original_language: string,
    genre_ids: Array<number>
    first_air_date?:string;
    release_date?:string;
    origin_country?: Array<string>
}

interface Countries_type {
    iso_3166_1: string,
    english_name: string,
    native_name: string
}

interface TopSearch {
  searchTerm: string;
  movie_id: number;
  title: string;
  count: number;
  poster_url: string;
  genre_ids: Array<number>,
  media_type: string,
  release_date: string,
  origin_country: Array<string>,
}


interface Moviedetails {
  adult: boolean;
  id: number;
  title: string;
  original_title: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  budget: number;
  revenue: number;
  runtime: number;
  release_date: string;
  tagline: string;
  homepage: string;
  imdb_id: string;
  original_language: string;
  origin_country: string[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  status: string;
  video: boolean;
  genres: Genre[];
  spoken_languages: SpokenLanguage[];
  production_companies: Company[];
  production_countries: Country[];
  belongs_to_collection?: BelongsToCollection;
  credits: Credits;
}

interface TvShowDetails {
  adult: boolean;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  backdrop_path: string;
  poster_path: string;
  homepage: string;
  original_language: string;
  origin_country: string[];
  first_air_date: string;
  last_air_date: string;
  in_production: boolean;
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  popularity: number;
  vote_average: number;
  vote_count: number;
  status: string;
  tagline: string;
  type: string;
  genres: Genre[];
  spoken_languages: SpokenLanguage[];
  production_companies: Company[];
  production_countries: Country[];
  last_episode_to_air: Episode;
  next_episode_to_air?: Episode;
  networks: Network[];
  seasons: Season[];
  credits: Credits;
}

interface Similar {
  adult:boolean;
  backdrop_path:string;
  genre_ids: number[];
  id:number;
  media_type:string
  original_language:string;
  original_title:string;
  overview:string;
  popularity:number;
  poster_path:string;
  release_date: string
  title:string;
  video:boolean;
  vote_average:number;
  vote_count: number;
}

interface SeasonData {
  _id: string;
  air_date: string;
  episodes: Episode[];
  name: string;
  overview: string;
  id: number;
  poster_path: string | null;
  season_number: number;
  vote_average: number;
}


interface Credits {
  cast: Cast[];
}

interface Cast {
  adult: boolean,
  gender: number,
  id: 1388593,
  known_for_department: string,
  name: string,
  original_name: string,
  popularity: number,
  profile_path: string,
  cast_id: number,
  character: string,
  credit_id: string,
  order: number
}

interface Genre {
  id: number;
  name: string;
}

interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  episode_type: string;
  production_code: string;
  runtime: number | null;
  season_number: number;
  show_id: number;
  still_path: string | null;
  crew?: CrewMember[];
}

interface CrewMember {
  job: string;
  department: string;
  credit_id: string;
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
}

interface Network {
  id: number;
  name: string;
  logo_path: string;
  origin_country: string;
}

interface Company {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

interface Country {
  iso_3166_1: string;
  name: string;
}

interface CountryProps {
  iso_3166_1: string;
  english_name: String;
  native_name: string;
}

interface Season {
  id: number;
  name: string;
  air_date: string;
  episode_count: number;
  overview: string;
  poster_path: string;
  season_number: number;
  vote_average: number;
}

interface SpokenLanguage {
  iso_639_1: string;
  english_name: string;
  name: string;
}

interface BelongsToCollection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

interface video {
  iso_639_1:string,
  iso_3266_1:string,
  name:string,
  key:string,
  site:string,
  size: number,
  type:string,
  official:boolean,
  published_at:string,
  id:number
}