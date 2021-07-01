import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import BarberDashboard from '../pages/BarberDashboard';
import UserDashboard from '../pages/UserDashboard';

import Profile from '../pages/Profile';
import CreateAppointment from '../pages/CreateAppointment';
import AppointmentCreated from '../pages/AppointmentCreated';
import { useAuth } from '../hooks/auth';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: '#232129' },
      }}>
      {!user.isBarber ? (
        <App.Screen name="UserDashboard" component={UserDashboard} />
      ) : (
        <App.Screen name="BarberDashboard" component={BarberDashboard} />
      )}

      <App.Screen name="CreateAppointment" component={CreateAppointment} />
      <App.Screen name="AppointmentCreated" component={AppointmentCreated} />

      <App.Screen name="Profile" component={Profile} />
    </App.Navigator>
  );
};

export default AppRoutes;
