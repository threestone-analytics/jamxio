import { Record, fromJS } from 'immutable';
import themes from '../../../../styles/theme';

const defaultTheme = 'light';

export default Record({
  theme: fromJS({ name: defaultTheme, selected: themes.light })
});
