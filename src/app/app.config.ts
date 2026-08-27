import { ApplicationConfig } from '@angular/core';

import { provideToastr } from '@iqx-limited/ngx-toastr';

export const appConfig: ApplicationConfig = {
  providers: [    
    provideToastr({
      timeOut: 3000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }),    
  ],
};
