# Web application with Rest Api

React Project - client side with server side
Designed primarily using Material Ui

## Technologies

- Axios version 1.3.2
- React-router-dom version 6.7.0
- material UI version 5.11
- jwt-decode version 3.1.2
- joi version 17.8.1

# Links

[My repository on Github](https://github.com/HodayaAngela)

## installations

To run this project, install it locally using npm

### client side :

```
cd client
npm i
nmp start
```

### server side :

```
 cd server
 npm i
 npm run dev

```

### Demo Login:

- Email : regular@gmail.com
- Email : business@gmail.com
- Email : admin@gmail.com

- Password : Aa1234!

## Display of the application according to user type:

#### NON:

- not displayed: Fav Cards, My Cards & Sandbox

#### Regular:

- not displayed: My Cards & Sandbox
- Can't delete Cards

#### Business:

- not displayed: Fav Cards, Sandbox
- Can delete his Cards

#### Admin:

- not displayed: Fav Cards
- Can delete any Card
