import React from "react";
import { Box, Card, CardContent, Typography, Grid } from '@mui/material';

interface Data {
  [key: string]: string;
}

const data: Data = {
  "AFAB": "Assigned Female At Birth.",
  "Agender": "This identity involves no gender identification.",
  "Aliagender": "This is a nonbinary identity that does not fit within existing gender schemas or constructs.",
  "AMAB": "Assigned Male At Birth.",
  "Androgyne": "A gender identity that is gender-neutral or has a mix of both masculine and feminine characteristics.",
  "Aporagender": "A nonbinary gender identity that is different from male or female.",
  "Bigender": "This identity involves identifying with two distinct genders.",
  "Binarism": "A two-part gender system, which can be sexist.",
  "Body Dysphoria": "Distress related to physical aspects of the body that are linked to gender.",
  "Boi": "A boyish presentation, often used within LGBTQIA+ communities of color.",
  "Butch": "A masculine presentation commonly found within LGBTQIA+ communities.",
  "Cisgender": "Identifying with the gender assigned at birth.",
  "Cishet": "Being both cisgender and heterosexual.",
  "Cisnormativity": "The assumption that being cisgender is the norm.",
  "Cissexism": "Discrimination against people who are not cisgender.",
  "Demiboy": "Partially identifying with a male gender.",
  "Demigender": "Partially identifying with a gender.",
  "Demigirl": "Partially identifying with a female gender.",
  "Dyadic": "Having sex characteristics that are easily categorized as male or female.",
  "Feminine-of-Center": "Having a gender experience that is more feminine.",
  "Feminine-presenting": "Displaying a feminine appearance externally.",
  "Femme": "A gender identity that leans towards the feminine side.",
  "FTM": "Female-to-male, typically used to describe transgender men.",
  "Gender Apathetic": "Being flexible or indifferent about one's gender.",
  "Gender Binary": "A classification of gender into two distinct forms: male and female.",
  "Gender Dysphoria": "Distress caused by a mismatch between one's gender identity and assigned sex at birth.",
  "Gender Expansive": "A gender identity that subverts dominant views of gender.",
  "Gender Expression": "The external behavior and appearance related to one's gender.",
  "Gender Identity": "One's internal experience of gender.",
  "Gender-neutral Pronouns": "Pronouns such as they/them or ze/hir that are not gender-specific.",
  "Gender Nonconforming": "Having a gender identity or expression that differs from cultural norms.",
  "Gender Normative": "Having a gender identity or expression that fits societal expectations.",
  "Gender Presentation": "The way a person externally displays their gender.",
  "Gender Questioning": "Exploring and questioning aspects of one's gender.",
  "Gender Roles": "Society-assigned behaviors and expectations based on gender.",
  "Gender Variant": "Having a gender identity or expression that does not conform to societal norms.",
  "Genderfluid": "Moving between different genders.",
  "Genderfuck": "Deliberately challenging gender norms.",
  "Genderqueer": "A nonbinary gender identity that is neither male nor female.",
  "Gendervoid": "Having no gender identity.",
  "Graygender": "Being ambivalent about one's gender.",
  "Intergender": "Having a gender identity that is between male and female.",
  "Intersex": "Having sex characteristics that are not easily categorized as male or female.",
  "Masculine-of-Center": "Having a gender experience that is more masculine.",
  "Masculine-presenting": "Displaying a masculine appearance externally.",
  "Maverique": "Having an independent gender identity that is not male or female.",
  "Misgender": "The act of referring to someone using a gender pronoun or gendered language that’s incorrect, inaccurate, or not inclusive of the person’s actual gender identity.",
  "MTF": "Male-to-female, typically used to describe transgender women.",
  "Multi-gender": "Experiencing multiple genders.",
  "Neutrois": "Having a nonbinary gender identity that is neither male nor female.",
  "Nonbinary": "Not exclusively identifying as male or female.",
  "Novigender": "Having a complex, unique gender identity.",
  "Omnigender": "Experiencing all or many genders.",
  "Pangender": "Experiencing all or many genders.",
  "Polygender": "Having multiple gender identities.",
  "Social dysphoria": "A specific type of gender dysphoria that manifests as distress and discomfort that results from the way society or other people perceive, label, refer to, or interact with someone’s gender or body.",
  "Soft Butch": "Having a nonconforming gender identity with some masculine traits.",
  "Stone Butch": "Having a nonconforming gender identity with both feminine and butch traits.",
  "Third Gender": "A non-Western, Indigenous category of gender.",
  "Transfeminine": "Having a feminine gender identity different from the sex assigned at birth.",
  "Transgender or Trans": "Having a gender identity different from the sex assigned at birth.",
  "Transmasculine": "Having a masculine gender identity different from the sex assigned at birth.",
  "Transitioning": "Making changes to affirm one's gender identity.",
  "Transsexual": "Historically used to describe people who medically transition to a different gender.",
  "Trigender": "Experiencing three genders.",
  "Two-spirit": "An Indigenous term for traditional gender roles that are not strictly male or female."
};

const Dictionary = () => {
    return (
        <Box sx={{ flexGrow: 1, p: 3 }}>
          <Typography color="black" variant="h3" gutterBottom>
            Gender Identities Glossary
          </Typography>
          <Grid container spacing={3}>
            {Object.entries(data).map(([title, description]) => (
              <Grid item xs={12} sm={6} md={4} key={title}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div" color="black">
                      {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      );
    };

export default Dictionary;