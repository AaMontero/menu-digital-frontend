import { bootstrapApplication } from '@angular/platform-browser';
import { MenuComponent } from './app/views/main-page/pages/menu/menu.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(MenuComponent, config);

export default bootstrap;
