import service from './service';
import page from './page';

export default (app) => {
  service(app);
  page(app);
};
