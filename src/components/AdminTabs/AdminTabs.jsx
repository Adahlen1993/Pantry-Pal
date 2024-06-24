import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import AdminUserTable from '../AdminTables/AdminUserTable';
import AdminRecipesTable from '../AdminTables/AdminRecipesTable';
import AdminIngredientsTable from '../AdminTables/AdminIngredientsTable';


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
       <AdminRecipesTable/>
      </Tab>
      <Tab eventKey="ingredients" title="ingredients">
       <AdminIngredientsTable/>
      </Tab>
    </Tabs>
  );
}

export default AdminTabs;