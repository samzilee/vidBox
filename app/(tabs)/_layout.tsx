import { icons } from "@/constants/icons";
import { Tabs } from "expo-router";
import React from "react";
import { Text, View } from "react-native";

function TabStyle({
  focused,
  name,
  icon,
}: {
  focused: boolean;
  name: string;
  icon: ({
    color,
    outline,
    size,
  }: {
    color: string;
    outline: boolean;
    size: number;
  }) => React.JSX.Element;
}) {
  if (focused) {
    return (
      <View className="flex flex-col items-center transition-all duration-[0.5s] w-full min-w-[112px] min-h-16 ">
        {/* color = lime */}
        {icon({ color: "#84cc16", outline: false, size: 24 })}
        <Text className="text-base font-semibold text-secondary text-nowrap ">
          {name}
        </Text>
      </View>
    );
  } else {
    return (
      <View className="flex flex-col items-center transition-all duration-[0.5s]  w-full min-w-[112px] min-h-16">
        {icon({ color: "gray", outline: true, size: 24 })}
        <Text className="text-base font-semibold text-gray-500 text-nowrap ">
          {name}
        </Text>
      </View>
    );
  }
}

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        tabBarShowLabel: false,
        tabBarItemStyle: {
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
          marginHorizontal: 10,
        },
        tabBarStyle: {
          height: 80,
          backgroundColor: "#111827",
          paddingTop: 20,
          borderColor: "#111827",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabStyle focused={focused} name={"Home"} icon={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="movies"
        options={{
          headerStyle: {
            backgroundColor: "#111827",
          },
          headerTitle: () => (
            <Text className="text-2xl font-bold text-white">Movies</Text>
          ),
          title: "Movies",
          tabBarIcon: ({ focused }) => (
            <TabStyle focused={focused} name={"Movies"} icon={icons.movies} />
          ),
        }}
      />
      <Tabs.Screen
        name="tv_series"
        options={{
          headerStyle: {
            backgroundColor: "#111827",
          },
          headerTitle: () => (
            <Text className="text-2xl font-bold text-white">Tv Series</Text>
          ),
          title: "Tv Series",
          tabBarIcon: ({ focused }) => (
            <TabStyle
              focused={focused}
              name={"Tv Series"}
              icon={icons.tv_series}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="watch_list"
        options={{
          headerStyle: {
            backgroundColor: "#111827",
          },
          headerTitle: () => (
            <Text className="text-2xl font-bold text-white">Watch List</Text>
          ),
          title: "Watch List",
          tabBarIcon: ({ focused }) => (
            <TabStyle
              focused={focused}
              name={"Watch List"}
              icon={icons.watch_list}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="more"
        options={{
          headerStyle: {
            backgroundColor: "#111827",
          },
          headerTitle: () => (
            <Text className="text-2xl font-bold text-white">Settings</Text>
          ),
          title: "More",
          tabBarIcon: ({ focused }) => (
            <TabStyle focused={focused} name={"More"} icon={icons.more} />
          ),
        }}
      />
    </Tabs>
  );
}
