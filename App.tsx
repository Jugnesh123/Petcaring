import {Appearance,View } from 'react-native';
import AppState from './context/AppState';
import Root from './Root';
function App(): JSX.Element {
  Appearance.getColorScheme
  return (
    <AppState>
      <Root />
    </AppState>
  );
}

export default App;