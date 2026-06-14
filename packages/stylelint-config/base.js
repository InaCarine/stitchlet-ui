/** @type {import('stylelint').Config} */

export default {
  extends: ['stylelint-config-standard'],
  rules: {
    'function-disallowed-list': ['rgba', 'hsla', 'rgb', 'hsl'],
    'color-function-notation': 'modern',
    'color-no-hex': true,
  },
  overrides: [
    {
      files: ['**/*.module.css'],
      rules: {
        'selector-class-pattern': null,
      },
    },
  ],
};
