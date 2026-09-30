// This is a special kind of Express middleware called an "error-handling middleware" —
// it's identified by having exactly FOUR parameters (err, req, res, next),
// instead of the usual three. Express automatically routes any error here
// if something throws or calls next(err) anywhere earlier in the chain.

function errorHandler(err, req, res, next) {
  // Log the full error on the server side, for you to see in the terminal —
  // this detail should NEVER be sent to the actual client/public response
  console.error('Unexpected error:', err);

  // Send back a generic, safe error message to whoever made the request.
  // No stack trace, no file paths, no internal implementation details.
  res.status(500).json({
    error: 'Something went wrong on our end. Please try again later.'
  });
}

module.exports = errorHandler;