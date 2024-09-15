import React from "react";
import { Link } from 'react-router-dom';

function CustomerListItem({ customer }) {
    return(
        <li>
            <Link to={`/customers/${customer.id}`}>
            {customer.name}
            </Link>
        </li>
    );
}

export default CustomerListItem;