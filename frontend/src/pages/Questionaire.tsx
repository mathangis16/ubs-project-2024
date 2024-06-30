import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useAuth } from "../context/AuthContext";
import { getUserDetails } from "../helpers/api-communicator"; // Make sure this function is implemented

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

const Questionaire: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [showText, setShowText] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userDetails, setUserDetails] = useState<any>(null);

  const auth = useAuth();

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const response = await fetch('/Gender Questionnaire - with flags.json');
        const parsedQuestions: Question[] = await response.json();
        setQuestions(parsedQuestions);
      } catch (error) {
        console.error('Failed to load questions:', error);
      }
    };

    loadQuestions();
  }, []);

  useEffect(() => {
    const fetchDetails = async () => {
      if (auth?.user) {
        const data = await getUserDetails();
        if (data) {
          setUserDetails(data);
        }
      }
    };
    fetchDetails();
  }, [auth?.user]);

  useEffect(() => {
    if (questions.length > 0 && userDetails) {
      filterQuestions();
    }
  }, [questions, userDetails]);

  const filterQuestions = () => {
    if (!userDetails) {
      console.warn('User details are not available');
      return;
    }

    const { gender, age } = userDetails;
    const ageGroup = getAgeGroup(age);

    const filtered = questions.filter((question) => (
      (question.flags.gender === gender || question.flags.gender === 'Neutral') &&
      question.flags.age.includes(ageGroup)
    ));

    // Shuffle the filtered questions and pick up to 10
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);

    setFilteredQuestions(selectedQuestions);
  };

  const getAgeGroup = (age: string): string => {
    if (age === 'less than 12 years old') return '<12';
    if (age === '12 to 25 years old') return '12-25';
    if (age === '26 to 40 years old') return '26-40';
    if (age === '41 to 55 years old') return '41-55';
    return '>55';
  };

  const handleAnswerOptionClick = (selectedAnswer: string) => {
    if (selectedAnswer === filteredQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < filteredQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
      if (score === filteredQuestions.length - 1) {
        setShowText(true);
      }
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px' }}>
      <Typography variant="h4" style={{ color: "black" }} gutterBottom>
        Custom Questions
      </Typography>

      <Grid container spacing={3}>
        {showScore ? (
          <Grid item xs={12}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" style={{ color: "black" }}>
                You scored {score} out of {filteredQuestions.length}
              </Typography>
              {showText && (
                <Typography variant="h6" style={{ color: "black" }}>
                  Congratulations! You got all the answers correct!
                </Typography>
              )}
            </Paper>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Paper style={{ padding: '20px' }}>
                <Typography variant="h6" style={{ color: "black" }}>
                  {filteredQuestions[currentQuestion]?.title}
                </Typography>
                {filteredQuestions[currentQuestion]?.options &&
                  Object.keys(filteredQuestions[currentQuestion].options).map((key) => (
                    <Button
                      key={key}
                      onClick={() => handleAnswerOptionClick(key)}
                      variant="contained"
                      color="primary"
                      style={{ margin: '5px' }}
                    >
                      {filteredQuestions[currentQuestion].options[key]}
                    </Button>
                  ))}
              </Paper>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default Questionaire;











// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Grid, Paper, Button } from '@mui/material';
// import { useAuth } from "../context/AuthContext";
// // import {getAllUsers} from "../controllers/user-controllers.js";
// //import User from "../models/User.js";

// interface Question {
//   title: string;
//   options: { [key: string]: string };
//   answer: string; // The correct answer choice number as a string
//   flags: {
//     gender: string;
//     country: string;
//     age: string[];
//   };
// }

// const Questionaire: React.FC = () => {
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
//   const [score, setScore] = useState(0);
//   const [showScore, setShowScore] = useState(false);
//   const [showText, setShowText] = useState(false);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const auth = useAuth();

//   useEffect(() => {
//     const loadQuestions = async () => {
//       try {
//         const response = await fetch('/Gender Questionnaire - with flags.json');
//         const parsedQuestions: Question[] = await response.json();
//         setQuestions(parsedQuestions);
//       } catch (error) {
//         console.error('Failed to load questions:', error);
//       }
//     };

//     loadQuestions();
//   }, []);

//   useEffect(() => {
//     if (questions.length > 0) {
//       filterQuestions();
//     }
//   }, [questions, auth?.user]);

//   const filterQuestions = () => {
//     if (!auth?.user) {
//       console.warn('User data is not available');
//       return;
//     }

//     console.log('User data:', auth?.user); // Log user data to debug
//     console.log('User data:', auth?.user.age); // Log user data to debug

//     const filtered = questions.filter(async (question) => {

//       //const ageGroup = getAgeGroup(auth?.user?.age ?? '');
//       // const ageGroup = getAgeGroup(auth?.user.age);
//       // const ageGroup = getAgeGroup("12 to 25 years old");
//       // const userGender = auth?.user?.gender ?? '';
//       //const userGender = "Female";
//       const { gender, age } = auth.user;
//       const ageGroup = getAgeGroup(age);
      
//       return (
//         (question.flags.gender === gender || question.flags.gender === 'Neutral') &&
//         question.flags.age.includes(ageGroup)
//       );
//     });

//     const shuffled = filtered.sort(() => 0.5 - Math.random());
//     const selectedQuestions = shuffled.slice(0, 10);

//     setFilteredQuestions(selectedQuestions);
//   };

//   const getAgeGroup = (age: string): string => {
//     if (age == 'less than 12 years old') return '<12';
//     if (age == '12 to 25 years old') return '12-25';
//     if (age == '26 to 40 years old') return '26-40';
//     if (age == '41 to 55 years old') return '41-60';
//     return '>60';
//   };

//   const handleAnswerOptionClick = (selectedAnswer: string) => {
//     if (selectedAnswer === filteredQuestions[currentQuestion].answer) {
//       setScore(score + 1);
//     }

//     const nextQuestion = currentQuestion + 1;

//     if (nextQuestion < filteredQuestions.length) {
//       setCurrentQuestion(nextQuestion);
//     } else {
//       setShowScore(true);
//       setShowText(score === filteredQuestions.length - 1);
//     }
//   };

//   return (
//     <Container maxWidth="md" style={{ padding: '20px' }}>
//       <Typography variant="h4" style={{ color: "black" }} gutterBottom>
//         Custom Questions
//       </Typography>

//       <Grid container spacing={3}>
//         {showScore ? (
//           <Grid item xs={12}>
//             <Typography variant="h6" style={{ color: "black" }}>
//               You scored {score} out of {filteredQuestions.length}
//             </Typography>
//             {showText && (
//               <Typography variant="h6" style={{ color: "black" }}>
//                 Congratulations! You got all the answers correct!
//               </Typography>
//             )}
//           </Grid>
//         ) : (
//           filteredQuestions.length > 0 && (
//             <Grid item xs={12}>
//               <Paper style={{ padding: '20px' }}>
//                 <Typography variant="h6" style={{ color: "black" }}>
//                   {filteredQuestions[currentQuestion].title}
//                 </Typography>
//                 <div>
//                   {Object.entries(filteredQuestions[currentQuestion].options).map(([key, option]) => (
//                     <Button
//                       key={key}
//                       onClick={() => handleAnswerOptionClick(key)}
//                       style={{ display: 'block', margin: '10px 0', borderRadius: "5px" }}
//                     >
//                       {option}
//                     </Button>
//                   ))}
//                 </div>
//               </Paper>
//             </Grid>
//           )
//         )}
//       </Grid>
//     </Container>
//   );
// };

// export default Questionaire;









// import React from "react";
// import { useNavigate } from 'react-router-dom';
// import { Button } from '@mui/material';

// const Questionaire: React.FC = () => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/dictionary'); 
//   };

//   return (
//     <Button
//       variant="contained"
//       color="primary"
//       onClick={handleClick}
//       sx={{
//         px: 2,
//         py: 1,
//         mt: 2,
//         borderRadius: 2,
//       }}
//     >
//       Learn more!
//     </Button>
//   );
// };
// export default Questionaire;








