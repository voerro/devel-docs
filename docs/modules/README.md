# Modules

## What Are Modules?

Modules are a way to better structure your projects. A module is basically a reusable Laravel component that is a part of your project (unlike Laravel packages, which are 3rd party dependencies). Each module is like a Laravel project in itself - open any of the default modules and you will see a familiar folder structure.

The modularity was achieved with the help of the [nWidart/laravel-modules](https://github.com/nWidart/laravel-modules) package, which was modified to the needs of Devel and included as a part of the core (not as a composer package).

## Creating Modules

To create a new module, run the following command:

```bash
php artisan module:make ModuleName
```

By default the displayed module name will be "ModuleName" (or whatever you pass as the module name). You can specify a custom name at generation:

```bash
php artisan module:make ModuleName --name="My Custom Module Name"
```

This is what gets generated with a module by default:
- A config file at `Config/config.php`
- A seeder class for the module's permissions and settings at `Database/Seeders/SettingsSeeder.php`
- A controller to edit the settings in the dashboard at `Http/Controller/SettingsController.php`
- The module's main service provider at `Providers/ModuleNameServiceProvider`
- The module's route service provider at `Providers/RouteServiceProvider`
- The `Resources` folder with a single view `Resources/views/dashboard/settings/edit.blade.php`
- Three routes files at the `Routes` folder: `api.php`, `dashboard.php`, `public.php`
- A `composer.json` file for your module in case you need any 3rd-party PHP dependencies or you plan to distribute your module
- A `module.json` file which contains some metadata about the module

## Module Configuration

The `module.json` files contains some technical (or internal) details about your module.
- `description` will be displayed on the Manage Modules page of the dashboard.
- `order` defines the module's loading order.
- `requires` - the list of modules your module depends on.
- `buildNpm` - set to `true` if your project is going to have frontend assets built with `npm`.

The `Config/config.php` is going to be used by Devel and you when developing your module.
- `name` should correspond to the module's `name` from `module.json`.
- `display_name` - will be displayed in the dashboard's sidebar and the module's dashboard pages
- `slug` - will be used in the dashboard as your module's routes prefix

## Installing Modules

Your new module won't be listed and enabled by default. The same is true for when you download an existing module. To install a module, run the following command:

```bash
php artisan devel:module:install ModuleName
```

This is what this command does internally (in the correct order):
- Installs PHP dependencies for the module with `composer install`
- Runs migrations for the module
- Seeds the module's default data to the database
- Installs the NPM dependencies with `npm install` and builds the assets with `npm run production` (if it is enabled in the module)
- Published the module's config file
- Enables the module

If you're in the active development stage, you can run any of those command manually at any time.

## Enabling & Disabling Modules

Modules can be disabled in the admin dashboard. By default only root users have the permission to do so (including the default root user).

You can also enable and disable modules via the terminal. This is the only way to disable the `DevelDashboard` module in case you want to turn the admin dashboard off.

```bash
php artisan module:enable ModuleName
php artisan module:disable ModuleName
```

Don't ever disable the `Main` module, unless you really know what you're doing.

## Developing Modules

The process of developing modules is pretty much the same as the process of developing a typical Laravel app. The only difference is that with modules it's you've got a bunch of small Laravel projects in one app. Any additional instructions are unnecesary.

There is a bunch of additional `artisan` commands to operate upon modules:
- `module:make-command [command-name] [module-name]` - create a new artisan/console command for the specified module
- `module:make-controller [controller-name] [module-name]` - create a new controller for the specified module
- `module:make-crud [full-model-class-name] [module-name]` - generate CRUD for the specified model inside the specified module
- `module:make-event [event-name] [module-name]` - create a new event for the specified module
- `module:make-factory [factory-name] [module-name]` - create a new factory for the specified module
- `module:make-listener [listener-name] [module-name]` - create a new listener for the specified module
- `module:make-mail [mail-name] [module-name]` - create a new mail for the specified module
- `module:make-middleware [middleware-name] [module-name]` - create a new middleware for the specified module
- `module:make-migration [migration-name] [module-name]` - create a new migration for the specified module
- `module:make-model [model-name] [module-name]` - create a new model for the specified module
- `module:make-notification [notification-name] [module-name]` - create a new notification for the specified module
- `module:make-policy [policy-name] [module-name]` - create a new policy for the specified module
- `module:make-provider [provider-name] [module-name]` - create a new service provider for the specified module
- `module:make-request [request-name] [module-name]` - create a new form request for the specified module
- `module:make-request [request-name] [module-name]` - create a new request for the specified module
- `module:make-resource [resource-name] [module-name]` - create a new resource for the specified module
- `module:make-rule [rule-name] [module-name]` - create a new rule for the specified module
- `module:make-seed [seed-name] [module-name]` - create a new seed for the specified module
- `module:make-test [test-name] [module-name]` - create a new test for the specified module
- `module:migrate [module-name]` - run migrations for the specified module
- `module:migrate-refresh [module-name]` - refresh migrations for the specified module
- `module:migrate-reset [module-name]` - reset migrations for the specified module
- `module:migrate-rollback [module-name]` - rollback migrations for the specified module
- `module:migrate-status [module-name]` - get migrations status for the specified module
- `module:publish [module-name]` - pulish all the specified module's publishables
- `module:publish-config [module-name]` - pulish the specified module's config
- `module:publish-migration [module-name]` - pulish the specified module's migration (**CURRENTLY NOT GUARANTEED TO WORK**)
- `module:publish-translation [module-name]` - pulish the specified module's translation (**CURRENTLY NOT GUARANTEED TO WORK**)
- `module:seed [module-name]` - seed the specified module

**Note:** the standard `php artisan migrate` command also migrates all the enabled modules.

Keep reading to learn about all the Devel utilities that will make your development process faster and more enjoyable.