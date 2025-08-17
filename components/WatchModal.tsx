import * as ScreenOrientation from "expo-screen-orientation";
import React, { useRef } from "react";
import { Dimensions, Modal, Text, TouchableOpacity, View } from "react-native";
import { FlatGrid } from "react-native-super-grid";
import { WebView } from "react-native-webview";

interface props {
  setShowmodal: React.Dispatch<React.SetStateAction<boolean>>;
  setWatching?: React.Dispatch<React.SetStateAction<Episode | null>>;
  showModal: boolean;
  media_type: string;
  id: number | undefined;
  season?: number;
  episode?: number;
  fullEpisodes: SeasonData | null;
}

const WatchModal = ({
  setShowmodal,
  setWatching,
  showModal,
  media_type,
  id,
  season,
  episode,
  fullEpisodes,
}: props) => {
  const { height, width } = Dimensions.get("window");
  const webViewRef = useRef<WebView>(null);

  // useEffect(() => {
  //   if (showModal) {
  //     lockOrientation();
  //   } else {
  //     unLockOrientation();
  //   }
  // }, [showModal]);

  const lockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  };

  const unLockOrientation = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.DEFAULT
    );
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

  const handleCloseModal = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.DEFAULT
    );
    setShowmodal(false);
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
      const btn = document.createElement('button');
      btn.innerText = '← Back';
      btn.style.position = 'fixed';
      btn.style.top = '10px';
      btn.style.right = '10px';
      btn.style.background = '#000';
      btn.style.color = '#fff';
      btn.style.padding = '8px 12px';
      btn.onclick = function() {
      window.ReactNativeWebView.postMessage('goBack');
      };
      document.body.appendChild(btn);
    })();
    true;
  `;

  return (
    <Modal visible={showModal} animationType="fade">
      <View className="bg-primary" style={{ height: height, width: width }}>
        {/* <View className="absolute top-[20px] right-[10px] z-50">
          <TouchableOpacity onPress={() => handleCloseModal()}>
            <Ionicons name="close" size={29} color="white" />
          </TouchableOpacity>
        </View> */}
        <View className="h-[400px]">
          <WebView
            ref={webViewRef}
            setSupportMultipleWindows={false}
            allowsFullscreenVideo={true}
            javaScriptEnabled
            className="flex-1"
            source={{
              uri:
                media_type === "movie"
                  ? `https://vidfast.pro/movie/${id}?autoPlay=false`
                  : `https://vidfast.pro/tv/${id}/${season}/${episode}?autoPlay=false&nextButton=false&autoNext=false`,
            }}
            onShouldStartLoadWithRequest={onShouldStartLoadWithRequest}
            injectedJavaScript={injectedJS}
            onMessage={(event) => {
              if (event.nativeEvent.data === "goBack") {
                setShowmodal(false);
              }

              try {
                const data = JSON.parse(event.nativeEvent.data);

                if (data.videoUrl) {
                  console.log("Video Download URL:", data.videoUrl);
                  // Save, download, or show a download button
                }
              } catch {}
            }}
          />
        </View>

        {/* Episodes List */}
        <View className="flex-1 px-2 mt-5">
          {/* <View className="w-full">
            <Text>{}</Text>
          </View> */}
          {fullEpisodes && (
            <FlatGrid
              data={fullEpisodes?.episodes}
              keyExtractor={(item) => item.id.toString()}
              itemDimension={50}
              spacing={10}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      if (setWatching) setWatching(item);
                      const web = webViewRef.current;
                      if (web) {
                        web.reload();
                      }
                    }}
                    className={`items-center justify-center ${item.episode_number === episode ? "bg-secondary " : "bg-gray-700"} rounded-lg h-[50px]`}
                  >
                    <Text
                      className={`text-lg font-semibold ${item.episode_number === episode ? "text-white" : "text-gray-500"} `}
                    >
                      {item.episode_number}
                    </Text>
                  </TouchableOpacity>
                );
              }}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default WatchModal;
