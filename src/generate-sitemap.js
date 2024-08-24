const SitemapGenerator = require('sitemap-generator');
const fs = require('fs');
const { create } = require('xmlbuilder2');

// Create the generator
const generator = SitemapGenerator('https://yashwadhvani.vercel.app/', {
  stripQuerystring: false,  // Include query strings
  filepath: './sitemap.xml',  // Specify the output file path
});

// Register the 'done' event listener to modify the generated sitemap
generator.on('done', () => {
  console.log('Sitemap generated, adding optional tags and custom routes...');

  // Read the generated sitemap.xml file
  const sitemapData = fs.readFileSync('./sitemap.xml', 'utf8');

  // Parse and modify the XML
  const xmlDoc = create(sitemapData);

  // Add optional tags to each <url> element
  xmlDoc.root().find((element) => {
    if (element.node.nodeName === 'url') {
      element.ele('lastmod').txt(new Date().toISOString().split('T')[0]);
      element.ele('changefreq').txt('monthly');
      element.ele('priority').txt('0.8');
    }
  });

  // Manually add specific routes with optional tags
  const routes = [
    { loc: 'https://yashwadhvani.vercel.app/about', priority: '0.8' },
    { loc: 'https://yashwadhvani.vercel.app/projects', priority: '0.9' },
    { loc: 'https://yashwadhvani.vercel.app/contact', priority: '0.7' }
  ];

  routes.forEach(route => {
    const url = xmlDoc.root().ele('url');
    url.ele('loc').txt(route.loc);
    url.ele('lastmod').txt(new Date().toISOString().split('T')[0]);
    url.ele('changefreq').txt('monthly');
    url.ele('priority').txt(route.priority);
  });

  // Write the modified XML back to the file
  fs.writeFileSync('../public/sitemap.xml', xmlDoc.end({ prettyPrint: true }), 'utf8');

  console.log('Optional tags and custom routes added to sitemap!');
});

// Start the generator
generator.start();
