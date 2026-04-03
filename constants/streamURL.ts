const tvStreamUrl = (show_id:number, season_number:number,episode_number:number) => {
    return `https://vidfast.pro/tv/${show_id}/${season_number}/${episode_number}?autoPlay=false&nextButton=false&autoNext=false&theme=84cc16`
}

const movieStreamURL = (movie_id:number) => {
    return `https://vidfast.pro/movie/${movie_id}?autoPlay=false&theme=84cc16`
}

const dynamicStream = (media_type:string, id:number, seasonNumber?:number, episodeNumber?:number) => {
    return media_type === "tv"? tvStreamUrl(id, seasonNumber = 1, episodeNumber = 1) : movieStreamURL(id)   
}

export const stream = {
    tvStreamUrl,
    movieStreamURL,
    dynamicStream
}