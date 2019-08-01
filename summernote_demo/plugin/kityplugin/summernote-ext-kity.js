(function(factory) {
  /* global define */
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define(['jquery'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // Node/CommonJS
    module.exports = factory(require('jquery'));
  } else {
    // Browser globals
    factory(window.jQuery);
  }
}(function($) {
  // Extends plugins for adding kity.
  //  - plugin is external module for customizing.
  $.extend($.summernote.plugins, {
    /**
     * @param {Object} context - context object has status of editor.
     */
    'kity': function(context) {
      var self = this;

      // ui has renders to build ui elements.
      //  - you can create a button with `ui.button`
      var ui = $.summernote.ui;
      var $editor = context.layoutInfo.editor;
      var options = context.options;
      // editor.insertImage($('.note-editable'), src);

      // add kity button
      context.memo('button.kity', function() {
        // create button
        var button = ui.button({
          contents: '<i class="fa fa-child"/> M',
          tooltip: '公式',
          click: context.createInvokeHandler('kity.showDialog')
        });

        // create jQuery object from button instance.
        var $kity = button.render();
        return $kity;
      });

      self.initialize = function () {
        var $container = options.dialogsInBody ? $(document.body) : $editor;

        var body = '<div id="kfEditorContainer" class="kf-editor"></div>'
        var footer = '<button href="#" class="btn btn-primary ext-ifElse-btn">OK</button>';

        self.$dialog = ui.dialog({
          title: '公式',
          fade: options.dialogsFade,
          body: body,
          footer: footer,
          callback: ($node) => {
            $node.find('.modal-dialog').css({
              // 'min-height': '300px',
              // 'width': '850px',
                  width: '80%',
            });
            $node.find('.modal-body,.note-modal-body').css({
              // 'max-height': 500,
              // 'min-height': '300px',
              'overflow': 'auto',
            });
          },
        }).render().appendTo($container);
      };
      // This events will be attached when editor is initialized.
      // self.events = {
      //   // This will be called after modules are initialized.
      //   'summernote.init': function (we, e) {
      //     console.log('summernote initialized', we, e);
      //   }
      // };

      self.destroy = function () {
        ui.hideDialog(self.$dialog)
        self.$dialog.remove();
      };

      self.showDialog = function () {
        context.invoke('editor.saveRange');
        self
          .openDialog()
          .then(function (data) {
            // [workaround] hide dialog before restore range for IE range focus
            ui.hideDialog(self.$dialog);
            context.invoke('editor.restoreRange');
            // self.insertToEditor(data);
            var image = $('<img>').attr('src', data.img).attr('data-latex', data.latex).attr('class', 'kfformula');
            context.invoke('editor.insertNode', image[0])
          })
          .fail(function () {
            context.invoke('editor.restoreRange');
          });

      };

      self.openDialog = function () {
        return $.Deferred(function (deferred) {
          var $dialogBtn = self.$dialog.find('.ext-ifElse-btn');
          var $kfEditorContainer = self.$dialog.find('#kfEditorContainer');
          // var text = context.invoke('editor');
          // console.log(text);
            var factory = kf.EditorFactory.create($kfEditorContainer[0], {
              render: {
                fontsize: 40
              },
              resource: {
                path: "../../kityformula-plugin/resource/"
              }
            });

            factory.ready(function (KFEditor) {

              // this指向KFEditor
              // var rng = $editor.selection.getRange(),
              //   img = rng.getClosedNode(),
              //   imgLatex = img && $(img).attr('data-latex');

              this.execCommand("render", "\\placeholder");
              // this.execCommand("render", imgLatex || "\\placeholder");
              // this.execCommand("render", "1");
              this.execCommand("focus");

              window.kfe = this;

            });

          ui.onDialogShown(self.$dialog, function () {
            context.triggerEvent('dialog.shown');

            $dialogBtn
              .click(function (event) {
                event.preventDefault();
                kfe.execCommand('get.image.data', function (data) {
                  var latex = kfe.execCommand('get.source');
                  // console.log('<img class="kfformula" src="' + data.img + '" data-latex="' + latex + '" />');
                  deferred.resolve({
                    // img: '<img class="kfformula" src="' + data.img + '" data-latex="' + latex + '" />'
                    img: data.img,
                    latex: latex
                  });
                });
              });
          });

          ui.onDialogHidden(self.$dialog, function () {
            $dialogBtn.off('click');

            if (deferred.state() === 'pending') {
              deferred.reject();
            }
          });

          ui.showDialog(self.$dialog);
        });
      };

      // self.insertToEditor = function (data) {
      //   var image = $('<img>').attr('src', data.img).attr('data-latex', data.latex).attr('class', 'kfformula');
      //   // $('#summernote').summernote("insertNode", image[0]);
      //   context.invoke('editor.insertNode', image[0])
      //   // $('#summernote').summernote('insertImage', data.img, function ($image) {
      //   //   $image.attr('data-latex', data.latex);
      //   //   $image.attr('class', 'kfformula');
      //   // })
      // };
    },
  });
}));
