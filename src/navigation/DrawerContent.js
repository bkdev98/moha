import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, Platform, Dimensions } from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';
import { useStoreState } from 'easy-peasy';
import { SimpleLineIcons } from '@expo/vector-icons';

const height = Dimensions.get('window').height;

const DrawerContent = ({ navigation }) => {
  const locale = useStoreState(state => state.app.locale);
  const currency = useStoreState(state => state.app.currency);

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
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('EditBudget')}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'playfair-regular',
            }}>Edit budget</Text>
            <SimpleLineIcons style={{ marginTop: 2 }} name='arrow-right' size={12} color='#FFFFFF' />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              paddingHorizontal: 20,
              marginVertical: 10,
              backgroundColor: '#282B35',
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('EditLocale')}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'playfair-regular',
            }}>Language</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'playfair-italic',
                marginRight: 10,
              }}>{locale}</Text>
              <SimpleLineIcons style={{ marginTop: 2 }} name='arrow-right' size={12} color='#FFFFFF' />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              paddingHorizontal: 20,
              marginVertical: 10,
              backgroundColor: '#282B35',
              height: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
            onPress={() => navigation.navigate('EditBudget')}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 14,
              fontFamily: 'playfair-regular',
            }}>Currency</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{
                color: '#FFFFFF',
                fontSize: 12,
                fontFamily: 'playfair-italic',
                marginRight: 10,
              }}>{currency}</Text>
              <SimpleLineIcons style={{ marginTop: 2 }} name='arrow-right' size={12} color='#FFFFFF' />
            </View>
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
