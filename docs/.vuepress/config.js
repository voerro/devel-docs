module.exports = {
    title: 'Devel Documentation',
    description: '',
    dest: 'dist',
    base: '/en/projects/devel/',

    themeConfig: {
        nav: [
            { text: 'Home', link: '/' },
            { text: 'GitHub', link: 'https://github.com/voerro/devel' },
            { text: 'Live Demo', link: 'http://devel.voerro.com' },
        ],

        sidebarDepth: 3,
        sidebar: [
            ['', 'About Devel'],
            ['getting-started/', 'Getting Started'],
            ['modules/', 'Modules'],
            ['dashboard/', 'Dashboard'],
            ['users-roles-permissions/', 'Users, Roles & Permissions'],
            ['settings-storage/', 'Settings Storage'],
            ['controller/', 'Devel Controller'],
            ['model/', 'Devel Model'],
            ['seeder/', 'Devel Seeder'],
            ['seo/', 'SEO'],
        ],
    },

    plugins: [
        [
            '@vuepress/google-analytics',
            {
                'ga': '' // UA-00000000-0
            }
        ]
    ],
}