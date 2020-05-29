import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import avatar from '../images/avatar.png';
import moment from 'moment';
import PostCard from '../components/PostCard';
import { Link } from 'react-router-dom'; 
import { AuthContext } from '../context/AuthContext';
import { FETCH_POSTS_QUERY } from '../util/graphql';

function Profile() {
    const { user } = useContext(AuthContext);
    const { loading, data } = useQuery(FETCH_POSTS_QUERY);

    let profileMarkup;
    if (!user) {
        profileMarkup = (
            <div className="ui placeholder segment">
                <div className="ui icon header">
                    <i className="user circle outline icon"></i>
                    User not logged In
                </div>
                <Link to="/login">
                    <div className="ui primary button">LOGIN PAGE</div>
                </Link>
            </div>
        )
    } else {
        profileMarkup = (
            <div className="ui grid ">
            <div className="row">
                <div className="four wide column">
                <div className="ui card" style={{position: "sticky", top: 10}}>
                    <div>
                        <img className="right floated mini ui image" 
                            src={avatar} 
                            alt="avatar" 
                            float="right"
                            style={{width:"21rem"}} 
                            /> 
                    </div>
                    <div className="content">
                        <div className="header"><b>User:  </b>{user.username}</div>
                        <div className="meta">
                        <span className="date"> Joined on {moment(user.createdAt).format('YYYY/MM/DD')}</span>
                        </div>
                        <div className="email">
                            <b>Email:</b> {user.email}
                        </div>
                    </div>
                    <div className="extra content">
                        
                    </div>
                </div>
                </div>
                <div className="twelve wide column">
                <div className="row page-title">
                    <h1>Your Posts</h1><br></br>
                </div>
                
                <div className="row">
                    { user && (
                        <div className="column">
                            <PostForm></PostForm><br></br>
                        </div>
                    )}

                    { loading ? (
                        <h1>loading posts...</h1>
                    ): (
                        data.getPosts && data.getPosts.filter((p) => p.username === user.username).map((post) => (
                            <div className="column" key={post.id}>
                                <PostCard post={post}/><br></br>
                            </div>
                        ))
                    )}
                </div> 
                </div>
            </div>
        </div>
        )
    }

    return profileMarkup;
}

export default Profile;
 
