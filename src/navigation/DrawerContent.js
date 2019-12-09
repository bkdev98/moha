import React from 'react';
import { ScrollView, TouchableOpacity, Text, View, Platform, Dimensions } from 'react-native';
// import SafeAreaView from 'react-native-safe-area-view';
import { useStoreState } from 'easy-peasy';
import { SimpleLineIcons } from '@expo/vector-icons';
import i18n from 'i18n-js';

const height = Dimensions.get('window').height;

const SectionTitle = ({ title }) => <Text style={{
  color: '#FFFFFF',
  fontFamily: 'major-mono',
  fontSize: 10,
  paddingHorizontal: 20,
  backgroundColor: '#282B35',
  paddingVertical: 5,
}}>
  {title}
</Text>

const Divider = () => <View style={{ width: '100%', height: 1, backgroundColor: '#282B35' }} />

const DrawerItem = ({
  title,
  subTitle,
  onPress,
  hideArrow,
}) => (
  <TouchableOpacity
    style={{
      width: '100%',
      paddingHorizontal: 20,
      height: 45,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    }}
    onPress={onPress}
  >
    <Text style={{
      color: '#FFFFFF',
      fontSize: 14,
      fontFamily: 'playfair-regular',
    }}>{title}</Text>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
      {subTitle && <Text style={{
        color: '#B4B7C1',
        fontSize: 12,
        fontFamily: 'playfair-italic',
        marginRight: 10,
      }}>{subTitle}</Text>}
      {!hideArrow && <SimpleLineIcons style={{ marginTop: 2 }} name='arrow-right' size={12} color='#FFFFFF' />}
    </View>
  </TouchableOpacity>
)

const DrawerContent = ({ navigation }) => {
  const locale = useStoreState(state => state.app.locale);
  const currency = useStoreState(state => state.app.currency);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#22252D' }} contentContainerStyle={{ height }}>
      {/* <SafeAreaView
        style={{ flex: 1, backgroundColor: '#22252D' }}
        forceInset={{ top: 'always', horizontal: 'never' }}
      > */}
      <View style={{ flex: 1, backgroundColor: '#22252D' }}>
        <View style={{ marginTop: Platform.OS === 'android' ? 105 : 70 }}>
          <SectionTitle title={i18n.t('general')} />
          <DrawerItem title={i18n.t('editBudget')} onPress={() => navigation.navigate('EditBudget')} />
          <Divider />
          <DrawerItem title={i18n.t('language')} subTitle={locale} onPress={() => navigation.navigate('EditLocale')} />
          <Divider />
          <DrawerItem title={i18n.t('currency')} subTitle={currency} onPress={() => navigation.navigate('EditCurrency')} />
          <SectionTitle title={i18n.t('support')} />
          <DrawerItem title={i18n.t('privacyPolicy2')} onPress={() => navigation.navigate('PrivacyPolicy')} />
          <Divider />
          <DrawerItem title={i18n.t('faq2')} onPress={() => navigation.navigate('FAQ')} />
          <SectionTitle title='moha' />
          <DrawerItem title={i18n.t('aboutUs')} onPress={() => navigation.navigate('About')} />
        </View>
        <View style={{ position: 'absolute', bottom: 20, left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{
            color: '#FFFFFF',
            fontSize: 10,
            fontFamily: 'major-mono',
          }}>{i18n.t('version')} 1.0.0</Text>
        </View>
      </View>
      {/* </SafeAreaView> */}
    </ScrollView>
  );
}

export default DrawerContent;
