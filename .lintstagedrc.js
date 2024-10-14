module.exports = {
  "*.js": ["xo --fix"],
  "*.{html,json}": ["prettier --write"],
  "*.md": ["markdownlint --fix", "prettier --write"]
};

