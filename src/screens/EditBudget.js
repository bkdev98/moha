import React from 'react';
import { ScrollView, View, TextInput, Text, KeyboardAvoidingView, Dimensions, TouchableOpacity } from 'react-native';
import { useStoreState, useStoreActions } from 'easy-peasy';
import i18n from 'i18n-js';

import BackButton from '../components/BackButton';
import FAB from '../components/FAB';

const WIDTH = Dimensions.get('window').width;

const EditBudget = ({ navigation }) => {
  const showBack = navigation.getParam('showBack', true);
  const setBudget = useStoreActions(state => state.app.setBudget);
  const setCurrency = useStoreActions(state => state.app.setCurrency);
  const budget = useStoreState(state => state.app.budget);
  const currency = useStoreState(state => state.app.currency);

  return (
    <ScrollView
      keyboardShouldPersistTaps='handled'
      keyboardDismissMode='interactive'
      style={{ backgroundColor: '#22252D' }}
      contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <KeyboardAvoidingView behavior='padding' style={{ minWidth: WIDTH - 40, maxWidth: 400, alignItems: 'center' }}>
        <Text style={{
          marginBottom: 20,
          color: '#FFFFFF',
          fontFamily: 'playfair-regular',
          fontSize: 18,
          textAlign: 'center',
        }}>{i18n.t('enterYourMonthlyBudget')}</Text>
        <View style={{
          backgroundColor: '#282B35',
          borderRadius: 5,
          height: 45,
          justifyContent: 'center',
          alignItems: 'center',
          paddingBottom: 5,
        }}>
          <TextInput
            value={String(budget)}
            onChangeText={value => value < 999999999999 && setBudget(value)}
            textAlign='center'
            autoFocus
            selectionColor='#FB9ED3'
            underlineColorAndroid='transparent'
            keyboardType='numeric'
            style={{
              fontSize: 28,
              fontFamily: 'major-mono',
              color: '#FFFFFF',
              minWidth: WIDTH - 40,
              maxWidth: 400,
              paddingHorizontal: 20,
            }}
          />
        </View>
        <View style={{
          marginTop: 15,
          flexDirection: 'row',
        }}>
          <TouchableOpacity style={{
            borderBottomColor: '#FFFFFF',
            borderBottomWidth: currency === 'usd' ? 2 : 0,
            padding: 5,
          }} onPress={() => setCurrency('usd')}>
            <Text style={{
              color: '#FFFFFF',
              fontFamily: 'playfair-regular',
              fontSize: 14,
              textAlign: 'center',
            }}>USD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{
            marginLeft: 10,
            borderBottomColor: '#FFFFFF',
            borderBottomWidth: currency === 'vnd' ? 2 : 0,
            padding: 5,
          }} onPress={() => setCurrency('vnd')}>
            <Text style={{
              color: '#FFFFFF',
              fontFamily: 'playfair-regular',
              fontSize: 14,
              textAlign: 'center',
            }}>VND</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      {showBack && <BackButton />}
      {budget ? <FAB icon='check' onPress={() => navigation.navigate(showBack ? 'Home' : 'App')} /> : null}
    </ScrollView>
  );
}

export default EditBudget;
