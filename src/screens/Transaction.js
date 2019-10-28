import React, { useState } from 'react';
import { ScrollView, View, KeyboardAvoidingView, Text, TextInput, Dimensions, TouchableOpacity, Image, LayoutAnimation } from 'react-native';
import { useStoreActions } from 'easy-peasy';
import { FlatGrid } from 'react-native-super-grid';
import { LinearGradient } from 'expo-linear-gradient';
import i18n from 'i18n-js';

import FAB from '../components/FAB';
import BackButton from '../components/BackButton';

import { WHITE_ICONS } from '../utils/icons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Transaction = ({ navigation }) => {
  const type = navigation.getParam('type', 'create');
  const data = navigation.getParam('data', {
    name: '',
    value: 0,
    icon: 8,
  });

  const addTransaction = useStoreActions(state => state.transaction.addTransaction);
  const editTransaction = useStoreActions(state => state.transaction.editTransaction);

  const [state, setState] = useState(data);

  const handleSubmit = () => {
    if (type === 'create') {
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
      addTransaction({
        ...state,
        time: Date.now(),
      });
    } else if (type === 'edit') {
      editTransaction({
        ...state,
        time: data.time,
      });
    }
    navigation.navigate('Home');
  }

  return (
    <View style={{ flex: 1, backgroundColor: '#22252D' }}>
      <ScrollView
        keyboardShouldPersistTaps='handled'
        keyboardDismissMode='interactive'
        style={{ backgroundColor: '#22252D' }}
        contentContainerStyle={{ flex: 1 }}
      >
        <KeyboardAvoidingView behavior='padding'>
          <Text style={{
            marginTop: 70,
            marginBottom: 20,
            color: '#FFFFFF',
            fontFamily: 'playfair-regular',
            fontSize: 16,
            marginLeft: 20,
          }}>{i18n.t('transactionName')}:</Text>
          <View style={{
            backgroundColor: '#282B35',
            borderRadius: 5,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
            width: WIDTH - 40,
            marginLeft: 20,
          }}>
            <TextInput
              value={state.name}
              onChangeText={value => setState({ ...state, name: value })}
              autoFocus
              selectionColor='#FB9ED3'
              underlineColorAndroid='transparent'
              placeholder={i18n.t('coffee')}
              style={{
                fontSize: 18,
                fontFamily: 'playfair-regular',
                color: '#FFFFFF',
                minWidth: WIDTH - 40,
                maxWidth: 400,
                paddingHorizontal: 20,
              }}
            />
          </View>
          <Text style={{
            marginBottom: 20,
            color: '#FFFFFF',
            fontFamily: 'playfair-regular',
            fontSize: 16,
            marginTop: 20,
            marginLeft: 20,
          }}>{i18n.t('totalValue')}:</Text>
          <View style={{
            backgroundColor: '#282B35',
            borderRadius: 5,
            height: 45,
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: 5,
            width: WIDTH - 40,
            marginLeft: 20,
          }}>
            <TextInput
              value={String(state.value)}
              onChangeText={value => value >= 0 && value < 999999999999 && setState({ ...state, value })}
              selectionColor='#FB9ED3'
              underlineColorAndroid='transparent'
              keyboardType='numeric'
              style={{
                fontSize: 22,
                fontFamily: 'major-mono',
                color: '#FFFFFF',
                minWidth: WIDTH - 40,
                maxWidth: 400,
                paddingHorizontal: 20,
              }}
            />
          </View>
          <Text style={{
            marginBottom: 15,
            color: '#FFFFFF',
            fontFamily: 'playfair-regular',
            fontSize: 16,
            marginTop: 20,
            marginLeft: 20,
          }}>{i18n.t('selectAnIcon')}:</Text>
          <FlatGrid
            items={WHITE_ICONS}
            style={{ maxHeight: HEIGHT / 3 }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            horizontal
            spacing={10}
            itemDimension={45}
            renderItem={({ item, index }) => index !== state.icon ? (
              <TouchableOpacity
                onPress={() => setState({ ...state, icon: index })}
                style={{
                  flex: 1,
                  backgroundColor: '#282B35',
                  borderRadius: 5,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={{ width: 20, height: 20, overflow: 'visible' }}>
                  <Image source={item} style={{ resizeMode: 'contain', height: undefined, width: undefined, flex: 1 }} />
                </View>
              </TouchableOpacity>
            ) : (
              <LinearGradient
                colors={['#FB9ED3', '#EB7483']}
                start={[1,0]}
                end={[0,1]}
                style={{
                  flex: 1,
                  backgroundColor: '#282B35',
                  borderRadius: 5,
                  width: 50,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <View style={{ width: 20, height: 20, overflow: 'visible' }}>
                  <Image source={WHITE_ICONS[index]} style={{ resizeMode: 'contain', height: undefined, width: undefined, flex: 1 }} />
                </View>
              </LinearGradient>
            )}
          />
        </KeyboardAvoidingView>
      </ScrollView>
      <BackButton />
      <FAB icon='check' onPress={handleSubmit} />
    </View>
  );
}

export default Transaction;
