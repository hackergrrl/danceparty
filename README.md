# danceparty

> have a dance party while your code is compiling

## Install

```
npm install -g danceparty
```

## Usage

```
danceparty $BUILD_COMMAND $MUSIC_DIR
```

e.g.

```
danceparty 'cargo build' '/home/sww/music'
```

It will play random songs until the build command finishes, then it will fade
out the music.

## Limitations

Only works with `mplayer`. PRs welcome to add support for more audio players!

## License

GPLv3
