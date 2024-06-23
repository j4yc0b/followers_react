import propTypes from 'prop-types'
import { useLocation } from 'react-router-dom';

function AccountsTable() {
    const location = useLocation();
    const accountsList = location.state.accountsList;
  

    return(
        <div class="accounts-table">
            {accountsList.length > 0 && (
                <table>
                    <thead>
                    <tr>
                        <th>N</th>
                        <th>User Name</th>
                        <th>Link</th>
                    </tr>
                    </thead>
                    <tbody>
                    {accountsList.map((account, index) => (
                        <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{account.user_name}</td>
                        <td><a href={account.link} target="_blank" rel="noopener noreferrer">{account.link}</a></td>
                        </tr>
                    ))}
                    </tbody>
                </table>
                )}
        </div>
    );
}



export default AccountsTable 