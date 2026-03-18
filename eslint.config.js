import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['assets/js/**/*.js', 'utils/**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType:  'module',
      globals: {
        window:    'readonly',
        document:  'readonly',
        console:   'readonly',
        fetch:     'readonly',
        Chart:     'readonly',
        localStorage: 'readonly',
        FormData:  'readonly',
        FileReader:'readonly',
        URL:       'readonly',
        // VitaTrack globals
        Modal:     'readonly',
        Toast:     'readonly',
        Sidebar:   'readonly',
        Navbar:    'readonly',
        Dashboard: 'readonly',
        MealLog:   'readonly',
        FoodSearch:'readonly',
        UploadFoodImage: 'readonly',
        ManualActivity:  'readonly',
        WearableSync:    'readonly',
        UserManagement:  'readonly',
        FoodManagement:  'readonly',
        ExpertChat:      'readonly',
      }
    },
    rules: {
      'no-unused-vars':    ['warn', { argsIgnorePattern: '^_' }],
      'no-console':        ['warn', { allow: ['warn', 'error'] }],
      'prefer-const':      'error',
      'no-var':            'error',
      'eqeqeq':            ['error', 'always'],
      'no-duplicate-imports': 'error',
    }
  }
];
