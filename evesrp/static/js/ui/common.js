var EveSRP;

if (!EveSRP) {
  EveSRP = {}
}

if (! ('ui' in EveSRP)) {
  EveSRP.ui = {}
}

EveSRP.ui.renderFlashes = function renderFlashes(data) {
  var $content = $('#content'),
      flashes = data.flashed_messages;
  for (index in flashes) {
    var flashID = _.random(10000),
        flashInfo = flashes[index],
        flash;
    flashInfo.id = flashID;
    flash = Handlebars.templates.flash(flashes[index])
    $content.prepend(flash);
    window.setTimeout(function() {
      $('#flash-' + flashID).alert('close');
    }, 5000);
  }
};

EveSRP.ui.renderNavbar = function renderNavbar(data) {
  var $leftBar = $('#left-nav'),
      $rightBar = $('#right-nav'),
      navData = data.nav_bar,
      newLeft, newRight;
  newLeft = Handlebars.templates.left_navbar(navData);
  newRight = Handlebars.templates.right_navbar(navData);
  $leftBar.empty();
  $leftBar.prepend(newLeft);
  // More careful here, we keep the dropdown intact
  $rightBar.children('li:not(.dropdown)').remove();
  $rightBar.prepend(newRight);
};

EveSRP.ui.setupEvents = function setupUIEvents() {
  $(document).ajaxComplete(function(ev, jqxhr) {
    var data = jqxhr.responseJSON;
    if (data && 'flashed_messages' in data) {
      EveSRP.ui.renderFlashes(jqxhr.responseJSON);
    }
    if (data && 'nav_bar' in data) {
      EveSRP.ui.renderNavbar(jqxhr.responseJSON);
    }
  });
};
EveSRP.ui.setupEvents();

EveSRP.ui.setupClipboard = function setupClipboard() {
  ZeroClipboard.config({
    moviePath: $SCRIPT_ROOT + '/static/ZeroClipboard.swf'
  })
  /* Attach the pastboard object */
  EveSRP.ui.clipboardClient = new ZeroClipboard($('.copy-btn'));
}
