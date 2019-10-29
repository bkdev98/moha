import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useStoreState } from 'easy-peasy';
import i18n from 'i18n-js';

import BackButton from '../components/BackButton';

const FAQ = () => {
  const locale = useStoreState(state => state.app.locale);

  const data = locale === 'vi' ? [
    {
      q: 'Ứng dụng này để làm gì?',
      a: 'Moha giúp bạn theo dõi và so sánh các khoản chi tiêu với ngân sách hàng tháng của bạn bằng một biểu đồ đơn giản.',
    },
    {
      q: 'Tôi không tìm thấy tính năng/icon mình mong muốn?',
      a: 'Hãy để một lời nhắn cho tôi tại địa chỉ bkdev98@gmail.com.',
    },
    {
      q: 'Tôi không thích font chữ/tiền/icon/màu hồng/app này/chó/ và tôi muốn gửi mail cho bạn về điều này?',
      a: 'Xin đừng.',
    },
    {
      q: '(không ai cả) Tôi muốn donate cho bạn?',
      a: 'Xin cảm ơn, tính năng trả phí sẽ được cập nhật trong các phiên bản kế tiếp.',
    },
  ] : [
    {
      q: 'What does this app do?',
      a: 'Moha help you track your spending against your monthly budget on one simple chart.',
    },
    {
      q: 'I can\'t find features/icon I want?',
      a: 'Please send a message to bkdev98@gmail.com.',
    },
    {
      q: 'I hate this font/money/an icon/pink/this app/dog/ and I wish to email you about it?',
      a: 'Please no.',
    },
    {
      q: '(no one) I want to donate?',
      a: 'Thank you, more paid features will coming in next releases.',
    },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: '#22252D' }}>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', flex: 1, paddingHorizontal: 20, paddingBottom: 20, paddingTop: 60 }}
      >
        <Text style={{
          color: '#FFFFFF',
          fontSize: 18,
          fontFamily: 'playfair-regular',
          marginBottom: 20,
          textAlign: 'center',
        }}>{i18n.t('faq')}</Text>
        {data.map((item, idx) => (
          <View key={idx} style={{ marginBottom: 20 }}>
            <Text style={{
              color: '#B4B7C1',
              fontSize: 12,
              fontFamily: 'playfair-italic',
              marginBottom: 5,
            }}>{idx + 1}. {item.q}</Text>
            <Text style={{
              color: '#FFFFFF',
              fontSize: 16,
              fontFamily: 'playfair-regular',
            }}>{item.a}</Text>
          </View>
        ))}
      </ScrollView>
      <BackButton />
    </View>
  );
}

export default FAQ;
