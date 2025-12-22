import { defineConfig } from 'astro/config';
import DecapCMS from 'astro-decap-cms';

// https://astro.build/config
export default defineConfig({
  integrations: [
    DecapCMS({
      config: {
        backend: {
          name: 'git-gateway',
          branch: 'main',
        },
        media_folder: 'public/assets/blog',
        public_folder: '/assets/blog',
        collections: [
          {
            name: 'posts',
            label: 'Blog Posts',
            label_singular: 'Blog Post',
            folder: 'src/pages/posts',
            create: true,
            delete: true,
            fields: [
              { name: 'title', widget: 'string', label: 'Post Title' },
              {
                name: 'publishDate',
                widget: 'datetime',
                format: 'DD MMM YYYY',
                date_format: 'DD MMM YYYY',
                time_format: false,
                label: 'Publish Date',
              },
              { name: 'author', widget: 'string', label: 'Author Name', required: false },
              { name: 'authorURL', widget: 'string', label: 'Author URL', required: false },
              { name: 'description', widget: 'string', label: 'Description', required: false },
              { name: 'body', widget: 'markdown', label: 'Post Body' },
              {
                name: 'layout',
                widget: 'select',
                default: '../../layouts/BlogPost.astro',
                options: [
                  { label: 'Blog Post', value: '../../layouts/BlogPost.astro' },
                ],
              },
            ],
          },
        ],
      },
      previewStyles: ['/src/styles/blog.css'],
    }),
  ],

vite: {
  build: {
    rollupOptions: {
      external: [
        'decap-cms',
        'decap-cms-core',

        // All Decap CMS backends (we only use git-gateway)
        'decap-cms-backend-git-gateway',
        'decap-cms-backend-github',
        'decap-cms-backend-gitlab',
        'decap-cms-backend-bitbucket',
        'decap-cms-backend-azure',

        // React (Decap runtime-only)
        'react',
        'react-dom',
        'react-dom/client',

        // Node built-ins accidentally pulled in
        'path',
        'fs',
      ],
    },
  },
},
