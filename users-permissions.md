# Users & Permissions

Devel comes with a user roles and permissions backend. The default `User` class is located in the `Devel\Core\Entities\Auth` namespace. You will also find a `Role` and a `Permission` class there.

## Relations

Each user can have multiple roles. Besides the permissions a user gets via the assigned roles, each user can be granted multiple personal permissions.

The `User` class relations are:
- `->roles` - get the list of a user's roles
- `->permissions` - get the list of a user's personal permissions

The `Role` class relations are:
- `->permissions` - get the list of a permissions that the role grants

## Checking for Permissions

You can call the `hasPermissions()` method on both `User` and `Role` classes. The accepted arguments are:
- `'single_permission_name'` - a string, a permission name
- `['permission_one', 'permission_two']` - an array of permission names. Each permission will have to be granted for the method to return `true` in this case
- `'(permission_one || permission_two) && permission_three'` - a string, a logical expression with permission names in place of variables

All the available methods:
- `hasPermissions()` - checks whether a user has a permission(s) granted to them via a role or directly. In case of roles it simply checks if a role has a permission granted to it.
- `hasPersonalPermission()` - checks whether a user has a personal permission. Accepts a single permission name (string) as the only argument.
- `hasPermissionViaRole()` - checks whether a user has a permission granted via any role assigned to them. Accepts a single permission name (string) as the only argument.

## Route Permissions

Both dashboard and public routes can be protected by permissions. To do that you need to set the `permissions` argument when declaring a root. For example:

```php
Route::get('/settings', [
    'as' => 'site.settings.edit',
    'uses' => 'SettingsController@edit',
    'permissions' => 'site.edit_settings',
]);
```

The values you can pass to the `permissions` argument are the same kind of values you can pass to the `hasPermissions()` method.