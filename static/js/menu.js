(function(window) {

  'use strict';

  /**
   * Extend Object helper function.
   */
  function extend(a, b) {
    for(var key in b) { 
      if(b.hasOwnProperty(key)) {
        a[key] = b[key];
      }
    }
    return a;
  }

  /**
   * Each helper function.
   */
  function each(collection, callback) {
    for (var i = 0; i < collection.length; i++) {
      var item = collection[i];
      callback(item);
    }
  }

  /**
   * Menu Constructor.
   */
  function Menu(options) {
    this.options = extend({}, this.options);
    extend(this.options, options);
    this._init();
  }

  /**
   * Menu Options.
   */
  Menu.prototype.options = {
    wrapper: '#wrapper',          // The content wrapper
    type: 'slide-left',             // The menu type
    menuOpenerClass: '.slider'   // The menu opener class names (i.e. the buttons)
    // maskId: '#mask'               // The ID of the mask
  };

  /**
   * Initialise Menu.
   */
  Menu.prototype._init = function() {
    this.body = document.body;
    this.wrapper = document.querySelector(this.options.wrapper);
    // this.mask = document.querySelector(this.options.maskId);
    this.menu = document.querySelector('#menu-' + this.options.type);
    this.closeBtn = this.menu.querySelector('#close');
    this.menuOpeners = document.querySelectorAll(this.options.menuOpenerClass);
    this._initEvents();
  };

  /**
   * Initialise Menu Events.
   */
  Menu.prototype._initEvents = function() {
    // Event for clicks on the mask.
    this.closeBtn.addEventListener('click', function(e) {
      e.preventDefault();
      map.setCenter(center);
      map.setZoom(12);
      this.close();
    }.bind(this));
  };
  /**
   * Open Menu.
   */
  Menu.prototype.open = function() {
    this.body.classList.add('has-active-menu');
    this.wrapper.classList.add('has-' + this.options.type);
    this.menu.classList.add('is-active');
    if (this.options.type == "slide-bottom") {
      $("#mask").addClass('is-active');
    }
    this.disableMenuOpeners();
  };
  /**
   * Close Menu.
   */
  Menu.prototype.close = function() {
    this.body.classList.remove('has-active-menu');
    this.wrapper.classList.remove('has-' + this.options.type);
    this.menu.classList.remove('is-active');
    // console.log(this.options.type);
    if (this.options.type == "slide-bottom") {
      $("#mask").removeClass('is-active');
      $("#fotorama").data("fotorama").destroy();
    }
    this.enableMenuOpeners();
  };
  /**
   * Disable Menu Openers.
   */
  Menu.prototype.disableMenuOpeners = function() {
    each(this.menuOpeners, function(item) {
      item.disabled = true;
      /**
       * Disable the left menu from sliding in.
      */
      item.style.pointerEvents = 'none';
      item.style.color = '#9e9e9e';
    });
  };
  /**
   * Enable Menu Openers.
   */
  Menu.prototype.enableMenuOpeners = function() {
    each(this.menuOpeners, function(item) {
      item.disabled = false;
      /**
       * Enable the sliding left menu.
      */
      item.style.pointerEvents = 'auto';
      item.style.color = '#000';
    });
  };

  /**
   * Add to global namespace.
   */
  window.Menu = Menu;

})(window);

/**
 * Create new Menu objects.
 */
var slideLeft = new Menu({
  wrapper: '#wrapper',
  type: 'slide-left',
  menuOpenerClass: '.slider'
  // maskId: '#mask'
});

var slideBottom = new Menu({
  wrapper: '#wrapper',
  type: 'slide-bottom',
  menuOpenerClass: '.slider'
  // maskId: '#mask'
});

var pushLeft = new Menu({
  wrapper: '#wrapper',
  type: 'push-left',
  menuOpenerClass: '.slider'
  // maskId: '#mask'
});