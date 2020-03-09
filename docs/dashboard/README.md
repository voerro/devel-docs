# Devel Dashboard

Devel comes with a default `DevelDashboard` module which provides an extensible admin dashboard for your site.

## Accessing the Dashboard

By default the dashboard is accessible at `/dashboard`. This can be changed inside the `/config/develdashboard.php` config file.

There's a default `root` user that has access to the dashboard:
- login: `root@example.com`
- password: `qwerty`

These default credentials can be edited in the `/config/devel.php` config file under `root`, but only before you have run `php artisan devel:install`. Your other option is to change the credentials via the dashboard.

## Extending the Dashboard

Each Devel module can extend the DevelDashboard adding new pages to it. Let's learn how the whole process is done.

### Routes

All the dashboard routes are supposed to be put in the `Routes/dashboard.php` file. Let's take a look at the default settings route that is generated with a new module:

```php
Route::get('/settings', [
    'as' => 'modulename.settings.edit',
    'uses' => 'SettingsController@edit',
    'dashboardSidebar' => 'Custom Module Name->Settings',
    'permissions' => 'modulename.edit_settings',
]);
```

You will notice a couple of unusual properties.

- `dashboardSidebar`: adds a sidebar menu entry for the route. The menu has a tree structure with levels being separated by `->`. The depth is not restricted. The first level is the category and should always be present.
- `permissions`: protectes the route with specific permissions. Discussed in more detail in a different section.

### Controllers

Your controllers don't need to contain anything special in order for them to work in the dashboard.

### Views

Your views should extend the DevelDashboard layout. A typical dashboard view should look like this:

```html
@extends('develdashboard::layout')

@section('content')
    <header class="section-header">
        <div class="title">
            <!-- PUT THE PAGE TITLE HERE -->
        </div>
    </header>

    <div class="section-body">
        <!-- PUT THE PAGE MAIN CONTENT HERE -->
    </div>
@endsection
```

## CRUD & CRUD Generation

This is where things get interesting! Devel comes with a dashboard CRUD generator. It generates both backend and frontend scaffolding for a Model.

To generate CRUD for an existing model and module, run `php artisan module:make-crud [full-model-class-name] [module-name]`.

To generate CRUD for an existing model upon module generation, simply add a `--module=` argument with the full model class name when calling `php artisan module:make`.

To try things out, create a new dummy module which purpose will be to CRUD the site users:

```bash
php artisan module:make DummyUsers --name='Dummy Users' --model='Devel\Core\Entities\Auth\User'
```

Then install the module:

```bash
php artisan devel:module:install DummyUsers
```

Now we can examine the generated files.

### The Backend

The CRUD controller for users can be found at `Modules/DummyUsers/Http/Controllers/UsersController`.

The first thing you'll notice at the top is that it uses the `Modules\DummyUsers\Http\Controllers\Crud` trait. Feel free to check that trait sometime, but right now let's move to the `__construct` method. That is where a lot of the CRUD setup happens.

First we're setting the `<title>` meta tag value for all the pages of the controller. This is covered in a different section.

Next, we set the CRUD model with the `$this->setModel()` method. Next, the FormRequest class with the `$this->setRequest()` method.

#### The Datatable

Next you'll see the `$this->setDatatable()` method. It accepts to arrays. In the first array you can specify which model fields you want to be displayed in the datatable on the `index` page.

Example:

```php
'name' => [
    'name' => 'Name',
    'sortable' => true,
],
```

- The outer `name` key is the name of the CRUD model's field
- The inner `name` is the table column name
- The `sortable` boolean determines whether the column is sortable

In the second array you can specify the available actions for each row in the datatable:

```php
'action-type' => ['action-route-name', 'optional-primary-key-placeholder'],
```

Available action types: `delete`, `create`, `edit`.

Example:

```php
'delete' => ['dashboard.dummyusers.users.destroy', ':id'],
```

This action will delete a user. The `'dashboard.dummyusers.users.destroy'` route requires a user id as a parameter, however we're providing a generic endpoint here so we need to specify a placeholder for now. The `users` table primary key is `id` so we put `':id'`.

The data that we set here will be passed to the datatable Vue component in the `index` view file.

#### The Form

The next call is `$this->setForm()`. This sets a form for the `create` and `edit` pages. It accepts an array of form tabs, where each tab array is an array of form tab fields. So, the general structure is as follows:

```php
$this->setForm([
    'First Tab Name' => [
        [
            'type' => 'text',   // field type
            'name' => 'name',   // field name
            'label' => 'Name',  // field label
            'attrs' => [
                // Some field types require additional attributes
            ],
        ],
        // ... more fields ...
    ],
    // ... more tabs ...
]);
```

Available field types and their required attributes:
- `text` - a simple `<input type="text">` input
- `email` - a simple `<input type="email">` input
- `password` - a simple `<input type="password">` input
- `hidden` - a simple `<input type="hidden">` input
- `checkbox` - a checkbox
- `switch` - a switch-looking checkbox
- `select` - a select. Additional attrs:
    - `idField` - the name of the field to be used for the select options value
    - `textField` - the name of the field to be used for the select options text
    - `multipleChoice` - boolean, determines whether the select is a multiple choice select
- `link` - a simple `<a>` link element. Additional attrs:
    - `url` - the `<a>`'s `href` value.

The data that we set here will be passed to the form Vue component in the `_form` view partial file.

#### The Action Methods

The controller has 3 actions methods: `index`, `create` and `edit`. We won't go into details with these methods since they are pretty straightforward. You will notice certain relations were made available for editing automatically.

The `store`, `update` and `destroy` are hidden in the `Crud` trait.

### The Frontend

Foru corresponding views are generated with the controller: `index.blade.php`, `create.blade.php`, `edit.blade.php` and `_form.blade.php`. In our case they will be located at `/Resources/views/dashboard/users`. They are very simple and self-explonatory.

Inside you will see Vue components to which we simply pass the data comming from the controller. All that data doesn't have to come from the controller and can be passed manually inside the views.

Moreover, more custom forms can be built semi-manually. To have an idea about how to customize the frontend, please take a look at the views of the default `DevelUsers` module.