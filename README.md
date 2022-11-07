# image processing API

API used fot image processing like resize and manipulate and other stuff related to image manipulation.

## use API

1. install all dependencies

```sh
npm install
```

2. Start the API

```sh
npm run start
```

## How to use resizing endpoint

you can use this endpoint to call the api:

localhost:5000/api/resize?img={IMAGE_NAME}&width={WIDTH}&height={HEIGHT}

## which types of tools that used in app

- Typescript: to reduce types error and make the code more robust
- Nodejs and expressJS: runtime and framework that used in make server and restful API
- Jasmine: for testing
- Prettier and eslint: for code formatting
- Libraries: sharp used for image processing purpose

## What expected from this API

- passing an image as argument or query beside it's width and height to resizing image and make it smaller in size and take a small space on our server also can use this api as a placeholder for your photo that reduce file transferred to your browser and reduce time of loading page and increase performance
- there are som incoming feature like add a front-end for this app with more feature like crop or manipulate colors or images and more.
