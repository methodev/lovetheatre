//====================================================|
// LOVE THEATRE


//--------------------------| Import

// Libraries
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { stringify } from 'flatted/esm';

// App
import App from './app';

// Services
import { requestContent } from './app/services/content';

// Store
import store from './app/store/getStore';

// Actions
import { changeScreenType } from './app/actions/app';

// Styles
import './styles/scaffoldings/base.scss';
import './styles/scaffoldings/spinner.scss';
import './styles/scaffoldings/font-faces.scss';

// Images
import './assets/images/logo.png';
import './assets/images/splashscreens/ipad_splash.png';
import './assets/images/splashscreens/ipadpro1_splash.png';
import './assets/images/splashscreens/ipadpro2_splash.png';
import './assets/images/splashscreens/ipadpro3_splash.png';
import './assets/images/splashscreens/iphone5_splash.png';
import './assets/images/splashscreens/iphone6_splash.png';
import './assets/images/splashscreens/iphoneplus_splash.png';
import './assets/images/splashscreens/iphonex_splash.png';
import './assets/images/splashscreens/iphonexr_splash.png';
import './assets/images/splashscreens/iphonexsmax_splash.png';


//--------------------------| Initialize

(async () => {
  try {
    // Store content
    const content = await requestContent();
    localStorage.setItem('lt_content', stringify(content));

    // State store
    store.subscribe(() => {
      localStorage.setItem('lt_state', JSON.stringify(store.getState()));
    });

    // Handle screen type
    const setScreenType = () => {
      const type = window.innerWidth < 992 ? 'mobile' : 'desktop';
      store.dispatch(changeScreenType(type));
    };

    window.addEventListener('resize', setScreenType);
    setScreenType();

    // Render
    const jsx = (
      <Provider store={store}>
        <App />
      </Provider>
    );

    ReactDOM.render(jsx, document.getElementById('root'));
  }
  catch (error) {
    console.error('No content found', error);
    // TODO: Display "No content found"
  }
})();
