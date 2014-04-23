<?php
if($_SERVER['REQUEST_METHOD'] == 'DELETE') {
  header("HTTP/1.0 200 Success");
  die();
}
?>

<html>
<head>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>

  <link href="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/css/bootstrap.min.css" rel="stylesheet">
  <script src="http://netdna.bootstrapcdn.com/bootstrap/3.1.1/js/bootstrap.min.js"></script>

  <script src="../js/afb.js"></script>
  <script>
    $(document).ready(function() {
      $('button').afb({'method': 'foo'});
      $('button').on('start.progress.afb', function(evt) {evt.preventDefault(); console.log("Consumed start progress event.");});
      $('button').on('started.progress.afb', function(evt) {console.log("Consumed started progress event.");});
      $('button').on('stop.progress.afb', function(evt) {evt.preventDefault(); console.log("Consumed stop progress event.");});
      $('button').on('stopped.progress.afb', function(evt) {console.log("Consumed stopped progress event.");});
    });
  </script>
</head>
<body>
  <button href="#" data-method="DELETE" class="btn btn-default afbaction" data-confirm="Really delete all the things?">Foo</button>
  <div class="well">
  <?php
  print_r($_SERVER);
  ?>
  </div>
</body>
</html>
