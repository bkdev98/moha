import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useStoreState } from 'easy-peasy';
import i18n from 'i18n-js';

import BackButton from '../components/BackButton';

const About = () => {
  const locale = useStoreState(state => state.app.locale);

  const data = locale === 'vi' ? [
    'Tác giả: Quốc Khánh',
    'Những icon được cung cấp bởi Tilda Publishing',
  ] : [
    'Author: Quoc Khanh',
    'Icons are provided by Tilda Publishing',
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#22252D' }}>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 20, paddingBottom: 20, paddingTop: 60 }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontFamily: 'playfair-regular',
          marginBottom: 20,
        }}>{i18n.t('about')}</Text>
        {data.map((item, idx) => <Text key={idx} style={{
          color: '#B4B7C1',
          fontSize: 14,
          fontFamily: 'playfair-italic',
          marginBottom: 10,
          textAlign: 'center',
        }}>{item}</Text>)}
      </ScrollView>
      <BackButton />
    </View>
  );
}

export default About;
