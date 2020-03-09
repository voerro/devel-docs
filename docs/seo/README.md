# SEO

Devel gives you useful tools for setting HTML meta tags for your pages.

## Setting Meta Tags in Controllers

This is described in the [Devel Controller](/controller/) section.

## Setting Meta Tags Elsewhere

To set HTML meta tags for the current page, you can use the `Devel\Core\Services\MetaTags` service.

To set a single tag a time, use the `setTag()` static method:

```php
MetaTags::setTag('title', 'Homepage');
```

To set multiple tags at a time, use the `setTags()` static method:

```php
MetaTags::setTags([
    'title' => 'Homepage',
    'description' => 'This is the homepage.',
]);
```

You can set the same meta tag multiple times. In this case all the values will be merged together with a ` - ` separator. This is useful, for example, when setting the page title. You can set the main title in the controller's constructor and the specific page title in a controller method. For example:

```php
MetaTags::setTag('title', 'News');
MetaTags::setTag('title', 'What happend? Let\'s find out!');
```

As a result, the page's title will be `What happend? Let\'s find out! - News`.

## Adding Meta Tags on Pages

For meta tags to be included into your actual pages, you need to include the `core::seo._metatags` partial inside the `<head>` of your views like this:

```html
<head>
    <!-- ... other content ... -->
    
    @include('core::seo._metatags')

    <!-- ... other content ... -->
</head>
```

It is already included in the `Modules/Main/Resources/views/public/layout.blade.php` layout and the `DevelDashboard` layouts.

## Supported Meta Tags

The supported tags are:
- `title` -> `<title>`
- `description` -> `<meta name="description">`
- `keywords` -> `<meta name="keywords">`