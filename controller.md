# Devel Controller

All the controllers in Devel extend the `Devel\Core\Http\Controllers\Controller` controller. It is a default Laravel controller with the following additional traits:
- [SetsMetaTags](#setsmetatags-trait)

## SetsMetaTags Trait

This trait provides an additional method `$this->setMeta()` inside the controller. You can either provide a single tag or an array of tags with values:

```php
$this->setMeta('title', 'Homepage');
```

or

```php
$this->setMeta([
    'title' => 'Homepage',
    'description' => 'This is the homepage.',
]);
```

You can set the same meta tag multiple times. In this case all the values will be merged together with a ` - ` separator. This is useful, for example, when setting the page title. You can set the main title in the controller's constructor and the specific page title in a controller method. For example:

```php
public function __construct()
{
    $this->setMeta('title', 'News');
}

public function show(News $news)
{
    $this->setMeta('title', 'What happend? Let\'s find out!');
}
```

As a result, the `show()` action's page title will be `What happend? Let\'s find out! - News`.

Read more about meta tags in the [SEO](seo.md) section.