(function() {
  'use strict';

  angular
    .module('skylinkTest')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($timeout, webDevTec, toastr) {
    var vm = this;

    var skylink = new Skylink();
    skylink.setLogLevel(4);
    skylink.on('peerJoined', function(peerId, peerInfo, isSelf) {
      if(isSelf) return; // We already have a video element for our video and don't need to create a new one.
      var vid = document.createElement('video');
      vid.autoplay = true;
      vid.muted = true; // Added to avoid feedback when testing locally
      vid.id = peerId;
      document.body.appendChild(vid);
    });

    skylink.on('incomingStream', function(peerId, stream, isSelf) {
      if(isSelf) return;
      var vid = document.getElementById(peerId);
      attachMediaStream(vid, stream);
    });

    skylink.on('peerLeft', function(peerId) {
      var vid = document.getElementById(peerId);
      document.body.removeChild(vid);
    });

    skylink.on('mediaAccessSuccess', function(stream) {
      var vid = document.getElementById('myvideo');
      attachMediaStream(vid, stream);
    });

    skylink.init({
      apiKey: 'f6084524-d7a4-49b8-aed1-4a8732632ea5', // Get your own key at developer.temasys.com.sg
      defaultRoom: "teste"
    }, function (error, success) {
      if (error) {
        document.getElementById('status').innerHTML = 'Failed retrieval for room information.<br>Error: ' + (error.error.message || error.error);
      } else {
           document.getElementById('status').innerHTML = 'Room information has been loaded. Room is ready for user to join.';
        document.getElementById('start').style.display = 'block';
      }
    });

    skylink.joinRoom({
      audio: true,
      video: true
    }, function (error, success) {
      if (error) {
        document.getElementById('status').innerHTML = 'Failed joining room.<br>' +
    'Error: ' + (error.error.message || error.error);
      } else {
        document.getElementById('status').innerHTML = 'Joined room.';
      }
    });

  }
})();
