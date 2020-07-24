import nodemailer from 'nodemailer';

export const sendEmail = async (url: string, email: string) => {
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.email,
      pass: process.env.password,
    },
  });

  // send mail with defined transport object
  await transporter.sendMail({
    from: 'ITjobs@ITjobs.com', // sender address
    to: email, // list of receivers
    subject: 'Confirm', // Subject line
    html: `<a href="${url}">Confirm your email</b>`, // html body
  });
};
