"use client";
import { Container } from "../common";

export default function About() {
  const Card = (title, des, key) => (
    <div key={key} className="text-center bg-blue-50 rounded-lg p-7">
      <h2 className="text-xl font-medium mb-2 text-primary"> {title} </h2>
      {des}
    </div>
  );
  const li = (des, key) => <p key={key}>- {des}</p>;

  return (
    <Container className="py-20 text-center">
      <div className="w-10/12 lg:w-9/12 grid lg:grid-cols-3 gap-5">
        {Card(
          "Our Mission",
          "Our mission is to be the leader in roadside assistance all throughout the Los Angeles area using embracing technology, the growth of internal efficiency and more specialization in our industry. Our aspiration is to offer solutions to our clients and do so with going beyond standard expectations.",
          0
        )}
        {Card(
          "Our Goals",
          [
            li("To encourage excellence in teamwork.", 0),
            li("To improve our attention to ecological issues.", 1),
            li(
              "To strive for enhancement in all fields of our company or business ",
              2
            ),
            li(
              "To constantly promote the ethics and morals of our business practices.",
              3
            ),
          ],
          1
        )}
        {Card(
          "Our Values",
          [
            li(
              "To work as individuals with perfect integrity, honesty as well as trustworthiness.",
              0
            ),
            li(
              "To treat our clients and team members with respect and dignity.",
              1
            ),
            li(
              "To empower our workers to be the best through constant training .",
              2
            ),
          ],
          2
        )}
        {Card(
          "How we work",
          "The use of metrics for assessing critical success aspects has been a secret to the success of our company. We are developed by response time. That means the faster our operators respond to your call the more value you get.",
          3
        )}
        {Card(
          "Our Secret to Success ",
          "Working wiser than the race and using most excellent practices has converted into success for our company. What is more, growth of our existing staffs and getting new talent is of utmost importance to the future success of our business. ",
          4
        )}
        {Card(
          "Community Outreach",
          "We proactively support different private, public and charitable organizations using pledges of financial support, time, and goods. Our effort helps our partners in the community in a continuance of their efforts in the fields of education, public security, humanities and health and those plans that give for the necessities of low-income people and organizations. ",
          5
        )}
      </div>
    </Container>
  );
}
