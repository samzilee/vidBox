import { Alert, Linking } from "react-native";

export const openInBrave = async (url: string) => {
   // Fallback → ask to install Brave
    Alert.alert(
      "Install Brave",
      "For the best ad-free streaming experience, please install Brave Browser.",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Install",
            onPress: () =>
            Linking.openURL(
              "https://play.google.com/store/apps/details?id=com.brave.browser"
            ),
        },
        {
          text: "Continue",
          style: "default",
          isPreferred: true,
          onPress: () => Linking.openURL(url),
        }
      ]
    , {
      cancelable:true,
      userInterfaceStyle: "dark",
      onDismiss:() => console.log("Alert Dismissed"),
    });
};
