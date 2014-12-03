+function ($) { "use strict";

  // AFB CLASS DEFINITION
  // ====================

  var Afb = function(element,options) {
    this.$el = $(element).on('click', $.proxy(this.send_request, this));
    this.settings = $.extend({},this.DEFAULTS,options);
    this.settings.href = $(element).attr('href');
    this.progressModal = null;
  }

  Afb.prototype.options = function(settings) {
    this.settings = $.extend({}, this.settings, settings);
  }

  Afb.doAjax = function(afb,data) {
    var tokensRegex = new RegExp(afb.settings.urlTokens.ldelim+'.*?'+afb.settings.urlTokens.rdelim,'g');
    var urlTokens = afb.settings.href.match(tokensRegex);
    var url = afb.settings.href;
    if (urlTokens) {
      var i = 0;
      for (i=0; i < urlTokens.length; ++i) {
        var nodelims = urlTokens[i].replace(afb.settings.urlTokens.ldelim,'').replace(afb.settings.urlTokens.rdelim,'');
        url = url.replace(urlTokens[i],data[nodelims]);
        delete data[nodelims];
      }
    }

    var ajaxOptions = $.extend({
      url:url,
      type:afb.settings.method,
      data:data,
      dataType: afb.settings.datatype,
      complete: function(jqXHR, status) {
        afb.stopProgress();
        if(afb.settings.redirect && typeof afb.settings.redirect == 'string' ) {
          if(afb.settings.redirect.toLowerCase() == 'self') {
            location.reload();
          } else {
            window.location.href = afb.settings.redirect;
          }
        }
      }
    }, afb.settings.ajaxOptions, {});
    $.ajax(ajaxOptions);
  };

  Afb.prototype.DEFAULTS = {
    method: 'GET',
    confirm: false,
    progress: true,
    dataType: 'json',
    redirect: false,
    doAjax: Afb.doAjax,
    ajaxOptions: {},
    json: false,
    form: false,
    func: false,
    urlTokens: {
      ldelim: "{{",
      rdelim: "}}"
    }
  };

  Afb.prototype.startProgress = function() {
    if(!this.settings.progress) return;
    var e = $.Event('start.progress.afb', {relatedTarget: this});
    this.$el.trigger(e);
    if(e.isDefaultPrevented()) return;
    var afb = this;
    this.progressModal = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Progress</h4></div><div class="modal-body"><p>Processing your request</p><div class="progress progress-striped active"><div class="progress-bar progress-bar-info" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%"><span class="sr-only"></span></div></div></div></div></div></div>');
    this.progressModal.on('hidden.bs.modal', function() {$(this).remove();});
    $("div.progress-bar", afb.progressModal).data('value',0);
    $('body').append(this.progressModal);
    this.progressModal.modal('show');
    this.progressIntervalNumber = setInterval(function() {
      var progress_bar = $("div.progress-bar", afb.progressModal);
      var percent = progress_bar.data('value');
      percent = (percent + 10) % 100;
      progress_bar.width(percent+'%');
      progress_bar.data('value', percent);

      if (afb.progressModal.attr('aria-hidden') == 'true') {
        clearInterval(afb.progressIntervalNumber);
      }
    },1000);
    this.$el.trigger($.Event('started.progress.afb', {relatedTarget: this}));
  };

  Afb.prototype.stopProgress = function() {
    if(!this.settings.progress) return;
    var e = $.Event('stop.progress.afb', {relatedTarget: this});
    this.$el.trigger(e);
    if(e.isDefaultPrevented()) return;
    this.progressModal.modal('hide');
    this.$el.trigger($.Event('stopped.progress.afb', {relatedTarget: this}));
  };

  Afb.prototype.send_request = function(evt) {
    // The contextual meaning of "this" changes in the blocks below,
    // but I still need to have access to "this" afb
    var afb = this;
    evt.preventDefault();
    evt.stopPropagation();

    var data = {};
    if (afb.settings.form !== false) {
      var form = $(afb.settings.form);
      data = convertFormToKeyValuePairJson(form);
    }

    if (afb.settings.json !== false) {
      data = afb.settings.json;
    }

    if (afb.settings.func !== false) {
      if (typeof afb.settings.func == 'function') {
        data = afb.settings.func();
      } else {
        data = window[afb.settings.func]();
      }
    }

    if (afb.settings.confirm) {
      var confirmMarkup = $('<div class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><h4 class="modal-title">Confirm</h4></div><div class="modal-body">'+this.settings.confirm+'</div><div class="modal-footer"><button type="button" class="btn btn-primary" data-dismiss="modal">Yes</button><button class="btn" data-dismiss="modal">No</button></div></div></div></div>');
      $('body').append(confirmMarkup);
      $(confirmMarkup).on('click', '.btn-primary', function(event) {
        var parentModal = $(this).closest('.modal');
        parentModal.data('confirmed', true);
      });
      $(confirmMarkup).on('hidden.bs.modal', function(event) {
        if($(this).data('confirmed')) {
          afb.startProgress();
          afb.settings.doAjax(afb,data);
        }
        $(this).remove();
      });
      $(confirmMarkup).modal('show');
      return;
    } else {
      afb.startProgress();
      afb.settings.doAjax(afb,data)
    }
  }

  // SOME HELPER METHODS
  // ===================

  function convertFormToKeyValuePairJson(selector) {
    var serializedForm = $(selector).serializeArray();
    var data = {};
    $.each(serializedForm, function(i, field) {
      if(data[field.name]) {
        if($.isArray(data[field.name])) {
          data[field.name] = data[field.name].concat(field.value);
        } else {
          var oldval = data[field.name];
          data[field.name] = [oldval].concat(field.value);
        }
      } else {
        // TODO: Multi selects are always arrays, single selects are always scalars.  Single selects can be
        // arrays only if a special data-* flag is set. data-postas probably isn't the clearest choice
        var multiple = $("[name='"+field.name+"']", $(selector)).attr('data-postas');
        if(multiple) {
          data[field.name] = [field.value];
        } else {
          data[field.name] = field.value;
        }
      }
    });
    return data;
  }

  // AFB PLUGIN DEFINITION
  // =====================

  var old = $.fn.afb

  $.fn.afb = function(option, _relatedTarget) {
    return this.each(function() {
      var $this = $(this);
      var data = $this.data('afb');
      var options = $.extend({}, Afb.DEFAULTS, $this.data(), typeof option == 'object' && option);

      if(!data) $this.data('afb', (data = new Afb(this, options)))
      if(typeof option =='string') data[option](_relatedTarget)
    });
  };

  $.fn.afb.Constructor = Afb

  // AFB NO CONFLICT

  $.fn.afb.noConflict = function() {
    $.fn.afb = old;
    return this;
  }

  $(window).on('load', function() {
    $('.afbaction').each(function() {
      $(this).afb();
    })
  });

}(window.jQuery);
