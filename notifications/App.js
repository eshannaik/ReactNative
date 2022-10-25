import * as Notifications from 'expo-notifications';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { StyleSheet, Button, View, Platform } from 'react-native';

Notifications.setNotificationHandler({ // tells the device how to handle incoming notifications 
  handleNotification: async () => {
    return{
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    }
  }
});

export default function App() {
  useEffect(() => {
    async function configurePushNotifications(){
      const { status } = await Notifications.getPermissionsAsync(); // get current permission status
      let finalStatus = status;

      if(finalStatus !== 'granted'){
        const { status } = await Notifications.requestPermissionsAsync(); // request for permission if not there
        finalStatus = status;
      }

      if(finalStatus !== 'granted'){ // user denied access on request hence we through alert
        Alert.alert(
          'Permission required',
          'Push notifications need the appropriate permissions.'
        );
        return
      }

      const pushTokenData = await Notifications.getExpoPushTokenAsync(); // unique identification of each device
      console.log(pushTokenData);

      if(Platform.OS === 'android'){
        Notifications.setNotificationChannelAsync('default',{
          name:'default',
          importance: Notifications.AndroidImportance.DEFAULT, // how important is the notification
        }); // setting channel
      }
    }

    configurePushNotifications();

  })

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener((notification) => {
      console.log('NOTIFICATION RECEIVED');
      console.log(notification);
      const userName = notification.request.content.data.userName; // the data part of the notification that we added on line 31
      console.log(userName);
    }); // notification handler

    const subscription2 = Notifications.addNotificationResponseReceivedListener( // executes when tapped only on response
      (response) => {
        console.log('NOTIFICATION RESPONSE RECEIVED');
        // console.log(response);
        // const userName = response.notification.request.content.data.userName; // the data part of the notification that we added on line 31
        // console.log(userName);
      }
    ); // notification handler

    return () => {
      subscription1.remove();
      // subscription2.remove();
    }; // clean up function to prevent unnecessary memory usage

  },[])

  function scheduleNotificationHandler(){
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My First Notification',
        body: 'This is the body of the notification.',
        data: { // not visible but can be extracted later like an identifier to the notification or data
          userName: 'Max'
        }
      },
      trigger:{
        seconds:5
      }
    });
  }

  function sendPushNotificationHandler(){
    fetch('https://exp.host/--/api/v2/push/send',{ // link in official docs
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        to: '<Your Token id>',
        title: 'Test - sent from a device!',
        body: 'This is a test!'
      })
    })
  }

  return (
    <View style={styles.container}>
      <Button 
        title='Schedule Notification' 
        onPress={scheduleNotificationHandler} 
      />
      <Button
        title="Send Push Notification"
        onPress={sendPushNotificationHandler}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});