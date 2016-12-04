import Ember from 'ember';
import layout from '../templates/ember-spreadsheet';

export default Ember.Component.extend({
  layout,
  classNames: ['ember-spreadsheet'],

  didInsertElement() {
    this._super(...arguments);
    this.scrollSetup();
  },

  willDestroyElement: function() {
    this._super(...arguments);
    this.$('.left-side div:first').off('scroll, touchmove');
    this.$('.right-side div:first').off('scroll, touchmove');

    this.leftSideList.niceScroll('destroy');
    this.rightSideList.niceScroll('destroy');
  },

  resizeOnTrigger: function() {
//    this.setListSize();
  },

  leftSideList: null,
  rightSideList: null,

  scrollSetup: function() {
    if (!this.$('.left-side div:first')[0]) { return; }
    if (!this.$('.left-side div:first').data('hasScrollSetup')) {
      this.leftSideList = this.$('.left-side div:first');
      this.rightSideList = this.$('.right-side div:first');

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
    Ember.$('.spreadsheet-labels .column-rows').css('left', 362 - horizontalScroll);
    if (this.leftSideList.scrollTop() !== verticalScroll) {
      this.leftSideList.scrollTop(verticalScroll);
    }
  },

  heightCalculation: function() {
    return Ember.$('.container-wrapper').height() - 70;
  },

  widthCalculation: function() {
    return Ember.$('.container-wrapper').width() - 370;
  },

  setListWidth() {
    let width = this.widthCalculation();
    if (width) {
      Ember.$('.collection.right-side').width(width);
    }
  },

  
});