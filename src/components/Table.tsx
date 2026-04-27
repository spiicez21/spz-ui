import './Table.css';

interface Column {
  key: string;
  header: string;
  align?: 'left' | 'center' | 'right';
  render?: (value: any, row: any) => any;
}

interface TableProps {
  columns: Column[];
  data: any[];
  className?: string;
  onRowClick?: (row: any) => void;
}

export const Table = ({
  columns,
  data,
  className = '',
  onRowClick
}: TableProps) => {
  return (
    <div className={`spz-table-container ${className}`}>
      <table className="spz-table">
        <thead>
          <tr>
            {columns.map((col) => (
              <th 
                key={col.key} 
                className={`text-${col.align || 'left'}`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr 
              key={i} 
              onClick={() => onRowClick?.(row)}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((col) => (
                <td 
                  key={col.key} 
                  className={`text-${col.align || 'left'}`}
                >
                  {col.render ? col.render(row[col.key], row) : row[col.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
