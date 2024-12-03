const Agenda = require("agenda");
const EmailTemplate = require("../models/EmailTemplate");
const Lead = require("../models/Lead");
const Flow = require("../models/Flow");
const axios = require("axios");
const { sendEmail } = require("../utils/email");
require('dotenv').config();

// Agenda setup
const agenda = new Agenda({
  db: { address: `${process.env.MONGO_URI}/agenda`, collection: "agendaJobs" },
});

// Define a job to send cold emails with error handling
agenda.define("send cold email", async (job, done) => {
  try {
    const { recipient, subject, body, scheduledTime } = job.attrs.data;
    console.log("Executing email job:", {
      recipient,
      scheduledTime: new Date(scheduledTime).toISOString(),
    });

    await sendEmail(recipient, subject, body);
    done();
  } catch (error) {
    console.error("Error in job execution:", error);
    done(error); // Mark job as failed
  }
});

// Define the endpoint to schedule an email
exports.apiSchedule = async (req, res) => {
  try {
    console.log("schedule api called");
    const { recipient, subject, body, delayInSeconds } = req.body;

    if (!recipient || !subject || !body || delayInSeconds === undefined) {
      return res
        .status(400)
        .json({
          message: "Recipient, subject, body, and delayInSeconds are required",
        });
    }

    // Calculate the scheduled time based on the delay
    const scheduleTime = new Date(Date.now() + delayInSeconds * 60 * 60 * 1000); // Adds 1 hour in milliseconds


    // Schedule the email job using Agenda
    await agenda.schedule(scheduleTime, "send cold email", {
      recipient,
      subject,
      body,
      scheduledTime: scheduleTime.toISOString(),
    });

    console.log(
      `Email scheduled for ${recipient} at ${scheduleTime.toISOString()}`
    );
    res
      .status(200)
      .json({
        message: "Email scheduled successfully",
        scheduledTime: scheduleTime.toISOString(),
      });
  } catch (error) {
    console.error("Error scheduling email:", error);
    res.status(500).json({ message: "Failed to schedule email" });
  }
};

async function scheduleEmails(leads, emailTemplate, delayDuration) {
  for (const lead of leads) {
    // Prepare data to send to the /api/schedule-email endpoint
    const emailData = {
      recipient: lead.emailAddress,
      subject: emailTemplate.subject,
      body: emailTemplate.body,
      delayInSeconds: delayDuration,
    };
    console.log(emailData);

    try {
      // Make a POST request to the schedule email endpoint
      const response = await axios.post(
        `${process.env.HOSTED_URL}/api/schedule-email`,
        emailData,
        {
          headers: {
            "x-api-key": "5d0883dde69756b055076e451643dc0239bd41f75aec13a8a9c1813c0dd007ba",
            "Content-Type": "application/json"
          },
        }
      ); // Adjust URL if necessary
      console.log(
        `Email scheduled response for ${lead.emailAddress}:`,
        response.data
      );
    } catch (error) {
      console.error(
        `Failed to schedule email for ${lead.emailAddress}:`,
        error.message
      );
    }
  }
}

// exports.saveFlow = async (req, res) => {
//   try {
//     const { nodes, edges } = req.body;
//     console.log(req.body);
//     const flow = new Flow({ nodes, edges });
//     await flow.save();
//     let leads = [];

//     // Schedule emails based on Wait/Delay nodes
//     nodes.forEach(async (node) => {
//       if (node.type === "leadSource") {
//         leads = await Lead.find({ source: node.data.value });
//         console.log(`Leads found for source ${node.data.value}:`, leads);
//       }
//       if (node.type === "coldEmail") {
//         const emailTemplate = await EmailTemplate.findOne({
//           templateType: node.data.value,
//         });
//         console.log("this email template will be used ==> ", emailTemplate);
//         // Find the corresponding delay node based on edges
//         const delayEdge = edges.find(
//           (edge) =>
//             edge.target === node.id &&
//             nodes.find((n) => n.id === edge.source && n.type === "waitDelay")
//         );

//         // Get the corresponding delay node based on the edge
//         const delayNode = nodes.find(
//           (n) => n.id === delayEdge?.source && n.type === "waitDelay"
//         );

//         console.log("this is delay node ==> ", delayNode);

//         const delayDuration = delayNode ? delayNode.data.value || 0 : 0;

//         console.log(emailTemplate.body);

//         await scheduleEmails(leads, emailTemplate, delayDuration);
//       }
//     });

//     // Start Agenda job processing
//     await agenda.start();

//     res.status(200).json({ message: "Flow saved and emails scheduled" });
//   } catch (error) {
//     console.error("Error saving flow:", error);
//     res.status(500).json({ message: "Failed to save flow or schedule email" });
//   }
// };


exports.saveFlow = async (req, res) => {
    try {
      const { nodes, edges } = req.body;
      console.log(req.body);
      const flow = new Flow({ nodes, edges });
      await flow.save();
      let leads = [];
  
      // Schedule emails based on Wait/Delay nodes
      for (const node of nodes) {
        if (node.type === "leadSource") {
          leads = await Lead.find({ source: node.data.value });
          console.log(`Leads found for source ${node.data.value}:`, leads);
        }
        if (node.type === "coldEmail") {
          const emailTemplate = await EmailTemplate.findOne({
            templateType: node.data.value,
          });
          console.log("This email template will be used:", emailTemplate);
  
          // Find the corresponding delay node based on edges
          const delayEdge = edges.find(
            (edge) =>
              edge.target === node.id &&
              nodes.find((n) => n.id === edge.source && n.type === "waitDelay")
          );
  
          // Get the corresponding delay node based on the edge
          const delayNode = nodes.find(
            (n) => n.id === delayEdge?.source && n.type === "waitDelay"
          );
  
          console.log("This is the delay node:", delayNode);
  
          const delayDuration = delayNode ? delayNode.data.value || 0 : 0;
  
          console.log("Email template body:", emailTemplate.body);
  
          // Ensure email scheduling is called after the necessary data is retrieved
          if (leads.length > 0) {
            await scheduleEmails(leads, emailTemplate, delayDuration);
          } else {
            console.log("No leads found for email scheduling.");
          }
        }
      }
  
      // Start Agenda job processing
      await agenda.start();
  
      res.status(200).json({ message: "Flow saved and emails scheduled" });
    } catch (error) {
      console.error("Error saving flow:", error);
      res.status(500).json({ message: "Failed to save flow or schedule email" });
    }
  };
  