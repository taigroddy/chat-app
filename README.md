#### About this repository
It's a demo version of ActionCable in rails 6. In spite of the demo version, it still has all the necessary features and is coding based on clean code.

#### How to start
Only run `docker-compose up -d` and open `http://localhost:3002`

#### Keywords
(Maybe you need it to research)
- Rails 6
- Webpack in rails 6
- ActionCapble in rails 6
- Devise, Rubocop, Fasterer, Redis.
- Docker
- Select2, Boostrap 4, Fontawesome 4.7

#### Need to improve
(I can't spend time making it really done so you can get this repository and improve it more).
- The UI (Responsive) is not good for now.
- The main flow is only created in one time to thought so I missed a lots of thing.
- I didn't write the testing for code (It's bad, sooo bad).
- Encrypt/Decrypt message. I recommend using `ActiveSupport::MessageEncryptor` with KEY = SECRET_KEY_BASE + `key` (I've really created a cols `key` in table `room`).

#### The end
Link demo: https://chat-res.herokuapp.com/
Version: v0.1 Demo
