import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, Platform, Dimensions } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

const height = Dimensions.get('window').height;

const DrawerContent = ({ navigation }) => {
  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#22252D' }} contentContainerStyle={{ height }}>
      <SafeAreaView
        style={{ flex: 1, backgroundColor: '#22252D' }}
        forceInset={{ top: 'always', horizontal: 'never' }}
      >
        <View style={{ marginTop: Platform.OS === 'android' ? 105 : 70 }}>
          <TouchableOpacity
            style={{
              width: '100%',
              paddingHorizontal: 20,
              marginVertical: 10,
              backgroundColor: '#282B35',
              height: 50,
              justifyContent: 'center',
            }}
            onPress={() => navigation.navigate('Setting')}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'playfair-regular',
            }}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 10,
            fontFamily: 'major-mono',
          }}>MoHA 1.0.0</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

export default DrawerContent;
