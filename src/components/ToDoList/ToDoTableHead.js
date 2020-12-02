import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const headCells = [
  { id: 'check', label: '' , align: 'left'},
  { id: 'task', label: 'Tarea', align: 'left' },
  { id: 'delete', label: 'Eliminar', align: 'center' }
];

const ToDoTableHead = () => {
  return(
    <TableHead>
      <TableRow>
        {headCells.map(cell => (
          <TableCell
            key={cell.id}
            align={cell.aligh}
            padding='default'
          >
            {cell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default ToDoTableHead;