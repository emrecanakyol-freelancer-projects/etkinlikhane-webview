import React, {useState, useRef, useCallback, useEffect} from 'react';
import {
  SafeAreaView,
  RefreshControl,
  ScrollView,
  BackHandler,
} from 'react-native';
import {WebView} from 'react-native-webview';
import SplashScreen from 'react-native-splash-screen';

const App = () => {
  const [refresherEnabled, setEnableRefresher] = useState(true);
  const webViewRef: any = useRef();
  const [canGoBack, setCanGoBack] = useState(false);

  const handleBack = useCallback(() => {
    if (canGoBack && webViewRef.current) {
      webViewRef.current.goBack();
      return true;
    }
    return false;
  }, [canGoBack]);

  const handleScroll = (res: any) => {
    const yOffset = Number(res.nativeEvent.contentOffset.y);
    if (yOffset === 0) {
      setEnableRefresher(true);
    } else {
      setEnableRefresher(false);
    }
  };

  useEffect(() => {
    SplashScreen.hide();
    BackHandler.addEventListener('hardwareBackPress', handleBack);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', handleBack);
    };
  }, [handleBack]);

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView
        contentContainerStyle={{flex: 1}}
        refreshControl={
          <RefreshControl
            refreshing={false}
            enabled={refresherEnabled}
            onRefresh={() => {
              webViewRef.current.reload();
            }}
          />
        }>
        <WebView
          source={{uri: "https://etkinlikhane.com/"}}
          onLoadProgress={event => setCanGoBack(event.nativeEvent.canGoBack)}
          ref={webViewRef}
          originWhitelist={['*']}
          onScroll={handleScroll}
          allowsInlineMediaPlayback
          javaScriptEnabled
          scalesPageToFit
          mediaPlaybackRequiresUserAction={false}
          javaScriptEnabledAndroid
          useWebkit
          startInLoadingState
          cacheEnabled
          allowsFullscreenVideo
          setBuiltInZoomControls
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
