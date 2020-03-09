# Devel Model

All the models in Devel extend the `Devel\Core\Entities\Model` model. It is a default Laravel model with the following additional traits:
- [Sortable](#sortable-trait)
- [Searchable](#searchable-trait)
- [HasRelationships](#hasrelationships-trait)

## Sortable Trait

This trait adds a `sort()` scope. It accepts a single string parameter with the sort field and the sort direction:

```php
Model::sort('title|desc');
```

This feature is used by the `DevelDashboard` to sort the datatables by a column.

## Searchable Trait

This trait adds a `search()` scope. It accepts a search query and performs a simple `LIKE %query%` search. You shouldn't use the trait if you're using Laravel Scout.

```php
Model::search('some text');
```

For this scope to work, list the searchable fields for your model in a protected `$searchable` array:

```php
protected $searchable = [
    'name',
    'email',
];
```

This feature is used by the `DevelDashboard` to search among rows in the datatables.

## HasRelationships Trait

This trait provides an ability to get the list of all the relationships of a model. It is used internally when generating CRUD and has a single method `getRelationships()`.