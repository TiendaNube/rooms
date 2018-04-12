# Meeting Room Display

This is a side project we built at Tienda Nube, based on [Aerolab](https://aerolab.co) project.

## Setup & Config

This is the most complicated step, as you are going to need to add two JSON files to make things work: A Google Credentials File, and a list of Meeting Rooms (also known as Resources in Google Calendar).

### Google Credentials

Go to the [Google Developer Console](https://console.developers.google.com/) and create a new Project. After that's done, you need to do a few more things:

* From the Library menu, you need to **Enable the Google Calendar API** (use the search if it's not in the popular list)
* From the Credentials menu, **Create a Service Account**, and select JSON as the key type. Save this file as you'll need it in a while.
* Take note of the **Service Account ID** as well (it looks like accountname@(...).iam.gserviceaccount.com)
* Rename the JSON key file to **rooms-client.json** and place it in the root of the project.

### Configure the supported Meeting Rooms

Go to [Google Calendar](https://calendar.google.com) and click edit on each meeting room calendar. For each one of them do the following:

* On the Calendar Details tab, **Take note of the Calendar ID** (it looks like domain_123@resource.calendar.google.com).
* Under the Share this Calendar, **Share it with the Service Account ID** (add accountname@(...).iam.gserviceaccount.com to the calendar and give it full access)

After you've done that, you need to **Create a rooms.json file** in the root of the project detailing all the enabled rooms, their names and Calendar IDs, using a slug as the key. It should look like this:

```json
{
    "sala-1": {"name": "Sala 01", "id": "domain_123@resource.calendar.google.com"},
    "sala-creativa": {"name": "Sala creativa", "id": "domain_1234@resource.calendar.google.com"}
}
```


## Install the app

- `npm install` from the root of the project
- `npm run start` starts the server with (in one terminal)

### Install nodemon

Nodemon executes a file and keeps it updated. If you modified the file, it will automatically be updated by nodemon. To use it, run:

- `npm install -g nodemon` to install

Insise our package.json we have some like this:

```json
"scripts": {
  "dev": "webpack -w",
  "server": "nodemon server.js",
}
```

## Deploy on local environment

Then, you've:

- `sudo npm run dev` to start webpack
- `sudo npm run server` to start our app

Open a browser on **http://localhost/sala-1** (for example) (You can access to any room by replacing "sala-1" with the proper room key, like *sala-3* or *sala-creativa*). You should be able to see the current status of the room and book it.


## Access on prod environment


## Debugging

### Redux

To evaluate the progress of the application's state, it's best to use the redux tools.

We use [Redux Dev Tools](https://github.com/zalmoxisus/redux-devtools-extension#installation)

### React

For React we use [React Dev Tools][https://github.com/facebook/react-devtools]


## Troubleshooting

### Error: Cannot find module

Make sure that you run `npm install -s`


## License

MIT.
