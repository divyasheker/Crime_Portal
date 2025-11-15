// src/pages/citizen/Resources.js
import React from "react";
import { motion } from "framer-motion";

const resourceData = [
  {
    id: 1,
    category: "Emergency Contacts",
    items: [
      { name: "Police Helpline", info: "100", type: "call" },
      { name: "Fire Department", info: "101", type: "call" },
      { name: "Ambulance", info: "102", type: "call" },
      { name: "Cybercrime Helpline", info: "155260", type: "call" },
    ],
  },
  {
    id: 2,
    category: "Guides & Tutorials",
    items: [
      { name: "How to Report a Crime Online", link: "#", type: "link" },
      { name: "Personal Safety Tips", link: "#", type: "link" },
      { name: "Traffic Safety Guidelines", link: "#", type: "link" },
    ],
  },
  {
    id: 3,
    category: "Downloadable Forms",
    items: [
      { name: "Complaint Form PDF", link: "#", type: "download" },
      { name: "Citizen Rights Brochure", link: "#", type: "download" },
    ],
  },
  {
    id: 4,
    category: "Useful Links",
    items: [
      { name: "National Crime Records Bureau", link: "https://ncrb.gov.in", type: "link" },
      { name: "Legal Aid Resources", link: "#", type: "link" },
    ],
  },
];

const Resources = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-5">
      <h1 className="text-3xl font-bold text-center mb-10">Resources</h1>

      <div className="max-w-5xl mx-auto grid gap-8">
        {resourceData.map((category) => (
          <motion.div
            key={category.id}
            className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: category.id * 0.1 }}
          >
            <h2 className="text-xl font-semibold mb-4">{category.category}</h2>
            <ul className="space-y-2">
              {category.items.map((item, idx) => (
                <li key={idx} className="flex justify-between items-center border-b pb-2">
                  <span>{item.name}</span>
                  {item.type === "call" && (
                    <a href={`tel:${item.info}`} className="text-blue-600 font-medium">
                      {item.info}
                    </a>
                  )}
                  {item.type === "link" && (
                    <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium">
                      Visit
                    </a>
                  )}
                  {item.type === "download" && (
                    <a href={item.link} download className="text-blue-600 font-medium">
                      Download
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
