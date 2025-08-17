import { Image } from "react-native";

export const SmallImage = (path: string, fullURL: boolean) => {
  return fullURL ? (
    <Image
      source={{ uri: path }}
      className="w-[100px] h-[130px] rounded-lg bg-gray-500"
      resizeMode="cover"
    />
  ) : (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w185${path}` }}
      className="w-[100px] h-[130px] rounded-lg bg-gray-500"
      resizeMode="cover"
    />
  );
};

export const MediumImage = (path: string, fullURL: boolean) => {
  return fullURL ? (
    <Image
      source={{ uri: path }}
      className="bg-gray-500 rounded-lg w-[140px] h-[190px]"
      resizeMode="cover"
    />
  ) : (
    <Image
      source={{ uri: `https://image.tmdb.org/t/p/w185${path}` }}
      className="bg-gray-500 rounded-lg w-[120px] h-[170px]"
      resizeMode="cover"
    />
  );
};
