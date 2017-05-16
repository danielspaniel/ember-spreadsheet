import Ember from 'ember';
import layout from '../templates/ember-spreadsheet';

export default Ember.Component.extend({
  layout,
  classNames: ['ember-spreadsheet'],
  itemCount: Ember.computed.reads('rightItems.length'),
  columns: [100],
  paddingLeft: 2,

  didInsertElement() {
    this._super(...arguments);
    this.headerSetup();
    this.scrollSetup();
  },

  willDestroyElement: function() {
    this._super(...arguments);
    this.$('.left-side .collection div:first').off('scroll');
    this.$('.right-side .collection div:first').off('scroll');

    this.leftSideList.niceScroll('destroy');
    this.rightSideList.niceScroll('destroy');
  },

  headerSetup: function() {
    let leftWidth = this.get('leftWidth');
    Ember.$('.spreadsheet-header .left-side').css({width: leftWidth + this.paddingLeft });
    Ember.$('.spreadsheet-header .right-side').css({left: leftWidth + this.paddingLeft });
    Ember.$('.left-side .collection').css({width: leftWidth});
  },

  leftSideList: null,
  rightSideList: null,

  scrollSetup: function() {
    if (!this.$('.left-side .collection div:first')[0]) { return; }
    if (!this.$('.left-side .collection div:first').data('hasScrollSetup')) {
      this.leftSideList = this.$('.left-side .collection div:first');
      this.rightSideList = this.$('.right-side .collection div:first');

      this.leftSideList.on('scroll', this.scrollChangeLeft.bind(this)).data('hasScrollSetup', true);
      this.rightSideList.on('scroll', this.scrollChangeRight.bind(this)).data('hasScrollSetup', true);

      this.leftSideList.niceScroll({
        horizrailenabled: false,
        enablescrollonselection: false,
        autohidemode: "hidden",
        cursorwidth: 0,
      });
      this.rightSideList.niceScroll({touchbehavior:true, cursordragontouch: true});
    }
  },

  scrollChangeLeft(e) {
    let verticalScroll = e.currentTarget.scrollTop;
    if (this.rightSideList.scrollTop() !== verticalScroll) {
      this.rightSideList.scrollTop(verticalScroll);
    }
  },

  scrollChangeRight(e) {
    let verticalScroll = e.currentTarget.scrollTop;
    let horizontalScroll = e.currentTarget.scrollLeft;
    let leftWidth = this.get('leftWidth') + this.paddingLeft;
    this.$('.spreadsheet-header .right-side').css('left', leftWidth - horizontalScroll);
    if (this.leftSideList.scrollTop() !== verticalScroll) {
      this.leftSideList.scrollTop(verticalScroll);
    }
  }

});