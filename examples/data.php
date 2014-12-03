<?php
if($_SERVER['REQUEST_METHOD'] == 'POST') {
  header("HTTP/1.0 200 Success");
  sleep(5);
  print_r($_POST);
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
    function data_function() {
      return {"foo": "bar"}
    }
    $(document).ready(function() {
    });
  </script>
</head>
<body>
  <form id="form" action="#?foo={{foo}}&bar={{bar}}">
    <input type="text" id="foo" value="bar" name="foo"/>
  </form>
  <button href="./data.php?foo={{foo}}&bar={{bar}}" data-method="POST" class="btn btn-default afbaction" data-form="#form">Form Post</button>
  <button href="#" data-method="POST" class="btn btn-default afbaction" data-json={"foo":"bar"}>Json Post</button>
  <button href="#" data-method="POST" class="btn btn-default afbaction" data-func="data_function">Function Post</button>
  <div class="well">
  <?php
  print_r($_SERVER);
  ?>
  </div>
</body>
</html>
