// QuizMainContent.js
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import './QuizMainContent.css'; // Import a CSS file for styling (create this file)

const QuizMainContent = () => {
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    // Fetch the HTML content dynamically
    const fetchHtmlContent = async () => {
      try {
        const response = await fetch('/src/pages/Coding.html');
        console.log('Response status:', response.status);

        if (response.ok) {
          const html = await response.text();
          console.log('HTML content:', html);
          setHtmlContent(html);
        } else {
          console.error('Failed to fetch HTML content.');
        }
      } catch (error) {
        console.error('Error fetching HTML content:', error);
      }
    };

    fetchHtmlContent();
  }, []);

  return (
    <div className="quiz-container">
      <Helmet>
        <script src="../../../src/pages/code-runner-wc.js" defer />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener("load", (event) => {
                let btn = document.getElementById("options_menu");
                btn.addEventListener("change", (event) => {
                  var value = btn.value;
                  var text = btn.options[btn.selectedIndex].text;
                  let changeCodeRunnerDemo = document.getElementById("change_demo");
                  changeCodeRunnerDemo.outerHTML = \`<code-runner id="change_demo" language="\${text}"></code-runner>\`;
                });
              });
            `,
          }}
        />
      </Helmet>
      <div className="quiz-header">
        <h2>
          Q. There is a road, which can be represented as a number line. You are located in the point 0 of the
          number line, and you want to travel from the point 0 to the point x, and back to the point 0.
          You travel by car, which spends 1 liter of gasoline per 1 unit of distance traveled.
          When you start at the point 0, your car is fully fueled (its gas tank contains the maximum possible
          amount of fuel).
          There are n gas stations, located in points a1, a2, …, an. When you arrive at a gas station,
          you fully refuel your car. Note that you can refuel only at gas stations,
          and there are no gas stations in points 0 and x.
          You have to calculate the minimum possible volume of the gas tank in your car (in liters) that will allow you to travel from the point 0 to the point x and back to the point 0.
        </h2>
      </div>
      <div className="quiz-content" dangerouslySetInnerHTML={{ __html: htmlContent }} />
    </div>
  );
};

export default QuizMainContent;
