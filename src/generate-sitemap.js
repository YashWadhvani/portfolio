const SitemapGenerator = require('sitemap-generator');

// Create generator
const generator = SitemapGenerator('http://example.com', {
  stripQuerystring: false,  // Include or exclude query strings in URLs
});

// Register event listeners
generator.on('done', () => {
  console.log('Sitemap generated successfully!');
});

// Start the generator
generator.start();
