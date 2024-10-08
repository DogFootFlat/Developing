// theme.ts
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
	palette: {
		primary: {
			main: '#12b8de',
			// light: main값을 통해 계산됨
			// dark: main값을 통해 계산됨
			// contrastText: main값을 통해 계산됨
		},
		error: {
			main: '#fd6155',
			// light: main값을 통해 계산됨
			// dark: main값을 통해 계산됨
			// contrastText: main값을 통해 계산됨
		},
		shallow: {
			main: '#f6f3e4',
		},
	},
});
