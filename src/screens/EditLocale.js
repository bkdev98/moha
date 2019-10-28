import React from 'react';
import { View, FlatList, Text, TouchableOpacity, Dimensions } from 'react-native';
import { useStoreActions, useStoreState } from 'easy-peasy';
import i18n from 'i18n-js';

import FAB from '../components/FAB';

const width = Dimensions.get('window').width;

const EditLocale = ({ navigation }) => {
  const locale = useStoreState(state => state.app.locale);
  const setLocale = useStoreActions(state => state.app.setLocale);

  return (
    <View style={{ flex: 1, backgroundColor: '#22252D', justifyContent: 'center', alignItems: 'center' }}>
      <View>
        <Text style={{
          marginBottom: 40,
          color: '#FFFFFF',
          fontFamily: 'playfair-regular',
          fontSize: 18,
          textAlign: 'center',
        }}>{i18n.t('setLanguage')}</Text>
        <View style={{ backgroundColor: '#282B35', width, justifyContent: 'center', alignItems: 'center' }}>
          <FlatList
            data={[
              { name: 'Tiếng Việt', value: 'vi' },
              { name: 'English', value: 'en' },
            ]}
            keyExtractor={i => i.value}
            horizontal
            style={{ flexGrow: 0 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <TouchableOpacity style={{
                borderBottomColor: '#FFFFFF',
                borderBottomWidth: item.value === locale ? 2 : 0,
                padding: 10,
              }} onPress={() => setLocale(item.value)}>
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

export default EditLocale;
