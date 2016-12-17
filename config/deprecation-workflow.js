window.deprecationWorkflow = window.deprecationWorkflow || {};
window.deprecationWorkflow.config = {
  workflow: [
    { handler: "silence", matchId: "ember-htmlbars.ember-handlebars-safestring" },
    { handler: "silence", matchId: "ember-views.did-init-attrs" }
  ]
};
