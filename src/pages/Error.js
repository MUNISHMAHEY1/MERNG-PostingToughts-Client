import React from 'react'
import { Link } from 'react-router-dom'

function Error() {
    return (
        <div>
            <div className="ui placeholder segment">
            <div className="ui icon header">
                <i className="bug icon"></i>
                Page Not Found (Status 404)
            </div>
            <Link to="/"><div className="ui primary button">Return Home</div></Link>
            </div>
        </div>
    )
}

export default Error;
