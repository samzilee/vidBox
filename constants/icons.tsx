import { Ionicons } from "@expo/vector-icons";

interface props {
  color: string;
  outline: boolean;
  size: number;
}

//Home
const home = ({ color, outline, size }: props) => {
  if (outline) {
    return <Ionicons name="home-outline" color={color} size={size} />;
  }
  return <Ionicons name="home" color={color} size={size} />;
};

//Movies
const movies = ({ color, outline, size }: props) => {
  if (outline) {
    return <Ionicons name="play-circle-outline" color={color} size={size} />;
  }
  return <Ionicons name="play-circle" color={color} size={size} />;
};

//TV series
const tv_series = ({ color, outline, size }: props) => {
  if (outline) {
    return <Ionicons name="folder-outline" color={color} size={size} />;
  }
  return <Ionicons name="folder-open" color={color} size={size} />;
};

//Watch List
const watch_list = ({ color, outline, size }: props) => {
  if (outline) {
    return <Ionicons name="bookmark-outline" color={color} size={size} />;
  }
  return <Ionicons name="bookmark" color={color} size={size} />;
};

//More
const more = ({ color, outline, size }: props) => {
  if (outline) {
    return <Ionicons name="apps-outline" color={color} size={size} />;
  }
  return <Ionicons name="apps" color={color} size={size} />;
};

export const icons = {
  home,
  movies,
  tv_series,
  watch_list,
  more,
};
