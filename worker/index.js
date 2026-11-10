// The Worker behind admonk.net. Static pages come from dist/ (the ASSETS binding);
// this file only handles the enquiry form endpoint and the admin CRM.
import { handleEnquiry } from './enquiry.js';
import { handleAdmin } from './admin.js';

export default {
  async fetch(request, env, ctx) {
    const { pathname } = new URL(request.url);
    try {
      if (pathname === '/api/enquiry' && request.method === 'POST') return await handleEnquiry(request, env, ctx);
      if (pathname === '/admin' || pathname.startsWith('/admin/')) return await handleAdmin(request, env);
      return env.ASSETS.fetch(request);
    } catch (err) {
      console.error(err);
      return new Response('Something went wrong', { status: 500 });
    }
  },
};
