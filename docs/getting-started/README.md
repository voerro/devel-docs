# Gettings Started

## Installation

You can easily add Devel to a new or an existing project. Just follow these steps:

- If you have a new Laravel project - set it up like you normally would, run the migrations, seed the data
- Run `composer require devel/devel`
- Open your User model, extend it from `\Devel\Models\Auth\User` instead of the default `Authenticatable` class
- Update the `composer.json`'s autoload section, add the `Modules` namespace:
```json
{
    "autoload": {
        "psr-4": {
            "App\\": "app/",
            "Modules\\": "Modules/"
        }
    }
}
```
- Run `composer dump-autoload`
- Run `php artisan devel:install`

### Testing

If you want to run PHPUnit tests for your modules, add the `Modules` paths to your `phpunit.xml` file:

```xml
<testsuite name="Unit">
    <directory suffix="Test.php">./tests/Unit</directory>
    <directory suffix="Test.php">./Modules/**/Tests/Unit</directory>
</testsuite>

<testsuite name="Feature">
    <directory suffix="Test.php">./tests/Feature</directory>
    <directory suffix="Test.php">./Modules/**/Tests/Feature</directory>
</testsuite>
```

## Default Modules

You will notice the new Modules folder with 3 default modules pre-installed. One of the modules is the dashboard module (`DevelDashboard`), the other two add CRUD for users and user roles to the dashboard respectively (`DevelUsers` & `DevelUserRoles`).

The default modules are served as modules for a few reasons. Don't edit them directly as your changes will be lost after an update. The `DevelDashboard` module is extensible, and if you need to edit the `DevelUsers` or the `DevelUserRoles` module - it's easier to create a new module based off of the original one.

If you don't need the `DevelUsers` or the `DevelUserRoles` module, you can disable them in the dasboard or delete them via an artisan command alltogeter.