# Gettings Started

## Installation

- Run `composer create-project --remove-vcs voerro/devel your-project-name dev-master` (`your-project-name` is a folder name to install the project to)
- Navigate to your project folder
- Edit the DB settings in `.env`
- Run `php artisan devel:install`
- Devel is ready to use. To access the dashboard go to /dashboard and log in under `root@example.com` / `qwerty`. These credentials can be changed on the dashboard.

## Project Structure

You will notice that the project folder structure is somewhat different from that of a standard Laravel project.

Some of the core Laravel folders were left intact: `bootstrap`, `config`, `public`, `resources/lang` and `storage`.

The Devel core code is under the `devel` folder.

`Modules` is where all the modules are and where you're supposed to keep all your custom code. You will see that the folder already contains some modules:
- The `Main` module serves the website's home page. Also, this is the place where all the default Laravel stuff from the `app` folder was moved to. You can keep all your custom code inside this module or split it into multiple modules.
- The `DevelDashboard` module provides an admin dashboard at `/dashboard` (by default).
- The `DevelUserRoles` and `DevelUsers` modules extend the dashboard and provide the CRUD functionality for user roles and users respectively.