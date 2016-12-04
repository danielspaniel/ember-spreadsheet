import Ember from 'ember';

export default Ember.Controller.extend({
   leftItems: Array(100).fill().map((_,i)=>i.toString(36)),
   leftSideComponent: 'left-row',
   rightItems: Array(100).fill().map((_,i)=>i),
   rightSideComponent: 'right-row',
   
   leftOptions: {l:"L", m: "M"},
   rightOptions: {r:"R", s: "S"},
});