const sgMail = require("@sendgrid/mail");

const sendgridAPIKEY = process.env.SENDGRID_API_KEY;

sgMail.seApiKey(sendgridAPIKEY);

const sendWelcomeEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "xyz@abc.io",
    subject: "Thanks for joining in..",
    text: `Welcome to the app, ${name}. Let me know how you get along with the app.`,
  });
};

const sendCancellationEmail = (email, name) => {
  sgMail.send({
    to: email,
    from: "xyz@abc.io",
    subject: "Sorry to see you go..",
    text: `Goodbye, ${name}. I hope to see you back sometime soon.`,
  });
};
module.exports = {
  sendWelcomeEmail,
  sendCancellationEmail,
};

// sgMail.send({
//   to: "...",s
//   from: "...",
//   subject: "...",
//   text: "...",
// });
