import angular from 'angular';

//Global dependencies
import 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import '../index.scss';

// modules
import uiRouter from 'angular-ui-router';

let app = angular.module('app-base', [
  uiRouter,
]);


//Conf
let appConfig = ($urlRouterProvider) => {
  $urlRouterProvider.otherwise(() => {
    return '/';
  });
};

let appRun = () => {

};

app.config(appConfig).run(appRun);


//Components
import appComponent from './component';
appComponent(app);

//Pages
import pages from '../pages';
pages(app);


export default app;
