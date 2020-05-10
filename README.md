# Pointz

In times of COVID-19, we need to all things programming remotely.
Be it mob programming, or this fortnight's retro session, we need to come all together in a video call and talk and discuss.

Pointz has been created to facilitate remote simplified Planning Poker games, as we do in my team.
We wanted a tool that would be easy to use, with no entry barriers and that is tweaked specially for your needs, and that's why pointz is as it is.

If you want to use Pointz in your team, feel free! It's there for your enjoyment, but please don't abuse it ^^

## Contributing

If you want to tweak pointz so it caters to your team's needs a bit more, or if you want to fix a bug, you're welcome to do so!

### Clone the repo

Fork, then clone the repo:

```bash
git clone git@github.com:Yurickh/pointz.git
cd pointz
yarn install
```

### Developing

You can create a live-reload server for development with

```bash
yarn start
```

Or, if you want to take a look at how the built module will look like, you can run

```bash
yarn build
```

and peek at the `public` folder.

### Developing functions

Pointz has some firebase functions setup for better handling of its store.

These functions live under the `functions` folder:

```bash
cd functions
yarn install
yarn build
```
