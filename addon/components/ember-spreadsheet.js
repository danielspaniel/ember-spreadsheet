import Ember from 'ember';
import layout from '../templates/ember-spreadsheet';

export default Ember.Component.extend({
  layout,
  classNames: ['ember-spreadsheet'],
  itemCount: Ember.computed.reads('rightItems.length'),
  columns: [100],

  didInsertElement() {
    this._super(...arguments);
    this.headerSetup();
    this.scrollSetup();
  },

  willDestroyElement: function() {
    this._super(...arguments);
    this.$('.left .collection div:first').off('scroll');
    this.$('.right .collection div:first').off('scroll');

    this.leftSideList.niceScroll('destroy');
    this.rightSideList.niceScroll('destroy');
  },

  headerSetup: function() {
    let leftWidth = this.get('leftWidth');
    Ember.$('.header .left-column').css({width: leftWidth + 10 });
    Ember.$('.header .right-columns').css({left: leftWidth + 10 });
    Ember.$('.left .collection').css({width: leftWidth});
  },

  leftSideList: null,
  rightSideList: null,

  scrollSetup: function() {
    if (!this.$('.left .collection div:first')[0]) { return; }
    if (!this.$('.left .collection div:first').data('hasScrollSetup')) {
      this.leftSideList = this.$('.left .collection div:first');
      this.rightSideList = this.$('.right .collection div:first');

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
    this.$('.header .right-columns').css('left', 110 - horizontalScroll);
    if (this.leftSideList.scrollTop() !== verticalScroll) {
      this.leftSideList.scrollTop(verticalScroll);
    }
  }

});