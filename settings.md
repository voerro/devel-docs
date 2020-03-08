# Settings

Devel comes with a simple key-value database storage for storing various site and module settings. The `Settings` class is located in the `Devel\Core\Entities` namespace.

## Reading Settings

There are two ways to read a setting: directly via the `Settigns` class or with the `settings()` helper.

```php
Setting::read('key', 'default value');

setting('key', 'default value');
```

The `key` consists of a group name and a setting name. The two are separated with a dash (`-`). For example, if we needed to get a setting from the group `site` with the name `name`, it would look like this:

```php
Setting::read('site-name', 'Devel');

setting('site-name', 'Devel');
```

You don't have to provide the default value. In that case, if the setting doesn't exist, the method will return `null`.

## Setting Settings

Setting a setting value is as simple as reading it:

```php
Settings::set('key', 'value');
```

Follow the same format for the `key` as for reading settings, for example:

```php
Settings::set('site-name', 'My Amazing Site');
```

If the setting with the provided key doesn't exist in the database - it will be created. However, the display name will be generated based on the key, which might not be what you would like it to be. If you want full control make sure to create the setting beforehand via `Setting::create()` (`Setting` is just a simple Laravel model).

## Settings & Modules

You've probably noticed that when you generate a new module, a corresponding `SettingsController` and a `SettingsSeeder` get generated.

If you want to add custom settings for you module, open `SettingsSeeder` and populate the `protected $settings` array. Don't forget to seed the module afterwards with `php artisan module:seed ModuleName`.

If you want those settings to be editable in the dashboard, go to `SettingsController` and populate the `protected $groups` arrays like this:

```php
protected $groups = [
    'settings-group-one' => [
        'setting-key-one',
        'setting-key-two',
        // ... more keys ...
    ],
    // ... more setting groups ...
];
```

The setting keys here should not include the group name!

If you want to disable the `Settings` page for your module, simply comment out the two routes inside your module's `Routes/dashboard.php` file.