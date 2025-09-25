# Jekyll Resume

## 1. Install Ruby+Devkit
(1) Use default options.
(2) Run the 'ridk install' step on the last stage of the installiation.
(3) check installation through `ruby --version`.  
(4) Install package via `gem install bundler`.

## 2. Install Jekyll
1. Make `Gemfile` to the root of your repo if you don't have and add these lines to `Gemfile`.
```ruby
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
```
2. `bundle config set path 'vendor/bundle`
3. Install jekyll via `bundle install`.

## 3. Serve my local Jekyll site for development
* Execute `bundle exec jekyll serve` in the root of repo.
* Execute `bundle exec jekyll build` if you want to build source files instead of running the website.
* Try `bundle update` periodically to maintain your Jekyll version up to date.

**When the upgrade of Gem fail even though the "bundle update" has been run**. RubyGems keeps old versions of gems, so feel free to do some cleaning after updating.
```ruby
gem list
gem outdated
gem cleanup
```

## 4. Build & Watch
```sh
# Build src files as assets
npm run build

# Build, Watch and Run jekyll server for development
# You can modify and test your site in real time
npm start
```
