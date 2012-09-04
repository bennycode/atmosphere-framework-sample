AtmosphereApplication = function(){
  var href = ((window.location.href.match(/^(http.+\/)[^\/]+$/) != null) ? window.location.href.match(/^(http.+\/)[^\/]+$/)[1] : window.location);
  // See: web.xml
  var atmosphereServletPath = href+'atmosphere/';
  var jerseyServletAdaptorPath = href+'jersey/';
  // See: AtmosphereHandler.java
  var socketId = 72;
  var atmosphereHandlerPath = atmosphereServletPath+'socket/'+socketId;  
  // See: JerseyHandler.java
  var jerseyHandlerPath = jerseyServletAdaptorPath+'api/';
  // Atmosphere-Plugin
  var socket = $.atmosphere;
  var subSocket;
  return {
    subscribe: function(){
      // Available transports:
      var transports = ['websocket','long-polling','sse','jsonp','streaming','ajax'];
      // Own header information:
      var headerData = {
        'name': 'Benny',
        'lastName': 'Neugebauer',
        'message': 'Hello from JavaScript!',
        'time': new Date().getTime().toString()
      };      
      // Atmosphere request:
      var request = {
        url: atmosphereHandlerPath,
        logLevel: 'debug',
        transport: transports[0], // 'websocket'
        fallbackTransport: transports[1], // 'long-polling'
        maxRequest: 2,
        contentType: 'application/json',
        attachHeadersAsQueryString: true,
        headers: {
          "X-Something-Useful": JSON.stringify(headerData)
        }
      };
      request.onOpen = function(response){
        console.log('onOpen:');
        console.log(' -Received: ');
        console.log(response);
        alert('Subscribed to: '+atmosphereHandlerPath);
      };
      request.onReconnect = function(request,response){
        console.log('onReconnect:');
        console.log(' -Received: '+response);
      };
      request.onClose = function(request,response){
        console.log('onClose:');
        console.log(' -Received: '+response);
      };
      request.onMessage = function(response){
        console.log('onMessage:');
        console.log(' -Received: '+response.responseBody);
        try{
          var data = JSON.parse(response.responseBody);
          if(data.hasOwnProperty('message')){
            alert('Someone said: '+data['message']);
          }
        }catch(e){
        //
        }
      };
      request.onError = function(response){
        console.log('onError:');
        console.log(' -Received: '+response);
      };  
      subSocket = socket.subscribe(request);
    },
    saySomething: function(){
      var jso = {
        'message':'something'
      };
      var json = JSON.stringify(jso);
      try{
        subSocket.push(json);
      }catch(e){
        alert('You need to subscribe to a socket first!');
      }
    },
    unsubscribe: function(){
      socket.unsubscribe();
    },
    getSomething: function(){
      var url = jerseyHandlerPath+'getSomething/';
      $.ajax({
        type: 'GET',
        url: url
      }).done(function(data,textStatus,jqXHR){
        alert('Received "'+data+'" from '+url);
      });
    },
    postSomething: function(){
      var url = jerseyHandlerPath+'postSomething/';
      var data = {
        message: 'something'
      };
      $.ajax({
        type: 'POST',
        url: url,
        data: JSON.stringify(data),
        contentType: 'application/json'
      }).done(function(data,textStatus,jqXHR){
        alert('Look into your server log/output ;-)');
      });
    }
  };
}();