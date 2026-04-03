import { logos } from "@/constants/logos";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInModal = () => {
  const [hidePassword1, setHidePassword1] = useState<boolean>(true);

  return (
    <SafeAreaView className="flex-1 p-5 bg-primary">
      {/* header */}

      <TouchableOpacity
        className="w-10 p-2 mb-10 bg-gray-800 rounded-full"
        onPress={() => router.back()}
      >
        <Ionicons name="close" size={20} color={"white"} />
      </TouchableOpacity>

      {/* main */}
      <View className="gap-5">
        <Image source={logos.cover} className="w-[100px] h-[50px] rounded-md" />
        <View>
          <Text className="text-2xl font-bold text-white">Welcome back</Text>
          <Text className="text-[0.9rem] font-semibold text-gray-400">
            Hello there, Sign in to continue
          </Text>
        </View>

        {/* Text Inputs */}
        <View className="flex-col gap-3">
          <TextInput
            placeholder="Your email"
            textContentType="emailAddress"
            placeholderTextColor={"#9ca3af"}
            className="w-full px-3 h-[50px] text-white border border-gray-700 border-solid rounded-md"
            cursorColor={"#84cc16"}
          />
          <View className="flex-row w-full border border-gray-700 border-solid rounded-md px-3 h-[50px] items-center">
            <TextInput
              placeholder="Password"
              passwordRules={
                "required: digit; max-consecutive: 2; minlength: 8;"
              }
              textContentType="password"
              secureTextEntry={hidePassword1}
              placeholderTextColor={"#9ca3af"}
              className="flex-1 text-white"
              cursorColor={"#84cc16"}
            />
            <TouchableOpacity onPress={() => setHidePassword1((prev) => !prev)}>
              {hidePassword1 ? (
                <Ionicons name="eye" size={24} color={"#9ca3af"} />
              ) : (
                <Ionicons name="eye-off" size={24} color={"#9ca3af"} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/* Buttons */}

        <View className="gap-3 py-10">
          <TouchableOpacity className="w-full h-[50px] bg-secondary/50 items-center justify-center rounded-md">
            <Text className="text-lg font-bold text-gray-400">Login now</Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-full h-[50px] bg-gray-400/50 items-center justify-center rounded-md">
            <View className="absolute top-0 bottom-0 left-0 items-center justify-center pl-5">
              <Ionicons
                name="logo-google"
                size={25}
                color={"#9ca3af"}
                className=""
              />
            </View>
            <Text className="text-lg font-bold text-gray-400">
              Continue with google
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View className="items-center justify-center w-full">
        <Text className="text-sm text-gray-500" numberOfLines={2}>
          Haven't signed up yet?
        </Text>
        <TouchableOpacity onPress={() => router.push("/authPage/SignUpModal")}>
          <Text className="text-sm text-secondary">Create account</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SignInModal;
