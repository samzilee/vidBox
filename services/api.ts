const TMDB_CONFIG = {
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    header: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

 export const FetchTrending = async(page:number, time_window:string, type?:string) => {
    const endpoint = `https://api.themoviedb.org/3/trending/${type || "all"}/${time_window}?language=en-US&page=${page}`

    const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch Trending", response.statusText)
    }
    const data = await response.json();

    return data.results;
}

export const FetchPopular = async(type:string, page:number) => {
    const endpoint = `https://api.themoviedb.org/3/${type}/popular?language=en-US&page=${page}`;
    const response = await fetch(endpoint, {headers: TMDB_CONFIG.header})

    if(!response.ok) {
         //@ts-ignore
        throw new Error("faild to fetch Popular", response.statusText)   
    }


    const data = await response.json();

    return data.results;
}


export const FetchLatestMovie = async(page:number) => {
    const endpoint = `https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=${page}`;
    const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch movies", response.statusText)
    }
    const data = await response.json();

    return data.results;
} 

export const FetchLatestTV = async(page:number) => {
    const endpoint = `https://api.themoviedb.org/3/tv/airing_today?language=en-US&page=${page}`;
    const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch Tv", response.statusText)
    }
    const data = await response.json();

    return data.results;
}


export const FetchQuery = async(query:string, page:number) => {
     const endpoint = `https://api.themoviedb.org/3/search/multi?query=${query}&include_adult=false&page=${page}`;

    const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch Query", response.statusText)
    }
    const data = await response.json();

    return data.results;
}

export const FetchCountries = async() => {
    const endpoint = `https://api.themoviedb.org/3/configuration/countries`;
     const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch countries", response.statusText)
    }
    const data = await response.json();

    return data;
}

export const FetchDetails = async(media_type:string ,id:string) => {
    const endpoint = `https://api.themoviedb.org/3/${media_type}/${id}?append_to_response=credits&language=en-US`;
     const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch details", response.statusText)
    }
    const data = await response.json();

    return data;
}

export const FetchSimilar = async(id:number,media_type:string, page:number) => {
    const endpoint = `https://api.themoviedb.org/3/${media_type}/${id}/similar?language=en-US&page=${page}`

    const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch Query", response.statusText)
    }
    const data = await response.json();

    return data.results;
}

export const FetchEpisodes = async(id:number, season_number:number) => {
   const endpoint = `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?language=en-US`
    const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch Query", response.statusText)
    }
    const data = await response.json();

    return data;
}


export const FetchVideo = async(id:number, media_type:string) => {
   const endpoint = `https://api.themoviedb.org/3/${media_type}/${id}/videos?language=en-US`
    const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch Query", response.statusText)
    }
    const data = await response.json();

    return data.results;
}

export const DiscoverMedias = async (genres:Array<Genre>, country:CountryProps | null, page:number, media_type:string) => {
    const MovieEndpoint =  `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc${genres.length > 0 ? "&with_genres=" + genres.map((genre) => genre.id):""}${country ? "&with_origin_country=" + country.iso_3166_1 : ""}`;
    
   const TvEndpoint = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc${genres.length > 0 ? "&with_genres=" + genres.map((genre) => genre.id):""}${country ? "&with_origin_country=" + country.iso_3166_1 : ""}`;
   
    const response = await fetch(media_type === "movie" ? MovieEndpoint : TvEndpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch Query", response.statusText)
    }
    const data = await response.json();

    return data.results;
    
}
