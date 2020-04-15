$(function () {
    "use strict";


    // Retrieve hash from url
    var hash = window.location.hash;

    // Open collapse based on hash
    $( hash ).collapse();

    // Generate value for data-clipboard-text based on url and data-clipboard-id
    $( '.btn-copy' ).each(function( index ) {
      history.replaceState(null, null, ' ');
      var pageUrl = window.location.href;
      var dataId = $(this).data( 'clipboard-id' );
      $(this).attr( 'data-clipboard-text', pageUrl + dataId);
      $(this).tooltip({
        title: 'Link copiato',
        trigger: 'click',
      });
    });

    // Init clipboardJs on .btn-copy elements
    var clipboard = new ClipboardJS('.btn-copy');

    // clipboard.on('success', function(e) {
    //     console.info('Action:', e.action);
    //     console.info('Text:', e.text);
    //     console.info('Trigger:', e.trigger);
    //     e.clearSelection();
    // });
});
