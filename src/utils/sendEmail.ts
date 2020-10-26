import sgMail from '@sendgrid/mail';

export const sendEmail = async (
  url: string,
  email: string,
  subject: string,
) => {
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    from: process.env.email,
    to: email,
    subject: `${subject}`,
    html: `<a href="${url}">${url}</a>`,
  };
  try {
    await sgMail.send(msg);
  } catch (error) {
    return;
  }
};
