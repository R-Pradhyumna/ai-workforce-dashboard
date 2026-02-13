export default function UsageTable({ tableData, page }) {
  return (
    <section>
      <h2>Usage Table</h2>

      <p>
        Page {page} of {tableData.totalPages}
      </p>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>Employee</th>
            <th>Tokens</th>
            <th>Cost</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {tableData.rows.map((row) => (
            <tr key={row.id}>
              <td>{row.full_name}</td>
              <td>{row.tokens_used}</td>
              <td>${row.cost_usd}</td>
              <td>{row.category}</td>
              <td>{new Date(row.created_at).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
