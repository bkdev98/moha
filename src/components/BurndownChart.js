import React from 'react';
import { Dimensions, View, Text } from 'react-native';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryAxis } from "victory-native";
import { Defs, LinearGradient, Stop } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

const CHART_HEIGHT = height / 3;

const DAYS = Array.from({ length: moment().daysInMonth() }, (v, i) => i + 1);

const DATA = [0,0.2,1.7,4.2,4.7,5,6.5,6.8,6.9,9.2,9.5,9.6,12,12.7,14.8,15.2,16.3,16.4,18.8,19,19.1,19.2];

const CHART_DATA = DAYS.map((day, idx) => ({
  x: day,
  y: !isNaN(DATA[idx]) ? DATA[idx] : null,
}));

const BurndownChart = () => {
  return (
    <View>
      <Text style={{ textAlign: 'right', marginRight: 10, color: '#FFF', fontFamily: 'major-mono', fontSize: 12 }}>{DAYS[DAYS.length - 1] + 1}</Text>
      <View style={{ width, marginVertical: 5, backgroundColor: 'transparent' }}>
        <VictoryChart height={CHART_HEIGHT} width={width} padding={{ top: 0, bottom: 0, left: 0, right: 0 }}>
          <Defs>
            <LinearGradient id="gradient1" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="0%" stopColor="#FB9ED3"/>
              <Stop offset="100%" stopColor="#EB7483"/>
            </LinearGradient>
          </Defs>
          <VictoryLine
            interpolation="basis"
            animate={{ duration: 3000 }}
            style={{
              data: { stroke: "url(#gradient1)", strokeWidth: 2 },
            }}
            data={CHART_DATA}
          />
          <VictoryLine
            style={{
              data: { stroke: "rgba(255,255,255,0.1)", strokeWidth: 2 }
            }}
            data={[{ x: 1, y: 0 }, { x: DAYS[DAYS.length - 1], y: 30 }]}
          />
          <VictoryAxis />
          <VictoryLine
            style={{
              data: { stroke: "#FFF" }
            }}
            data={[{ x: CHART_DATA[DATA.length - 1].x, y: CHART_DATA[DATA.length - 1].y }, { x: CHART_DATA[DATA.length - 1].x, y: CHART_DATA[DATA.length - 1].y + 1.8 }]}
          />
        </VictoryChart>
      </View>
      <Text style={{ marginLeft: 10, color: '#FFF', fontFamily: 'major-mono', fontSize: 12 }}>0</Text>
    </View>
  );
}

export default BurndownChart;