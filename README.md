# Shoppies

## (c) Shoppies, 2020

### Tina Sosa

#### Check out my deployed web app:

[Shoppies](https://shoppies.herokuapp.com/ 'Shoppies')

#### Marketing copy:

A webpage that can search OMDB for movies, and allow the user to save their favourite films they feel should be up for nomination. When they've selected 5 nominees they should be notified they're finished.

### Development and Scripts

To get started, clone this repo, then run

```
npm install
```

to install the project and its dependencies.

You will also want to install postgres locally, and provision postgres when you deploy remotely.

To seed the database, run

```
npm run seed
```

The source code comes with several scripts defined in `package.json`.

The high level scripts are:

to start dev mode, serving up on localhost:8080 with webpack watching for changes:

```
npm run start-dev
```

To run tests while watching the code:

```
npm run test-watch
```

If you want to run the server and/or `webpack` separately, you can also
`npm run start-server` and `npm run build-client`.

To manually deploy to Heroku, `npm run deploy`. See below for more details on setting up the deploy script.

### Built with Express, Sequelize, Postgres, React, Redux, and Python

This project uses Node.js and Express for the server, Sequelize as an ORM to talk to a Postgres database, React for display components, and Redux for managing state on the front end.

### Twelve Factor Design

This project uses the [Twelve Factor App](https://12factor.net/ 'Twelve Factor App') design principles. To quote the author, [Adam Wiggins](https://news.ycombinator.com/item?id=21416881 'Comment on Hacker News'):

> I'm the author of 12factor (although really it is an aggregation of the work and insights from many people at Heroku). It continues to surprise and please me that this piece continues to be relevant eight years later—a virtual eternity in software/internet time.
> Fun fact: I debated whether to call it "the Heroku way" or somesuch. Glad I went with a standalone name, feel like that allowed it to take on a life beyond that product. For example I doubt Google would have wanted a page about "Heroku Way app development on GCP" in their documentation. :-)

We deployed to Heroku, but the same DevOps principles would have allowed us to deploy to AWS, Google Cloud, Microsoft Azure, or another cloud computing service.

Here is how to bind configuration variables to the environment. In Heroku, or in Google OAuth, you will have to add the correct values, which are specific to that environment.

* Create a file called `secrets.js` in the project root
* This file is listed in `.gitignore`, and will _only_ be required
  in your _development_ environment
* Its purpose is to attach the secret environment variables that you
  will use while developing
* However, it's **very** important that you **not** push it to
  Github! Otherwise, _prying eyes_ will find your secret API keys!
* It might look like this:

```
process.env.GOOGLE_CLIENT_ID = 'hush hush'
process.env.GOOGLE_CLIENT_SECRET = 'pretty secret'
process.env.GOOGLE_CALLBACK = '/auth/google/callback'
```

When you deploy your application to Heroku you need to set these values as configuration variables in your heroku app.

### OAuth

* To use OAuth with Google, complete the steps above with a real client
  ID and client secret supplied from Google
* You can get them from the [Google APIs dashboard][google-apis].
* Don’t forget to add your callback URI for both your development environment (localhost:...) and well as for your deployed environment (heroku.<app-name>...) as authorized URLs in the application dashboard for your google project

[google-apis]: https://console.developers.google.com/apis/credentials

## Linting and Style

We used Prettier with reasonable defaults, and automated ESLint running on commit to git.

# Highlighting Features

## Logged-in User Experience

Users who browse be-my-ears have the option of creating an account, via email signup or Google OAuth.

## Database Schema

Database interactions were handled via an ORM, [Sequelize]([https://sequelize.org/]). The app used three models, Users, Images, and Videos, and the associations between them.

### Heroku

1.  Set up the [Heroku command line tools][heroku-cli]
2.  `heroku login`
3.  Add a git remote for heroku:

[heroku-cli]: https://devcenter.heroku.com/articles/heroku-cli

* **If you are creating a new app...**

1.  `heroku create` or `heroku create your-app-name` if you have a
    name in mind.
2.  `heroku addons:create heroku-postgresql:hobby-dev` to add
    ("provision") a postgres database to your heroku dyno

* **If you already have a Heroku app...**

1.  `heroku git:remote your-app-name` You'll need to be a
    collaborator on the app.

### Travis

_**NOTE**_ that this step assumes that Travis-CI is already testing your code.
Continuous Integration is not about testing per se – it's about _continuously
integrating_ your changes into the live application, instead of periodically
_releasing_ new versions. CI tools can not only test your code, but then
automatically deploy your app. This is known as Continuous Deployment.
Boilermaker comes with a `.travis.yml` configuration almost ready for
continuous deployment; follow these steps to the job.

1.  Run the following commands to create a new branch:

```
git checkout master
git pull
git checkout -b f/travis-deploy
```

2.  Run the following script to finish configuring `travis.yml` :
    `npm run heroku-token`
    This will use your `heroku` CLI (that you configured previously, if
    not then see [above](#Heroku)) to generate an authentication token. It
    will then use `openssl` to encrypt this token using a public key that
    Travis has generated for you. It will then update your `.travis.yml`
    file with the encrypted value to be sent with the `secure` key under
    the `api_key`.
3.  Run the following commands to commit these changes

```
git add .travis.yml
git commit -m 'travis: activate deployment'
git push -u origin f/travis-deploy
```

4.  Make a Pull Request for the new branch, get it approved, and merge it into
    the master branch.

_**NOTE**_ that this script depends on your local `origin` Git remote matching
your GitHub URL, and your local `heroku` remote matching the name of your
Heroku app. This is only an issue if you rename your GitHub organization,
repository name or Heroku app name. You can update these values using
`git remote` and its related commands.

#### Travis CLI

There is a procedure to complete the above steps by installing the official
[Travis CLI tools][travis-cli]. This requires a recent Ruby, but this step
should not be, strictly speaking, necessary. Only explore this option when the
above has failed.

[travis-cli]: https://github.com/travis-ci/travis.rb#installation

That's it! From now on, whenever `master` is updated on GitHub, Travis
will automatically push the app to Heroku for you.

### Deploy script

Your local copy of the application can be pushed up to Heroku at will,
using the `npm run deploy` script mentioned above.

1.  Make sure that all your work is fully committed and merged into your
    master branch on Github.
2.  If you currently have an existing branch called "deploy", delete
    it now (`git branch -d deploy`). We will use a dummy branch
    with the name `deploy` (see below), so and the script below will error if a
    branch with that name already exists.
3.  `npm run deploy`
    _ this will cause the following commands to happen in order:
    _ `git checkout -b deploy`: checks out a new branch called
    `deploy`. Note that the name `deploy` here is not magical, but it needs
    to match the name of the branch we specify when we push to our `heroku`
    remote.
    _ `webpack -p`: webpack will run in "production mode"
    _ `git add -f public/bundle.js public/bundle.js.map`: "force" add
    these files which are listed in `.gitignore`.
    _ `git commit --allow-empty -m 'Deploying'`: create a commit, even
    if nothing changed
    _ `git push --force heroku deploy:master`: push your local
    `deploy` branch to the `master` branch on `heroku`
    _ `git checkout master`: return to your master branch
    _ `git branch -D deploy`: remove the deploy branch

Now, you should be deployed!

Why do all of these steps? The big reason is because we don't want our
production server to be cluttered up with dev dependencies like
`webpack`, but at the same time we don't want our development
git-tracking to be cluttered with production build files like
`bundle.js`! By doing these steps, we make sure our development and
production environments both stay nice and clean!

It is also possible to set up Continuous Deployment from updates to master on Github.
