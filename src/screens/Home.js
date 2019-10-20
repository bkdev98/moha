import React from 'react';
import { Text, View, FlatList, StatusBar, TouchableOpacity, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { SimpleLineIcons } from '@expo/vector-icons';

import FAB from '../components/FAB';

const Home = ({ navigation }) => (
  <View style={{ flex: 1, backgroundColor: '#22252D' }}>
    <FlatList
      ListHeaderComponent={(
        <View>
          <View style={{
            height: 80,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 20,
            paddingHorizontal: 20,
          }}>
            <Text style={{ fontSize: 24, fontFamily: 'major-mono', color: '#FFFFFF' }}>
              MoHA
            </Text>
            <TouchableOpacity onPress={() => navigation.openDrawer()}>
              <SimpleLineIcons name="menu" size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <LinearGradient
            colors={['#FB9ED3', '#EB7483']}
            start={[1,0]}
            end={[0,1]}
            style={{
              height: 300,
              padding: 20,
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text style={{
              color: '#FFFFFF',
              fontSize: 18,
              fontFamily: 'playfair-regular',
            }}>Burndown chart</Text>
          </LinearGradient>
        </View>
      )}
      data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
      keyExtractor={i => i.toString()}
      contentContainerStyle={{ paddingBottom: 20 }}
      renderItem={() => (
        <View
          style={{
            backgroundColor: '#282B35',
            height: 100,
            marginHorizontal: 20,
            marginTop: 20,
            borderRadius: 5,
          }}
        />
      )}
    />
    <FAB icon='plus' onPress={() => navigation.navigate('NewTransaction')} />
  </View>
);

export default Home;
