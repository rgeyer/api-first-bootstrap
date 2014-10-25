<?php
if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
  header("HTTP/1.0 200 Success");
  sleep(5);
  die();
}
?>

<html>
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>

  <link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
  <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

  <script src="../js/afb.js"></script>
  <script>
    $(document).ready(function() {
      //$('button').afb({'progress': true});
      //$('button').afb({'method': 'delete'});
      $('button').on('start.progress.afb', function(evt) {
        //evt.preventDefault(); // This tells AFB not to pop up a progress dialog
        // This is where you should implement your own progress UI feedback
        console.log("Consumed start progress event.");
      });
      $('button').on('started.progress.afb', function(evt) {
        // This is only fired if progress is enabled, and preventDefault() is not called on the start.progress.afb event.
        console.log("Consumed started progress event.");
      });
      $('button').on('stop.progress.afb', function(evt) {
        //evt.preventDefault(); // This tells AFB not to close a progress dialog opened after start.progress.afb
        // This is where you should implement your own progress UI feedback
        console.log("Consumed stop progress event.");
      });
      $('button').on('stopped.progress.afb', function(evt) {
        // This is only fired if progress is enabled, and preventDefault() is not called on the stop.progress.afb event.
        console.log("Consumed stopped progress event.");
      });
    });
  </script>
</head>
<body>
  <button href="#" data-method="DELETE" class="btn btn-default afbaction" data-progress="false" data-redirect="SELF">Delete</button>
  <button href="#" data-method="DELETE" class="btn btn-default afbaction" data-confirm="Really delete all the things?">Delete with confirmation</button>
  <div class="well">
  <?php
  print_r($_SERVER);
  ?>
  </div>
</body>
</html>
