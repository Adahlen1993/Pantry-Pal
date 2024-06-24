import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminUserTable from '../AdminTables/AdminUserTable';

function AdminTabs() {
  return (
    <Tabs
      defaultActiveKey="user-list"
      id="uncontrolled-tab-example"
      className="mb-3"
    >
      <Tab eventKey="user-list" title="Users">
        <AdminUserTable />
      </Tab>
      <Tab eventKey="recipes" title="Recipes">
        Tab content for Profile
      </Tab>
      <Tab eventKey="ingredients" title="ingredients">
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

export default AdminTabs;