const dotenv = require('dotenv').config();
const express = require('express');
const path = require("path");
let nodemailer = require('nodemailer');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// GET Route for homepage
app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/index.html'))
});

// POST request for email
app.post('/', (request, response) => {
    console.log(request.body);

    const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        port: 587,
        host: process.env.HOST,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS
        }
      });
      
      const mailOptions = {
        from: process.env.USER,
        to: process.env.USER,
        subject: `${request.body.name} wants ${request.body.subject}`,
        html: `
        <h2>Hi from ${request.body.name}</h2>
        <p>${request.body.message}</p>
        <p>Reply to them at ${request.body.email}</p>
        `,
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          response.status(500).send("Email Failed to Send");
          console.log(error);
        } else {
          response.status(200).send("Email Sent");
          console.log('Email sent: ' + info.response);
        }
      });
});

// GET Route if user inputs anything else (put last)
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT} 🚀`)
});