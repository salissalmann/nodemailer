//create a express server

const express = require('express');

const app = express();

//node-mailer setup
const nodemailer = require('nodemailer');

//body-parser setup
const bodyParser = require('body-parser');

//allow cross-origin requests

const cors = require('cors');

//allow cross-origin requests
app.use(cors());

//body-parser middleware


app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/email', (req, res) => {
    console.log(req.body);

    const { subject , firstname, lastname, email, message } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'salisbinsalman0@gmail.com',
        pass: "tfde ggel qpus eanu",
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: '14si2o@proton.me',
      subject: subject,
      text: `First name: ${firstname}\nLast name: ${lastname}\nEmail: ${email}\nMessage: ${message}`,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, response) => {
      if (error) {
        console.log(error);
        res.status(200).send({ message: 'Email not sent' , status: 'failed' });
      } else {
        console.log('Email sent: ' + response.response);
        res.status(200).send({ message: 'Email sent' , status: 'success' });
      }
      transporter.close();
    });



});

app.listen(3002, () => {
    console.log('Server is running on port 3002');
})


module.exports = app;n