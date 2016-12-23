import Ember from 'ember';

export default Ember.Controller.extend({
  itemHeight: 27,
  leftWidth: 100,

  leftHeaderComponent: "left-header-row",
  leftItems: Array(100).fill().map((_, i)=>i),

  rightItems: Array(100).fill().map((_, i)=> {
    return { a: i.toString(2), b: i.toString(16), c: i.toString(24), d: i.toString(36) };
  }),
  rightHeaderComponent: 'right-header-row',
  rightSideComponent: 'right-row',

  leftOptions: { l: "L", m: "M" },
  rightOptions: { r: "R", s: "S" },
});
