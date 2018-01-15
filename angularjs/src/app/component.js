class ControllerClass {
  constructor() {
  }
}

let conf = () => {
  return {
      restrict: 'E',
      template: '<ui-view></ui-view>',
      controller: ControllerClass,
      controllerAs: '$ctrl',
      scope: {},
      bindToController: true
  };
};

export default (app) => {
  app.directive('appComponent', conf);
};
