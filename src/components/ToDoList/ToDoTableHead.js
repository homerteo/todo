import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const headCells = [
  { id: 'task', numeric: false, disablePadding: true, label: 'Tarea' },
  { id: 'delete', numeric: false, disablePadding: false, label: 'Elinimar' }
];

const ToDoTableHead = () => {
  return(
    <TableHead>
      <TableRow>
        {headCells.map(cell => (
          <TableCell
            key={cell.id}
            align='right'
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