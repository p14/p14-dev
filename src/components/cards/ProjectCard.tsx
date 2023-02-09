import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { projectCardContentStyles, projectCardStyles } from '../../styles/projects.styles';

interface ProjectCardProps {
  demoLink: string
  description: string
  imageAlt: string
  imagePath: string
  sourceCodeLink: string
  title: string
}

const ProjectCard = ({ demoLink, description, imageAlt, imagePath, sourceCodeLink, title }: ProjectCardProps) => {
  return (
    <Card sx={projectCardStyles}>
      <CardMedia
        component='img'
        height='150'
        image={imagePath}
        alt={imageAlt}
      />
      <CardContent sx={projectCardContentStyles}>
        <Typography component='h6' variant='h6'>
          {title}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' href={demoLink} target='_blank' rel='noopener noreferrer'>
          Demo
        </Button>
        <Button size='small' href={sourceCodeLink} target='_blank' rel='noopener noreferrer'>
          Source Code
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProjectCard;
