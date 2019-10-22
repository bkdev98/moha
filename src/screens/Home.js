import React from 'react';
import { Text, View, FlatList, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import moment from 'moment';

import FAB from '../components/FAB';
import BurndownChart from '../components/BurndownChart';

const Home = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: '#22252D' }}>
    <View style={{
      height: 60,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
      paddingHorizontal: 20,
    }}>
      <Text style={{ fontSize: 24, fontFamily: 'playfair-bold', color: '#FFFFFF' }}>
        {moment().format('MM/YYYY')}
      </Text>
      <TouchableOpacity
        hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
        onPress={() => navigation.openDrawer()}>
        <SimpleLineIcons name="menu" size={18} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
    <FlatList
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      keyExtractor={i => i.toString()}
      ListHeaderComponent={(
        <BurndownChart />
      )}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={() => (
        <View
          style={{
            backgroundColor: '#282B35',
            height: 80,
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 5,
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: 'row',
            paddingHorizontal: 20,
          }}
        >
          <View>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontFamily: 'playfair-regular',
              marginBottom: 10,
            }}>Grab Bike</Text>
            <Text style={{
              color: '#B4B7C1',
              fontSize: 12,
              fontFamily: 'playfair-italic',
            }}>2 giờ trước</Text>
          </View>
          <Text style={{
            fontFamily: 'major-mono',
            fontSize: 14,
            color: '#FFFFFF',
          }}>52k</Text>
        </View>
      )}
    />
    <FAB icon='plus' onPress={() => navigation.navigate('NewTransaction')} />
  </View>
);

export default Home;
