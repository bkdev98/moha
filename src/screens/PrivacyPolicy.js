import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { useStoreState } from 'easy-peasy';
import i18n from 'i18n-js';

import BackButton from '../components/BackButton';

const PrivacyPolicy = () => {
  const locale = useStoreState(state => state.app.locale);

  const data = locale === 'vi' ? [
    'Moha được Quốc Khánh cung cấp miễn phí. Moha không thu thập hay lưu trữ trực tuyến bất cứ thông tin nào của bạn. Hiện tại chúng tôi không dùng bất cứ dịch vụ bên thứ ba nào khác. Các thay đổi trong tương lai về chính sách bảo mật sẽ được cập nhật ở đây. Những thắc mắc về quyền riêng tư này xin hãy liên hệ về địa chỉ email bkdev98@gmail.com.',
  ] : [
    'Moha is provided by Quoc Khanh at no cost. Moha does not collect or store in server any of your information. At this time, we don\'t use any third-party service. Any changes to this privacy policy will be updated here. If you have questions about this page, please contact email bkdev98@gmail.com.',
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
        }}>{i18n.t('privacyPolicy')}</Text>
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

export default PrivacyPolicy;
