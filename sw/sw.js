const CACHE_NAME = 'coda-dev-cache-v1';
const urlsToCache = [];

async function openCaches() {
  const cache = await caches.open(CACHE_NAME);
  console.log('Opened cache');
  await cache.addAll(urlsToCache);
}

self.addEventListener('install', async (event) => {
  console.log('Handling service worker install');
  // Perform install steps
  event.waitUntil(openCaches);
});

self.addEventListener('activate', async (_event) => {
		console.log('Handling service worker activate');
		// if (self.registration.navigationPreload) {
		//   // Enable navigation preloads!
		//   await self.registration.navigationPreload.enable();
		// }
		return self.clients.claim();
});

async function fetchUrl(request) {
		try {
				const response = await fetch(request);
				if (!response.ok) {
						// An HTTP error response code (40x, 50x) won't cause the fetch() promise to reject.
						// We need to explicitly throw an exception to trigger the catch() clause.
						throw Error(`response status ${response.status}`);
				}
				// If we got back a non-error HTTP response, return it to the page.
				return response;
		} catch (err) {
				console.warn('Constructing a fallback response, ' + 'due to an error while fetching the real response:', err);

				console.log('Just kidding...not really sure what to do here. Just re-throwing');
				throw err;

				// // For demo purposes, use a pared-down, static YouTube API response as fallback.
				// const fallbackResponse = {
				//   items: [
				//     {
				//       snippet: {title: 'Fallback Title 1'},
				//     },
				//     {
				//       snippet: {title: 'Fallback Title 2'},
				//     },
				//     {
				//       snippet: {title: 'Fallback Title 3'},
				//     },
				//   ],
				// };

				// // Construct the fallback response via an in-memory variable. In a real application,
				// // you might use something like `return fetch(FALLBACK_URL)` instead,
				// // to retrieve the fallback response via the network.
				// return new Response(JSON.stringify(fallbackResponse), {
				//   headers: {'Content-Type': 'application/json'},
				// });
		}
}

self.addEventListener('fetch', (event) => {
		console.log('HELLO!?');
		console.log('Handling fetch of', event.request.url);
		event.respondWith(fetchUrl(event.request));
});

