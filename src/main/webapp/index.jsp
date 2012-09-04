<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>JSP Page</title>
    <script src="js/jquery-1.8.1.min.js"></script>
    <script src="js/jquery.atmosphere.js"></script>
    <script src="js/atmosphere-application.js"></script>
  </head>
  <body>
    <h2>Atmosphere (Portable WebSocket/Comet Framework)</h2>
    <p>
      <button onclick="AtmosphereApplication.subscribe();">1. Subscribe to socket</button><br/>
      <button onclick="AtmosphereApplication.saySomething();">2. Broadcast to socket</button><br/>
      <button onclick="AtmosphereApplication.unsubscribe();">3. Unsubscribe from socket</button><br/>          
    </p>
    <h2>Jersey (RESTful Webservices)</h2>
    <p>
      <button onclick="AtmosphereApplication.getSomething();">1. GET something with Jersey</button><br/>
      <button onclick="AtmosphereApplication.postSomething();">2. POST something with Jersey</button><br/>
    </p>
    <h2>To see what happens: open your Firebug console ;-)</h2>
    <script>
      window.onbeforeunload = function(){
        AtmosphereApplication.unsubscribe();
      };
      jQuery(document).ready(function($){
        //AtmosphereApplication.subscribe();
      });
    </script>
  </body>
</html>