import { addLocaleData } from 'react-intl';
import es from 'react-intl/locale-data/es';
import en from 'react-intl/locale-data/en';
import { updateIntl } from 'react-intl-redux';
import { createLogic } from 'redux-logic';
import { locales } from '../../locales';
import ActionTypes from '../ActionsTypes';
import * as intlActions from '../reducers/intl/intlActions';

const initLocaleLogic = createLogic({
  type: ActionTypes.INIT_LOCALE,
  latest: true,
  process(param, dispatch, done) {
    dispatch(intlActions.localeConfigRequest());
    try {
      addLocaleData([...en, ...es]);
      dispatch(intlActions.localeConfigSuccess());
    } catch (error) {
      dispatch(intlActions.localeConfigFailure(error));
    } finally {
      done();
    }
  }
});

const setLocaleLogic = createLogic({
  type: ActionTypes.SET_INTL_DATA,
  latest: true,
  process(
    {
      action: { payload: locale }
    },
    dispatch,
    done
  ) {
    dispatch(intlActions.localeSetRequest());
    try {
      dispatch(
        updateIntl({
          locale,
          messages: locales[locale]
        })
      );
      dispatch(intlActions.localeSetSuccess());
    } catch (error) {
      dispatch(intlActions.localeSetFailure());
    } finally {
      done();
    }
  }
});

export default [initLocaleLogic, setLocaleLogic];
