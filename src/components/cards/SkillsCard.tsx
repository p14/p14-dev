import { Card, CardContent, CardMedia, Divider, ListItem, Typography } from '@mui/material';
import { skillsCardDividerStyles, skillsCardStyles } from '../../styles/skills.styles';

interface SkillsCardProps {
  imageAlt: string
  imagePath: string
  skills: string[]
  title: string
}

const SkillsCard = ({ imageAlt, imagePath, skills, title }: SkillsCardProps) => {
  return (
    <Card sx={skillsCardStyles}>
      <CardMedia
        component='img'
        height='225'
        image={imagePath}
        alt={imageAlt}
      />
      <CardContent>
        <Typography component='h6' variant='h6'>
          {title}
        </Typography>

        <Divider sx={skillsCardDividerStyles} />

        {skills.map((skill) => (
          <ListItem key={skill}>
            {skill}
          </ListItem>
        ))}
      </CardContent>
    </Card>
  );
};

export default SkillsCard;
