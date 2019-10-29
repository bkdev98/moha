import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import moment from 'moment';
import { VictoryLine, VictoryChart } from "victory-native";
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import i18n from 'i18n-js';
import { useStoreState } from 'easy-peasy';

import { formatMoney } from '../utils';

const { width, height } = Dimensions.get('window');

const CHART_HEIGHT = height / 3;

const BurndownChart = ({
  budget,
  transactions,
  selected,
}) => {
  const currency = useStoreState(state => state.app.currency);

  const IS_SAME_MONTH = moment()
    .set('month', selected.month)
    .set('year', selected.year)
    .isSame(moment(), 'month');

  const DAYS_IN_MONTH = moment()
    .set('month', selected.month)
    .set('year', selected.year).daysInMonth();

  const DAYS = Array.from({ length: DAYS_IN_MONTH }, (v, i) => i + 1);

  const CHART_DATA = DAYS.map((day, idx) => ({
    x: day,
    y: IS_SAME_MONTH && moment().get('date') < day
      ? null
      : transactions.reduce((pre, cur) => {
        if (moment(cur.time).get('date') <= day) {
          return pre + parseFloat(cur.value);
        }
        return pre;
      },
    0),
  }));

  const burnedValue = parseFloat(Math.max(...CHART_DATA.map(i => i.y)));

  const diffValue = IS_SAME_MONTH
    ? parseFloat(budget) / DAYS_IN_MONTH * moment().get('date') - burnedValue
    : parseFloat(budget) - burnedValue;

  const perDayLeft = (parseFloat(budget) - burnedValue) / (DAYS_IN_MONTH - moment().get('date'));

  return (
    <View>
      <View style={{ flexDirection: 'row', paddingHorizontal: 10, marginVertical: 10 }}>
        <View style={{ backgroundColor: '#282B35', flex: 1, borderRadius: 5, padding: 15, margin: 10, justifyContent: 'space-between' }}>
          <Text style={{ color: '#FFF', fontFamily: 'major-mono', fontSize: 16, letterSpacing: -1 }}>
            {formatMoney(burnedValue)}
          </Text>
          <Text style={{
            color: '#B4B7C1',
            fontSize: 11,
            fontFamily: 'playfair-italic',
            marginTop: 10,
          }}>{moment()
            .set('month', selected.month)
            .set('year', selected.year)
            .isSame(moment(), 'month') ? i18n.t('usedSoFar') : 'used'}</Text>
        </View>
        <View style={{ backgroundColor: '#282B35', flex: 1, borderRadius: 5, padding: 15, margin: 10, justifyContent: 'space-between' }}>
          <Text style={{ color: diffValue > 0 ? '#FFF' : '#F3682F', fontFamily: 'major-mono', fontSize: 16, letterSpacing: -1 }}>
            {formatMoney(Math.abs(diffValue))}
          </Text>
          <Text style={{
            color: '#B4B7C1',
            fontSize: 11,
            fontFamily: 'playfair-italic',
            marginTop: 10,
          }}>{`${diffValue > 0 ? i18n.t('below') : i18n.t('above')} ${i18n.t('average')}`}</Text>
        </View>
        {IS_SAME_MONTH && <View style={{ backgroundColor: '#282B35', flex: 1, borderRadius: 5, padding: 15, margin: 10, justifyContent: 'space-between' }}>
          <Text style={{ color: '#FFF', fontFamily: 'major-mono', fontSize: 16, letterSpacing: -1 }}>
            {formatMoney(perDayLeft > 0 ? perDayLeft : 0)}
          </Text>
          <Text style={{
            color: '#B4B7C1',
            fontSize: 11,
            fontFamily: 'playfair-italic',
            marginTop: 10,
          }}>{i18n.t('perDayLeft')}</Text>
        </View>}
      </View>
      <Text style={{ textAlign: 'right', marginRight: 10, color: '#FFF', fontFamily: 'major-mono', fontSize: 12 }}>
        {currency === 'usd' && '$'}{formatMoney(budget)}
      </Text>
      <View style={{ width, marginVertical: 5, backgroundColor: 'transparent' }}>
        <VictoryChart
          height={CHART_HEIGHT}
          width={width}
          padding={{ top: 0, bottom: 0, left: 0, right: 0 }}
          singleQuadrantDomainPadding={false}
          domainPadding={{ y: 2 }}
        >
          <Defs>
            <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FB9ED3"/>
              <Stop offset="100%" stopColor="#EB7483"/>
            </LinearGradient>
          </Defs>
          <VictoryLine
            interpolation="basis"
            animate={{ duration: 2000 }}
            style={{
              data: { stroke: "url(#gradient1)", strokeWidth: 2 },
            }}
            data={[{ x: 0, y: 0 }, ...CHART_DATA]}
          />
          <VictoryLine
            style={{
              data: { stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 },
            }}
            data={[{ x: 0, y: 0 }, { x: DAYS_IN_MONTH, y: parseFloat(budget) }]}
          />
        </VictoryChart>
      </View>
      <Text style={{ marginLeft: 10, color: '#FFF', fontFamily: 'major-mono', fontSize: 12 }}>
        {currency === 'usd' && '$'}0{currency === 'vnd' && 'đ'}
      </Text>
    </View>
  );
}

export default BurndownChart;
