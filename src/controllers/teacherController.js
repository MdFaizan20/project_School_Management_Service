const teacherModel = require("../models/teacherModel");
const nodemailer = require("nodemailer")
const PDFDocument = require('pdfkit');


module.exports = {
  createTeacher: async (req, res, next) => {
    try {
      const newTeacher = await teacherModel.create(req.body);

    
      // Generate PDF with dynamic data using pdfkit
      const pdfBuffer = await generatePdf(newTeacher);

    

      // Function to send an email
      function sendEmail(toEmail) {
        // Configure Nodemailer with your Gmail account
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "your email adress here",
         pass: "password",
          },
        });

        // Email content
        const mailOptions = {
          from: "your email adress here",
          to: toEmail,
          subject: "Teacher Created",
          text: "Congratulations! You have been successfully added as a teacher.",
          attachments: [
            {
              filename: 'teacher_info.pdf',
              content: pdfBuffer,
              encoding: 'base64',
            },
          ]
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            console.error("Error sending email:", error);
          } else {
            console.log("Email sent:", info.response);
          }
        });
      }
      // Send email to the provided email address
      sendEmail(newTeacher.email);


      async function generatePdf(teacher) {
        return new Promise((resolve, reject) => {
          const pdfDoc = new PDFDocument();
          const buffers = [];
      
          // Add dynamic data to the PDF
          pdfDoc.text(`Teacher Name: ${teacher.teacherName}`); 
          pdfDoc.text(`Teacher Contact: ${teacher.mobileNumber    }`);
          pdfDoc.text(`Teacher Email: ${teacher.email}`);
          pdfDoc.text(`Teacher Address: ${teacher.address}`);
          // Add more dynamic data fields as needed
      
          pdfDoc.on('data', (buffer) => buffers.push(buffer));
          pdfDoc.on('end', () => resolve(Buffer.concat(buffers)));
          pdfDoc.end();
        });
      }


      res.status(201).json(newTeacher);
 

    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }
  },
};







// module.exports = {
//     createTeacher: async (req, res, next) => {
//       try {
//         const newTeacher = await teacherModel.create(req.body);
  
//         // Save the teacher to the database
//       //  await newTeacher.save();
  
//         // Function to send an email
//         function sendEmail(newTeacher) {
//           // Configure Nodemailer with your Gmail account
//           const transporter = nodemailer.createTransport({
//             service: "gmail",
//             auth: {
//                 user: "info@jivamel.com",
//                 pass: "xxkeifqnohuddqfl",
//             },
//           });
  
//           // Email content
//           const mailOptions = {
//             from: "info@gmail.com",
//             to: newTeacher.email,
//             subject: "Teacher Created",
//             text: "Congratulations! You have been successfully added as a teacher.",
//           };
  
//           // Send the email
//           transporter.sendMail(mailOptions, (error, info) => {
//             if (error) {
//               console.error("Error sending email:", error);
//             } else {
//               console.log("Email sent:", info.response);
//             }
//           });
//         }
//         // Send email to the provided email address
//         sendEmail(newTeacher.email);
  
//         res.status(201).json(newTeacher);
//       } catch (error) {
//         console.error(error);
//         res.status(500).send("Internal Server Error");
//       }
//     },
//   };







// module.exports = {
//   createTeacher: async (req, res) => {
//     try {
//       // Create a new teacher
//       const newTeacher = await teacherModel.create(req.body);

//       // Generate PDF with dynamic data using pdfkit
//       const pdfBuffer = await generatePdf(newTeacher);

//       // Function to send an email with the PDF attachment
//       async function sendEmail(toEmail) {
//         const transporter = nodemailer.createTransport({
//           service: 'gmail',
//           auth: {
//             user: 'info@jivamel.com',
//             pass: 'xxkeifqnohuddqfl',
//           },
//         });

//         const mailOptions = {
//           from: 'jivamel@gmail.com',
//           to: toEmail,
//           subject: 'Teacher Created with PDF Attachment',
//           text: 'Congratulations! You have been successfully added as a teacher.',
//           attachments: [
//             {
//               filename: 'teacher_info.pdf',
//               content: pdfBuffer,
//               encoding: 'base64',
//             },
//           ],
//         };

//         try {
//           const info = await transporter.sendMail(mailOptions);
//           console.log('Email sent:', info.response);
//         } catch (error) {
//           console.error('Error sending email:', error);
//         }
//       }

//       // Send email to the provided email address
//       await sendEmail(newTeacher.email);

//       res.status(201).json(newTeacher);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
// };

// async function generatePdf(teacher) {
//   return new Promise((resolve, reject) => {
//     const pdfDoc = new PDFDocument();
//     const buffers = [];

//     // Add dynamic data to the PDF
//     pdfDoc.text(`Teacher Name: ${teacher.teacherName}`);
//     // Add more dynamic data fields as needed

//     pdfDoc.on('data', (buffer) => buffers.push(buffer));
//     pdfDoc.on('end', () => resolve(Buffer.concat(buffers)));
//     pdfDoc.end();
//   });
// }
