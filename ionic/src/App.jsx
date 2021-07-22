import store from './utility/Storage/redux_init';

import { Provider } from "react-redux"

import Index from "./index.jsx"

import React, { useEffect } from "react";
import hardwareback from './utility/HardwareBack/HardwareBack';

// #endregion

const AppMain = () => {

  useEffect(() => {
      hardwareback()
  }, []);

  return (
    <Provider store={store}>
      <Index />
    </Provider>
  )

}

export default AppMain;
