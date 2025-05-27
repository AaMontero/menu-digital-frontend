import { bootstrapApplication } from '@angular/platform-browser';
import { EnterprisesComponent } from './app/components/enterprises/enterprises.component';
import { config } from './app/app.config.server';

const bootstrap = () => bootstrapApplication(EnterprisesComponent, config);

export default bootstrap;
