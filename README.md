# What's the Score?

React app to record the score of a game with rounds and players.

## Background

We play [Farkle](https://en.wikipedia.org/wiki/Farkle) with friends over video chat.
One person keeps score by hand and it is pretty tedious. It's also difficult for players
on video to keep up with the current score since they can't see the scoresheet.

This app allows clients to connect to the same game (via game ID) and receive live
updates of the score as the game progresses.

## Local development

```sh
# select the correct node version
nvm use

# install deps
npm install

# start the dev server
npm run dev
```

## Tech

The realtime aspect is handled by [instantdb](https://www.instantdb.com/).
