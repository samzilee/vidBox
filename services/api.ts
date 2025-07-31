const TMDB_CONFIG = {
    API_KEY: process.env.EXPO_PUBLIC_MOVIE_API_KEY,
    header: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_MOVIE_API_KEY}`
    }
}

 export const FetchTrending = async(page:number, time_window:string) => {
    const endpoint = `https://api.themoviedb.org/3/trending/all/${time_window}?language=en-US&page=${page}`

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

export const FetchSimilar = async(id:number, page:number) => {
    const endpoint = `https://api.themoviedb.org/3/movie/${id}/similar?language=en-US&page=${page}`

    const response = await fetch(endpoint, {headers:TMDB_CONFIG.header})

    if(!response.ok){
        //@ts-ignore
        throw new Error("faild to fetch Query", response.statusText)
    }
    const data = await response.json();

    return data.results;
}