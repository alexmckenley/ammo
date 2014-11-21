(function() {
  'use strict';

  angular
    .module('ammo.player.service', [])
    .factory('player', playerService);

    function playerService(event, providers, Timer) {
      var timer = new Timer(),
          STATES = {
            BUFFERING: 'buffering',
            PLAYING: 'playing',
            PAUSED: 'paused'
          },
          service,
          currentSong,
          state = STATES.PAUSED;

      service = {
        play: play,
        pause: pause,
        unpause: unpause,
        nextSong: nextSong,
        getElapsed: getElapsed,
        getState: getState
      };

      init();

      return service;

      ////////////
      function init() {
        // actions
        event.subscribe('play', play);
        event.subscribe('pause', pause);
        event.subscribe('unpause', unpause);

        // reactions
        event.subscribe('playing', playing);
        event.subscribe('paused', paused);
        event.subscribe('buffering', buffering);
        event.subscribe('ended', ended);
      }

      // actions
      function play(song) {
        if (!song) {
          return;
        }

        if (currentSong) {
          providers.get(currentSong.service).pause();
        }
        currentSong = song;

        providers.get(currentSong.service).play(currentSong);
        timer.reset();
      }

      function pause() {
        providers.get(currentSong.service).pause();
      }

      function unpause() {
        providers.get(currentSong.service).unpause();
      }

      function nextSong() {
        service.play(currentPlaylist.nextSong());
      }

      function getElapsed() {
        return timer.getElapsed();
      }

      function getState() {
        return state;
      }

      // reactions
      function playing() {
        state = STATES.PLAYING;
        timer.start();
      }

      function paused() {
        state = STATES.PAUSED;
        timer.stop();
      }

      function buffering() {
        state = STATES.BUFFERING;
        timer.stop();
      }

      function ended() {
        state = STATES.ENDED;
        timer.stop();
        service.nextSong();
      }

    }
})();
