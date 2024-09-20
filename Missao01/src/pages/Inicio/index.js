import React, { useEffect } from 'react';
import Loading from '../../components/Loading';

export default function LoadingScreen({ navigation }) {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <Loading/>
  );
}
