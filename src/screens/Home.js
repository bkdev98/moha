import React, { useRef, useState } from 'react';
import { Text, View, StatusBar, TouchableOpacity, Platform, Image, Alert, LayoutAnimation } from 'react-native';
import { SimpleLineIcons } from '@expo/vector-icons';
import moment from 'moment';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { SwipeListView } from 'react-native-swipe-list-view';
import i18n from 'i18n-js';

import FAB from '../components/FAB';
import BurndownChart from '../components/BurndownChart';
import MonthYearPicker from '../components/MonthYearPicker';
import { GRADIENT_ICONS } from '../utils/icons';
import { formatMoney } from '../utils';

const Home = ({ navigation }) => {
  let picker = useRef(null);
  const [selected, setSelected] = useState({
    month: moment().month(),
    year: moment().year(),
  });

  const transactions = useStoreState(state => state.transaction.items);
  const budget = useStoreState(state => state.app.budget);
  const currency = useStoreState(state => state.app.currency);

  const deleteTransaction = useStoreActions(state => state.transaction.deleteTransaction);

  const handleDeleteTransaction = data => {
    Alert.alert(
      i18n.t('confirm'),
      `${i18n.t('delete')} ${data.name}?`,
      [
        {
          text: i18n.t('cancel'),
          style: 'cancel',
        },
        {
          text: i18n.t('ok'),
          onPress: () => {
            LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
            deleteTransaction(data.time);
          },
        },
      ],
    )
  }
  const IS_SAME_MONTH = moment()
    .set('month', selected.month)
    .set('year', selected.year)
    .isSame(moment(), 'month');

  const monthTransactions = transactions.filter(i => moment(i.time)
    .isSame(moment().set('month', selected.month).set('year', selected.year), 'month'));

  const showPicker = () => picker && picker.show({
    startYear: moment().year() - 10,
    endYear: moment().year(),
    selectedYear: selected.year,
    selectedMonth: selected.month + 1,
  }).then(({ year, month }) => {
    setSelected({ year, month: month - 1 });
  });

  return (
    <View style={{ flex: 1, backgroundColor: '#22252D' }}>
      <View style={{
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 40,
        paddingHorizontal: 20,
      }}>
        <TouchableOpacity
          hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
          style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}
          onPress={showPicker}
        >
          <SimpleLineIcons color='#FFFFFF' name='calendar' size={16} style={{ marginTop: 8 }} />
          <Text style={{ marginLeft: 10, fontSize: 24, fontFamily: 'playfair-bold', color: '#FFFFFF' }}>
            {moment()
              .set('month', selected.month)
              .set('year', selected.year)
              .format('MM/YYYY')}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          hitSlop={{ top: 20, left: 20, right: 20, bottom: 20 }}
          onPress={() => navigation.openDrawer()}>
          <SimpleLineIcons name="menu" size={18} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <SwipeListView
        data={monthTransactions}
        keyExtractor={i => i.time.toString()}
        ListHeaderComponent={(
          <BurndownChart selected={selected} budget={budget} transactions={monthTransactions} />
        )}
        ListEmptyComponent={IS_SAME_MONTH && (
          <View style={{ opacity: 0.15, position: 'absolute', bottom: 90, right: 90, width: 120, height: 120, overflow: 'visible' }}>
            <Image source={require('../../assets/images/empty-arrow.png')} style={{ resizeMode: 'contain', height: undefined, width: undefined, flex: 1 }} />
          </View>
        )}
        contentContainerStyle={monthTransactions.length === 0 ? { flex: 1 } : { paddingBottom: 120 }}
        rightOpenValue={-110}
        renderHiddenItem={({ item }) => (
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', paddingHorizontal: 20, marginTop: 20, marginHorizontal: 20 }}>
            <TouchableOpacity
              style={{ position: 'absolute', right: 50, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', width: 50 }}
              onPress={() => navigation.navigate('Transaction', { type: 'edit', data: item })}
            >
              <SimpleLineIcons color='#FFFFFF' name='pencil' size={17} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{ position: 'absolute', right: 0, top: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', width: 50 }}
              onPress={() => handleDeleteTransaction(item)}
            >
              <SimpleLineIcons color='#F3682F' name='trash' size={18} />
            </TouchableOpacity>
          </View>
        )}
        renderItem={({ item }) => (
          <TouchableOpacity
            activeOpacity={1}
            style={{
              backgroundColor: '#282B35',
              height: 70,
              marginHorizontal: 20,
              marginTop: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
              flexDirection: 'row',
              paddingHorizontal: 10,
              borderRadius: 5,
            }}
          >
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
              <View style={{ backgroundColor: '#22252D', height: 50, width: 50, borderRadius: 5, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ width: 20, height: 20, overflow: 'visible' }}>
                  <Image source={GRADIENT_ICONS[item.icon]} style={{ resizeMode: 'contain', height: undefined, width: undefined, flex: 1 }} />
                </View>
              </View>
              <View>
                <Text style={{
                  color: '#FFFFFF',
                  fontSize: 16,
                  fontFamily: 'playfair-regular',
                  marginBottom: 10,
                }}>{item.name}</Text>
                <Text style={{
                  color: '#B4B7C1',
                  fontSize: 12,
                  fontFamily: 'playfair-italic',
                }}>{moment(item.time).fromNow()}</Text>
              </View>
            </View>
            <Text style={{
              fontFamily: 'major-mono',
              fontSize: 14,
              color: '#FFFFFF',
            }}>{currency === 'usd' && '$'}{formatMoney(item.value)}</Text>
          </TouchableOpacity>
        )}
      />
      {IS_SAME_MONTH && <FAB icon='plus' onPress={() => navigation.navigate('Transaction')} />}
      <MonthYearPicker ref={ref => picker = ref} />
    </View>
  );
}

export default Home;
