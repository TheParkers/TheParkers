import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.theparkers.waterloo',
  appName: 'theparkers',
  webDir: 'dist/frontend',
  bundledWebRuntime: false,
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
    LocalNotifications: {
      smallIcon: 'ic_stat_icon_config_sample',
      iconColor: '#CE0B7C',
    },
    PushNotifications: {
      presentationOptions: ['alert', 'sound'],
    },
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '111997111938-euaqk6kaaj6lg2ut73vudb9ue7u0b0en.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    }
  }, 
  // cordova: {
  //   preferences: {
  //     ScrollEnabled: 'false',
  //     BackupWebStorage: 'none',
  //     SplashMaintainAspectRatio: 'true',
  //     FadeSplashScreenDuration: '300',
  //     SplashShowOnlyFirstTime: 'false',
  //     SplashScreen: 'screen',
  //     SplashScreenDelay: '3000'
  //   }
  // }
};

export default config;
