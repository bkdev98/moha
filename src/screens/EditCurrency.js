import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import i18n from 'i18n-js';

import FAB from '../components/FAB';

const width = Dimensions.get('window').width;

const EditCurrency = ({ navigation }) => {
  const currency = useStoreState(state => state.app.currency);
  const setCurrency = useStoreActions(state => state.app.setCurrency);

  return (
    <View style={{ flex: 1, backgroundColor: '#22252D', justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{
          marginBottom: 40,
          color: '#FFFFFF',
          fontFamily: 'playfair-regular',
          fontSize: 18,
          textAlign: 'center',
        }}>{i18n.t('setCurrency')}</Text>
        <View style={{ backgroundColor: '#282B35', width, justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={[
              { name: 'VND', value: 'vnd' },
              { name: 'USD', value: 'usd' },
            ]}
            keyExtractor={i => i.value}
            horizontal
            style={{ flexGrow: 0 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={{
                borderBottomColor: '#FFFFFF',
                borderBottomWidth: item.value === currency ? 2 : 0,
                padding: 10,
              }} onPress={() => setCurrency(item.value)}>
                <Text style={{
                  color: '#FFFFFF',
                  fontFamily: 'playfair-regular',
                  fontSize: 14,
                  textAlign: 'center',
                }}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
      <FAB icon='check' onPress={() => navigation.goBack()} />
    </View>
  );
}

export default EditCurrency;
