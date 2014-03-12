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

Delete from a link
------------------
```
<button href="/api/someresource/123" class="afbaction" data-method="DELETE">Delete Some Resource ID: 123</a>
```

Post form with multi-select as array
------------------------------------
TODO: Document the data-postas="array" functionality