// tracj the searches made by a user

import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const COLLECTION_ID = process.env.EXPO_PUBLIC_APPWRITE_COLLECTION_ID!
const client = new Client()
    .setEndpoint("https://cloud.appwrite.io/v1")
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!)
    
const database = new Databases(client);

export const updateSearchCount = async (query:string, media: media_type) => {

    try{
            const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.equal("searchTerm", query)]);
        
        
        if(result.documents.length > 0) {
            const existingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                COLLECTION_ID,
                existingMovie.$id,
                {
                    count: existingMovie.count + 1
                }
            )
        }else {
            await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
                searchTerm: query,
                movie_id: media.id,
                count: 1, 
                title: media.title || media.name || media.original_title,
                poster_url: `https://image.tmdb.org/t/p/w300${media.poster_path}`,
                genre_ids: media.genre_ids,
                media_type: media.media_type,
                release_date: media.release_date || media.first_air_date,
                origin_country: media.origin_country
            })
        }
    }catch(error) {
        console.log(error);
        throw error;
    }
}

export const getTopSearch = async (): Promise<TopSearch[] | undefined> => {
    try {
        const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [Query.limit(20), Query.orderDesc("count")]);

        const documentsToDelete = result.documents.slice(20);

        for(const doc of documentsToDelete) {
            await database.deleteDocument(DATABASE_ID, COLLECTION_ID, doc.$id);
        }
        

        return result.documents as unknown as TopSearch[];
    } catch (error) {
        console.log(error);
        return undefined
    }
}