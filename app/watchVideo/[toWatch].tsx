import { useIsFocused } from "@react-navigation/native";
import { router } from "expo-router";
import { useLocalSearchParams } from "expo-router/build/hooks";
import * as ScreenOrientation from "expo-screen-orientation";
import React, { useEffect, useRef } from "react";
import { Alert, BackHandler, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { WebView } from "react-native-webview";

const WatchVideo = () => {
  const webViewRef = useRef<WebView>(null);
  const focused = useIsFocused();
  const { toWatch, id, season, ep } = useLocalSearchParams();

  useEffect(() => {
    const orientationInterverl = setInterval(handleOrientationDEFAULT, 100);
    const backAction = () => {
      Alert.alert("Hold on!", "are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => handleback(),
        },
      ]);

      return true;
    };

    const backHandle = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => (backHandle.remove(), clearInterval(orientationInterverl));
  }, []);

  const handleOrientationDEFAULT = async () => {
    if (!focused) return;
    StatusBar.setHidden(true, "slide");
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const handleback = async () => {
    StatusBar.setHidden(false, "slide");
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.PORTRAIT_UP
    );
    router.back();
  };

  const onShouldStartLoadWithRequest = (event: any) => {
    const allowedHost = "vidfast.pro";
    try {
      const url = new URL(event.url);
      return url.hostname === allowedHost;
    } catch (error) {
      return false;
    }
  };

  const injectedJS = `
    (function() {
      const open = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(method, url) {
        if (url.includes(".mp4") || url.includes(".m3u8")) {
          window.ReactNativeWebView.postMessage(JSON.stringify({ videoUrl: url }));
        }
        return open.apply(this, arguments);
      };
      
    })();
    true;
  `;

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <WebView
        ref={webViewRef}
        setSupportMultipleWindows={false}
        allowsFullscreenVideo={true}
        javaScriptEnabled
        className="flex-1"
        source={{
          uri:
            toWatch === "movie"
              ? `https://vidfast.pro/movie/${id}?autoPlay=false&theme=84cc16`
              : `https://vidfast.pro/tv/${id}/${season}/${ep}?autoPlay=false&nextButton=false&autoNext=false&theme=84cc16`,
        }}
        onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
        injectedJavaScript={injectedJS}
        onMessage={(event) => {
          try {
            const data = JSON.parse(event.nativeEvent.data);

            if (data.videoUrl) {
              // console.log("Video Download URL:", data.videoUrl);
              // Save, download, or show a download button
            }
          } catch {}
        }}
      />
    </SafeAreaView>
  );
};

export default WatchVideo;
