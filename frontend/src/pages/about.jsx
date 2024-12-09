import React from "react";

const AboutUs = () => {
  return (
    <div style={{ 
      maxWidth: "800px", 
      margin: "40px auto", 
      backgroundColor: "#fff", 
      padding: "30px", 
      borderRadius: "12px", 
      boxShadow: "0 6px 15px rgba(0, 0, 0, 0.15)" 
    }}>
      <h1 style={{ 
        textAlign: "center", 
        color: "#333", 
        fontSize: "28px", 
        fontWeight: "bold", 
        marginBottom: "30px" 
      }}>
        About Us
      </h1>
      
      <section style={{ marginBottom: "40px" }}> 
        <h2 style={{ 
          color: "#007bff", 
          fontSize: "22px", 
          fontWeight: "600", 
          marginBottom: "15px" 
        }}>
          Our Team
        </h2>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.6", 
          color: "#555" 
        }}>
          We are <strong>Proxima Warriors</strong>, a group of second-year Bachelor of Software Engineering students at The Open University of Sri Lanka. Our team is comprised of four dedicated members:
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}> 
        <h2 style={{ 
          color: "#007bff", 
          fontSize: "22px", 
          fontWeight: "600", 
          marginBottom: "15px" 
        }}>
          Our Project
        </h2>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.6", 
          color: "#555" 
        }}>
          <strong>RecipeShare</strong> is our team project, aimed at creating a user-friendly platform for sharing and discovering recipes. The platform is designed to address the clutter and complexity of existing recipe-sharing websites by focusing on simplicity and usability.
        </p>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.6", 
          color: "#555" 
        }}>
          RecipeShare allows users to register, log in, share recipes with titles, ingredients, steps, and photos, and browse them in an organized format. It also promotes community engagement through social media sharing and features like ratings and feedback.
        </p>
      </section>

      <section style={{ marginBottom: "40px" }}> 
        <h2 style={{ 
          color: "#007bff", 
          fontSize: "22px", 
          fontWeight: "600", 
          marginBottom: "15px" 
        }}>
          Our Mission
        </h2>
        <ul style={{ 
          fontSize: "16px", 
          lineHeight: "1.6", 
          color: "#555" 
        }}>
          <li>Provides a seamless and straightforward user experience for recipe sharing.</li>
          <li>Encourages community engagement through features like social sharing and feedback.</li>
          <li>Leverages modern technologies like the MERN stack to create a robust and scalable application.</li>
        </ul>
      </section>

      <section style={{ marginBottom: "40px" }}> 
        <h2 style={{ 
          color: "#007bff", 
          fontSize: "22px", 
          fontWeight: "600", 
          marginBottom: "15px" 
        }}>
          Contact Us
        </h2>
        <p style={{ 
          fontSize: "16px", 
          lineHeight: "1.6", 
          color: "#555" 
        }}>
          For more information about our project, feel free to reach out to our team, <strong>Proxima Warriors</strong>.
        </p>
      </section>
    </div>
  );
};

export default AboutUs;
