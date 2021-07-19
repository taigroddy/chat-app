FROM bitnami/ruby:3.0.2

RUN apt-get update && apt-get install -y libmariadb-dev
RUN apt-get install -y vim
RUN apt-get -y install curl gnupg
RUN curl -sL https://deb.nodesource.com/setup_10.x  | bash -
RUN apt-get -y install nodejs
RUN npm install -g yarn
RUN gem install rails

WORKDIR /app

COPY . /app

RUN yarn install --check-files

RUN bundle install

RUN RAILS_ENV=production RACK_ENV=production NODE_ENV=production bundle exec rake assets:precompile

EXPOSE 3000