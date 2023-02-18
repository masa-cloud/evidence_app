import { Link } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

import { selectUser } from '~/slices/userSlice';

export default function Page(): JSX.Element {
  const {
    user: { isLogin },
  } = useSelector(selectUser);

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your app.</Text>
        {isLogin ? (
          <Link
            href={{
              pathname: '/HomeScreen',
            }}
          >
            <Text>Home</Text>
          </Link>
        ) : (
          <Link
            href={{
              pathname: '/(auth)/LoginScreen',
            }}
          >
            <Text>Login</Text>
          </Link>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 64,
    fontWeight: 'bold',
  },
  container: {
    alignItems: 'center',
    flex: 1,
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 'auto',
    maxWidth: 960,
  },
  subtitle: {
    color: '#38434D',
    fontSize: 36,
  },
});
