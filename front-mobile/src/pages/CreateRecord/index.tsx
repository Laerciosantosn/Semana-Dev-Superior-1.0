import React from 'react';
import { Text, StyleSheet } from 'react-native';

import Header from '../../components/Header';

const CreateRecord: React.FC = () => {
  const x = 0;
  return (
    <>
      <Header />
      <Text style={styles.text}>CreateRecord</Text>
    </>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#fff',
  },
});

export default CreateRecord;
