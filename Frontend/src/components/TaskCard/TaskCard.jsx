import './TaskCard.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { styled } from '@mui/material/styles';

const DeleteButton = styled(Button)({
    fontFamily: 'Verdana, sans-serif',
    backgroundColor: '#f44336',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#d32f2f',
    },
});

const EditButton = styled(Button)({
    fontFamily: 'Verdana, sans-serif',
    backgroundColor: '#2196f3',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#1976d2', 
    },
});

const TaskCard = ({ task, onEdit, onDelete, onToggleStatus }) => {
  return (
    <Card className="task-card">
      <CardContent className="card-content">
        <Typography
          gutterBottom
          variant="h5"
          component="div"
          style={{
            textDecoration: task.completed ? "line-through" : "none",
            color: task.completed ? "green" : "black",
          }}
        >
          {task.task}
        </Typography>
        <Typography variant="h7" color="textSecondary">
          {new Date(task.createdAt).toLocaleDateString()}
        </Typography>
      </CardContent>

      <CardActions className="card-action">
        <Button
          size="small"
          style={{
            fontFamily: "Verdana, sans-serif",
            backgroundColor: task.completed ? "green" : "orange",
            color: "white",
          }}
          onClick={() => onToggleStatus(task._id)}
        >
          {task.completed ? "COMPLETADA" : "PENDIENTE"}
        </Button>

        <EditButton
          size="small"
          variant="contained"
          color="primary"
          onClick={() => onEdit(task._id)}
        >
          <EditIcon />
        </EditButton>
        <DeleteButton
          size="small"
          variant="contained"
          color="secondary"
          onClick={() => onDelete(task._id)}
        >
          <DeleteIcon />
        </DeleteButton>
      </CardActions>
    </Card>
  );
};

export default TaskCard;
