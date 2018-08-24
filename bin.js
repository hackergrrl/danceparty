#!/usr/bin/env node

var path = require('path')
var fs = require('fs')
var spawn = require('child_process').spawn

var MUSIC_DIR = process.argv[3] || '/home/sww/music'
var MPLAYER = 'mplayer'
var BUILD = process.argv[2] || (console.log('param 1 must be build command') && process.exit(1))

var player

function playSong () {
  var files = fs.readdirSync(MUSIC_DIR)
    .filter(function (file) {
      return /(mp3)|(ogg)$/.test(file)
    })
  var song = files[Math.floor(Math.random() * files.length)]

  var m = spawn(MPLAYER, [path.join(MUSIC_DIR, song)])
  m.fade = function () {
    var n = 10
    var i = setInterval(function () {
      m.stdin.write('/')
      if (!--n) {
        clearInterval(i)
        m.stdin.end()
        m.kill(1)
      }
    }, 500)
  }

  m.on('exit', function (code) {
    if (code === 0) playSong()
  })

  player = m
}

playSong()

var b = spawn(process.argv[2].split(' ')[0], process.argv[2].split(' ').slice(1))
b.stdout.pipe(process.stdout)
b.stderr.pipe(process.stderr)
b.on('exit', function (code) {
  player.fade()
})
