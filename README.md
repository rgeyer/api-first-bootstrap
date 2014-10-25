api-first-bootstrap
===================

A bootstrap and jQuery toolbox for consuming your apps RESTful API. Cause you're building your app API first, right?

So you're writing an application, and you've architected it correctly so you're building your API first.  Then when you
get to creating your UI, you've gotta build a buncha tooling to consume your backend APIs.

Enter api-first-bootstrap (which is the worst possible name in the history of names).  This is a toolset which strives
to give you some simple abstractions and patterns to use for making RESTful API calls to your backend from your frontend
UI.

Examples
========

Run an examples server

```
./start-examples.sh
```

Then go to http://localhost:8080/examples/<examplename>.php

Where example names are;
* simple

Delete from a link
------------------
```
<button href="/api/someresource/123" class="afbaction" data-method="DELETE">Delete Some Resource ID: 123</a>
```

Features
========

Events
------

 Event |
-------|
start.progress.afb|
started.progress.afb|
stop.progress.afb|
stopped.progress.afb|

Progress dialog
---------------
AFB provides one for you that automatically get's kicked off when any action starts.  But you can disable it in two different ways.

Disable with option flag, this will stop the firing of the progress events listed below.

```
<script>
$(document).ready(function() {
  $('#button1').afb({'progress': false})
});
</script>
<button id="button1" class="afbaction" data-method="DELETE">Uses javascript method</a>

<button id="button2" class="afbaction" data-method="DELETE" data-progress="false">Uses data properties in markup</a>
```

Disable with event handlers

Chances are pretty good that if you don't use the built-in progress option, that you'll want to give users feedback somehow.  For that, there are 4 event handlers, two of which allow you to "preventDefault" so that AFB won't pop up it's own progress dialog.

```
<script>
$(document).ready(function() {
  $('button').on('start.progress.afb', function(evt) {
    //evt.preventDefault(); // This tells AFB not to pop up a progress dialog
    // This is where you should implement your own progress UI feedback
  });
  $('button').on('stop.progress.afb', function(evt) {
    //evt.preventDefault(); // This tells AFB not to close a progress dialog opened after start.progress.afb
    // This is where you should implement your own progress UI feedback
  });
});
</script>
<button id="button1" class="afbaction" data-method="DELETE">Uses javascript method</a>
```

Post form with multi-select as array
------------------------------------
TODO: Document the data-postas="array" functionality
