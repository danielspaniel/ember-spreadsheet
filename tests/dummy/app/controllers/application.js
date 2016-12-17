import Ember from 'ember';

export default Ember.Controller.extend({
  nullWidth: null,
  headerLeft: "Base10",
  itemHeight: 27,
  leftWidth: 100,
  leftItems: Array(100).fill().map((_, i)=>i),
  leftSideComponent: 'left-row',
  rightItems: Array(100).fill().map((_, i)=> {
    return { a: i.toString(2), b: i.toString(16), c: i.toString(24), d: i.toString(36) }
  }),
  rightSideComponent: 'right-row',
  headerComponent: 'header-row',

  leftOptions: { l: "L", m: "M" },
  rightOptions: { r: "R", s: "S" },
});