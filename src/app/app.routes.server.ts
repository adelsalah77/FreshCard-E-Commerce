import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'shippingaddress/:id',
    renderMode: RenderMode.Client,
  },
  {
    path: 'productdetails/:id',
    renderMode: RenderMode.Client,
  },

  {
    path: '**',
    renderMode: RenderMode.Prerender,
  },
];
