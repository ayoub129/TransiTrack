import 'react-native-url-polyfill/auto';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { AppRegistry } from 'react-native';
import { useAuth } from './store/useAuth';
import { safeTheme as theme } from './lib/theme';

// Auth Screens
import WelcomeScreen from './app/(auth)/welcome';
import LoginScreen from './app/(auth)/login';
import RegisterScreen from './app/(auth)/register';
import RolePickerScreen from './app/(auth)/role-picker';

// Main Screens
import HomeScreen from './app/(home)/index';
import MessagesScreen from './app/(messages)/conversations';
import MyTripsScreen from './app/(trips)/index';
import ProfileScreen from './app/(profile)/index';

// Offer Screens
import CreateOfferScreen from './app/(offers)/create';
import CostEstimateScreen from './app/(offers)/estimate';
import OfferSummaryScreen from './app/(offers)/summary';

// Bid Screens
import BidsSheetScreen from './app/(bids)/sheet';

// Chat Screens
import ChatThreadScreen from './app/(chat)/thread';

// Delivery Screens
import LiveTrackingScreen from './app/(delivery)/live-tracking';
import ConfirmDeliveryScreen from './app/(delivery)/confirm';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme?.colors?.white || '#FFFFFF' },
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="RolePicker" component={RolePickerScreen} />
    </Stack.Navigator>
  );
}

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Messages') {
            iconName = focused ? 'chatbubbles' : 'chatbubbles-outline';
          } else if (route.name === 'MyTrips') {
            iconName = focused ? 'car' : 'car-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else {
            iconName = 'help-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: theme.colors.ink600,
        tabBarStyle: {
          backgroundColor: theme?.colors?.white || '#FFFFFF',
          borderTopColor: theme.colors.border,
          height: 80,
          paddingBottom: 20,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="MyTrips" component={MyTripsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

function RootStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme?.colors?.white || '#FFFFFF' },
      }}
    >
      <Stack.Screen name="MainTabs" component={MainTabs} />
      {/* RolePicker intentionally NOT in RootStack to avoid showing after logout */}
      
      {/* Offer Flow */}
      <Stack.Screen 
        name="CreateOffer" 
        component={CreateOfferScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="CostEstimate" 
        component={CostEstimateScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="OfferSummary" 
        component={OfferSummaryScreen}
        options={{ presentation: 'modal' }}
      />
      
      {/* Bid Flow */}
      <Stack.Screen 
        name="BidsSheet" 
        component={BidsSheetScreen}
        options={{ presentation: 'modal' }}
      />
      
      {/* Chat Flow */}
      <Stack.Screen 
        name="ChatThread" 
        component={ChatThreadScreen}
        options={{ presentation: 'modal' }}
      />
      
      {/* Delivery Flow */}
      <Stack.Screen 
        name="LiveTracking" 
        component={LiveTrackingScreen}
        options={{ presentation: 'modal' }}
      />
      <Stack.Screen 
        name="ConfirmDelivery" 
        component={ConfirmDeliveryScreen}
        options={{ presentation: 'modal' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <StatusBar style="dark" backgroundColor={theme?.colors?.white || '#FFFFFF'} />
      {isAuthenticated ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

// Register the app component
AppRegistry.registerComponent('main', () => App);
