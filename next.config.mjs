/** @type {import('next').NextConfig} */
const nextConfig = {images: {
  domains: ['a0.muscache.com', 'www.gist.github.com', 'links.papareact.com', 'www.jsonkeeper.com', 'www.mapbox.com', 'pixabay.com', 'cdn.statically.io', 'images.unsplash.com' ]
}, 
  env: {
    mapbox_key:'pk.eyJ1IjoiaW5ibG9jayIsImEiOiJjbHg1dXkxcGQwN2tyMmtvanlzbGlnYmw4In0.V5xmq1KpF3OBTk0McffRDA'
  }
};

export default nextConfig;
