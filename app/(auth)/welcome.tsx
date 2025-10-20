import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from '../../components/atoms/Button';
import { safeTheme as theme } from '../../lib/theme';
import { t } from '../../lib/i18n';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <View style={styles.logoContainer}>
            <View style={styles.logo}>
              <Text style={styles.logoText}>T</Text>
            </View>
          </View>
          <View style={styles.illustrationElements}>
            <View style={[styles.circle, styles.circle1]} />
            <View style={[styles.circle, styles.circle2]} />
            <View style={[styles.circle, styles.circle3]} />
          </View>
        </View>

        <View style={styles.textSection}>
          <Text style={styles.title}>{t('welcome', 'en')}</Text>
          <Text style={styles.subtitle}>{t('welcomeSubtitle', 'en')}</Text>
        </View>

        <View style={styles.buttons}>
          <Button
            title={t('login', 'en')}
            onPress={() => navigation.navigate('Login' as never)}
            variant="primary"
            size="large"
            style={styles.button}
          />
          <Button
            title={t('register', 'en')}
            onPress={() => navigation.navigate('Register' as never)}
            variant="secondary"
            size="large"
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
  },
  content: {
    flex: 1,
    paddingHorizontal: theme.spacing.xl,
    justifyContent: 'space-between',
  },
  illustration: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing['4xl'],
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: theme.colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.floating,
  },
  logoText: {
    fontSize: 48,
    fontWeight: '700',
    color: theme.colors.white,
  },
  illustrationElements: {
    position: 'absolute',
    width: width * 0.8,
    height: width * 0.8,
  },
  circle: {
    position: 'absolute',
    borderRadius: 1000,
    opacity: 0.1,
  },
  circle1: {
    width: 200,
    height: 200,
    backgroundColor: theme.colors.primary,
    top: 50,
    left: 50,
  },
  circle2: {
    width: 150,
    height: 150,
    backgroundColor: theme.colors.accent.teal,
    top: 100,
    right: 30,
  },
  circle3: {
    width: 100,
    height: 100,
    backgroundColor: theme.colors.accent.warning,
    bottom: 50,
    left: 80,
  },
  textSection: {
    alignItems: 'center',
    marginBottom: theme.spacing['4xl'],
  },
  title: {
    fontSize: theme.typography.h1.fontSize,
    fontWeight: theme.typography.h1.fontWeight,
    color: theme.colors.ink900,
    textAlign: 'center',
    marginBottom: theme.spacing.m,
  },
  subtitle: {
    fontSize: theme.typography.body.fontSize,
    color: theme.colors.ink600,
    textAlign: 'center',
    lineHeight: 24,
    paddingHorizontal: theme.spacing.l,
  },
  buttons: {
    gap: theme.spacing.m,
    marginBottom: theme.spacing['3xl'],
  },
  button: {
    width: '100%',
  },
});
