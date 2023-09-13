# Business Card Web Application with REST API

![BizCard](/client/public/assets/images/BizCard.png)

This is a web application developed using React on the client-side and Node.js on the server-side. The application is designed to display business cards, with the option to edit and delete them. Users can also view their favorite cards and more. The UI is primarily developed using Material UI, and the application allows changing the lighting from black to colored and vice versa, making it more user-friendly and customizable.

## Technologies

#### The following technologies have been used in this project:

- Axios version 1.3.2
- React-router-dom version 6.7.0
- Material UI version 5.11
- jwt-decode version 3.1.2
- joi version 17.8.1

# Links

[My repository on Github](https://github.com/HodayaAngela)

[My linkedin](https://www.linkedin.com/in/hodaya-angela-d-a24156178/)

## installations

To run this project, install it locally using npm:

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

#### Use the following credentials to login:

- Email : regular@gmail.com
- Email : business@gmail.com
- Email : admin@gmail.com

- Password : Aa1234!

## User Privileges

### The application provides different privileges to users based on their role:

#### Non-registered users:

- Cannot view favorite cards, my cards, and sandbox.

#### Regular users:

- Cannot view my cards and sandbox.
- Cannot delete cards.

#### Business users:

- Cannot view sandbox.
- Can delete their own cards.

#### Admin users:

- Cannot view CRM card.
- Can delete any card.
- Can create and edit only the cards created by them.
