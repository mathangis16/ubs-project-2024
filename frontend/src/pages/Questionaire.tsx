import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useAuth } from "../context/AuthContext";

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
    if (questions.length > 0) {
      filterQuestions();
    }
  }, [questions, auth?.user]);

  const filterQuestions = () => {
    if (!auth?.user) {
      console.warn('User data is not available');
      return;
    }

    console.log('User data:', auth?.user);

    const filtered = questions.filter((question) => {
      // const ageGroup = getAgeGroup(auth.user.age);
      const ageGroup = getAgeGroup("12 to 25 years old");
      const genderGroup = "Female";
      return (
        (question.flags.gender === genderGroup || question.flags.gender === 'Neutral') &&
        question.flags.age.includes(ageGroup)
      );
    });

    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 10);

    setFilteredQuestions(selectedQuestions);
  };

  const getAgeGroup = (age: string): string => {
    if (age == 'less than 12 years old') return '<12';
    if (age == '12 to 25 years old') return '12-25';
    if (age == '26 to 40 years old') return '26-40';
    if (age == '41 to 55 years old') return '41-60';
    return '>60';
  };

  const handleAnswerOptionClick = (selectedAnswer: string) => {
    if (selectedAnswer === filteredQuestions[currentQuestion].answer) {
      setScore(score + 1);
      console.log(score);
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
            <Typography style={{ color: "black" }}>
              You scored {score} out of {filteredQuestions.length}
              {showText && <Typography>Congratulations! You got all the answers correct!</Typography>}
            </Typography>
          </Grid>
        ) : (
          filteredQuestions.length > 0 && (
            <Grid item xs={12}>
              <Paper style={{ padding: '20px' }}>
                <Typography variant="h6" style={{ color: "black" }}>
                  {filteredQuestions[currentQuestion].title}
                </Typography>
                {Object.keys(filteredQuestions[currentQuestion].options).map((key) => (
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ margin: '5px' }}
                    key={key}
                    onClick={() => handleAnswerOptionClick(filteredQuestions[currentQuestion].options[key])}
                  >
                    {filteredQuestions[currentQuestion].options[key]}
                  </Button>
                ))}
              </Paper>
            </Grid>
          )
        )}
      </Grid>
    </Container>
  );
};

export default Questionaire;











// import React, { useState, useEffect } from 'react';
// import { Container, Typography, Grid, Paper } from '@mui/material';
// import { useAuth } from "../context/AuthContext";

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
//   const auth = useAuth();
//   // if (auth?.user){
//   //   const userGender = auth.user.gender;
//   //   const userAge = auth.user.age;
//   // };

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

//     const filtered = questions.filter((question) => {
//       // if(auth?.user){
//       //   console.log(auth.user.age);
//       //   const ageGroup = getAgeGroup(auth.user.age);
//       // return (
//       //   (question.flags.gender === auth.user.gender || question.flags.gender === 'Neutral') &&
//       //   question.flags.age.includes(ageGroup)
//       // );
//       // }

//       //const ageGroup = getAgeGroup(auth?.user?.age ?? '');
//       const ageGroup = getAgeGroup("12 to 25 years old");
//       // const userGender = auth?.user?.gender ?? '';
//       const userGender = "Female";
//       return (
//         (question.flags.gender === userGender || question.flags.gender === 'Neutral') &&
//         question.flags.age.includes(ageGroup)
//       );
//     });

//     // Shuffle the filtered questions and pick up to 10
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

//   return (
//     <Container maxWidth="md" style={{ padding: '20px' }}>
//       <Typography variant="h4" style={{ color: "black" }} gutterBottom>
//         Custom Questions
//       </Typography>

//       <Grid container spacing={3}>
//         {filteredQuestions.length > 0 ? (
//           filteredQuestions.map((question, index) => (
//             <Grid item xs={12} key={index}>
//               <Paper style={{ padding: '20px' }}>
//                 <Typography variant="h6" style={{ color: "black" }}>{question.title}</Typography>
//                 {Object.keys(question.options).map((key) => (
//                   <Typography key={key} style={{ color: "black" }}>
//                     {key}: {question.options[key]}
//                   </Typography>
//                 ))}
//               </Paper>
//             </Grid>
//           ))
//         ) : (
//           <Grid item xs={12}>
//             <Typography style={{ color: "black" }}>No questions match your criteria.</Typography>
//           </Grid>
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








