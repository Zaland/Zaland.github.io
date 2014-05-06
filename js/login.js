/*var url = 'https://goinstant.net/e66bb6600472/Project';
var opts = { room: 'lobby' };
goinstant.connect(url, opts, function(err, conn, room) {
    if (err) {
        throw err;
    }

    if (conn.isGuest()) {
        // prompt user to log in with a provider:
        displaySignOnLink(conn);
    } else {
        // fully connected, start using goinstant:
        startMyApp(conn, room);
    }
});

function displaySignOnLink(conn) {
    var container = document.getElementById('sign-on-link-container');
    if (!container) {
        throw new Error('could not find element "#sign-on-link-container"')
    }

    var message = 'Log In with Google';
    var a = document.createElement('A');
    a.href = conn.loginUrl('google');
    a.appendChild(document.createTextNode(message));

    container.appendChild(a);
}*/

function signinCallback(authResult) {
  if (authResult['access_token']) {
    // Successfully authorized
    document.getElementById('signinButton').setAttribute('style', 'display: none');

  } else if (authResult['error']) {
    // There was an error.
    // Possible error codes:
    //   "access_denied" - User denied access to your app
    //   "immediate_failed" - Could not automatially log in the user
    // console.log('There was an error: ' + authResult['error']);
  }
}

function disconnectUser(access_token) {
  var revokeUrl = 'https://accounts.google.com/o/oauth2/revoke?token=' +
      access_token;

  // Perform an asynchronous GET request.
  $.ajax({
    type: 'GET',
    url: revokeUrl,
    async: false,
    contentType: "application/json",
    dataType: 'jsonp',
    success: function(nullResponse) {
      // Do something now that user is disconnected
      // The response is always undefined.
    },
    error: function(e) {
      // Handle the error
      // console.log(e);
      // You could point users to manually disconnect if unsuccessful
      // https://plus.google.com/apps
    }
  });
}
// Could trigger the disconnect on a button click
$('#revokeButton').click(disconnectUser);