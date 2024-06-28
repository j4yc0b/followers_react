import { useLocation } from "react-router-dom";

function AccountsTable() {
  const location = useLocation();
  const accountsList = location.state.accountsList;

  return (
    <div class="accounts-table" className="m-3 my-6">
      {accountsList.length > 0 && (
        <table>
          <thead>
            <tr className="text-xl">
              <th>N</th>
              <th>User Name</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {accountsList.map((account, index) => (
              <tr key={index}>
                <td>{index + 1}.</td>
                <td>{account.user_name}</td>
                <td>
                  <a
                    href={account.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {account.link}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default AccountsTable;
