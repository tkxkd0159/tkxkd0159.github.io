# Jekyll Resume

## 1. Install Ruby+Devkit
(1) Use default options  
(2) Run the 'ridk install' step on the last stage of the installiation  
(3) check installation through `ruby --version`  
(4) Install package via `gem install bundler`

## 2. Install node.js and gulp
(1) check `node --version`, `npm --version`, `npx --version` after install  
(2) `npm install --global gulp-cli`  
(3) Create package.json file if you need in your project directory : `npm init`  
(4) Install the gulp packages in your devDependencies : `npm install --save-dev gulp`  
(5) check `gulp --version`


## 3. Fork My Jekyll blog from github
(1) make `Gemfile` to the root of your repo if you don't have and add these lines to `Gemfile`
```ruby
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
```
(2) Install jekyll via `bundle install`

## 4. Build my local Jekyll site
(1) Execute `bundle exec jekyll serve` in the root of repo  
(2) Try `bundle update` periodically to maintain your Jekyll version up to date

**When the upgrade of Gem fail even though the "bundle update" has been run**  
RubyGems keeps old versions of gems, so feel free to do some cleaning after updating
```ruby
gem list
gem outdated
gem cleanup
```

### option
you can modify and test your site in real time with `gulp watch`  
you must run `gulp build` after revise files in `src` folder  
Install package.json via `npm install` if you don't want to install `devDependencies` add `--production` flag
