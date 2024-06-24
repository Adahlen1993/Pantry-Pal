import React, { useState } from 'react';
import {useSelector} from 'react-redux';
import AdminTabs from '../AdminTabs/AdminTabs';




// Basic functional component structure for React with default state
// value setup. When making a new component be sure to replace the
// component name TemplateFunction with the name for the new component.
function TemplateFunction(props) {
  // Using hooks we're creating local state for a "heading" variable with
  // a default value of 'Functional Component'
  const store = useSelector((store) => store);
  const [heading, setHeading] = useState('Functional Component');

  return (
    <div>
      <h2>Admin</h2>
      <AdminTabs />
    </div>
  );
}

export default TemplateFunction;
