# Devel Seeder

All the seeders in Devel extend the `Devel\Core\Database\Seeders\Seeder` class. It is a default Laravel seeder which provides a couple of additional methods to *unseed* (remove the seeeded) data.

- [Main Seeder Class](#main-seeder-class)
- [Individual Seeder Classes](#individual-seeder-classes)
- [Tracking Seeded Data](#tracking-seeded-data)

## Main Seeder Class

Each module has a main seeder class which calls all the other seeders. It is usually called as `ModuleNameDatabaseSeeder`, for exmaple `DevelUserRolesDatabaseSeeder`. It contains the default Laravel `run()` method and the new `revert()` method:

```php    
/**
 * Revert the database seeds.
 *
 * @return void
 */
public function revert()
{
    // $this->uncall(OthersTableSeeder::class);
}
```

Just like you call `$this->call()` for each of your seeders inside the `run()` method, you need to call `$this->uncall()` inside the `revert()` method to register your seeders.

## Individual Seeder Classes

Individual seeder classes also come with the new `revert()` method.

```php
/**
 * Revert the database seeds.
 *
 * @return void
 */
public function revert()
{
    //
}
```

In this case, think about this method as the `down()` method of a migration. Here is where you can manually delete all the data your seeder class creates.

Naturally, the first question that pops into your mind is "How do I keep track of which data my seeder creates?".

## Tracking Seeded Data

### Permissions

Your module will probably seed custom permissions to determine who can edit the module's settings and CRUD module's entities. This data is stored in the `user_permissions` DB table, which comes with an optional `module` column. Store your module's name in that column along with each permission and you'll be able to delete all your module's permissions specifically.

To see an example, create a new empty module and check it's `SettingsSeeder`.

### Settings

Settings are stored inside the `settings` table. A setting is identified by an autoincremented numeric `id`, a `group` and a `key`. The `group` name can be set to uniquely identify your module, if you decide so.

### The `_seeds` Table

There's an additional `_seeds` DB table where you can manually store references to all the data that your seed creates. The essential table columns are:
- `module` - your module name
- `model` - the full classname of an object
- `object_id` - the unique identifier of an object

This table looks like a morph table and simply helps you identify the data that you need to delete inside the `revert()` method of your seeder class. The corresponding model class is `Devel\Core\Entities\Seed`.