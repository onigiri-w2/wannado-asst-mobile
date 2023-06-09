import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {Text} from 'native-base';

import {BACKGROUND_GRAY_COLOR, BORDER_RADIUS, MAIN_COLOR} from '@/styles/const';

import {Inquiry} from '../Links/Inquiry';
import {PrivacyPolicy} from '../Links/PrivacyPolicy';
import {TermsOfUse} from '../Links/TermsOfUse';

export const Body = () => {
  return (
    <>
      <ScrollView style={styles.body}>
        <Section title="利用に関して" mtPx={20}>
          <Inquiry />
        </Section>
        <Section title="アプリに関して" mtPx={40}>
          <PrivacyPolicy />
          <TermsOfUse />
        </Section>
      </ScrollView>
    </>
  );
};

type SectionProps = {
  title: string;
  mtPx?: number;
  children: React.ReactNode;
};
const Section = ({title, mtPx, children}: SectionProps) => {
  return (
    <View style={{marginTop: mtPx}}>
      <Text mb={3} mx={1} color="#555">
        {title}
      </Text>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: BORDER_RADIUS,
        }}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  safe_area: {
    backgroundColor: MAIN_COLOR,
    flex: 1,
  },
  container: {
    backgroundColor: BACKGROUND_GRAY_COLOR,
    flex: 1,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
  },
});
