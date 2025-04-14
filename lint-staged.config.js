const config = {
  '*.js': ['xo --fix'],
  '*.{html,json}': ['prettier --write'],
  '*.md': ['markdownlint --fix', 'prettier --write'],
};

export default config;
