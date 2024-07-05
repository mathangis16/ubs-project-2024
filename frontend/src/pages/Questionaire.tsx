import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
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
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [userDetails, setUserDetails] = useState<any>(null);

  const auth = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/dictionary'); 
  };

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
    setSelectedOption(selectedAnswer);
    if (selectedAnswer === filteredQuestions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
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

  const handlePreviousQuestion = () => {
    setSelectedOption(null);
    const prevQuestion = currentQuestion - 1;
    if (prevQuestion >= 0) {
      setCurrentQuestion(prevQuestion);
    }
  };

  return (
    <Container maxWidth="md" style={{ padding: '20px', marginTop: '60px' }}>
      <Grid container spacing={3}>
        {showScore ? (
          <Grid item xs={12}>
            <Paper style={{ padding: '20px' }}>
              <Typography variant="h6" style={{ color: "black" }}>
                You scored {score} out of {filteredQuestions.length}
              </Typography>
              {showText && (
                <Typography variant="h6" style={{ color: "black" }}>
                  Congratulations wohooo! You got all the answers correct!
                </Typography>
              )}
            </Paper>
            <Typography textAlign="center" font-family="Space Grotesk" marginTop="10px" color="black" fontSize={"20px"}>
              Click <Link to="/dictionary" style={{ color: 'black', textDecoration: 'underline' }}>here</Link> to learn more about the different gender identities
            </Typography>
          </Grid>
        ) : (
          <>
            <Grid item xs={12}>
              <Paper style={{ padding: '20px' }}>
                <Typography variant="h5" style={{ color: "black" }}>
                  {filteredQuestions[currentQuestion]?.title}
                </Typography>
                <Box display="flex" flexDirection="column" alignItems="flex-start" mt={2}>
                  {filteredQuestions[currentQuestion]?.options &&
                    Object.keys(filteredQuestions[currentQuestion].options).map((key) => (
                      <Button
                        key={key}
                        onClick={() => handleAnswerOptionClick(key)}
                        variant="contained"
                        color={selectedOption === key ? "secondary" : "primary"}
                        style={{ marginBottom: '10px', textAlign: 'left', width: '100%', fontSize: '15px' }}
                      >
                        {filteredQuestions[currentQuestion].options[key]}
                      </Button>
                    ))}
                </Box>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Button
                    onClick={handlePreviousQuestion}
                    variant="outlined"
                    color="primary"
                    disabled={currentQuestion === 0}
                  >
                    Back
                  </Button>
                  <Button
                    onClick={handleNextQuestion}
                    variant="contained"
                    color="primary"
                  >
                    Next
                  </Button>
                </Box>
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
// import { useNavigate, Link } from 'react-router-dom';
// import { Container, Typography, Grid, Paper, Button, Box } from '@mui/material';
// import { useAuth } from "../context/AuthContext";
// import { getUserDetails } from "../helpers/api-communicator"; // Make sure this function is implemented

// interface Question {
//   title: string;
//   options: { [key: string]: string };
//   answer: string;
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
//   const [userDetails, setUserDetails] = useState<any>(null);

//   const auth = useAuth();
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate('/dictionary'); 
//   };

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
//     const fetchDetails = async () => {
//       if (auth?.user) {
//         const data = await getUserDetails();
//         if (data) {
//           setUserDetails(data);
//         }
//       }
//     };
//     fetchDetails();
//   }, [auth?.user]);

//   useEffect(() => {
//     if (questions.length > 0 && userDetails) {
//       filterQuestions();
//     }
//   }, [questions, userDetails]);

//   const filterQuestions = () => {
//     if (!userDetails) {
//       console.warn('User details are not available');
//       return;
//     }

//     const { gender, age } = userDetails;
//     const ageGroup = getAgeGroup(age);

//     const filtered = questions.filter((question) => (
//       (question.flags.gender === gender || question.flags.gender === 'Neutral') &&
//       question.flags.age.includes(ageGroup)
//     ));

//     // Shuffle the filtered questions and pick up to 10
//     const shuffled = filtered.sort(() => 0.5 - Math.random());
//     const selectedQuestions = shuffled.slice(0, 10);

//     setFilteredQuestions(selectedQuestions);
//   };

//   const getAgeGroup = (age: string): string => {
//     if (age === 'less than 12 years old') return '<12';
//     if (age === '12 to 25 years old') return '12-25';
//     if (age === '26 to 40 years old') return '26-40';
//     if (age === '41 to 55 years old') return '41-55';
//     return '>55';
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
//       if (score === filteredQuestions.length - 1) {
//         setShowText(true);
//       }
//     }
//   };

//   return (
//     <Container maxWidth="md" style={{ padding: '20px', marginTop: '60px' }}>
//       {/* <Typography variant="h3" style={{ color: "black", paddingTop:'20px' }} gutterBottom>
//         Welcome to Tobias! First let's test your knowledge!
//       </Typography>
//       <Typography variant="h5" style={{ color: "black", paddingTop:'20px', paddingBottom:'20px' }} gutterBottom> Answer these 10 custom made questions and see your score at the end!</Typography> */}
//       <Grid container spacing={3}>
//         {showScore ? (
//           <Grid item xs={12}>
//             <Paper style={{ padding: '20px' }}>
//               <Typography variant="h6" style={{ color: "black" }}>
//                 You scored {score} out of {filteredQuestions.length}
//               </Typography>
//               {showText && (
//                 <Typography variant="h6" style={{ color: "black" }}>
//                   Congratulations wohooo! You got all the answers correct!
//                 </Typography>
//               )}
//             </Paper>
//             <Typography textAlign="center" font-family="Space Grotesk" marginTop="10px" color="black" fontSize={"20px"}> Click <Link to="/dictionary" style={{ color: 'black', textDecoration: 'underline' }}>here</Link> to learn more about the different gender identities</Typography>
//             {/* <Button
//               variant="contained"
//               color="primary"
//               onClick={handleClick}
//               sx={{
//                 px: 2,
//                 py: 1,
//                 mt: 2,
//                 borderRadius: 2,
//                 fontSize:'20px',
//                 backgroundColor:'#543d7b',
//                 color:'#fff8ed'
//               }}
//             >
//               Learn more about the different gender identities!
//             </Button> */}
//           </Grid>
//         ) : (
//           <>
//             <Grid item xs={12}>
//               <Paper style={{ padding: '20px' }}>
//                 <Typography variant="h5" style={{ color: "black" }}>
//                   {filteredQuestions[currentQuestion]?.title}
//                 </Typography>
//                 <Box display="flex" flexDirection="column" alignItems="flex-start" mt={2}>
//                   {filteredQuestions[currentQuestion]?.options &&
//                     Object.keys(filteredQuestions[currentQuestion].options).map((key) => (
//                       <Button
//                         key={key}
//                         onClick={() => handleAnswerOptionClick(key)}
//                         variant="contained"
//                         color="primary"
//                         style={{ marginBottom: '10px', textAlign: 'left', width: '100%', fontSize: '15px' }}
//                       >
//                         {filteredQuestions[currentQuestion].options[key]}
//                       </Button>
//                     ))}
//                 </Box>
//               </Paper>
//             </Grid>
//           </>
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








