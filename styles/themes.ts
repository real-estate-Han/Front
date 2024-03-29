export type AppTheme = typeof dark;
// 추후 다크모드를 위해 white theme도 추가할 예정
const dark = {
  name: 'dark',
  background: '#ffffff',
  components: {
    background: '#7a7880',
    shadow1: '#504e55',
    shadow2: '#6c6a73',
    active: '#e4ebf5',
    nonActive: '#9baacf',
    primary: '#6d5dfc',
    danger: '#dc3545e6',
    warning: '#ffca2ce6;',
  },
  font: {
    regular: '#000814',
    button: '#E4EBF5e6',
    placeholder: '#bec8e4',
    warning: '#ff595e',
    valid: '#6FF173',
    invalid: '#FFCCD0',
    logo: '#ffffff',
    logoShadow1: '#caf0f8',
    logoShadow2: '#ade8f4',
  },
  mainColor: {
    blue700: '#0039D5',
    blue500: '#0059F9',
    blue200: '#9FAFFD',
    orange700: '#FF9E00',
    orange500: '#FFBF00',
    orange200: '#FFDF81',
    main07: '#168aad',
    main08: '#1a759f',
    main09: '#1e6091',
    main10: '#184e77',
  },
};

const light: AppTheme = {
  name: 'light',
  background: '#EEF1FF',
  components: {
    background: '#EEF1FF',
    shadow1: '#c8d0e7',
    shadow2: '#FFFFFF',
    active: '#e4ebf5',
    nonActive: '#9baacf',
    primary: '#6d5dfc',
    danger: '#dc3545e6',
    warning: '#ffca2ce6;',
  },
  font: {
    regular: '#504e55e6',
    button: '#E4EBF5e6',
    placeholder: '#504e55e6',
    warning: '#504e55e6',
    valid: '#1F784E',
    invalid: '#BF3845',
    logo: '#ffffff',
    logoShadow1: '#000000',
    logoShadow2: '#6d5dfc',
  },
  mainColor: {
    blue700: '#0039D5',
    blue500: '#0059F9',
    blue200: '#9FAFFD',
    orange700: '#FF9E00',
    orange500: '#FFBF00',
    orange200: '#FFDF81',
    main07: '#168aad',
    main08: '#1a759f',
    main09: '#1e6091',
    main10: '#184e77',
  },
};

export const Themes: Record<string, AppTheme> = { dark, light };
