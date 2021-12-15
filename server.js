let dotenv = require('dotenv').config();
const express = require('express');
const path = require('path');
const sgMail = require('@sendgrid/mail')

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
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)

    /*const transporter = nodemailer.createTransport({
        service: process.env.SERVICE,
        port: process.env.PORTEMAIL,
        auth: {
          user: process.env.USER,
          pass: process.env.PASS,
        }
      });*/
      
      const mailOptions = {
        from: process.env.EMAIL,
        to: process.env.EMAIL,
        subject: `${request.body.name} wants ${request.body.subject}`,
        html: `
        <h2>Hi from ${request.body.name}</h2>
        <p>${request.body.message}</p>
        <p>Reply to them at ${request.body.email}</p>
        `,
      }

      sgMail
      .send(mailOptions)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })
    });
      
      /*transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
});*/

// GET Route if user inputs anything else (put last)
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname, '/public/index.html'))
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);