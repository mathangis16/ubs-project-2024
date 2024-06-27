import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, TextField, MenuItem, Grid, Paper } from '@mui/material';
import { styled } from '@mui/system';
//import User from "../models/user.js";
import {useAuth} from "../context/AuthContext";

interface Question {
  title: string;
  options: { [key: string]: string };
  answer: string;
  flags: {
    gender: string;
    country: string;
    age: string[];
  };
}

// Mockup for user data

// const userGender = 'Female'; // This should be dynamically fetched from the user's signup info
const auth = useAuth();
//@ts-ignore
const userGender = auth?.user.gender;
// const userAge = 26; // This should be dynamically fetched from the user's signup info
//@ts-ignore
const userAge = auth?.user.age;

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const loadQuestions = async () => {
      //@ts-ignore
      const fs = require('fs');
      const parsedQuestions = JSON.parse(fs.readFileSync('Gender Questionnaire - with flags.json'));
      setQuestions(parsedQuestions);
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    filterQuestions();
  }, [questions]);

  const filterQuestions = () => {
    const filtered = questions.filter((question) => {
      //@ts-ignore
      const ageGroup = getAgeGroup(userAge);
      return (
        (question.flags.gender === userGender || question.flags.gender === 'Neutral') &&
        question.flags.age.includes(ageGroup)
      );
    });

    // Shuffle the filtered questions and pick up to 10
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);

    setFilteredQuestions(selectedQuestions);
  };

  const getAgeGroup = (age: number): string => {
    if (age < 12) return '<12';
    if (age >= 12 && age <= 25) return '12-25';
    if (age >= 26 && age <= 40) return '26-40';
    if (age > 40) return '41-60';
    return '>60';
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Custom Questions
      </Typography>

      <Grid container spacing={3}>
        {filteredQuestions.length > 0 ? (
          filteredQuestions.map((question, index) => (
            <Grid item xs={12} key={index}>
              <Paper style={{ padding: '20px' }}>
                <Typography variant="h6">{question.title}</Typography>
                {Object.keys(question.options).map((key) => (
                  <Typography key={key}>
                    {key}: {question.options[key]}
                  </Typography>
                ))}
              </Paper>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography>No questions match your criteria.</Typography>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default App;













// import React, { useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { Button, Box } from '@mui/material';
// //import {getAllUsers} from "./controllers/user-controllers";
// import { useAuth } from "../context/AuthContext";

// // interface Data {
// //   [key: string]: string;
// // }

// const Questionaire: React.FC = () => {
//   const navigate = useNavigate();
//   const handleClick = () => {
//     navigate('/dictionary'); 
//   };

//   const auth = useAuth();
//   const Questions = [
//       {
//           "title": "In order to maintain gender equality in the classroom, a teacher should __________",
//           "options": {
//               "1": "provide the same opportunity to both the boys and girls",
//               "2": "discourage the girls to take part in curricular activities",
//               "3": "provide analytical work to the girls",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55"
//               ]
//           }
//       },
//       {
//           "title": "Being a teacher, how should Ramesh teach the students in his class?",
//           "options": {
//               "1": "Making unsolicited comments about girls so that they do not consider themselves specific.",
//               "2": "Making similar arrangements for boys students and girls students.",
//               "3": "Separating girls from the students of the class and giving them information about household work.",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "12-25",
//                   "26-40",
//                   "41-55"
//               ]
//           }
//       },
//       {
//           "title": "Which of the following is a learned behavior or acquired identity?",
//           "options": {
//               "1": "Biological age",
//               "2": "Gender",
//               "3": "Matriarchy",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "What are the root causes of gender discrimination?\n I. Preconceived societal and individual beliefs about gender \n II. Income level",
//           "options": {
//               "1": "Only I",
//               "2": "Only II",
//               "3": "Both I & II",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The National Commission for Women was set up as statutory body in January ______.",
//           "options": {
//               "1": "1999",
//               "2": "1995",
//               "3": "1992",
//               "4": "1989"
//           },
//           "answer": "3",
//           "flags": {
//               "gender": "Female",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Which of these statements is TRUE regarding 'gender'?",
//           "options": {
//               "1": "It is a numerical concept",
//               "2": "It is biologically determined",
//               "3": "It is the same as the sex of the person",
//               "4": "It is a social construct"
//           },
//           "answer": "4",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Gender diversity means __________",
//           "options": {
//               "1": "Equivalence ratio of men and women.",
//               "2": "Equivalence ratio of men and women engaged in employment.",
//               "3": "Equity Ratio of Population.",
//               "4": "Equitable ratio of educated women and men."
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Which of the following is/are the source(s) or form(s) of gender discrimination? \nI. Nutrition, health and leisure \nII. Education, textbooks, curriculum and teachers \nIII. Family and parents",
//           "options": {
//               "1": "Both I and II",
//               "2": "Both I and III",
//               "3": "Both II and III",
//               "4": "I, II and III"
//           },
//           "answer": "4",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The opposite of gender sensitivity is  __________",
//           "options": {
//               "1": "Gender analysis",
//               "2": "Gender blindness",
//               "3": "Gender inequality",
//               "4": "Gender parity"
//           },
//           "answer": "4",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Gender and Development (GAD) aims to:",
//           "options": {
//               "1": "Address the needs of a specific gender",
//               "2": "Promote gender equality and social justice",
//               "3": "Segregate roles based on gender",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The term 'gender' refers to:",
//           "options": {
//               "1": "Biological differences between men and women",
//               "2": "Socially constructed roles, behaviors, and expectations associated with being male or female",
//               "3": "Occupational differences between men and women",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Gender mainstreaming involves:",
//           "options": {
//               "1": "Focusing exclusively on women's issues",
//               "2": "Integrating a gender perspective in all policies and programs",
//               "3": "Excluding men from the development process",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Gender-based violence includes:",
//           "options": {
//               "1": "Discrimination based on gender",
//               "2": "Economic disparities between men and women",
//               "3": "Any act that results in physical, sexual, or psychological harm or suffering based on gender",
//               "4": "None of the above"
//           },
//           "answer": "3",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Empowerment of women involves:",
//           "options": {
//               "1": "Providing women with dominant roles in society",
//               "2": "Enhancing women's ability to make strategic life choices",
//               "3": "Excluding women from decision-making processes",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Female",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The gender gap in education refers to:",
//           "options": {
//               "1": "The difference in literacy rates between men and women",
//               "2": "The difference in enrollment and access to education between men and women",
//               "3": "The difference in educational attainment between different genders",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The term 'gender roles' refers to:",
//           "options": {
//               "1": "Specific tasks and responsibilities assigned to individuals based on their biological sex",
//               "2": "Equal sharing of household chores between men and women",
//               "3": "Flexibility in societal expectations related to gender",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "'Triple burden' in the context of gender and development refers to:",
//           "options": {
//               "1": "The burden of household chores, paid work, and societal expectations faced by women",
//               "2": "The burden of financial responsibilities, family expectations, and career aspirations faced by men",
//               "3": "The burden of educational attainment, gender roles, and social stigma faced by children",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The gender pay gap is a result of:",
//           "options": {
//               "1": "Discrimination based on gender in the workplace",
//               "2": "Equal opportunities for men and women",
//               "3": "Equal educational attainment",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Gender-responsive budgeting focuses on:",
//           "options": {
//               "1": "Allocating a specific budget for women only",
//               "2": "Analyzing and reflecting gender considerations in budgeting processes and policies",
//               "3": "Reducing the overall budget for gender-related programs",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Gender-sensitive indicators in development projects are used to:",
//           "options": {
//               "1": "Measure the impact of projects on different genders",
//               "2": "Allocate resources based on gender",
//               "3": "Segregate genders in project implementation",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The 'glass ceiling' is a term used to describe:",
//           "options": {
//               "1": "Invisible barriers that prevent women from rising to top positions in organizations",
//               "2": "Equal opportunities for career advancement for both genders",
//               "3": "The physical barrier to entry for women in certain professions",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "Gender-responsive governance aims to:",
//           "options": {
//               "1": "Ensure that women hold a majority of government positions",
//               "2": "Integrate gender perspectives into governance processes and institutions",
//               "3": "Provide separate governance structures for men and women",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The concept of 'gendered division of labor' refers to:",
//           "options": {
//               "1": "Equal distribution of work between men and women",
//               "2": "The assignment of different roles and tasks to men and women in society",
//               "3": "The eradication of traditional gender roles in the workforce",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "'Intersectionality' in gender studies refers to:",
//           "options": {
//               "1": "The study of multiple intersecting identities such as gender, race, and class",
//               "2": "The study of a single aspect of identity in isolation",
//               "3": "The exclusion of diverse identities in academic discourse",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The term 'patriarchy' refers to:",
//           "options": {
//               "1": "A system where women hold dominant positions in society",
//               "2": "A system of social organization where men hold primary power and predominate in roles of leadership",
//               "3": "A system where both genders hold equal power and influence",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The term 'toxic masculinity' refers to:",
//           "options": {
//               "1": "Masculine behaviors that are harmful to individuals and society",
//               "2": "Positive and healthy expressions of masculinity",
//               "3": "An academic theory with no practical implications",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Male",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The term 'cisgender' refers to individuals who:",
//           "options": {
//               "1": "Identify with a gender that matches their sex assigned at birth",
//               "2": "Identify with a different gender than their sex assigned at birth",
//               "3": "Identify with multiple genders",
//               "4": "None of the above"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Neutral",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The 'HeForShe' campaign encourages:",
//           "options": {
//               "1": "Women to support each other in their careers",
//               "2": "Men and boys to advocate for gender equality",
//               "3": "Only men to advocate for gender equality",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Male",
//               "country": "Neutral",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The legal age for employment in hazardous industries for children in India is:",
//           "options": {
//               "1": "14 years old",
//               "2": "16 years old",
//               "3": "18 years old",
//               "4": "21 years old"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40"
//               ]
//           }
//       },
//       {
//           "title": "The major objective of the 'Beti Bachao Beti Padhao' initiative is to:",
//           "options": {
//               "1": "Promote female education and gender equality",
//               "2": "Eliminate female infanticide and improve the status of the girl child",
//               "3": "Enhance healthcare facilities for women",
//               "4": "Encourage families to have more children"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Female",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The 'Sarva Shiksha Abhiyan (SSA)' primarily aims to provide:",
//           "options": {
//               "1": "Free healthcare to children",
//               "2": "Free eucation to children",
//               "3": "Free housing to children",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40"
//               ]
//           }
//       },
//       {
//           "title": "The 'National Creche Scheme' aims to provide daycare facilities for the children of:",
//           "options": {
//               "1": "Government employees",
//               "2": "Working mothers in urban areas",
//               "3": "Working mothers in the organized sector",
//               "4": "Working mothers in the unorganized sector"
//           },
//           "answer": "4",
//           "flags": {
//               "gender": "Female",
//               "country": "India",
//               "age": [
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The 'Integrated Child Protection Scheme (ICPS)' in India primarily focuses on:",
//           "options": {
//               "1": "Nutrition support to children",
//               "2": "Protection and welfare of children in difficult circumstances",
//               "3": "Providing education to children",
//               "4": "None of the above"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40"
//               ]
//           }
//       },
//       {
//           "title": "The 'Rajiv Gandhi Scheme for Empowerment of Adolescent Girls (SABLA)' primarily focuses on the nutrition and empowerment of:",
//           "options": {
//               "1": "Adolescent boys",
//               "2": "Adolescent girls",
//               "3": "Young adults",
//               "4": "Elderly women"
//           },
//           "answer": "2",
//           "flags": {
//               "gender": "Neutral",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40"
//               ]
//           }
//       },
//       {
//           "title": "The flagship program in India aimed at the holistic development of women is:",
//           "options": {
//               "1": "Beti Bachao Beti Padhao",
//               "2": "Integrated Child Development Services",
//               "3": "National Rural Livelihoods Mission",
//               "4": "Pradhan Mantri Matru Vandana Yojana"
//           },
//           "answer": "4",
//           "flags": {
//               "gender": "Female",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "'Mahila Shakti Kendra' is a component of which government scheme for women empowerment?",
//           "options": {
//               "1": "Pradhan Mantri Ujjwala Yojana",
//               "2": "Beti Bachao Beti Padhao",
//               "3": "National Mission for Empowerment of Women",
//               "4": "National Rural Livelihoods Mission"
//           },
//           "answer": "3",
//           "flags": {
//               "gender": "Female",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The scheme that focuses on promoting women entrepreneurship in India is:",
//           "options": {
//               "1": "Stand-Up India",
//               "2": "Pradhan Mantri MUDRA Yojana",
//               "3": "Mahila Coir Yojana",
//               "4": "Pradhan Mantri Kaushal Vikas Yojana"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Female",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "The scheme that aims to improve women's access to technology and online markets is:",
//           "options": {
//               "1": "Mahila E-Haat",
//               "2": "Pradhan Mantri Mahila Shakti Kendra Scheme",
//               "3": "Pradhan Mantri Ujjwala Yojana",
//               "4": "Beti Bachao Beti Padhao"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Female",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//       {
//           "title": "'Nari Shakti Puraskar' is an award given to recognize exceptional contributions made by women in various fields. Which ministry confers this award?",
//           "options": {
//               "1": "Ministry of Women and Child Development",
//               "2": "Ministry of Human Resource Development",
//               "3": "Ministry of Social Justice and Empowerment",
//               "4": "Ministry of Rural Development"
//           },
//           "answer": "1",
//           "flags": {
//               "gender": "Female",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       },
//   {
//           "title": "The scheme that focuses on empowering rural women through self-help groups is:",
//           "options": {
//               "1": "Pradhan Mantri Kaushal Vikas Yojana",
//               "2": "Beti Bachao Beti Padhao",
//               "3": "Pradhan Mantri Mahila Shakti Kendra Scheme",
//               "4": "National Rural Livelihoods Mission (NRLM)"
//           },
//           "answer": "4",
//           "flags": {
//               "gender": "Female",
//               "country": "India",
//               "age": [
//                   "<12",
//                   "12-25",
//                   "26-40",
//                   "41-55",
//                   ">55"
//               ]
//           }
//       }
//   ]
//   if (auth?.user) {
//     if (auth.user.gender=="Female") {
//       return Questions.filter(question => question.flags.gender.includes("Female"));
//     }
//   } 
//   // useEffect(() => {
//   //   if (auth?.user) {
//   //     if (auth.user.gender=="Female") {
//   //       return Questions.filter(question => question.flags.gender.includes("Female"));
//   //     } else {
//   //     navigate("/menu");
//   //     }
//   //     }
//   //     }, [auth]);
//   return (
//     <Box width={"100%"} height={"100%"}>
//       <Box><h3 style={{ fontSize: '50px' }}>Let's see your knowledge!</h3></Box>
//       <Button
//         variant="contained"
//         color="primary"
//         onClick={handleClick}
//         sx={{
//           px: 2,
//           py: 1,
//           mt: 2,
//           borderRadius: 2,
//         }}
//       >
//         Learn more!
//       </Button>
//     </Box>
//   );
// };


// export default Questionaire;