window.onerror = function(message, source, lineno, colno, error) {
    if (message === 'Script error.') {
        let $body = $('body');
        $body.empty();
        let $error = $('<div class="error">' +
            '<p>404 Not Found!</p>' +
            '</div>');
        $error.appendTo($body)
    }
}